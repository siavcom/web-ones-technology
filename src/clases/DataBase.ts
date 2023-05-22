/// ///////////////////////////////////////////
// Clase : DataBase
// Descripcion : Conecta con un servidor node que esta sirviendo los servicios de la base de datos
// Author : Fernando Cuadras Angulo
// Creacion : Enero/2021
// Ult.Mod  : 15/Jul/2021.- Se implementa jsStore para el manejo indexedDb donde quedara guardara los datos
//                           recuperados de la base de datos
//            23/Ags/2021 cambiamos a guardar en string los date
/// //////////////////////////////////////////

/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint
// global axios, db, url, messagebox
// eslint no-undef: "error"
// import { inject, ref } from "vue";
// import router from '@/router'
// import { getCurrentInstance } from "vue";
// import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);
// import { DATA_TYPE } from "jsstore";
// import { newLocalDb } from "@/services/jsstore_con_new";
// import { oldLocalDb } from "@/services/jsstore_con_old";
// import { Connection } from "jsstore";
//import workerInjector from 'jsstore/dist/worker_injector'
//import { MessageBox } from '@/src/clases/Functions'
// import dat_emp from '@/empresas/datos.json' // json con los datos de la empresa, substituye comeemp

import axios from 'axios'
import alasql from 'alasql'
import { Session } from '@/stores/currentSession'
const session = Session()
//const $MMessageBox = useNuxtApp()

// import { Global } from "@/Global";
// import moment from 'moment'  // manejo de fechas

export class VFPDB {
  // propiedades de las clases
  AlaSql = alasql
  name: string = 'VFPDB'
  url: string
  nom_emp: string
  user: string
  pass: any
  // vis_tra: any = []; // guarda nombre de las vistas de trabajo en el servidor SQL
  are_tra: string[] = [''] // Las areas de trabajo donde cada vista tendra.
  // Inicilizamos el elemento 0 ya que el select 0 indica nueva area a utilzar

  num_are: number // numero de area de trabajo que se esta en este momento
  // db: any = {}; // estructura de toda la base de datos
  View: any = {} // aqui se guarda toda la informacion de las vistas SQL ( estructura, recno, recCount, exp_ind)
  // messagebox = MessageBox // asignamos las clases de VueSimpleAlert a messagebox
  Form = {} // any = getCurrentInstance();
  Ctx = {} // this.Form.ctx; // Contexto
  id_con: string
  event: any
  newTables = []
  oldTables = []
  Estatus: boolean
  Sql = alasql // portea alasql a this.sql (no quitar)
  //const { MessageBox } = useNuxtApp()
  /*
    newData = {
      name: "New",
      tables: [],
    };
    oldData = {
      name: "Old",
      tables: [],
    };
  */
  // Inicializa la conexion
  constructor() {
    this.Estatus = true
    this.url = ''
    this.nom_emp = ''
    this.user = ''

    this.num_are = 0

    /// //////////////////////////////////////
    // Revisa si ya se firmo el usuario
    /// //////////////////////////////////////

    // recupera datos de conexion
    this.id_con = session.id_con == undefined ? '' : session.id_con
    this.user = session.user
    this.url = session.url // obtenemos el url del servidor node
    this.nom_emp = session.nom_emp
    console.log('DataBase session.id ===>>>>', this.id_con)

    if (this.id_con.length < 16) {
      const router = useRouter()
      router.push('/Login')
      return
    }

    this.localAlaSql('DROP DATABASE IF EXISTS Now ;')
    this.localAlaSql('CREATE DATABASE Now ;')
    this.localAlaSql('DROP DATABASE IF EXISTS Last ;')
    this.localAlaSql('CREATE DATABASE Last ;')

    /*
    this.borraLocalDb('New');  // Borra primero toda la Base de datos local
    this.borraLocalDb('Old')
    */
    this.Estatus = true
    /* }
     catch (error) {
       console.log('Error borrar Local Db ', error)
       MessageBox.alert(
         error,
         "Error borraLocalDb ",
         "error"
       );
     } */

    //    this.localAlaSql('CREATE INDEXEDDB DATABASE IF NOT EXISTS TEMP_; \
    //                  ATTACH INDEXEDDB DATABASE TEMP_;' )

    // this.localAlaSql("CREATE DATABASE 'new'; CREATE DATABASE 'old'")
    // await alasql.promise(`ATTACH INDEXEDDB DATABASE ${dbName};USE DATABASE ${dbName};`);

    //   console.log(this.id_con, this.url, this.user)
  } // Fin constructor

  public async Init(Form) {
    this.Form = Form // .value
  }

  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  /// ////////////////////////////////////////
  open = async (pass: string) => {
    while (!this.Estatus) {
      console.log('esperando cambio de estatus')
    }
    session.updateId('')
    const def_con = { nom_emp: this.nom_emp, user: this.user, pass }
    const json = JSON.stringify(def_con)
    try {
      const response = await axios.get(
        this.url + 'login?json=' + json
        // { headers: { "Content-type": "application/json" } }
      )
      // console.log('renglon blanco =====>',response.data.ren_blanco);
      // Eslint-disable-next-line prettier/prettier
      this.id_con = response.data.id // asignamos a su conexion de base de datos
      session.updateId(this.id_con)

      return true
    } catch (error) {
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '

      )
      return false
    } // Fin de Catch
  }

  /// /////////////  Vfp Use nodata ///////////////////
  // nom_vis : Nombre de la vista a utilizar
  /// /////////////////////////////////////////////////

  useNodata = async (nom_vis: string, alias?: string) => {
    while (!this.Estatus) {
      console.log('esperando cambio de estatus')
    }

    if (nom_vis == null) {
      MessageBox('No se permite nombre de vista en null', 16, 'Error')
      return false
    }
    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = nom_vis
    }

    if (this.View[alias]) { // si exite ya la vista, solo borra los datos locales
      // console.log('useNodata View ',alias,this.View)
      // this.localAlaSql('USE Now ; ')
      await this.localAlaSql('delete from Now.' + alias)
      // this.localAlaSql('USE Last ; ')
      await this.localAlaSql('delete from  Last.' + alias)

      // Inicializamos el alias
      this.View[alias].recnoVal = [] // Generamos el arreglo de recnoVal

      this.View[alias].data = {} // asignamos el valor del ultimo registro
      this.View[alias].recCount = 0 // Total de registros de la vista
      this.View[alias].recno = 0 // Registro en cero
      this.View[alias].eof = false // Fin de archivo
      this.View[alias].bof = false // Principio de archivo
      this.View[alias].row = -1 // Renglon posicionado el registro

      return true
    }

    // La vista esta definida en forma reactiva desde la forma principal y es donde estan los
    // valores de los componentes, por lo que aqui aparece en el contexto de la forma
    // Por el momento se quita y se graba en localDb
    // const vis_act = ThisForm.ctx[alias];

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'USENODATA',
      // tok_aut: this.tok_aut,
      nom_vis: ''
    }

    dat_vis.nom_vis = nom_vis // Nombre de la vista
    try {
      // const response = await this.axiosCall(dat_vis)
      const response: any = await this.axiosCall(dat_vis)

      if (response == null) {
        console.error('==== . No existe la tabla===>', alias)
        return false
      }

      if (await this.genera_tabla(response, alias, true)==null) // generamos la tabla segun la estructura regresada
        return false
      // abre  la tabla de mantenimiento
      console.log('useNodata VIEW despues de generar_tabla==> ', alias, this.View[alias])
      if (this.View[alias] && this.View[alias].tip_obj.trim() == 'VIEW') {
        alias=this.View[alias].tablaSql
        await this.useNodata(alias)
        console.log('useNodata VIEW salir useNodata==> ', alias)

      }
      //  this.View[alias] = response; // Generamos la vista, asignamos su estructura  y filtros de condiciones

      return true
      /*
        //this.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion

        this.newTables[alias] =
        {
          name: alias,
          columns: {
            recno: {
              primaryKey: true,
              autoIncrement: true,
            },
          },
        };

        // this.oldData.tables[0]={
        //const oldTabla = {
        this.oldTables[alias] = {
          name: alias,
          columns: {
            recno: {
              primaryKey: true,
              autoIncrement: false,
            },
          },
        };

        // recorre todos los campos de la tabla y genera su estructura
        // const valores ={}

        // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
        let des_tab = ' CREATE TABLE ' + alias + ' (recno INT PRIMARY KEY'
        for (const nom_ele in this.View[alias].est_tabla) {
          const campo = this.View[alias].est_tabla[nom_ele];

          //    valores[campo]=null;
          let dataType: string; // :any asignamos el tipo de datos a newLocalDb
          switch (campo.tip_cam) {
            case "C":
              // dataType = DATA_TYPE.String;  // localDb
              dataType = 'STRING'
              //  this.View[alias].valores[nom_ele] = ''
              break;
            case "I":
              //            dataType = DATA_TYPE.Number;
              dataType = 'INT';
              //  this.View[alias].valores[nom_ele] = 0
              break;
            case "N":
              //            dataType = DATA_TYPE.Number;
              dataType = 'NUMBER';
              //  this.View[alias].valores[nom_ele] = 0
              break;
            case "D":
              // 23/Ags/2021   dataType = DATA_TYPE.DateTime;
              //            dataType = DATA_TYPE.String;
              dataType = 'DATE';
            //  this.View[alias].valores[nom_ele] = '1900-01-01'

            case "T":
              // 23/Ags/2021   dataType = DATA_TYPE.DateTime;
              //            dataType = DATA_TYPE.String;
              dataType = 'TIME';
              //this.View[alias].valores[nom_ele] = '1900-01-01'

              break;
            case "L":
              //            dataType = DATA_TYPE.Boolean;
              dataType = 'INT';
              //this.View[alias].valores[nom_ele] = 0

              break;
            default:
              //            dataType = DATA_TYPE.String;
              dataType = 'STRING';
            //this.View[alias].valores[nom_ele] = ''

          }

          des_tab = des_tab + ',' + nom_ele + ' ' + dataType

        }
        des_tab = des_tab + ')'
        // Creamos la tablas
        this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + '; ')
        this.localAlaSql(des_tab)

        this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + '; ')
        this.localAlaSql(des_tab)

        //   console.log('Vista creada ===', des_tab, this.localAlaSql('SELECT * from Last.' + alias))

        return true;
        // return this.View[alias].new[0]
        */
    } catch (error) {
      console.error(error)

      return null
      //  this.errorSql(error)
    }
  }

  /// /////////////  Vfp USE /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  // m        :  Varibles de memoria a pasar
  // alias    : Alias
  /// ////////////////////////////////////////////
  //  use = async (obj_vis:any, nom_vis:any , m: {}, alias?:any) => {
  use = async (nom_vis: string, m?: Record<string, never>, alias?: string, order?: string) => {
    while (!this.Estatus) {
      console.log('esperando cambio de estatus')
    }
    if (!m) { m = {} }

    if (!alias) {
      alias = nom_vis // asignamos el nombre de la vista
    }

    alias = alias.trim()
    if (await this.select(alias) == 0) // si el alias no existe
    {
      console.log('Use Nodata', nom_vis, alias)
      await this.useNodata(nom_vis, alias)
    }

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'USE',
      // tok_aut: this.tok_aut,
      nom_vis,
      where: ''
    }
    //    if (this.View[alias].tip_obj = 'VIEW') // si es una VIEW
    //    {
    //      dat_vis['query'] = 'select * from ' + nom_vis
    //      dat_vis.tip_llamada = 'SQLEXEC'
    //    }
    // la expresion del indice es generada desde el servidor de node y es formada
    // por un objeto json el cual utiliza los model del sequelize
    // { cop_nom=m.cop_nom, cod_nom=m.cod_nom }

    let exp_ind = ''
    let exp_whe = ''
    if (this.View[alias].tip_obj.trim() == 'VIEW') // si es una VIEW
    {
      // console.log('USE this.View VIEW', this.View[alias], dat_vis)
      // cambiar el * por los campos de la View en minusculas
     /*
      var campos=''
      var coma=''
      for (const field in this.View[alias].est_tabla){
          campos=campos+coma+field.toLowerCase()
          coma=','
      }    

     // dat_vis.query = `select ${campos} from ${nom_vis}`
     */
     dat_vis.query = 'select * from ' + nom_vis
      dat_vis.tip_llamada = 'SQLEXEC'
      // Aqui voy
      if (this.View[alias].exp_indice.trim().length > 0) {
        try {
          exp_ind = eval(this.View[alias].exp_indice.trim())
        } catch (error) {
          console.error(error, 'USE ' + alias + ' exp_ind=', this.View[alias].exp_indice.trim())

          return false
        }
        console.log('USE ' + alias + ' exp_ind', m, exp_ind)
        if (exp_ind == undefined) {
          MessageBox('No se pudo evaluar el indice de la tabla=' + alias + ' indice=' + this.View[alias].exp_indice)
          return false
        }
      }
      if (this.View[alias].exp_where.trim().length > 0) {
        console.log('dataBase exp_where', this.View[alias].exp_where)

        const val_eval = '`' + this.View[alias].exp_where.trim() + '`'
        console.log('use eval where ', val_eval, m)

        try {
          exp_whe = eval(val_eval)
        }
        catch (error) {
          console.error('eval =', val_eval, error)

          return false
        }




        if (exp_whe == undefined) {
          MessageBox('No se pudo evaluar el la expresion where de la tabla=' + alias + ' indice=' + this.View[alias].exp_where)
          return false
        }

        // exp_whe = eval(this.View[alias].exp_where.trim())     //  `${a}`
      }
      if (exp_ind.length + exp_whe.length > 0) {
        dat_vis.query = dat_vis.query + ' where '

        if (exp_ind.length > 0 && exp_whe.length > 0) { dat_vis.query = dat_vis.query + exp_ind + ' and ' + exp_whe }

        if (exp_ind.length > 0 && exp_whe.length == 0) { dat_vis.query = dat_vis.query + exp_ind }

        if (exp_ind.length == 0 && exp_whe.length > 0) { dat_vis.query = dat_vis.query + exp_whe }
      }
      // Si hay orden de la vista
      if (this.View[alias].order.trim().length > 0)
       { dat_vis.query = dat_vis.query + ' order by ' + this.View[alias].order }
    } else { // es un MODEL{
      //      const val_eval = "`"+this.View[alias].exp_indice+"`"
      console.log('USE this.View MODEL eval exp_indice', this.View[alias], dat_vis)


      const val_eval = this.View[alias].exp_indice

      console.log('use eval dat_vis ===>', val_eval)
      try {
        eval('dat_vis.where=' + val_eval)
      }
      catch (error) {
        console.error(error)

        return false
      }



      // eval("dat_vis.where=`" + this.View[alias].exp_indice+"`") // obtenemos la expresion del indice
    }

    //console.log(' use dat_vis========>', dat_vis)

    try {
      const data = await this.axiosCall(dat_vis)

      console.log('Use Axios Ok response =====>', dat_vis, data) // .data

      if (data.length > 0) // genera tabla Now y Last
      { return await this.genera_tabla(data, alias) } else { return data }
    } catch (error) {
      console.error('Axios error :', dat_vis, error)

      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL ')

      return false
    }
  }

  /// /////////////  Vfp obten un registro  /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  // key_pri  :  Key_pri
  /// ////////////////////////////////////////////
  // aqui me quede . revisar todo esto, puede que la tabla tenga varios alias

  obtRegistro = async (nom_tab: '', key_pri: number) => {
    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'USE',
      // tok_aut: this.tok_aut,
      nom_vis: nom_tab,
      where: { key_pri }
    }

    const response = await this.axiosCall(dat_vis)
    if (response == null)
      return

    if (response.data) {
      const respuesta = response.data
      // console.log('Obten Registro===>', respuesta)
      return respuesta[0] // response.data;
    }
    return []
  }

  /// /////////////  Vfp table update /////////////////////
  // updateType : =0 Solo el registro actual
  //              =1 Todos los registros de la vista hasta encontrar un error de actualizacion. Si TableUpdate encuentra un registro que no
  //                 puede ser actualizado, fallará en ese punto y retornará un valor de .F., indicando que ha fallado. Ningún registro más allá del que tiene el problema será procesado.
  //              =2 Todos los registros de la vista. Si encuentra un error de actualizacion,
  //                  forzara la actualizacion con los datos propios.
  // Force : True forzará nuestra actualización y sobrescribirá los cambios realizados por el otro usuario
  //         False no realizará la actualización si otro usuario ha hecho modificaciones al mismo registro.
  // alias  : Nombre de la vista a utilizar
  // tab_man : Tabla de mantenimiento (model en sequelize en NodeServer)
  /// ////////////////////////////////////////////
  tableUpdate = async (updateType?: number, force?: boolean, alias?: string, tab_man?: string) => {
    if (!updateType) { updateType = 0 }

    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1] // asigna el nombre de la vista segun el area de trabajo
    }
    if (alias == '') { return true }// no hay alias a actualizar
    //console.log('tableUpdate View',alias, this.View[alias])

    if (!tab_man) {
      if (this.View[alias].tip_obj == 'VIEW')
        tab_man = this.View[alias].tablaSql
      else
        tab_man = alias
    }

    var sw_val = true
    const nom_tab: string = this.View[alias].tablaSql.trim() // obtenemos el nombre model (sequelize) de la vista de mantenimento

    if (nom_tab.length < 2) {
      console.warn('No hay nombre de tabla de actualizacion para la vista', alias)
      MessageBox('No hay nombre de tabla de actualizacion para la vista ' + alias, 16, 'ERROR')
      return false
    }

    const recno = this.View[alias].recno // obtenemos el recno a actualizar
    const recCount = this.View[alias].recCount // obtenemos el recCount de la vista

    if (recCount == 0) { // la vista no tiene registros a actualizar
      console.warn('No hay registros en este alias', alias)
      return false
    }
    // select para localDb
    const select = {
      from: alias,
      order: {
        by: 'recno',
        type: 'asc'
      }
    }
    let where = '' // where alasql
    let where_del = ' where Viejo.key_pri>0 '
    let sw_delete = false
    if (updateType == 0) { // solo un registro
      // Solo actualiza un registro
      if (!recno) { // No hay registro a actualizar
        MessageBox('No hay recno en ' + alias, 16, 'ERROR')
        return
      }
      select.where = { recno }
      where = `WHERE recno=${recno}`
      where_del = ` WHERE Viejo.recno=${recno} and Viejo.key_pri>0`
    }

    // lee los datos originales haciendo un LEFT OUTER a los datos nuevos
    const data = await this.localAlaSql(` 
       Select Viejo.key_pri,Viejo.recno recnoOld, Nuevo.recno as recnoNew from Last.${alias} Viejo \
       LEFT OUTER JOIN Now.${alias} Nuevo using recno ${where_del}`)

    for (let row = 0; row < data.length; row++) {
      // Si no existe el recno New borra de la base de datos
      if (data[row].recnoNew == null || data[row].recnoNew != data[row].recnoOld) {
        const key_pri = data[row].key_pri
        // console.log('deleteRow ===', key_pri, alias)
        await this.deleteRow(key_pri, alias)
        sw_delete = true
      }
    }

    // obtenemos los datos a actualizar
    // console.log('tableUpdate error recno ',await this.localAlaSql(` SELECT recno,key_pri FROM Last.${alias} `))
    // console.log('tableUpdate Now update',await this.localAlaSql(`
    //  Select Viejo.* from Now.${alias} Nuevo \
    //  LEFT OUTER JOIN Last.${alias} Viejo using recno ${where}`))

    const dat_act = await this.localAlaSql(`SELECT * FROM Now.${alias} ${where}`)
    console.log('tableUpdate lee datos Now', dat_act)

    //const dat_act = datos
    // console.log('DataBase definicion '+tab_man,this.View[tab_man].val_def)
    const val_def = this.View[tab_man].val_def // estructura de campos

    // llamado AXIOS
    const dat_vis: any = {
      id_con: this.id_con,
      tip_llamada: '',
      nom_tab,
      dat_act: {}
    }

    // Recorremos todos los datos a actualizar
    let sw_insert = false

    for (const row in dat_act) {
      // recno=dat_act[row].recno
      dat_vis.tip_llamada = 'INSERT'
      dat_vis.dat_act = {} // Inicilizamos el arreglo de datos
      let sw_update = false

      // recorre los registros de la vista a actualizar
      // asignamos key_pri y timestamp del registro
      let old_dat = []
      // Es una actualizacion dedatos, asigna key_pri y timestamp
      //console.log('tableUpdate dat_act[row]', dat_act[row])
      if (dat_act[row].key_pri > 0) {
        dat_vis.dat_act.key_pri = dat_act[row].key_pri

        dat_vis.dat_act.timestamp = dat_act[row].timestamp
       


        dat_vis.tip_llamada = 'UPDATE'
        const ins_sql = `SELECT * FROM Last.${alias}  WHERE recno=${dat_act[row].recno} ;`
        const datos = await this.localAlaSql(ins_sql)
        // console.log('tableUpdate select Now ',ins_sql,datos)

        if (datos.length > 0) {
          old_dat = datos[0]
        }
        else {
          console.error('tableUpdate error recno ', row, dat_act[row].recno, await this.localAlaSql(` SELECT * FROM Last.${alias} `))
          return false
        }
      }

      // Recorremos todos los campos para ver cual cambio para mandarlo actualizar campo.old != campo.new
      const m = {} // valiables en memoria
      //  recorremos todos los campos del registro  actualizar
      for (const campo in dat_act[row]) {
       // console.log('DataBAse campo=', campo)
        // Si el campo nuevo o es diferente al viejo, aumentamos en los datos a actualizar

        switch (typeof dat_act[row][campo]) {
          case 'number':
            m[campo] = +dat_act[row][campo]
            break
          case 'boolean':
            m[campo] = +dat_act[row][campo]
            break
          default:
            //            m[campo] = "'" + dat_act[row][campo] + "'"
            m[campo] = dat_act[row][campo]
        }

        const nom_campo = campo.toLowerCase()
        if (nom_campo != 'recno' &&
          nom_campo != 'tie_cre' &&
          nom_campo != 'tie_uac' &&
          nom_campo != 'usu_usu' &&
          nom_campo != 'usu_cre' &&
          nom_campo != 'key_pri' &&
          nom_campo != 'timestamp' && (
            dat_vis.tip_llamada == 'INSERT' ||
            old_dat[campo] != dat_act[row][campo])
        ) {
          //  Busca en la estructura de la tabla de mantenimiento si es campo actualizable
          if (val_def[campo]) {
            dat_vis.dat_act[campo] = dat_act[row][campo]
            //console.log(' tableUpdate campo  actual ==========>', nom_campo, dat_act[row][campo])
            sw_update = true
          }
        }
      }

      // generamos el where para obtener los datos despues de insertar
      dat_vis.where = ''
      if (sw_update && dat_vis.tip_llamada == 'INSERT') {
       // console.log('tableUpdate exp_indice m', m, this.View[nom_tab].exp_indice)

        // const where = eval(this.View[nom_tab].exp_indice)
        const where = this.View[nom_tab].exp_indice
        try {
          eval('dat_vis.where=' + where)
        }
        catch (error) {
          console.error(error)

          return false
        }
        // console.log('tableUpdate dat_vis.where',dat_vis.where)

        // dat_vis.where =exp_ind    //eval(this.View[nom_tab].exp_indice)
      }
      //      if (sw_update) console.log(' tableUpdate insertara dados=====>', dat_vis.dat_act)

      // this.View[alias].recCount = +row; // actualiza el recCount de la vista
      // const recno = dat_act[row].recno;

      // Tratara 2 veces en caso de que haya un force
      for (let num_int = 0; num_int < 2 && sw_update; num_int++) { // tratara 3 veces de actualiar el dato
        const response = await this.axiosCall(dat_vis)

        if (response && response.key_pri && response.key_pri > 0) // No hay error
        {
          // dat_act[row].timestamp = response[0].timestamp
          // dat_act[row].key_pri = response[0].key_pri
          // Actualizamos alaSQL

          const ins_sql = ' UPDATE Now.' + alias + ` SET timestamp=${response.timestamp},key_pri=${response.key_pri} WHERE recno=${dat_act[0].recno}; ` +

            ' USE Last ; DELETE from Last.' + alias + ` WHERE recno=${dat_act[0].recno}  ;` +
            ' INSERT INTO Last.' + alias + ' SELECT * FROM Now.' + alias + ` WHERE recno=${dat_act[0].recno} ;`
          await this.localAlaSql(ins_sql)
          //console.log('tableUpdate ala Ok INSERT UPDATE =>', ins_sql)

          if (dat_vis.tip_llamada == 'INSERT') { sw_insert = true }

          //  ' UPDATE Now.' + alias + ` SET timestamp=${response[0].timestamp},key_pri=${response[0].key_pri} WHERE recno=${recno}; ` +
          //  ' USE Last ; DELETE from Last.' + alias + ` WHERE recno=${recno}  ;` +
          //  ' INSERT INTO Last.' + alias + ' SELECT * FROM Now.' + alias + ` WHERE recno=${recno} ;`)

          // console.log('tableUpdate INSERT Old despues', await this.localAlaSql(`SELECT  FROM Last.${alias} ${where}`))

          // console.log("7 Table Update Intento ", num_int,await this.localAlaSql('SELECT * FROM Last.' + alias + ` WHERE recno=${recno}`));

          num_int = 2 // se sale del for
        } else { // hay error, obtiene los datos nuevos que tiene el registro y vuelve a grabar
          console.error('No se pudo actualizar el registro en tabla ' + alias, dat_vis)
          sw_val = false
          if (dat_act[row].key_pri > 0) { // si es un dato existennte
            const respuesta = await this.obtRegistro(nom_tab, dat_act[row].key_pri) // se trae de nuevo los datos
            if (respuesta.key_pri) {
              respuesta.recno = dat_act[row].recno
              if (force) { // Actualiza el valor de timestamp para tratar de grabar de nuevo
                dat_vis.dat_act[row].timestamp = respuesta.timestamp
              } else {
                await this.localAlaSql('USE Now;\
                DELETE Now.' + alias + ` WHERE recno=${dat_act[row].recno};\
                INSERT INTO ` + alias + ' VALUES ?', [respuesta])

                await this.localAlaSql('USE Last;\
                DELETE Last.' + alias + ` WHERE recno=${dat_act[row].recno};\
                INSERT INTO ` + alias + ' VALUES ?', [respuesta])
              } // fin else
            }
          } // Fin si es un dato existente
          if (updateType < 2) {
            num_int = 2
            // no sigue la actualizacion
          }
        } // fin error
      } // fin for num_int
    } //  Fin del for de graba registro por registro

    // actualiza alasql en el caso de un tableupdate all
    /*
    if (sw_update && updateType > 0) {
      //console.log('tableUpdate genera_tabla', dat_act)
      await this.genera_tabla(dat_act, alias)
      //console.log('tableUpdate genera_tabla Now,Last', await this.localAlaSql('select * from Now.' + alias)
      //  , await this.localAlaSql('select * from Now.' + alias))

    }
    */
    // Regenera recnoVal en caso de insercion de datos y solo sea un registro

    return sw_val
  } //

  /// /////////////  Vfp append blank /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  /// ////////////////////////////////////////////
  appendBlank = async (alias: any, m?: {}) => {
    const ThisForm = this.Form
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1] // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      MessageBox(
        'No existe la vista SQL ' + alias, 16,
        'Error SQL '
      )
    }

    let recno = 0
    // Obtenemos el valor del siguiente recno
    const res = await this.localAlaSql('USE Now; select max(recno)+1 as recno from ' + alias)

    if (res[1] && res[1][0].recno > 0) { // si hay registro
      recno = res[1][0].recno
    } else { recno = 1 } // Si es el primer registro
    // Obtiene valores default para insertar


    const valores = { recno }
    const vis_act = this.View[alias].tablaSql

    for (const campo in this.View[vis_act].val_def) {
      // const val_eval="`"+this.View[alias].val_def[valor]+"`"
      const val_eval = this.View[vis_act].val_def[campo]
      let val_defa = null
      try {
        val_defa = eval(val_eval)
      } catch (error) {
        console.error(error)

        return false
      }
      valores[campo] = val_defa
    }
    if (!valores.timestamp) { valores.timestamp = 0 }

    // const val_defa = eval(this.View[alias].val_def)
    console.log('DataBAse appendBlank alias ', alias, valores)

    await this.localAlaSql('USE Now;\
    INSERT INTO Now.' + alias + ' VALUES ?', [valores])
    await this.localAlaSql('USE Last;\
    INSERT INTO Last.' + alias + ' SELECT * FROM Now.' + alias + ' WHERE recno=?', recno)

    const ult_ele = this.View[alias].recnoVal.length - 1

    let id = 0
    if (ult_ele >= 0) { id = this.View[alias].recnoVal[ult_ele].id + 1 }

    this.View[alias].recno = recno
    this.View[alias].recnoVal.push({ recno, id }) // insertamos en el arreglo para llenar el grid
    this.View[alias].recCount = this.View[alias].recCount + 1
    this.View[alias].row = this.View[alias].recnoVal.length - 1 // asignamos nuevo row
    console.log('DataBAse appendBlank RecnoVal=====>', alias, this.View[alias].recnoVal)

    return valores

    /* locaDb
    await this.insertLocalDb(alias, valores); // Insertamos los valores blancos en LocalDb
    */
  }

  /// ///////////// delete Sql /////////////////////
  // alias  : Nombre de la vista a utilizar
  // row : Renglon donde se encuentra el registro a borrar
  /// ////////////////////////////////////////////
  deleteRow = async (key_pri: number, alias: any) => {
    if (key_pri <= 0) { return }
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1] // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      MessageBox(
        'No existe la vista SQL ' + alias, 16, 'SQL Error')
      return false
    }
    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'DELETE',
      // tok_aut: this.tok_aut,
      nom_vis: this.View[alias].tablaSql, // tabla en servidor SQL
      where: {}
    }

    const condicion = {} // Generamos la condicion
    dat_vis.where = { key_pri } // obtenemos el key_pri a borrar
    try {
      //  console.log('deleteRow borra en la base de datos row data recno,data ===>', dat_vis)
      const response = await this.axiosCall(dat_vis)
      if (response == null)
        return null

      const respuesta = response.data

    } catch (error) {
      console.error('Error en delete', error)
      return null
    }
    const recno = await this.localAlaSql('USE Last;\
    select recno  from Last.' + alias + ' where key_pri=?', key_pri)

    //  borra el LolcaDb
    await this.localAlaSql(`USE Last;\
        delete from Last.${alias} where key_pri=${key_pri}`)
    await this.localAlaSql(`USE Now;\
        delete from Now.${alias} where key_pri=${key_pri}`)

    // console.log('deleteRow Last ===>', key_pri, recno, await this.localAlaSql('USE Last;\
    // select key_pri,recno from '+ alias) )

    //  borra en el arreglo de recno
    // delete this.View[alias].recnoVal[row];
    return true
  }

  /// /////////////  Vfp delete /////////////////////
  // alias  : Nombre de la vista a utilizar
  // row : Renglon donde se encuentra el registro a borrar
  /// ////////////////////////////////////////////
  delete = async (recno: number, alias: string, SqlUpdate: boolean) => {
    if (!SqlUpdate) { SqlUpdate = false }

    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1] // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      MessageBox(
        'No existe la vista SQL ' + alias, 16, 'SQL Error')
      return false
    }

    if (!recno) {
      recno = this.View[alias].recnoVal[this.View[alias].row].recno
    }

    if (recno <= 0) { return null } // no hay row por borrar

    await this.localAlaSql(' delete from Now.' + alias + ` where recno=${recno}`)

    console.log(' delete from Now.' + alias + ` where recno=${recno}`)

    // Actualizacion inmediata en SQLSERVER
    if (SqlUpdate) {
      const data = await this.localAlaSql('USE Last;\
    select key_pri from Last.' + alias + ' where recno=?', recno)
      const key_pri = data[1][0].key_pri
      await this.localAlaSql(' delete from Now.' + alias + ' where recno=?', recno)

      // utiliza la tabla de actualizacionde SQL
      // console.log('delete alias DeleteRow',key_pri, alias)
      if (key_pri > 0) // si existe en el SQLSERVER
      {
        if (!await this.deleteRow(key_pri, alias)) {
          return false
        }
      }
    }

    const recnoArray = await this.localAlaSql(' select recno from Now.' + alias + '  order by recno')

    // por reactividad borramos de uno por uno
    while (this.View[alias].recnoVal.length > 0) {
      this.View[alias].recnoVal.pop()
    }

    const recnoVal = []
    let row = -1
    for (let i = 0; i < recnoArray.length; i++) {
      if (recno > recnoArray[i].recno) {
        row = i
      }
      recnoVal[i] = { recno: recnoArray[i].recno, id: i }
    }
    this.View[alias].recnoVal = recnoVal
    recno = 0
    if (row >= 0) { recno = recnoArray[row].recno }

    // console.log('Despues de borrar recnoval ',this.View[alias].recnoVal)
    // console.log('delete despues slice recno reg recnoVal===>',recno,this.View[alias].recnoVal)
    // console.log('Despues de borrar alaSql',this.localAlaSql('select recno,key_pri from '+ alias ))
    if (recno > 0) { return await this.goto(recno) } // se va a leer registro
    return []
  }

  /// /////////////  Vfp table insert /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  /// ////////////////////////////////////////////
  // Aqui me quede
  insert = async (alias: string, m: Record<string, never>) => {
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1] // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      MessageBox('No existe la vista SQL ' + alias, 16, 'SQL Error')
      return
    }
    // Leemos los datos a actualizar
    const recno = this.View[alias].recno
    const nom_vis = this.View[alias].tabla

    /*
    const valores = await newLocalDb.select({
      from: alias,
      where: {
        recno: this.View[alias].recno
      }
    });
   */

    const valores = await this.localAlaSql('USE Now;\
            select from ' + alias + ' where renco=?', recno)

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'INSERT',
      // tok_aut: this.tok_aut,
      nom_vis,
      where: '',
      dat_act: valores
    }

    try {
      const response = await this.axiosCall(dat_vis)
      if (response == null)
        return

      /*
            const response = await axios.post(this.url + "sql", dat_vis, {
              headers: { "Content-type": "application/json" },
            });
      */
      const respuesta = response.data

      /*
      this.insertLocalDb(alias, respuesta);
      */
      await this.localAlaSql('USE Now;\
              UPDATE ' + alias + '\
              set  key_pri=?,set timestamp=? where recno=? ', respuesta.key_pri, respuesta.timestamp, recno)

      await this.localAlaSql('USE Last;\
              DELETE Last.' + alias + ' where recno=?;\
              INSERT INTO Last.' + alias + ' SELECT * from Now.' + alias + ' where recno=?', recno, recno)

      return
    } catch (error) {
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )
      return false
    }
  }

  /// /////////////  sqlexec /////////////////////
  // query  : Query a ejecutar
  /// ///////////////////////////////////////////
  // Aqui me quede
  execute = async (query: string, alias?: string, tip_res?: string) => {
    if (!alias) {
      alias = 'sqlresult'
    }

    if (!tip_res) {
      tip_res = 'T'
    }

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'SQLEXEC',
      query
    }

    try {
      const respuesta = await this.axiosCall(dat_vis)
      if (respuesta == null)
        return null

      console.log('execute alias', alias, this.View)
      if (alias.toUpperCase() == 'MEMVAR') {
        return respuesta
      }

      if (alias.toUpperCase() == 'JSON') {
        const json = JSON.parse(respuesta);;
        return json
      }

      this.View[alias] = {} // Generamos el nuevo alias
      this.View[alias].recnoVal = [] // Generamos el arreglo de recnoVal
      this.View[alias].data = {} // asignamos el valor del ultimo registro
      this.View[alias].recCount = 0 // Total de registros de la vista
      this.View[alias].eof = false // Fin de archivo
      this.View[alias].bof = false // Principio de archivo
      this.View[alias].row = -1 // Renglon posicionado el registro

      // console.log('SQLExec =====>',respuesta)
      // Generamos la extructura de la respuesta
      if (respuesta.length == 0) { return false }

      // generamos registro recno y arreglo recnoVal
      const recnoVal = []
      for (let i = 0; i < respuesta.length; i++) {
        respuesta[i].recno = i + 1
        recnoVal[i] = { recno: i + 1, id: i }
      }

      //  console.log('Ejecutara ala con  :', respuesta)

      await this.localAlaSql(' USE Now ; DROP TABLE IF EXISTS ' + alias + '; ')

      await this.select(alias)

      await this.localAlaSql(' CREATE TABLE ' + alias + ' ; \
      SELECT * INTO ' + alias + '  FROM ?', [respuesta])

      /*
            let resp_sql = {}
            //const resp_sql = await
            alasql.promise(' CREATE TABLE ' + alias + ' ; \
                SELECT * INTO '+ alias + '  FROM ?', [respuesta]).
              then(function () {
                alasql.promise('USE Now ; SELECT * FROM ' + alias)
                  .then(function (data) {
                    resp_sql = data

                  })
                  .catch(function (error) {
                    console.error('Execute SELECT * FROM ' + alias, error)
                  })
              })
       */

      /*
    const est_sql={}  // estructura de la respuesta
    for (const campo in respuesta[0])
        {
          const tip_dat=respuesta[0].campo.typeof

          let dataType: any; // asignamos el tipo de datos a newLocalDb
          switch (tip_dat) {
            case "C":
              dataType = DATA_TYPE.String;
              break;
            case "I":
              dataType = DATA_TYPE.Number;
              break;
            case "N":
              dataType = DATA_TYPE.Number;
              break;
            case "D":
              // 23/Ags/2021   dataType = DATA_TYPE.DateTime;
              dataType = DATA_TYPE.String;
              break;
            case "L":
              dataType = DATA_TYPE.Boolean;
              break;
            default:
              dataType = DATA_TYPE.String;
          }
        } */
      //    console.log('Axios sqlexec',response[0][0])
      //    const respuesta = response.data;

      //* ******************** */
      if (respuesta.length > 0) { // si hay datos
        // Asignamos los valores a la vista
        //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
        this.View[alias].recno = respuesta.length // asignamos el ultimo numero registro de trabajo
        this.View[alias].recCount = respuesta.length // registros totales
        //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL
        this.View[alias].data = respuesta[respuesta.length - 1] // asignamos el valor del ultimo registro
        this.View[alias].recnoVal = [...recnoVal]
        // console.log('exec ',this.View[alias])
      }

      //* ******************* */

      // console.log('Tabla creada en Now resp ',resp_sql)
      console.log('Tabla creada en Now  ', await this.localAlaSql('USE Now ; SELECT * FROM ' + alias))

      return respuesta
    } catch (error) {
      console.error('Error SQL', error)
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      console.error('Error SQL', error)
      /*      MessageBox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return false
    }
  }
  /// ////////////////////////////////////////////
  //  Genera tablas en servidor de SQL
  /// ///////////////////////////////////////////

  genTabla = async (tabla: string) => {
    if (!tabla) {
      return
    }
    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'GENTABLA',
      nom_tab: tabla
    }

    try {
      const respuesta = await this.axiosCall(dat_vis)
      if (respuesta == null)
        return null
      if (respuesta.length == 0) {
        MessageBox('Se genero la tabla ' + tabla)
        return true
      }
    } catch (error) {
      console.error('Error SQL', error)
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      console.error('Error SQL', error)
      return false
    }
  }

  /// ////////////////////////////////////////////
  //  Genera indices en servidor de SQL
  /// ///////////////////////////////////////////

  genIndices = async (tabla: string) => {
    if (!tabla) {
      return
    }

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'GENINDICES',
      nom_tab: tabla
    }

    try {
      const respuesta = await this.axiosCall(dat_vis)
      if (respuesta == null)
        return null
      if (respuesta.length == 0) {
        MessageBox('Se genero el indice/indices de la tabla ' + tabla)
        return true
      }
    } catch (error) {
      console.error('Error SQL', error)
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      return false
    }
  }

  /// ////////////////////////////////////////////
  //  Genera vistas en servidor de SQL
  /// ///////////////////////////////////////////

  genVistasSql = async (tabla: string) => {
    if (!tabla) {
      return
    }

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'GENVISTASSQL',
      nom_tab: tabla
    }

    try {
      const respuesta = await this.axiosCall(dat_vis)
      if (respuesta == null) return
      if (respuesta.length == 0) {
        MessageBox('Se genero las vistas remotas SQL  de tabla ' + tabla)
        return true
      }
    } catch (error) {
      console.error('Error SQL', error)
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      console.error('Error SQL', error)
      return false
    }
  }

  /// ////////////////////////////////////////////
  //  Genera MODEL en el backEnd
  /// ///////////////////////////////////////////

  genModel = async (tabla: string) => {
    if (!tabla) {
      return
    }
    
    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'GENMODEL',
      nom_tab: tabla
    }
    
    if (tabla=='ALL') {
      dat_vis.tip_llamada= 'GENMODELS'
     }
    
    try {
      const respuesta = await this.axiosCall(dat_vis)
      if (respuesta == null) return
      if (respuesta.length == 0 && dat_vis.tip_llamada== 'GENMODEL') 
        MessageBox('Se genero el MODEL para la tabla ' + tabla + respuesta[0])
      else
        MessageBox('Se generaron todos los sequelize MODELS' + tabla + respuesta[0])

        return true
      
    } catch (error) {
      console.error('Error SQL', error)
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      console.error('Error SQL', error)
      return false
    }
  }

  // ---  oJo        Checar si se necesita  ----------
  /// /////////////  Vfp select() /////////////////////
  // Vista de captura de datos
  //
  /// //////////////////////////////////////////////
  vista_captura = async (m: any, nom_vis: string, alias?: string) => {
    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = nom_vis
    }
    let query = " SELECT fil_vis FROM man_comevis WHERE nom_vis= '" + nom_vis + "'"

    let exp_where = ''
    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'SQLEXEC',
      query

    }

    const replacements: any = {}
    // obtenemos el filtro de la vista
    try {
      const data = await this.axiosCall(dat_vis)
      if (data == null) return null
      // console.log('Respuesta axios data===>', data)
      const respuesta = data[0]
      // console.log('Axios gen_vista data[]==>data,m ',data,m)

      let nom_cam = ''
      let con_vis = '' // generamos la condicion de la vista
      let exp_vis = data[0].fil_vis.trim().toLowerCase()
      let pos = exp_vis.indexOf(',') // Posicion de la primera coma

      while (pos > 0) { // Recorremos todas las variables del indice
        nom_cam = exp_vis.substr(0, pos)
        replacements[nom_cam] = m[nom_cam]
        con_vis = con_vis + nom_cam + ' =: ' + nom_cam

        exp_vis = exp_vis.substr(pos + 1)
        pos = exp_vis.indexOf(',')
        if (pos > 0) { con_vis = con_vis + ' AND ' }
      }
      if (exp_vis.length > 0) {
        replacements[exp_vis] = m[exp_vis]

        con_vis = ' WHERE ' + con_vis + exp_vis + '=:' + exp_vis
      }

      exp_where = con_vis // genera la expresion where
    } catch (error) {
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      console.error('Error SQL', error)
      /*      MessageBox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return false
    }

    query = ' SELECT * FROM ' + nom_vis + exp_where
    const dat_sel = {
      id_con: this.id_con,
      tip_llamada: 'SQLEXEC',
      query,
      opciones: { replacements }
    }
    // console.log('Axios ==>' + nom_vis, exp_where, replacements)
    try {
      const data = await this.axiosCall(dat_sel)
      if (data == null) return null
      console.log('Axios genera vistas===>>>', data)
      // Aumentamos a la rspuesta el regitro recno
      return await this.genera_tabla(data, alias)
    } catch (error) {
      console.error('Error SQL', error)
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      /*      MessageBox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
    }
  }

  /// /////////////  Vfp select() /////////////////////
  // are_sel : area seleccionada
  /// //////////////////////////////////////////////
  select = async (are_sel: unknown) => {
    // this.Form['dic_dat']['prop']['Status'] = 'F'

    // console.log('Select 0',this.Form)
    if (are_sel == null) {
      return this.num_are
    }

    if (typeof are_sel === 'number') {
      this.num_are = are_sel
    } else {
      const alias: any = are_sel
      this.num_are = this.are_tra.indexOf(alias) + 1 // busca el numero de alias
      // if (this.num_are == -1) this.num_are = 0
      // console.log('Db select num_are ====>>', are_sel, this.num_are)
    }
    /* revisar
        this.Form['dic_dat']['prop']['Status'] = 'G'
        this.Form['dic_dat']['prop']['Status'] = 'H'
        this.Form['dic_dat']['prop']['Status'] = 'I'
    */
    return this.num_are
  }

  /// //////////////////////////////////////////////////
  // genera la tabla en alasql
  // data : json con la estructura de la tabla
  // alias : nombre que tendra la tabla
  // sw_ini : si es useNodata
  // obs : Borrar si no se utiliza
  /// //////////////////////////////////////////////////
  async genera_vista(data: {}, alias: string, sw_ini?: boolean) {
    this.num_are = this.are_tra.indexOf(alias) + 1 // regresa un -1 si no hay elemento

    if (this.num_are == 0) { // si es una area de trabajo nueva busca si ya existe el alias
      this.are_tra.push(alias) // Se incremente en uno y se asigna que alias tiene
    } else { // Si existe la tabla borra los regisros
      // this.localAlaSql('USE Now ; ')
      await this.localAlaSql('delete from Now.' + alias + '; ')
      // this.localAlaSql('USE Last ; ')
      await this.localAlaSql('delete from  Last.' + alias + '; ')
      return
    }
    // Si es una vista nueva
    this.num_are = this.are_tra.indexOf(alias) + 1 // asigna el numero de area de trabajo
    // Obtenemos la estructura de la vista desde la base de datos

    /// ///   Estructura
    const dat_est = {
      id_con: this.id_con,
      tip_llamada: 'GETDEF',
      query: alias
    }
    //    console.log('Axios ==>' + nom_vis, exp_where, replacements)
    try {
      const data = await this.axiosCall(dat_est)
      if (data == null) return
      // console.log('Estructura vistas===>>', data)
    } catch (error) {
      MessageBox(
        error.response.status.toString() + ' ' + error.response.statusText, 16,
        'Error SQL '
      )

      /*      MessageBox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return
    }

    // Inicializamos la vista
    if (!this.View[alias]) {
      this.View[alias] = {} // Generamos el nuevo alias
      this.View[alias].recnoVal = [] // Generamos el arreglo de recnoVal

      if (sw_ini) {
        // agregamos todos los componente de uno por uno para no romper la reactividad
        for (const comp in data) {
          this.View[alias][comp] = data[comp] // asignamos su estructura si es de una vista actualizable
        }
      }
    }
    // por reactividad borramos de uno por uno
    while (this.View[alias].recnoVal.length > 0) {
      this.View[alias].recnoVal.pop()
    }

    //    delete this.View[alias]['valores']  // borramos el registro de valores
    this.View[alias].recno = 0 // asignamos el ultimo numero registro de trabajo
    this.View[alias].recCount = 0 // registros totales
    this.View[alias].tablaSql = alias // tabla en servidor SQL



    if (!sw_ini || data.length > 0) { // si hay datos
      // Generamos el campo recno
      const recnoVal = []
      for (let i = 0; i < data.length; i++) {
        data[i].recno = i + 1
        //        recnoVal[i] = i + 1
        recnoVal[i] = { recno: i + 1, id: i }
      }

      // Asignamos los valores a la vista

      //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
      this.View[alias].recno = data.length // asignamos el ultimo numero registro de trabajo
      this.View[alias].recCount = data.length // registros totales
      this.View[alias].tablaSql = alias // tabla en servidor SQL
      this.View[alias].data = data[data.length - 1] // asignamos el valor del ultimo registro

      // this.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion

      // Bora las tablas
      await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + ';')
      await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + ';')

      await this.select(alias)

      alasql.promise('USE Now; CREATE TABLE ' + alias + ' ; \
      SELECT * INTO Now.' + alias + '  FROM ?', [data])
        .then(function () { // Generara la tabla en Last (old)
          alasql.promise('USE Last; CREATE TABLE ' + alias + ' ; \
          SELECT * INTO ' + alias + ' FROM Now.' + alias)

            .catch(function (error) {
              console.error('Error al generar Vis_captura' + alias, error)
            })
        })

      // revisar despues si al insertar los datos el recno queda como lo habiamos generado
      // o seleccionar los recno para llenar el recnoval
      // recnoVal=this.localAlaSql(SELECT recno FROM Now.' + alias)

      this.View[alias].recnoVal = [...recnoVal] // utilizamos el spread Operator
      // console.log('RecnoVal===>', this.View[alias].recnoVa)
    } else { this.View[alias].data = {} } // no hay datos
  }

  /// //////////////////////////////////////////////////
  // genera la tabla en alasql
  // respuesta : json con los renglones para generar la tabla
  // alias : nombre que tendra la tabla
  // sw_ini : si es useNodata
  /// //////////////////////////////////////////////////
  
  genera_tabla= async (respuesta: any, alias: string, sw_ini?: boolean) =>{
    alias = alias.trim()
    this.num_are = this.are_tra.indexOf(alias) + 1 // regresa un -1 si no hay elemento

    if (!this.View[alias]) { sw_ini = true } // No hay definicion de vista

    if (this.num_are == 0) { // si es una area de trabajo nueva
      this.are_tra.push(alias)
      sw_ini = true
    } else { // Si existe la tabla borra los registros
      // this.localAlaSql('USE Now ; ')
      await this.localAlaSql('delete from Now.' + alias)
      // this.localAlaSql('USE Last ; ')
      await this.localAlaSql('delete from  Last.' + alias)
    }

    this.num_are = this.are_tra.indexOf(alias) + 1 // asigna el numero de area de trabajo

    // Inicializamos la vista

    if (sw_ini) {
      this.View[alias] = {} // Generamos el nuevo alias
      this.View[alias].recnoVal = [] // Generamos el arreglo de recnoVal
      this.View[alias].tip_obj = respuesta.tip_obj // MODEL O VIEW
      this.View[alias].tablaSql = respuesta.nom_tab // nombre de tabla en servidor SQL
      this.View[alias].exp_indice = respuesta.exp_indice
      this.View[alias].exp_where = respuesta.exp_where == null ? ' ' : respuesta.exp_where
      this.View[alias].order = respuesta.ord_vis // orden de la vista

      this.View[alias].data = {} // asignamos el valor del ultimo registro
      this.View[alias].val_def = { recno: 'recno' } // valores default
      this.View[alias].recCount = 0 // Total de registros de la vista
      this.View[alias].eof = false // Fin de archivo
      this.View[alias].bof = false // Principio de archivo
      this.View[alias].row = -1 // Renglon posicionado el registro


      // agregamos toda la definicion de la tabla

      if (!respuesta.est_tabla) { // Si no hay estructura de la tabla
        /// ///   Obtiene la Estructura
        const dat_est = {
          id_con: this.id_con,
          tip_llamada: 'GETDEF',
          query: alias
        }
        //    console.log('Axios ==>' + nom_vis, exp_where, replacements)
        try {
          const estructura = await this.axiosCall(dat_est)
          if (estructura == null) return null
          // console.log('Data vista===>>', respuesta)

          respuesta.est_tabla = estructura
          // console.log('Estructura vista===>>', respuesta)
        } catch (error) {
          console.error('Error SQL', error)
          MessageBox(
            error.response.status.toString() + ' ' + error.response.statusText, 16,
            'Error SQL '
          )

          /*      MessageBox.alert(
                  error.response.status.toString() + " " + error,
                  "Error SQL ",
                  "error"
                );
           */
          return null
        }

        /// /////////////////////////////
      }
      this.View[alias].est_tabla = respuesta.est_tabla  // estructura de la tabla

      // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
      let des_tab = ' CREATE TABLE ' + alias + ' (recno INT PRIMARY KEY'

      for (const nom_ele in respuesta.est_tabla) { // genera la descripcion de la tabla para generarla en alasql
        des_tab = des_tab + ',' + nom_ele + ' ' + respuesta.est_tabla[nom_ele].tip_cam
        const val_def = respuesta.est_tabla[nom_ele].val_def
        // const val_def=respuesta.est_tabla[nom_ele].replace('undefined','null')

        this.View[alias].val_def[nom_ele] = val_def

        //  this.View[alias]["val_def"] = val_def.replace('undefined','null')    ; // valores default

        //        val_def = val_def + nom_ele + ':' + respuesta.est_tabla[nom_ele].val_def + ','

        /*  Indexed Local Data base
        this.newTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
        this.oldTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
        */
      }
      // console.log('Estructura View respuesta===>', alias, respuesta)
      // console.log('Estructura View ===>', alias, this.View[alias].val_def)

      des_tab = des_tab + ')'
      // console.log('Valores default=====>',alias,this.View[alias].val_def)

      // console.log('ALASQL Estructura ===>',des_tab)
      // Creamos la tablas
      await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + '; ')
      await this.localAlaSql(des_tab)

      await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + '; ')
      await this.localAlaSql(des_tab)
    }

    // por reactividad borramos de uno por uno
    while (this.View[alias].recnoVal.length > 0) {
      this.View[alias].recnoVal.pop()
    }

    //    delete this.View[alias]['valores']  // borramos el registro de valores
    this.View[alias].recno = 0 // asignamos el ultimo numero registro de trabajo
    this.View[alias].recCount = 0 // registros totales

    /*    this.View[alias]["tablaSql"] = respuesta.nom_tab; // nombre de tabla en servidor SQL
        this.View[alias]["exp_indice"] =respuesta.exp_indice
        this.View[alias]["exp_where"] =respuesta.exp_where
        this.View[alias]["tip_obj"] = respuesta.tip_obj
    */
    // console.log('Genera_tabla final==>',this.View[alias],alias)
    if (sw_ini) {
      console.log('genera_tabla View creada', alias, this.View[alias])
      return true
    }

    // console.log('Genera_tabla datos==>', respuesta)

    if (respuesta.length > 0) { // si hay datos
      // Generamos el campo recno
      const recnoVal = []
      for (let i = 0; i < respuesta.length; i++) {
        respuesta[i].recno = i + 1
        //        recnoVal[i] = i + 1
        recnoVal[i] = { recno: i + 1, id: i }
      }

      // Asignamos los valores a la vista

      //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
      this.View[alias].recno = respuesta.length // asignamos el ultimo numero registro de trabajo
      this.View[alias].recCount = respuesta.length // registros totales
      //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL
      this.View[alias].data = respuesta[respuesta.length - 1] // asignamos el valor del ultimo registro

      // Borra las tablas

      await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + ';')
      await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + ';')

      await this.select(alias)

      try {
        await this.localAlaSql('USE Now; CREATE TABLE Now.' + alias + ' ; \
          SELECT * INTO Now.' + alias + '  FROM ?', [respuesta])
        await this.localAlaSql('USE Last; CREATE TABLE Last.' + alias + ' ; \
          SELECT * INTO Last.' + alias + '  FROM ?', [respuesta])
      } catch (error) {
        console.error('Error al generar Vis_captura' + alias, error)
        return null
      }

      this.View[alias].recnoVal = [...recnoVal] // utilizamos el spread Operator

      //console.log('View leida respuesta ===>', alias, respuesta)

      
      // si  no hay asignacion a valores de componentes

      if (!this.View[alias].componente) { return respuesta }

      const componente = this.View[alias].componente
      // revisar no entiendo
      for (const comp in componente) { // recorre componente por componente
        for (let i = 0; i < comp.length; i++) {
          componente[comp][i].value = recnoVal[comp] // asignamos el valor a c/componente del form
        }
      }

      return respuesta
    } else { this.View[alias].data = {} } // no hay datos
  }

  /// /////////////  Vfp recCount() /////////////////////
  // alias    : Alias
  /// ////////////////////////////////////////////
  async recCount(alias?: string) {
    // const vis_act = obj_vis.value;
    //console.log('Reccount alias ===', alias)

    if (!alias) {
      // alias = this.are_tra[-1]; // buscamos a cual alias pertenece
      alias = this.are_tra[this.num_are - 1]
    }

    if (!this.View[alias]) {
      console.warn('recCount() No existe el alias', alias)
      return 0
    }

    //    if (!alias) MessageBox('No existe el alias',alias)
    //         return 0

    return this.View[alias].recCount
  }

  /// /////////////  Vfp reccno() /////////////////////
  // alias    : Alias
  /// ////////////////////////////////////////////
  async recno(alias: string) {
    // const vis_act = obj_vis.value;

    if (alias == null) {
      alias = this.are_tra[this.num_are - 1] // buscamos a cual alias pertenece
    }
    return this.View[alias].recno
  }

  /// /////////////////////////////  local Db ///////////////////////////////////

  // Borra  LocalDb
  borraLocalDb = async (db_name: string) => {
    const req = await indexedDB.deleteDatabase(db_name)
    req.onsuccess = function () {
      console.log('Deleted database successfully ', db_name)
    }
    req.onerror = function () {
      console.log("Couldn't delete database ", db_name)
    }
    req.onblocked = function () {
      console.log("Couldn't delete database due to the operation being blocked ", db_name)
    }

    /*
        alasql.promise("DROP INDEXEDDB DATABASE IF  EXISTS 'New' ;").
                          then(()=>{
                            this.localAlaSql(" DROP INDEXEDDB DATABASE IF  EXISTS 'Old'")

                          }).
                          then(()=>{
                            this.localAlaSql("DROP INDEXEDDB DATABASE IF  EXISTS Temp_ ;")

                          }).
                          then(()=>{
                            this.localAlaSql("CREATE INDEXEDDB DATABASE Temp_ ;")

                            console.log('Creo Temp_')
                          }).
                          catch((error)=>{
                            console.log('Error al borrar Base de datos Local')

                          })
    */

    //    this.localAlaSql("CREATE INDEXEDDB DATABASE IF NOT EXISTS temp_;\
    //           ATTACH INDEXEDDB DATABASE temp_")

    //       ATTACH INDEXEDDB DATABASE 'NEW';")

    // this.localAlaSql("ATTACH INDEXEDDB DATABASE 'NEW';")

    //        ATTACH INDEXEDDB DATABASE 'Old'; \
    //        ATTACH INDEXEDDB DATABASE '_Temp';")

    /*
const newDb = {
name: "New",
tables: []
};
const oldDb = {
name: "Old",
tables: []
};
const tempDb = {
name: "tempDb",
tables: []
};

try {

const conn = new Connection();
conn.addPlugin(workerInjector);
await conn.initDb(newDb);
await conn.dropDb();  // borra toda la base de datos
await conn.terminate();

const old = new Connection();
old.addPlugin(workerInjector);
await old.initDb(oldDb);
await old.dropDb(); // borra toda la base de datos
await old.terminate();

const temp = new Connection();
old.addPlugin(workerInjector);
await old.initDb(tempDb);
await old.dropDb(); // borra toda la base de datos
await old.terminate();

}
catch (error) {
MessageBox.alert(
error,
"Error clear localDb ",
"error"
);
return false;
}

*/
  }

  // Crea tablas en  LocalDb
  /*
    openLocalDb = async () => {
      // console.log('ALASQL===>',this.localAlaSql('select * from lla1_tab'))

      this.newTables['recno'] =
      {
        name: 'recno',
        columns: {
          recno: {
            primaryKey: true,
            autoIncrement: true,
          },
        },
      };

      const newDb = {
        name: "New",
        tables: []
      };
      const oldDb = {
        name: "Old",
        tables: []
      };

      const recno_values = {};

      try {

        for (const tabla in this.oldTables)  // anexamos todas las tablas
        {

          // aumenta la columna con el nombre de la vista en la tabla recno
          newDb.tables.push(this.newTables[tabla]);
          oldDb.tables.push(this.oldTables[tabla]);

          this.newTables['recno'].columns[tabla] = { notNull: false, dataType: DATA_TYPE.Number }
          recno_values[tabla] = null;

        }
        const tabla: any = 'recno';
        newDb.tables.push(this.newTables[tabla]);
        console.log('Tablas locales ====>>>', newDb)

        await newLocalDb.initDb(newDb);
        await oldLocalDb.initDb(oldDb);

        // insertamos los valores de recno de cada tabla
        await newLocalDb.insert({
          into: "recno",
          values: [recno_values],
        });

        //

        // this.localAlaSql('CREATE INDEXEDDB DATABASE IF NOT EXISTS TEMPO ;\
        //         ATTACH INDEXEDDB DATABASE new;\
        //         ATTACH INDEXEDDB DATABASE old')

        /////////////////////////////

      }
      catch (error) {
        MessageBox.alert(
          error,
          "Error OpenlocalDb ",
          "error"
        );
        return false;
      }
    }

    ////////////////////////////////////////////////////
    // Graba valor de la tabla local
    /////////////////////////////////////////
    //  Record<string, unknown>
    async updateLocalDb(alias: string, datos: Record<string, unknown>) {
      // actualizamos el timestamp
      const timestamp = datos.timestamp;
      const recno: any = datos.recno;
      //console.log('updateLocalDb',alias,timestamp,recno);
      //newLocalDb.transaction()
      const resultado = await newLocalDb.update(
        {
          in: alias,
          set: { timestamp: timestamp },
          where: {
            recno: recno
          }
        })

      if (resultado == 1) { // si se pudo actualizar leemos datos actuales
        const updated = await newLocalDb.select({
          from: alias,
          where: {
            recno: recno
          }
        })
        // actualizamos el registro old
        await oldLocalDb.insert({
          into: alias,
          return: true,
          upsert: true,
          values: updated,
        }).then((resultado) => {
          if (resultado) {
            return
          }
          else {
            alert('No se pudo actualizar oldLocalDb');
            return false
          }

        })
      }

    }
    ////////////////////////////////////////////////////
    // Incerta  valores en la tabla local
    /////////////////////////////////////////
    //  Record<string, unknown>
    async insertLocalDb(alias: string, datos: Record<string, unknown>) {
      //  if (datos.recno && datos.recno>0) {
      const ThisForm = this.Form    //.ctx.ThisForm;
      if (datos.length == 0) return true
      const valores = {};

      // Recorremos todos los registros obtenidos desde la bas de datos y los transforma
      for (const campo in datos) {
        let valor: any = datos[campo];
        if (campo == "recno") valores['recno'] = +valor; // si es el campo recno no busca en la estructura de la tabla
        if (campo != "recno" && campo != "createdAt" && campo != "updatedAt") {
          //console.log('UpdateLocalDb campo',campo);

          if (
            this.View[alias].est_tabla[campo].tip_cam == "D" &&
            valor > "1900"
          ) {
            // Si el campo es tipo fecha, le quitamos el tiempo
            valor = valor.substring(0, 10);
          }
          //console.log('Campo==>',campo,this.View[alias].est_tabla[campo].tip_cam,respuesta[i][campo])
          //let val_date= new Date()
          switch (this.View[alias].est_tabla[campo].tip_cam) {
            case "NUMERIC":
              valores[campo] = +valor; // generamos valores para localDb
              break;
            case "INT":
              valores[campo] = +valor; // generamos valores para localDb
              break;
            case "DATE":
              if (valor) {
                if (valor <= '1900-01-01T9') valor = "1900-01-01T00:00:00.000";
                // 23/Ags/2021 cambiamos a guardar en string     valores[campo] = new Date(valor);
                valores[campo] = valor;
                // console.log('Valor Fecha', campo, valor, 'Valor=' + valores[campo]);
              } else
                valores[campo] = valor;
              break;
              //valores[campo] = moment(valores[campo]).format('YYYY-MM-DD hh:mm') ;//new Date(valor); // generamos valores para localDb
              break;
            case "TIME":
              if (valor) {
                if (valor <= '1900-01-01T9') valor = "1900-01-01T00:00:00.000";
                // 23/Ags/2021 cambiamos a guardar en string     valores[campo] = new Date(valor);
                valores[campo] = valor;
                //  console.log('Valor Fecha', campo, valor, valores[campo]);
              } else
                valores[campo] = valor;
              break;

            default:
              valores[campo] = valor; // generamos valores para localDb
          }
        }
      }
      // console.log('UpdateLocalDb', valores);

      try {
        const updated: any = await newLocalDb.insert({
          into: alias,
          return: true,
          upsert: true,
          values: [valores]

        });

        //  console.log(' Incerto en New===>',updated);
        console.log('New ======>', updated);
        if (updated[0].recno && updated[0].recno > 0) {
          const updatedOld: any = await oldLocalDb.insert({
            into: alias,
            return: true,
            upsert: true,
            values: updated,

          });
          console.log('old======>', updatedOld);

          if (updatedOld[0].recno) {
            const recno = updatedOld[0].recno; //asignamos el nuevo recno

            this.View[alias].recno = recno; // actualizamos en la clase
            await newLocalDb.update({
              in: "recno",
              set: {
                [alias]: recno,
              },
            });

            const recCount = await newLocalDb.count({ from: alias }); // obtiene el numero de registros
            // console.log('Record Count=======>',recCount)
            this.View[alias].recCount = recCount;

          }
          else {
            this.View[alias].recno = null; //asignamos el nuevo recno
            this.View[alias].recCount = 0;

          }
        }

        // actualizamos los datos de la forma
        for (const campo in ThisForm) {
          if (ThisForm[campo].prop && ThisForm[campo].prop.ControlSource &&
            ThisForm[campo].prop.ControlSource > "     "
          ) {
            const ControlSource = ThisForm[campo].prop.ControlSource;
            //console.log(ControlSource)

            const pos = ControlSource.indexOf(".") + 1;
            if (pos > 1) {
              const nom_cam = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
              const nom_tab = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

              if (nom_tab == alias && ThisForm[campo].prop.Value != updated[0][nom_cam]) {

                ThisForm[campo].prop.Value = updated[0][nom_cam];

              }
            }
          }
        }

        return true;
      }
      catch (error) {
        MessageBox.alert(
          error,
          "Error update localDb ",
          "error"
        );
        return false;
      }

      return true;

    }

  */

  async axiosCall(dat_lla: Record<string, unknown>) {
    const ThisForm: any = this.Form

    if (!(this.id_con > ' ')) {
      MessageBox(
        'No hay conexion con la base de datos', 16,
        'Error SQL Open'
      )
      const router = useRouter()
      router.push('/Login')
      return

    }

    do {
      try {
        // console.log('Axios call llamada  ======>>>', dat_lla, this.url)

        const response = await axios.post(this.url + 'sql', dat_lla, {
          headers: { 'Content-type': 'application/json' }
        })
        const respuesta = response.data
        console.log('Axios call response  ======>>>', dat_lla, 'respuesta', respuesta)
        return respuesta
      } catch (error) {
        console.error('Axios call BacKEnd error', dat_lla, error.response.statusText)

        await MessageBox(error.response.statusText, 16, 'SQL Data Base Error ')

        // si no es un error de desconexion
        if (error.response.status.toString() != '401') {

          return null
        }

        ThisForm.prop.login = false
        session.updateId('')
      }
    } while (ThisForm.prop.login)
    window.close()
  }

  /// /////////////////////////////////////////////////
  // Instruccion sql base de datos local
  // db_name :Base de datos a utilizar
  // ins_sql : Instruccion SQL
  /// //////////////////////////////////////
  public async localSql(ins_sql: string, DataBase?: string) {
    if (!DataBase) { DataBase = 'Now' }

    // console.log('localSql===>>', DataBase.toLowerCase)

    if (DataBase.toUpperCase() == 'NEW' || DataBase.toUpperCase() == 'NOW') { DataBase = 'Now' }

    if (DataBase.toUpperCase() == 'OLD' || DataBase.toUpperCase() == 'LAST') { DataBase = 'Last' }

    try {
      ins_sql = 'USE ' + DataBase + ' ; ' + ins_sql
      // console.log('localSQL===>',ins_sql)
      const resultado = await this.localAlaSql(ins_sql)
      // console.log('Lectura SQL',resultado[1][0])
      return resultado[1]
    } catch (error) {
      console.error('localSql error==>', error)
    }
  }

  /// /////////////////////////////////////////////////
  // Instruccion sql base de datos local
  // db_name :Base de datos a utilizar
  // ins_sql : Instruccion SQL
  /// //////////////////////////////////////
  public async localAlaSql(ins_sql: string, datos?: any) {

    try {
      //console.log('DataBase localAlaSql=====>>', ins_sql)
      let resultado: []
      if (!datos)
        resultado = await alasql(ins_sql)
      else
        resultado = await alasql(ins_sql, datos)

      return resultado
    } catch (error) {

      console.error('localSql error==>', error)
      MessageBox(ins_sql + ' ' + error, 16,
        'Error Ala SQL ')

      return false
    }

  }


  /*
    ////////////////////////////////////////////////////
    // Instruccion sql base de datos local
    // db_name :Base de datos a utilizar
    // ins_sql : Instruccion SQL
    /////////////////////////////////////////
    public async localSql(ins_sql: string,db_name?: string) {
      if (!db_name) db_name='T'

      try {
        ins_sql = 'USE Now;' + ins_sql
        const resultado = this.localAlaSql(ins_sql)
        // console.log('Lectura SQL',resultado[1][0])
        return resultado[1]
      }
      catch (error) {
        console.log('localSql error==>', error)
      }
    }
  */
  public async selectInto(ins_sql: string, alias?: string, filename?: string) {
    // alias  : TXT(filename)
    //          CSV(filename,options)
    //          XLSX("restest280b.xlsx")
    try {
      await this.localAlaSql(' USE Now ; ')

      if (!alias) { alias = 'sqlresult' }

      alias = alias.toUpperCase()
      ins_sql = ins_sql.trim()

      let resultado = {}
      if (alias == 'TXT' || alias == 'CSV' || alias == 'TAB' || alias == 'TSV' || alias == 'XLSX' || alias == 'HTML' || alias) {
        alasql.promise(ins_sql + ' INTO ' + alias + '(' + filename + ')')
          .then(function (data) {
            resultado = data
            // console.log('Datos Guardados');
          }).catch(function (err) {
            console.error('select Into Error:', err)
          })
      } else {
        await this.localAlaSql('DROP TABLE IF EXISTS ' + alias + '; ')

        const resultado = await this.localAlaSql(ins_sql + ' INTO ' + alias)

        if (resultado.length) { // el resultado es un arreglo
          this.select(alias)
          await this.localAlaSql(' CREATE TABLE IF NOT EXISTS' + alias + ' ; \
        SELECT * INTO ' + alias + '  FROM ?', [resultado])
          const resp = await this.localAlaSql('select * from ' + alias)
          // console.log('localSql=>>', resp)
        }
      }
      return resultado
    } catch (error) {
      console.error('localSql error==>', error)
    }
  }

  //= ===============================

  /// /////////////////////////////////////////////////
  // Lee Value de la tabla local
  /// //////////////////////////////////////
  readCampo = async (ControlSource: string, recno: number, DataBase?: string) => {
    if (ControlSource == '') { return } // No  hay ControlSource

    if (!DataBase) { DataBase = 'Now' }

    if (DataBase.toUpperCase() == 'NEW' || DataBase.toUpperCase() == 'NOW') { DataBase = 'Now' }

    if (DataBase.toUpperCase() == 'OLD' || DataBase.toUpperCase() == 'LAST') { DataBase = 'Last' }

    const pos = ControlSource.indexOf('.') + 1
    if (pos == 1) { return } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim() // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim() // obtenemos el nombre de la vista (queda hasta el punto)
    // console.log('readCampo=', tabla, campo, recno)

    const data = await this.readValue(tabla, campo, recno, DataBase)
    // console.log('Read renglon ',data[0])

    //    return data[0][campo]
    return data[0]
  }

  /// /////////////////////////////////////////////////
  // Lee Valor de un campo
  /// //////////////////////////////////////
  readValue = async (tabla: string, campos: string, recno: number, DataBase: string) => {
    //console.log('readValue Select=====>', tabla, campos, recno)

    const data = await this.localAlaSql('USE ' + DataBase + ' ; SELECT ' + campos + ',key_pri  FROM ' + tabla + ' WHERE recno=? ;', recno)

    if (data.length > 1) {
      for (const campo in data[1][0]) {
        if (campo != 'key_pri' && typeof data[1][0][campo] === 'string') { data[1][0][campo] = data[1][0][campo].trim() }
      }

      return data[1] // todos los campos
    }
    return null
  }

  /// /////////////////////////////////////////////////
  // Graba Value de la tabla local
  /// //////////////////////////////////////
  updateCampo = async (Value: any, ControlSource: string, recno: number) => {
    // async update(Value: any) {
    //  const ControlSource = this.ControlSource;
    // console.log('updateCampo===', Value, ControlSource)

    if (ControlSource == '' || recno == 0) { return } // No  hay ControlSource
    const pos = ControlSource.indexOf('.') + 1
    if (pos == 1) { return } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim() // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim() // obtenemos el nombre de la vista (queda hasta el punto)
    let valor = ''

    switch (typeof Value) {
      case 'number':
        valor = Value.toString()
        break
      case 'string':
        valor = Value.replaceAll("'", "''")
        valor = "'" + valor + "'"
        break
      case 'boolean':
        valor = Value.toString()
        break
      default:
        valor = "'" + Value + "'"
        break
    }

    //    if (typeof Value=='string' || )

    try {
      //     await this.localAlaSql('USE Now;')
      const ins_sql = `USE Now; UPDATE ${tabla}  set ${campo}=${valor}  WHERE recno=${recno}`
      console.log('update ala===>', ins_sql)
      await this.localAlaSql(ins_sql)
    } catch (error) {
      console.error('AlaSql error==>', error)
    }
    return true
  }

  /// /////////////////////////////////////////////////
  // Graba Value de la tabla local
  /// //////////////////////////////////////
  asignaComponente_xx = async (ControlSource: string, refValue: any) => {
    const pos = ControlSource.indexOf('.') + 1
    if (pos == 1) { return } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim() // obtenemos el nombre del campo
    const alias = ControlSource.slice(0, pos - 1).trim() // obtenemos el nombre de la vista (queda hasta el punto)

    // Si no esta dado de alta la vista, componente
    if (!this.View[alias]) {
      this.View[alias] = {
        recnoval: []
      }
    } // objeto vacio

    if (!this.View[alias].componente) { this.View[alias].componente = {} } // arreglo vacio

    if (!this.View[alias].componente[campo]) { this.View[alias].componente[campo] = [] }

    this.View[alias].componente[campo].push(refValue) // aumenta el arreglo con las referencias componentes
  }

  /// /////////////////////////////////////////////////
  // goto : se mueve al registro donde si
  // despla : Si es numerico brinca al recno con ese numero,
  //          Si es string top=brinca la primer registro del alias, botton=brinca la ultimo registro del alias
  /// //////////////////////////////////////
  goto = async (despla: unknown) => {
    if (!this.are_tra[this.num_are - 1]) { return false }
    const alias = this.are_tra[this.num_are - 1]

    this.View[alias].eof = false
    this.View[alias].bof = false

    let data = []
    let recno = 0
    if (typeof despla === 'number') {
      recno = despla
    } else { // desplazamiento top o bottom
      if (despla == 'top') {
        data = await this.localAlaSql('USE Now; SELECT top 1 recno   FROM ' + alias + ' order by recno desc')
      }
      if (despla == 'bottom') {
        data = await this.localAlaSql('USE Now; SELECT top 1 recno   FROM ' + alias + ' order by recno ')
      }

      if (data.length > 1) {
        recno = data[1][0][recno] // un solo campo
      }
      this.View[alias].row = -1
      if (recno > 0) {
        for (let row = 0; this.View[alias].recnoVal.lenght; row++) {
          if (this.View[alias].recnoVal[row].recno == recno) {
            this.View[alias].row = row
            break
          }
        }
        //          this.View[alias].row   = this.View[alias].recnoVal
        //          this.View[alias].recno = this.nowValue(alias, 'recno', recno) // asignamos valores del alias posicionado
      } else {
        // this.View[alias].recnoVal = []
        this.View[alias].row = -1
        if (despla == 'top') { this.View[alias].eof = true } else { this.View[alias].bof = true }

        return false
      }
    }

    // leedatos
    data = await this.localAlaSql('USE Now; SELECT *   FROM ' + alias + '  where recno=?', recno)
    // console.log('goto data ',data[1][0])

    if (data[1].length > 0) {
      this.View[alias].recno = recno
      const row = this.View[alias].recnoVal.find(ele => ele.recno == recno)
      this.View[alias].row = row.id
      this.View[alias].data = data[1][0]
      // console.log('goto view',this.View[alias])
      if (data[1].length == 1) {
        this.View[alias].eof = true
        this.View[alias].bof = true
      }

      return data[1][0]
    }

    /*
        for (let i = 0; i < this.View[alias].recnoVal.length; i++) {
          if (recno==this.View[alias].recnoVal[i].recno){
             row=i
             break
          }
        }
    */
    this.View[alias].eof = true
    this.View[alias].recno = 0
    this.View[alias].row = -1
    this.View[alias].data = {}

    return null
  }

  /// /////////////////////////////////////////////////
  // skip : se mueve registro en forma relativa donde este el recno
  // despla : Si es positivo hacia adelante y negativo hacia atras
  /// //////////////////////////////////////
  skip = async (despla?: number) => {
    if (!despla) { despla = 1 }

    if (!this.are_tra[this.num_are - 1]) { return false }
    const alias = this.are_tra[this.num_are - 1]
    this.View[alias].eof = false
    this.View[alias].bof = false

    let data = []
    const row = this.View[alias].row
    //    let recno = this.View[alias].recnoVal(row)
    let recno = this.View[alias].recnoVal[row].recno

    if (despla > 0) {
      data = await this.localAlaSql('USE Now; SELECT top ' + despla.toString + '  FROM ' + alias + ' where recno>' + recno.toString + ' order by recno ')
    } else {
      data = await this.localAlaSql('USE Now; SELECT top ' + despla.toString + '  FROM ' + alias + ' where recno<' + recno.toString + ' order by recno desc')
    }

    if (data[1].length > 0) // Si regreso datos
    {
      const ult_ele = data[1].length
      if (despla > 0 && ult_ele < despla) // si el desplazamiento es positivo
      { this.View[alias].eof = true }

      if (despla < 0 && ult_ele < (despla * -1)) // si el desplazamiento es negativo
      { this.View[alias].bof = true }

      recno = data[1][ult_ele - 1][recno] // asigna el ultimo elemento
    } else if (despla > 0) { this.View[alias].eof = true } else { this.View[alias].bof = true }
    return await this.goto(recno) // se va a leer registro
  }

  /// /////////////////////////////////////////////////
  // scatter Lee los datos del registro actual
  // tipo : MEMVAR (todos los registros), FIELDS (solo los campos que esten en FIELDS )
  /// //////////////////////////////////////
  scatter = async (tipo?: String, fields?: []) => {
    let resultado = {}
    if (!this.are_tra[this.num_are - 1]) { return false }
    const alias = this.are_tra[this.num_are - 1]
    //    const recno = this.View[alias].recnoVal[this.View[alias].row]
    const recno = this.View[alias].recnoVal[this.View[alias].row].recno

    const data = await this.goto(recno) // lee los datos actuales
    if (data[1] && data[1].length == 0) { return null }

    if (tipo.toLowerCase() == 'MEMVAR') {
      resultado = data[1]
    }

    if (tipo.toLowerCase() == 'FIELDS') {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        resultado[field] = data[1][field]
      }
    }
    if (data[1].length > 0) { return data[1] }
    return null
  }

  /// //////////////////////////////
  // Clona una vista local
  // baseAlias: Vista local la cual se va clonar
  // alias: Vista en donde quedara la vista clonada
  // filters: Variables que filtraran la vista clonada
  /// //////////////////////////////
  public localClone = async (baseAlias: string, alias: string, filters: any, force?: boolean) => {
    alias = alias.trim()
    let where = ''
    console.log('DataBAse LocalCLone filters', filters)
    for (const variable in filters) {
      if (where > ' ')
        where = where + ' and '

      var cam = filters[variable]
      var campo = ''
      const tipo = typeof cam
      var comillas = ''
      var com_trim = ''
      var ter_trim = ''
      switch (tipo) {
        case "number":
          campo = cam.toString()
          break;
        case "bigint":
          campo = cam.toString()
          break;
        case "boolean":
          campo = cam ? '1' : '0'
          break;
        case "string":
          comillas = "'"
          campo = cam.trim()
          com_trim = 'trim('
          ter_trim = ')'
          break;
      }

      where = where + `${com_trim} ${variable} ${ter_trim}=${comillas}${campo}${comillas}`
    }
    if (where > '') where = ' where ' + where

    console.log('DataBase Clone where ', where)

    if (!this.View[alias] || force) { // si no existe el alias
      this.View[alias] = this.View[baseAlias] // Copiamos su definicion

      // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
      let des_tab = ' CREATE TABLE ' + alias + ' (recno INT PRIMARY KEY'
      const est_tabla = this.View[alias].est_tabla
      for (const nom_ele in est_tabla) { // genera la descripcion de la tabla para generarla en alasql
        des_tab = des_tab + ',' + nom_ele + ' ' + est_tabla[nom_ele].tip_cam
      }

      des_tab = des_tab + ');'
      // Creamos la tablas
      await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + '; ' + des_tab + '; ')

      await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + '; ' + des_tab + '; ')

      //console.log('clone DB ',    await this.localAlaSql('select * from '+ alias ))

    }

    // borramos los datos
    await this.useNodata(alias)
    /*
        this.View[alias].recnoVal = [] // Generamos el arreglo de recnoVal
        this.View[alias].data = {} // asignamos el valor del ultimo registro
        this.View[alias].recCount = 0 // Total de registros de la vista
        this.View[alias].recno = 0 // Registro en cero
        this.View[alias].eof = false // Fin de archivo
        this.View[alias].bof = false // Principio de archivo
        this.View[alias].row = -1 // Renglon posicionado el registro
    */
    /////////////////


    //console.log('Clone Datos  ',baseAlias,alias,await this.localSql(`select * from Now.${baseAlias}  ${where}`))

    // var query = `select * INTO ${alias} from Now.${baseAlias}  ${where}`
    var query = `select *  from Now.${baseAlias}  ${where}`

    const respuesta = await this.localSql(query)
    console.log('Clone respuesta ', query, respuesta)
    //query = `select *  from Now.${alias} `
    //const respuesta = await this.localSql(query)

    // Generamos el campo recno
    if (respuesta.length > 0) {
      const recnoVal = []
      for (let i = 0; i < respuesta.length; i++) {
        const recno = respuesta[i].recno
        respuesta[i].recno = i + 1
        /*  if (respuesta[i].recno!=recno){
           query = `update Now.${alias} set recno=${respuesta[i].recno} where recno=${recno} `
           await this.localSql(query)
         }
        */


        recnoVal[i] = { recno: i + 1, id: i }
        await this.localAlaSql('INSERT INTO Now.' + alias + ' VALUES ?', [respuesta[i]])
        await this.localAlaSql('INSERT INTO Last.' + alias + ' VALUES ?', [respuesta[i]])

      }

      console.log('Clone Last ', await this.localSql('select * from Last.' + alias))

      //Generamos el Last
      //query = `select * INTO Last.${alias} from New.${alias}`
      // await this.localSql(query)

      // console.log('Clone Datos  Last',await this.localSql(`select * from Last.${alias} `))
      this.View[alias].recno = respuesta.length // asignamos el ultimo numero registro de trabajo
      this.View[alias].recCount = respuesta.length // registros totales
      //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL
      this.View[alias].data = respuesta[respuesta.length - 1] // asignamos el valor del ultimo registro
      this.View[alias].recnoVal = [...recnoVal] // utilizamos el spread Operator
    }

  }

  /// //////////////////////////////
  // portea la funcion alasql a VfpCursor
  /// //////////////////////////////
  public VfpCursor = async (query: String) => {
    const data = await this.localAlaSql(query)
    // console.log('VfpCursor ==>', data)
    return data
  }


  async MessageBox(texto: string, tipo?: number, title?: string, timer?: number) {
    const { $MessageBox } = useNuxtApp()

    if (!tipo)
      return $MessageBox(texto)

    if (!title)
      return $MessageBox(texto, tipo)
    if (!timer)
      return $MessageBox(texto, tipo, title)

    return $MessageBox(texto, tipo, title, timer)
  }
  // Fin de la clase================================
}
