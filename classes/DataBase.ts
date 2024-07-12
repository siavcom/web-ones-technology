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
// import VueSimpleAlert from "vue3-simple-this.errorAlert"; // mensajes de this.errorAlerta  npm i vue-simple-this.errorAlert Vue.use(VueSimpleAlert);
// import { DATA_TYPE } from "jsstore";
// import { newLocalDb } from "@/services/jsstore_con_new";
// import { oldLocalDb } from "@/services/jsstore_con_old";
// import { Connection } from "jsstore";
//import workerInjector from 'jsstore/dist/worker_injector'

// import dat_emp from '@/empresas/datos.json' // json con los datos de la empresa, substituye comeemp
//import { watch } from 'vue'

//import { io } from 'socket.io-client';
import axios from "axios";
import alasql from "alasql";
import { storeToRefs } from "pinia";

// import { Global } from "@/Global";

export class VFPDB {
  // no debe de estar fuera
  session;

  // {nom_emp} = storeToRefs(this.session)  //pasa los elementos por referencia al Global

  // const { id_con, url, dialect, nom_emp, user } = storeToRefs(session)  //pasa los elementos por referencia al Global

  // propiedades de las clases
  AlaSql = alasql;
  name: string = "VFPDB";

  are_tra: string[] = [""]; // Las areas de trabajo donde cada vista tendra.
  // Inicilizamos el elemento 0 ya que el select 0 indica nueva area a utilzar

  num_are: number; // numero de area de trabajo que se esta en este momento
  View: any = {}; // aqui se guarda toda la informacion de las vistas SQL ( estructura, recno, recCount, exp_ind)
  Form = {}; // any = getCurrentInstance();
  Ctx = {}; // this.Form.ctx; // Contexto

  event: any;
  newTables = [];
  oldTables = [];
  Estatus: boolean;
  Sql = alasql; // portea alasql a this.sql (no quitar)
  //axiosActive: boolean = false;
  //socketIo =this.session.socketIo
  socket;
  res: [] = [];

  // Inicializa la conexion
  constructor() {
    this.Estatus = true;
    this.session = Session(); // obtenemos la session

    console.log("Session=", this.session);
    const { socketIo } = storeToRefs(this.session); //pasa los elementos por referencia al Global

    // this.url = ''

    //  this.user = ''

    this.num_are = 0;

    /// //////////////////////////////////////
    // Revisa si ya se firmo el usuario
    /// //////////////////////////////////////

    // recupera datos de conexion

    //console.log('Db DataBase session.id ===>>>>', '', 'dilect=', dialect.value)

    this.localAlaSql("DROP DATABASE IF EXISTS Now ;");
    this.localAlaSql("CREATE DATABASE Now ;");
    this.localAlaSql("DROP DATABASE IF EXISTS Last ;");
    this.localAlaSql("CREATE DATABASE Last ;");

    this.Estatus = true;
    /*
    this.socketIo = io(this.session.url, {
      auth: { 
        id_con: this.session.id_con,
        tip_llamada: 'CHECK',
        broadcast: 'loginFail'
       },
    });
  */

    console.log("socketIo ==", socketIo.value);
    if (!socketIo.value) this.session.openSocket();

    this.socket = socketIo;

    /*

    console.log('socketIo ==',socketIo.value)

    const soc= socketIo.value
    this.socket=soc.value
    console.log('socket ==',this.socket)

    this.socket.on("error", async (res: string) => {
      this.MessageBox(res)
    //  this.socketIo.disconnect()
      return
    });
  
    this.socket.on("loginOk", async (res: {}) => {

      console.log('Db login ok')
      return
    });

   */
  } // Fin constructor

  /// /////////////  Vfp Use nodata ///////////////////
  // nom_vis : Nombre de la vista a utilizar
  /// /////////////////////////////////////////////////

  useNodata = async (nom_vis: string, alias?: string) => {
    nom_vis = nom_vis.trim();
    while (!this.Estatus) {
      console.log("Db esperando cambio de estatus");
    }

    if (nom_vis == null) {
      this.errorAlert("No se permite nombre de vista en null");
      return false;
    }
    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = nom_vis;
    }

    alias = alias.trim();
    console.log("Db useNodata alias", alias);
    if (this.View[alias]) {
      // si exite ya la vista, solo borra los datos locales
      // console.log('Db useNodata View ',alias,this.View)
      // this.localAlaSql('USE Now ; ')
      await this.localAlaSql("delete from Now." + alias);
      // this.localAlaSql('USE Last ; ')
      await this.localAlaSql("delete from  Last." + alias);

      // Inicializamos el alias
      this.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal

      this.View[alias].data = {}; // asignamos el valor del ultimo registro
      this.View[alias].recCount = 0; // Total de registros de la vista
      this.View[alias].recno = 0; // Registro en cero
      this.View[alias].eof = false; // Fin de archivo
      this.View[alias].bof = false; // Principio de archivo
      this.View[alias].row = -1; // Renglon posicionado el registro

      return true;
    }

    // La vista esta definida en forma reactiva desde la forma principal y es donde estan los
    // valores de los componentes, por lo que aqui aparece en el contexto de la forma
    // Por el momento se quita y se graba en localDb
    // const vis_act = ThisForm.ctx[alias];

    const dat_vis = {
      id_con: "",
      tip_llamada: "USENODATA",
      // tok_aut: this.tok_aut,
      nom_vis: "",
    };

    dat_vis.nom_vis = nom_vis; // Nombre de la vista
    try {
      const response: any = await this.axiosCall(dat_vis);

      if (response == null) {
        console.error("==== . No existe la tabla===>", alias);
        return false;
      }

      if ((await this.genera_tabla(response, alias, true)) == null)
        // generamos la tabla segun la estructura regresada
        return false;
      // abre  la tabla de mantenimiento
      console.log(
        "Db useNodata VIEW despues de generar_tabla==> ",
        alias,
        "response=",
        response
      );
      if (this.View[alias] && this.View[alias].tip_obj.trim() == "VIEW") {
        alias = this.View[alias].tablaSql.trim();
        await this.useNodata(alias);
        console.log("Db useNodata VIEW salir useNodata==> ", alias);
      }
      //  this.View[alias] = response; // Generamos la vista, asignamos su estructura  y filtros de condiciones

      return true;
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

        //   console.log('Db Vista creada ===', des_tab, this.localAlaSql('SELECT * from Last.' + alias))

        return true;
        // return this.View[alias].new[0]
        */
    } catch (error) {
      console.error(error);

      return null;
      //  this.errorSql(error)
    }
  };

  /// /////////////  Vfp USE /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  // m        :  Varibles de memoria a pasar
  // alias    : Alias
  /// ////////////////////////////////////////////
  //  use = async (obj_vis:any, nom_vis:any , m: {}, alias?:any) => {
  use = async (
    nom_vis: string,
    m?: Record<string, never>,
    alias?: string,
    order?: string
  ) => {
    while (!this.Estatus) {
      console.log("Db esperando cambio de estatus");
    }

    nom_vis = nom_vis.trim();
    if (!m) {
      m = {};
    }

    if (!alias) {
      alias = nom_vis; // asignamos el nombre de la vista
    }
    alias = alias.trim();
    console.log("1 Db USE ", alias);

    if (this.View[alias]) {
      // si exite ya la vista, Borra los datos locales

      await this.localAlaSql("delete from Now." + alias);
      await this.localAlaSql("delete from  Last." + alias);

      // Inicializamos el alias
      this.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal

      this.View[alias].data = {}; // asignamos el valor del ultimo registro
      this.View[alias].recCount = 0; // Total de registros de la vista
      this.View[alias].recno = 0; // Registro en cero
      this.View[alias].eof = false; // Fin de archivo
      this.View[alias].bof = false; // Principio de archivo
      this.View[alias].row = -1; // Renglon posicionado el registro
    }

    if ((await this.select(alias)) == 0) {
      // si el alias no existe
      console.log("Db Use UseNodata", nom_vis, alias);
      await this.useNodata(nom_vis, alias);
    }

    const dat_vis = {
      id_con: "",
      tip_llamada: "USE",
      // tok_aut: this.tok_aut,
      nom_vis,
      where: "",
    };

    // la expresion del indice es generada desde el servidor de node y es formada
    // por un objeto json el cual utiliza los model del sequelize

    let exp_ind = "";
    let exp_whe = "";
    if (this.View[alias].tip_obj.trim() == "VIEW") {
      // si es una VIEW
      // console.log('Db USE this.View VIEW', this.View[alias], dat_vis)
      // cambiar el * por los campos de la View en minusculas

      dat_vis.query = "select * from " + nom_vis;
      dat_vis.tip_llamada = "SQLEXEC";
      // Aqui voy

      if (this.View[alias].exp_indice.trim().length > 0) {
        try {
          exp_ind = eval(this.View[alias].exp_indice.trim());
        } catch (error) {
          console.error(
            error,
            "USE " + alias + " exp_ind=",
            this.View[alias].exp_indice.trim()
          );

          return false;
        }
        console.log("2 Db USE " + alias + "m=", m, " View =", this.View[alias]);
        if (exp_ind == undefined) {
          this.errorAlert(
            "No se pudo evaluar el indice de la tabla=" +
            alias +
            " indice=" +
            this.View[alias].exp_indice
          );
          return false;
        }
      }
      if (this.View[alias].exp_where != 'null' && this.View[alias].exp_where.trim().length > 0) {
        // console.log("Db dataBase exp_where", this.View[alias].exp_where);

        const val_eval = "`" + this.View[alias].exp_where.trim() + "`";


        try {
          exp_whe = eval(val_eval);
          console.log("Db use eval where ", val_eval, m, 'exp_whe=', exp_whe);
        } catch (error) {
          console.error("eval =", val_eval, error);

          return false;
        }

        if (exp_whe == undefined) {
          this.errorAlert(
            "No se pudo evaluar el la expresion where de la tabla=" +
            alias +
            " indice=" +
            this.View[alias].exp_where
          );
          return false;
        }

        // exp_whe = eval(this.View[alias].exp_where.trim())     //  `${a}`
      }
      if (exp_ind.length + exp_whe.length > 0) {
        dat_vis.query = dat_vis.query + " where ";

        if (exp_ind.length > 0 && exp_whe.length > 0) {
          dat_vis.query = dat_vis.query + exp_ind + " and " + exp_whe;
        }

        if (exp_ind.length > 0 && exp_whe.length == 0) {
          dat_vis.query = dat_vis.query + exp_ind;
        }

        if (exp_ind.length == 0 && exp_whe.length > 0) {
          dat_vis.query = dat_vis.query + exp_whe;
        }
      }
      // Si hay orden de la vista
      if (this.View[alias].order.trim().length > 0) {
        dat_vis.query = dat_vis.query + " order by " + this.View[alias].order;
      }
    } else {
      // es un MODEL{
      //      const val_eval = "`"+this.View[alias].exp_indice+"`"
      console.log(
        "3 Db USE this.View MODEL eval exp_indice",
        this.View[alias],
        dat_vis
      );

      const val_eval = this.View[alias].exp_indice;

      try {
        eval("dat_vis.where=" + val_eval);
      } catch (error) {
        console.error(error);

        return false;
      }

      console.log(
        "Db USE eval dat_vis ===>",
        val_eval,
        "dat_vis.where=",
        dat_vis.where
      );

      // eval("dat_vis.where=`" + this.View[alias].exp_indice+"`") // obtenemos la expresion del indice
    }

    //console.log('Db  use dat_vis========>', dat_vis)

    try {
      console.log("4 Db Use Axios =====>", dat_vis); // .data
      const data = await this.axiosCall(dat_vis);

      console.log("5 Db Use Axios Ok response =====>", dat_vis, data); // .data

      if (data.length)
        // No hubo error
        return await this.genera_tabla(data, alias);
      else return []; //   { return [] }
    } catch (error) {
      console.error("Axios error :", dat_vis, error);

      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      return false;
    }
  };

  /// /////////////  Vfp obten un registro  /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  // key_pri  :  Key_pri
  /// ////////////////////////////////////////////
  // aqui me quede . revisar todo esto, puede que la tabla tenga varios alias

  obtRegistro = async (nom_tab: "", key_pri: number) => {
    const dat_vis = {
      id_con: "",
      tip_llamada: "USE",
      // tok_aut: this.tok_aut,
      nom_vis: nom_tab,
      where: { key_pri },
    };

    const response = await this.axiosCall(dat_vis);
    if (response == null) return;

    if (response.data) {
      const respuesta = response.data;
      // console.log('Db Obten Registro===>', respuesta)
      return respuesta[0]; // response.data;
    }
    return [];
  };

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
  tableUpdate = async (
    updateType?: number,
    force?: boolean,
    alias?: string,
    tab_man?: string
  ) => {
    if (!updateType) {
      updateType = 0;
    }

    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }
    if (alias == "") {
      return true;
    } // no hay alias a actualizar
    //console.log('Db tableUpdate View',alias, this.View[alias])

    if (!tab_man) {
      // asigna vista de mantenimiento de la vistas
      if (this.View[alias].tip_obj.trim() == "VIEW")
        tab_man = this.View[alias].tablaSql.trim();
      else tab_man = alias;
    }

    var sw_val = true;
    const nom_tab: string = this.View[alias].tablaSql.trim(); // obtenemos el nombre model (sequelize) de la vista de mantenimento

    if (nom_tab.length < 2) {
      console.warn(
        "No hay nombre de tabla de actualizacion para la vista",
        alias
      );
      this.errorAlert(
        "ERROR :No hay nombre de tabla de actualizacion para la vista " + alias
      );
      return false;
    }

    var recno = this.View[alias].recno; // obtenemos el recno a actualizar
    const recCount = this.View[alias].recCount; // obtenemos el recCount de la vista

    if (recCount == 0) {
      // la vista no tiene registros a actualizar
      console.warn("No hay registros en este alias", alias);
      return false;
    }
    // select para localDb
    const select = {
      from: alias,
      order: {
        by: "recno",
        type: "asc",
      },
    };
    let where = ""; // where alasql
    let where_del = " where Viejo.key_pri>0 ";
    let sw_delete = false;
    if (updateType == 0) {
      // solo un registro
      // Solo actualiza un registro
      if (!recno) {
        // No hay registro a actualizar
        this.errorAlert("ERROR :No hay recno en " + alias);
        return;
      }
      select.where = { recno };
      where = `WHERE recno=${recno}`;
      where_del = ` WHERE Viejo.recno=${recno} and Viejo.key_pri>0`;
    }

    // lee los datos originales haciendo un LEFT OUTER a los datos nuevos
    const data = await this.localAlaSql(` 
       Select Viejo.key_pri,Viejo.recno recnoOld, Nuevo.recno as recnoNew from Last.${alias} Viejo \
       LEFT OUTER JOIN Now.${alias} Nuevo using recno ${where_del}`);

    // recorre registro por registro para buscar renglones borrados
    for (let row = 0; row < data.length; row++) {
      // Si no existe el recno New borra de la base de datos
      if (
        data[row].recnoNew == null ||
        data[row].recnoNew != data[row].recnoOld
      ) {
        const key_pri = data[row].key_pri;
        // console.log('Db deleteRow ===', key_pri, alias)
        await this.deleteRow(key_pri, alias);
        sw_delete = true;
      }
    }

    //  Select Viejo.* from Now.${alias} Nuevo \
    //  LEFT OUTER JOIN Last.${alias} Viejo using recno ${where}`))

    // obtenemos los datos a actualizar
    const dat_act = await this.localAlaSql(
      `SELECT * FROM Now.${alias} ${where}`
    );

    //const dat_act = datos
    //console.log('Db DataBase definicion '+tab_man,this.View[tab_man].val_def)
    const val_def = this.View[tab_man].val_def; // estructura de campos

    // llamado AXIOS
    const dat_vis: any = {
      id_con: "",
      tip_llamada: "",
      nom_tab,
      dat_act: {},
    };

    // Recorremos todos los datos a actualizar
    let sw_insert = false;

    for (const row in dat_act) {
      dat_vis.dat_act = {};
      const m = {}; // valiables en memoria
      dat_vis.dat_act.key_pri = dat_act[row].key_pri;

      // si no es tabla de actualizacion delo diccionario de datos


      if (tab_man != 'lla1_vis' && tab_man != 'lla1_dat' && tab_man != 'lla1_ind' && tab_man != 'lla1_tab')
        dat_vis.dat_act.timestamp = dat_act[row].timestamp;

      recno = dat_act[row].recno;

      dat_vis.tip_llamada = "INSERT";
      let sw_update = false;

      // recorre los registros de la vista a actualizar
      // asignamos key_pri y timestamp del registro
      let old_dat = [];
      // Es una actualizacion dedatos, asigna key_pri y timestamp
      //console.log('Db tableUpdate dat_act[row]', dat_act[row])

      if (dat_act[row].key_pri > 0) {
        // dat_vis.dat_act.key_pri = dat_act[row].key_pri;

        // dat_vis.dat_act.timestamp = dat_act[row].timestamp;

        dat_vis.tip_llamada = "UPDATE";

        // Leemos los datos viejos
        const ins_sql = `SELECT * FROM Last.${alias}  WHERE recno=${recno} ;`;
        const datos = await this.localAlaSql(ins_sql);

        if (datos.length > 0) {
          old_dat = datos[0];
          //console.log('tableupdate old=',old_dat)
        } else {
          console.error(
            "tableUpdate error recno ",
            row,
            recno,
            await this.localAlaSql(` SELECT * FROM Last.${alias} `)
          );
          return false;
        }
      }

      /*
            console.log(
              "1 DataBase tableUpdate() vista de mantenimiento=",
              tab_man,
              this.View[tab_man],
              "Row=",
              row,
              "dat_act=",
              dat_act[row]
            );
      */
      // Recorremos todos los campos para ver cual cambio para mandarlo actualizar campo.old != campo.new

      console.log('Db tableUpdate View tab_man=', this.View[alias])

      for (const campo in this.View[tab_man].val_def) {
        // for (const campo in dat_act[row]) {
        console.log('Db tableUpdate campo=', campo, 'Old=', old_dat[campo], 'New=', dat_act[row][campo])
        if (dat_act[row][campo] == null)
          dat_act[row][campo] = "";

        if (typeof dat_act[row][campo] == "string") {
          dat_act[row][campo] = dat_act[row][campo].trim();
          if (old_dat[campo] == null)
            old_dat[campo] = "";
          else
            old_dat[campo] = old_dat[campo].trim();
        }

        //        console.log('Db tableUpdate campo=', campo,'Old=', old_dat[campo],'New=',dat_act[row][campo] )

        // Si el campo nuevo o es diferente al viejo, aumentamos en los datos a actualizar
        console.log('tab_man', tab_man, 'Campo=', campo, this.View[tab_man].est_tabla[campo])

        const nom_campo = campo.toLowerCase();
        if (
          this.View[tab_man].est_tabla[campo] &&
          nom_campo != "recno" &&
          nom_campo != "tie_cre" &&
          nom_campo != "tie_uac" &&
          nom_campo != "usu_usu" &&
          nom_campo != "usu_cre" &&
          //          nom_campo != "key_pri" &&
          nom_campo != "timestamp" &&
          (dat_vis.tip_llamada == "INSERT" || old_dat[campo] == null ||
            old_dat[campo] != dat_act[row][campo])
        ) {
          //cambiar segun tipo de campo en View
          /*
          if (this.View[tab_man].est_tabla[campo]) {
            MessageBox(
              "Field " + campo + " inexistent in table" + tab_man,
              16,
              "SQL Error"
            );
            return false;
          }
          */


          const tipo =
            this.View[tab_man].est_tabla[campo].tip_cam.toLowerCase();

          console.log("UPDATE fecha campo=", campo, ' tipo=', tipo, ' valor=', dat_act[row][campo]);

          switch (true) {
            // switch (typeof dat_act[row][campo]) {
            case tipo == "number" ||
              tipo == "interger" ||
              tipo == "smallint" ||
              tipo == "tinyint" ||
              tipo == "bigint":
              m[campo] = +dat_act[row][campo];
              break;
            case tipo == "boolean" || tipo == "logical":
              m[campo] = +dat_act[row][campo];
              break;

            case tipo == "date" || tipo == "time":

              let valor = dat_act[row][campo].trim();

              const formato = "T00:00:00"; //.000Z"

              const long = 19 - valor.length;
              if (long > 0) valor = valor + formato.slice(-long);
              else valor = valor.slice(0, 19);

              valor = valor + ".000Z";

              //              valor = valor.slice(0, 24);

              m[campo] = valor;
              console.log("UPDATE fecha=", m[campo]);

              break;
            //   2024-01-15T10:22:7

            default:
              //            m[campo] = "'" + dat_act[row][campo] + "'"

              // se tiene que validar como string y nll ya que asi viene desde alaSQL
              try {
                if (dat_act[row][campo] != null) {
                  m[campo] =
                    typeof dat_act[row][campo] == "string"
                      ? dat_act[row][campo].trim()
                      : dat_act[row][campo];
                } else m[campo] = "";
              } catch (error) {
                console.log(
                  error,
                  "campo=",
                  campo,
                  "Valor=",
                  dat_act[row][campo]
                );
                return;
              }
            //console.log('Db tableUpdate campo=', campo,'m=',m[campo],'dat_act',dat_act[row][campo] )
          }
          //console.log( "Db tableUpdate lee datos Now", "val_def=",val_def);

          //  Busca en la estructura de la tabla de mantenimiento si es campo actualizable
          if (val_def[campo]) {
            dat_vis.dat_act[campo] = m[campo]; // dat_act[row][campo];
            /*
            console.log(
              "tableUpdate Actualiza CAMPO=",
              campo,
              "Valor=",
              dat_vis.dat_act[campo],
              " Old value=",
              old_dat[campo]
            );
            */
            //console.log('Db  tableUpdate campo  actual ==========>', nom_campo, dat_act[row][campo])
            sw_update = true;
          }
        }
      } // fin For dat_act

      // generamos el where para obtener los datos despues de insertar
      dat_vis.where = "";
      if (sw_update && dat_vis.tip_llamada == "INSERT") {
        // const where = eval(this.View[nom_tab].exp_indice)
        // Aqui me quede  Ojo Junio 2023
        const where = this.View[nom_tab].exp_indice.toLowerCase();
        // console.log("Db tableUpdate exp_indice m", m, "where", where, "dat_vis.where", dat_vis.where );
        try {
          eval(`dat_vis.where=${where}`);
        } catch (error) {
          console.error(error);

          return false;
        }
        //console.log("Db tableUpdate dat_vis.where", dat_vis.where);

        // dat_vis.where =exp_ind    //eval(this.View[nom_tab].exp_indice)
      }

      // this.View[alias].recCount = +row; // actualiza el recCount de la vista
      // const recno = dat_act[row].recno;

      // Tratara 2 veces en caso de que haya un force
      for (let num_int = 0; num_int < 2 && sw_update; num_int++) {
        // tratara 3 veces de actualiar el dato
        console.log("Db TableUpdate dat_vis", dat_vis);
        // llama el backEnd a grabar los datos
        const response = await this.axiosCall(dat_vis);

        if (response && response.key_pri && response.key_pri > 0) {
          // No hay error
          /*          const ins_sql = ' UPDATE Now.' + alias + ` SET timestamp=${response.timestamp}',key_pri=${response.key_pri} WHERE recno=${dat_act[0].recno}; ` +
                      ' USE Last ; DELETE from Last.' + alias + ` WHERE recno=${dat_act[0].recno}  ;` +
                      ' INSERT INTO Last.' + alias + ' SELECT * FROM Now.' + alias + ` WHERE recno=${dat_act[0].recno} ;`
          */
          const ins_sql =
            " UPDATE Now." +
            alias +
            ` SET timestamp=?,key_pri=? WHERE recno=${recno}; ` +
            " USE Last ; DELETE from Last." +
            alias +
            ` WHERE recno=${recno}  ;` +
            " INSERT INTO Last." +
            alias +
            " SELECT * FROM Now." +
            alias +
            ` WHERE recno=${recno} ;`;

          //            console.log('1 Db tableUpdate ala Ok INSERT UPDATE =>', await this.localAlaSql(`select timestamp from ${alias} where recno=${dat_act[0].recno} ` ))

          await this.localAlaSql(ins_sql, [
            response.timestamp,
            response.key_pri,
          ]);
          //          console.log('2 Db tableUpdate ala Ok INSERT UPDATE =>',await this.localAlaSql(`select timestamp from ${alias} where recno=${dat_act[0].recno} ` ))

          console.log(
            "Db TableUpdate response.timestamp",
            response.timestamp,
            " alasql.timestamp.",
            await this.localAlaSql(
              `select timestamp from Now.${alias} where recno=${recno}`
            )
          );

          if (dat_vis.tip_llamada == "INSERT") {
            sw_insert = true;
          }

          num_int = 2; // se sale del for
        } else {
          // hay error, obtiene los datos nuevos que tiene el registro y vuelve a grabar
          console.error(
            "No se pudo actualizar el registro en tabla " + alias,
            dat_vis
          );
          this.errorAlert(
            "SQL Error: No se pudo actualizar el registro en tabla " +
            alias +
            dat_vis
          );
          sw_val = false;
          if (dat_act[row].key_pri > 0) {
            // si es un dato existennte
            const respuesta = await this.obtRegistro(
              nom_tab,
              dat_act[row].key_pri
            ); // se trae de nuevo los datos
            if (respuesta.key_pri) {
              respuesta.recno = dat_act[row].recno;
              if (force) {
                // Actualiza el valor de timestamp para tratar de grabar de nuevo
                dat_vis.dat_act[row].timestamp = respuesta.timestamp;
              } else {
                await this.localAlaSql(
                  "USE Now;\
                DELETE Now." +
                  alias +
                  ` WHERE recno=${dat_act[row].recno};\
                INSERT INTO ` +
                  alias +
                  " VALUES ?",
                  [respuesta]
                );

                await this.localAlaSql(
                  "USE Last;\
                DELETE Last." +
                  alias +
                  ` WHERE recno=${dat_act[row].recno};\
                INSERT INTO ` +
                  alias +
                  " VALUES ?",
                  [respuesta]
                );
              } // fin else
            }
          } // Fin si es un dato existente
          if (updateType < 2) {
            num_int = 2;
            // no sigue la actualizacion
          }
        } // fin error
      } // fin for num_int
    } //  Fin del for de graba registro por registro

    // actualiza alasql en el caso de un tableupdate all
    /*
    if (sw_update && updateType > 0) {
      //console.log('Db tableUpdate genera_tabla', dat_act)
      await this.genera_tabla(dat_act, alias)
      //console.log('Db tableUpdate genera_tabla Now,Last', await this.localAlaSql('select * from Now.' + alias)
      //  , await this.localAlaSql('select * from Now.' + alias))

    }
    */
    // Regenera recnoVal en caso de insercion de datos y solo sea un registro

    return sw_val;
  }; //

  /// /////////////  Vfp append blank /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  /// ////////////////////////////////////////////
  appendBlank = async (alias: any, m?: {}) => {
    const ThisForm = this.Form;
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      this.errorAlert("SQL Error : No existe la vista SQL " + alias);
    }

    let recno = 0;
    // Obtenemos el valor del siguiente recno
    const res = await this.localAlaSql(
      "USE Now; select max(recno)+1 as recno from " + alias
    );

    if (res[1] && res[1][0].recno > 0) {
      // si hay registro
      recno = res[1][0].recno;
    } else {
      recno = 1;
    } // Si es el primer registro
    // Obtiene valores default para insertar

    const valores = {
      recno,
      timestamp: null,
      tie_cre: "",
      tie_uac: "",
      usu_cre: "",
      usu_usu: "",
      key_pri: 0,
    };
    const vis_act = this.View[alias].tablaSql.trim();

    for (const campo in this.View[vis_act].val_def) {
      // const val_eval="`"+this.View[alias].val_def[valor]+"`"
      if (
        campo != "timestamp" &&
        campo != "tie_cre" &&
        campo != "tie_uac" &&
        campo != "usu_cre" &&
        campo != "usu_usu" &&
        campo != "key_pri"
      ) {
        const val_eval = this.View[vis_act].val_def[campo];

        let val_defa = null;
        try {
          val_defa = eval(val_eval);
        } catch (error) {
          this.errorAlert(
            " appendBlank can't eval(" +
            val_eval +
            ")" +
            alias +
            " Error=" +
            error
          );

          console.error(
            "appendBlank can't eval(" + val_eval + ")",
            "Error=",
            error
          );

          return false;
        }
        valores[campo] = val_defa;
      }
    }
    /*
    if (!valores.timestamp) {
      if (this.dialect == 'postgres')
        valores.timestamp = 0
      else
        valores.timestamp = null
    }
    */

    // const val_defa = eval(this.View[alias].val_def)
    console.log("Db DataBAse appendBlank alias ", alias, valores);
    try {
      await this.localAlaSql(
        "USE Now; INSERT INTO Now." + alias + " VALUES ?",
        [valores]
      );
      await this.localAlaSql(
        "USE Last;INSERT INTO Last." +
        alias +
        " SELECT * FROM Now." +
        alias +
        " WHERE recno=?",
        recno
      );
    } catch (error) {
      console.warn("alasql error", error);
    }

    const ult_ele = this.View[alias].recnoVal.length - 1;

    let id = 0;
    if (ult_ele >= 0) {
      id = this.View[alias].recnoVal[ult_ele].id + 1;
    }

    this.View[alias].recno = recno;
    this.View[alias].recnoVal.push({ recno, id }); // insertamos en el arreglo para llenar el grid
    this.View[alias].recCount = this.View[alias].recCount + 1;
    this.View[alias].row = this.View[alias].recnoVal.length - 1; // asignamos nuevo row

    console.log(
      "Db DataBAse Insert Now  alaSql=====>",
      alias,
      await this.localAlaSql(`select * from  Last.${alias} `)
    );
    return valores;

    /* locaDb
    await this.insertLocalDb(alias, valores); // Insertamos los valores blancos en LocalDb
    */
  };

  /// ///////////// delete Sql /////////////////////
  // alias  : Nombre de la vista a utilizar
  // row : Renglon donde se encuentra el registro a borrar
  /// ////////////////////////////////////////////
  deleteRow = async (key_pri: number, alias: any) => {
    if (key_pri <= 0) {
      return;
    }
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      this.errorAlert("SQL Error :No existe la vista SQL  " + alias);

      //      MessageBox("No existe la vista SQL " + alias, 16, "SQL Error");
      return false;
    }
    const dat_vis = {
      id_con: "",
      tip_llamada: "DELETE",
      // tok_aut: this.tok_aut,
      nom_vis: this.View[alias].tablaSql.trim(), // tabla en servidor SQL
      where: {},
    };

    const condicion = {}; // Generamos la condicion
    dat_vis.where = { key_pri }; // obtenemos el key_pri a borrar
    try {
      //  console.log('Db deleteRow borra en la base de datos row data recno,data ===>', dat_vis)
      const response = await this.axiosCall(dat_vis);
      if (response == null) return null;

      const respuesta = response.data;
    } catch (error) {
      console.error("Error en delete", error);
      return null;
    }
    const recno = await this.localAlaSql(
      "USE Last;\
    select recno  from Last." +
      alias +
      " where key_pri=?",
      key_pri
    );

    //  borra el LolcaDb
    await this.localAlaSql(`USE Last;\
        delete from Last.${alias} where key_pri=${key_pri}`);
    await this.localAlaSql(`USE Now;\
        delete from Now.${alias} where key_pri=${key_pri}`);

    // console.log('Db deleteRow Last ===>', key_pri, recno, await this.localAlaSql('USE Last;\
    // select key_pri,recno from '+ alias) )

    //  borra en el arreglo de recno
    // delete this.View[alias].recnoVal[row];
    return true;
  };

  /// /////////////  Vfp delete /////////////////////
  // alias  : Nombre de la vista a utilizar
  // row : Renglon donde se encuentra el registro a borrar
  /// ////////////////////////////////////////////
  delete = async (recno: number, alias: string, SqlUpdate: boolean) => {
    if (!SqlUpdate) {
      SqlUpdate = false;
    }

    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      this.errorAlert("SQL Error :No existe la vista SQL " + alias);

      return false;
    }

    if (!recno) {
      recno = this.View[alias].recnoVal[this.View[alias].row].recno;
    }

    if (recno <= 0) {
      return null;
    } // no hay row por borrar

    await this.localAlaSql(
      " delete from Now." + alias + ` where recno=${recno}`
    );

    console.log("Db  delete from Now." + alias + ` where recno=${recno}`);

    // Actualizacion inmediata en SQLSERVER
    if (SqlUpdate) {
      const data = await this.localAlaSql(
        "USE Last;\
    select key_pri from Last." +
        alias +
        " where recno=?",
        recno
      );
      const key_pri = data[1][0].key_pri;
      await this.localAlaSql(
        " delete from Now." + alias + " where recno=?",
        recno
      );

      // utiliza la tabla de actualizacionde SQL
      // console.log('Db delete alias DeleteRow',key_pri, alias)
      if (key_pri > 0) {
        // si existe en el SQLSERVER
        if (!(await this.deleteRow(key_pri, alias))) {
          return false;
        }
      }
    }

    const recnoArray = await this.localAlaSql(
      " select recno from Now." + alias + "  order by recno"
    );

    // por reactividad borramos de uno por uno
    while (this.View[alias].recnoVal.length > 0) {
      this.View[alias].recnoVal.pop();
    }

    const recnoVal = [];
    let row = -1;
    for (let i = 0; i < recnoArray.length; i++) {
      if (recno > recnoArray[i].recno) {
        row = i;
      }
      recnoVal[i] = { recno: recnoArray[i].recno, id: i };
    }
    this.View[alias].recnoVal = recnoVal;
    recno = 0;
    if (row >= 0) {
      recno = recnoArray[row].recno;
    }

    // console.log('Db Despues de borrar recnoval ',this.View[alias].recnoVal)
    // console.log('Db delete despues slice recno reg recnoVal===>',recno,this.View[alias].recnoVal)
    // console.log('Db Despues de borrar alaSql',this.localAlaSql('select recno,key_pri from '+ alias ))
    if (recno > 0) {
      return await this.goto(recno);
    } // se va a leer registro
    return [];
  };

  /// /////////////  Vfp table insert /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  /// ////////////////////////////////////////////
  // Aqui me quede
  insert = async (alias: string, m: Record<string, never>) => {
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      this.errorAlert("SQL Error :No existe la vista SQL " + alias);
      return;
    }
    // Leemos los datos a actualizar
    const recno = this.View[alias].recno;
    const nom_vis = this.View[alias].tabla;

    /*
    const valores = await newLocalDb.select({
      from: alias,
      where: {
        recno: this.View[alias].recno
      }
    });
   */

    const valores = await this.localAlaSql(
      "USE Now;\
            select from " +
      alias +
      " where renco=?",
      recno
    );

    const dat_vis = {
      id_con: "",
      tip_llamada: "INSERT",
      // tok_aut: this.tok_aut,
      nom_vis,
      where: "",
      dat_act: valores,
    };

    try {
      const response = await this.axiosCall(dat_vis);
      if (response == null) return;

      /*
            const response = await axios.post(this.url + "sql", dat_vis, {
              headers: { "Content-type": "application/json" },
            });
      */
      const respuesta = response.data;

      /*
      this.insertLocalDb(alias, respuesta);
      */
      await this.localAlaSql(
        "USE Now;\
              UPDATE " +
        alias +
        "\
              set  key_pri=?,set timestamp=? where recno=? ",
        respuesta.key_pri,
        respuesta.timestamp,
        recno
      );

      await this.localAlaSql(
        "USE Last;\
              DELETE Last." +
        alias +
        " where recno=?;\
              INSERT INTO Last." +
        alias +
        " SELECT * from Now." +
        alias +
        " where recno=?",
        recno,
        recno
      );

      return;
    } catch (error) {
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );
      return false;
    }
  };

  /// /////////////  sqlexec /////////////////////
  // query  : Query a ejecutar
  /// ///////////////////////////////////////////

  execute = async (query: string, alias?: string, tip_res?: string) => {
    if (!alias) {
      alias = "sqlresult";
    }

    if (!tip_res) {
      tip_res = "T";
    }

    const dat_vis = {
      id_con: "",
      tip_llamada: "SQLEXEC",
      query,
    };

    try {
      //   console.log("Begin SQLEXEC  ", new Date().toISOString(), "Query=", query);

      const respuesta = await this.axiosCall(dat_vis);

      if (respuesta == null) return null;

      //  console.log('Db execute alias query,respuesta', dat_vis.query,respuesta)
      if (alias.toUpperCase() == "MEMVAR") {

        console.log("Db execute MEMVAR query=", query, "respuesta=", respuesta)
        return respuesta;
      }

      if (alias.toUpperCase() == "JSON") {
        const json = JSON.parse(respuesta);
        return json;
      }
      // Borramos localmente la tabla si existe

      this.View[alias] = {}; // Generamos el nuevo alias
      this.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
      this.View[alias].data = {}; // asignamos el valor del ultimo registro
      this.View[alias].recCount = 0; // Total de registros de la vista
      this.View[alias].eof = false; // Fin de archivo
      this.View[alias].bof = false; // Principio de archivo
      this.View[alias].row = -1; // Renglon posicionado el registro
      await this.select(alias);

      // console.log('Db SQLExec =====>',respuesta)
      // Generamos la extructura de la respuesta
      if (respuesta.length == 0) {
        return false;
      }

      // generamos registro recno y arreglo recnoVal
      const recnoVal = [];
      for (let i = 0; i < respuesta.length; i++) {
        respuesta[i].recno = i + 1;
        recnoVal[i] = { recno: i + 1, id: i };
      }

      //  console.log('Db Ejecutara ala con  :', respuesta)

      let resp = await this.localAlaSql(
        ` DROP TABLE IF EXISTS Last.${alias} ; DROP TABLE IF EXISTS Now.${alias} ; `
      );
      resp = await this.localAlaSql(` CREATE TABLE Now.${alias} ;`);
      resp = await this.localAlaSql(` SELECT * INTO Now.${alias} FROM ? ; USE Now ;`, [
        respuesta,
      ]);

      //   await this.localAlaSql(" USE Now ");
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
      //    console.log('Db Axios sqlexec',response[0][0])
      //    const respuesta = response.data;

      //* ******************** */
      if (respuesta.length > 0) {
        // si hay datos
        // Asignamos los valores a la vista
        //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
        this.View[alias].recno = respuesta.length; // asignamos el ultimo numero registro de trabajo
        this.View[alias].recCount = respuesta.length; // registros totales
        //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL
        this.View[alias].data = respuesta[respuesta.length - 1]; // asignamos el valor del ultimo registro
        this.View[alias].recnoVal = [...recnoVal];
        // console.log('Db exec ',this.View[alias])
      }

      //* ******************* */

      // console.log('Db Tabla creada en Now resp ',resp_sql)
      //console.log('Db Tabla creada en Now  ', await this.localAlaSql('USE Now ; SELECT * FROM ' + alias))
      /*
      console.log(
        "End SQLEXEC ",
        new Date().toISOString(),
        "Alias=",
        alias,
        "Registros=",
        respuesta.length
      );
      */

      if (tip_res.toUpperCase() == "NULL") return true;

      return respuesta;
    } catch (error) {
      console.error("SQL Error", error);
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );
      return false;
    }
  };
  /// ////////////////////////////////////////////
  //  Genera tablas en servidor de SQL
  /// ///////////////////////////////////////////

  genTabla = async (tabla: string) => {
    if (!tabla) {
      return;
    }
    const dat_vis = {
      id_con: "",
      tip_llamada: "GENTABLA",
      nom_tab: tabla,
    };

    try {
      const respuesta = await this.axiosCall(dat_vis);
      if (respuesta == null) return null;
      if (respuesta.length == 0) {
        MessageBox("Se genero la tabla " + tabla);
        return true;
      }
    } catch (error) {
      console.log("SQL Error", error.response);
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );
      return false;
    }
  };

  /// ////////////////////////////////////////////
  //  Genera indices en servidor de SQL
  /// ///////////////////////////////////////////

  genIndices = async (tabla: string, nom_ind: string) => {
    if (!nom_ind) nom_ind = "";
    if (!tabla) {
      return;
    }

    const dat_vis = {
      id_con: "",
      tip_llamada: "GENINDICES",
      nom_tab: tabla,
      nom_vis: nom_ind,
    };

    try {
      const respuesta = await this.axiosCall(dat_vis);
      if (respuesta == null) return null;
      if (respuesta.length > 0) {
        MessageBox(respuesta);
        return true;
      }
    } catch (error) {
      console.error("SQL Error", error);
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      return false;
    }
  };

  /// ////////////////////////////////////////////
  //  Genera vistas en servidor de SQL
  /// ///////////////////////////////////////////

  genVistasSql = async (tabla: string, nom_vis?: string) => {
    if (!tabla) {
      return;
    }
    if (!nom_vis) nom_vis = "";

    const dat_vis = {
      id_con: "",
      tip_llamada: "GENVISTASSQL",
      nom_tab: tabla,
      nom_vis: nom_vis,
    };

    try {
      const respuesta = await this.axiosCall(dat_vis);
      if (respuesta == null) return;
      if (respuesta.length > 0) {
        MessageBox(respuesta);
        return true;
      }
    } catch (error) {
      console.error("SQL Error", error);
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      return false;
    }
  };

  /// ////////////////////////////////////////////
  //  Genera MODEL en el backEnd
  /// ///////////////////////////////////////////

  genModel = async (tabla: string) => {
    if (!tabla) {
      return;
    }

    const dat_vis = {
      id_con: "",
      tip_llamada: "GENMODEL",
      nom_tab: tabla,
    };

    if (tabla == "ALL") {
      dat_vis.tip_llamada = "GENMODELS";
    }

    try {
      const respuesta = await this.axiosCall(dat_vis);
      if (respuesta == null) return;
      if (respuesta.length == 0 && dat_vis.tip_llamada == "GENMODEL")
        MessageBox("Se genero el MODEL para la tabla " + tabla + respuesta[0]);
      else
        MessageBox(
          "Se generaron todos los sequelize MODELS" + tabla + respuesta[0]
        );

      return true;
    } catch (error) {
      console.error("SQL Error", error);
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      return false;
    }
  };

  // ---  oJo        Checar si se necesita  ----------
  /// /////////////  Vfp select() /////////////////////
  // Vista de captura de datos
  //
  /// //////////////////////////////////////////////
  vista_captura = async (m: any, nom_vis: string, alias?: string) => {
    console.log("Db vista de captura alias ", nom_vis, alias);
    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = nom_vis;
    }
    let query =
      " SELECT fil_vis FROM man_comevis WHERE nom_vis= '" +
      nom_vis.trim() +
      "'";

    let exp_where = "";
    const dat_vis = {
      id_con: "",
      tip_llamada: "SQLEXEC",
      query,
    };

    const replacements: any = {};
    // obtenemos el filtro de la vista
    try {
      const data = await this.axiosCall(dat_vis);
      if (data == null) return null;
      // console.log('Db Respuesta axios data===>', data)
      const respuesta = data[0];
      // console.log('Db Axios gen_vista data[]==>data,m ',data,m)

      let nom_cam = "";
      let con_vis = ""; // generamos la condicion de la vista
      let exp_vis = data[0].fil_vis.trim().toLowerCase();
      let pos = exp_vis.indexOf(","); // Posicion de la primera coma

      while (pos > 0) {
        // Recorremos todas las variables del indice
        nom_cam = exp_vis.substr(0, pos);
        replacements[nom_cam] = m[nom_cam];
        con_vis = con_vis + nom_cam + " =: " + nom_cam;

        exp_vis = exp_vis.substr(pos + 1);
        pos = exp_vis.indexOf(",");
        if (pos > 0) {
          con_vis = con_vis + " AND ";
        }
      }
      if (exp_vis.length > 0) {
        replacements[exp_vis] = m[exp_vis];

        con_vis = " WHERE " + con_vis + exp_vis + "=:" + exp_vis;
      }

      exp_where = con_vis; // genera la expresion where
    } catch (error) {
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      // MessageBox( error.response.status.toString() + " " + error.response.statusText,16,"SQL Error " );

      console.error("SQL Error", error);

      return false;
    }

    query = " SELECT * FROM " + nom_vis + exp_where;
    const dat_sel = {
      id_con: "",
      tip_llamada: "SQLEXEC",
      query,
      opciones: { replacements },
    };
    // console.log('Db Axios ==>' + nom_vis, exp_where, replacements)
    try {
      const data = await this.axiosCall(dat_sel);
      if (data == null) return null;
      console.log("Db Axios genera vistas===>>>", data);
      // Aumentamos a la rspuesta el regitro recno
      return await this.genera_tabla(data, alias);
    } catch (error) {
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      console.error("SQL Error", error);
      // MessageBox(error.response.status.toString() + " " + error.response.statusText, 16, "SQL Error "      );
    }
  };

  /// /////////////  Vfp select() /////////////////////
  // are_sel : area seleccionada
  /// //////////////////////////////////////////////
  select = async (are_sel: unknown) => {
    // this.Form['dic_dat']['prop']['Status'] = 'F'

    // console.log('Db Select 0',this.Form)
    if (are_sel == null) {
      return this.num_are;
    }

    if (typeof are_sel === "number") {
      this.num_are = are_sel;
    } else {
      const alias: any = are_sel;
      this.num_are = this.are_tra.indexOf(alias) + 1; // busca el numero de alias
      // if (this.num_are == -1) this.num_are = 0
      // console.log('Db Db select num_are ====>>', are_sel, this.num_are)
    }
    /* revisar
        this.Form['dic_dat']['prop']['Status'] = 'G'
        this.Form['dic_dat']['prop']['Status'] = 'H'
        this.Form['dic_dat']['prop']['Status'] = 'I'
    */
    return this.num_are;
  };

  /// //////////////////////////////////////////////////
  // genera la tabla en alasql
  // data : json con la estructura de la tabla
  // alias : nombre que tendra la tabla
  // noData : si es useNodata
  // obs : Borrar si no se utiliza
  /// //////////////////////////////////////////////////
  async genera_vista(data: {}, alias: string, noData?: boolean) {
    alias = alias.trim();
    this.num_are = this.are_tra.indexOf(alias) + 1; // regresa un -1 si no hay elemento

    if (this.num_are == 0) {
      // si es una area de trabajo nueva busca si ya existe el alias
      this.are_tra.push(alias); // Se incremente en uno y se asigna que alias tiene
    } else {
      // Si existe la tabla borra los regisros
      // this.localAlaSql('USE Now ; ')
      await this.localAlaSql("delete from Now." + alias + "; ");
      // this.localAlaSql('USE Last ; ')
      await this.localAlaSql("delete from  Last." + alias + "; ");
      return;
    }
    // Si es una vista nueva
    this.num_are = this.are_tra.indexOf(alias) + 1; // asigna el numero de area de trabajo
    // Obtenemos la estructura de la vista desde la base de datos

    /// ///   Estructura
    const dat_est = {
      id_con: "",
      tip_llamada: "GETDEF",
      query: alias,
    };
    //    console.log('Db Axios ==>' + nom_vis, exp_where, replacements)
    try {
      const data = await this.axiosCall(dat_est);
      if (data == null) return;
      // console.log('Db Estructura vistas===>>', data)
    } catch (error) {
      this.errorAlert(
        "SQL Error :" +
        error.response.status.toString() +
        " " +
        error.response.statusText
      );

      //MessageBox( error.response.status.toString() + " " + error.response.statusText, 16,"SQL Error " );

      return;
    }

    // Inicializamos la vista
    if (!this.View[alias]) {
      this.View[alias] = {}; // Generamos el nuevo alias
      this.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal

      if (noData) {
        // agregamos todos los componente de uno por uno para no romper la reactividad
        for (const comp in data) {
          this.View[alias][comp] = data[comp]; // asignamos su estructura si es de una vista actualizable
        }
      }
    }
    // por reactividad borramos de uno por uno
    while (this.View[alias].recnoVal.length > 0) {
      this.View[alias].recnoVal.pop();
    }

    //    delete this.View[alias]['valores']  // borramos el registro de valores
    this.View[alias].recno = 0; // asignamos el ultimo numero registro de trabajo
    this.View[alias].recCount = 0; // registros totales
    this.View[alias].tablaSql = alias; // tabla en servidor SQL

    if (!noData || data.length > 0) {
      // si hay datos
      // Generamos el campo recno
      const recnoVal = [];
      for (let i = 0; i < data.length; i++) {
        data[i].recno = i + 1;
        //        recnoVal[i] = i + 1
        recnoVal[i] = { recno: i + 1, id: i };
      }

      // Asignamos los valores a la vista

      //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
      this.View[alias].recno = data.length; // asignamos el ultimo numero registro de trabajo
      this.View[alias].recCount = data.length; // registros totales
      this.View[alias].tablaSql = alias; // tabla en servidor SQL
      this.View[alias].data = data[data.length - 1]; // asignamos el valor del ultimo registro

      // this.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion

      // Bora las tablas
      await this.localAlaSql(
        "USE Now ; DROP TABLE IF EXISTS Now." + alias + ";"
      );
      await this.localAlaSql(
        "USE Last ; DROP TABLE IF EXISTS Last." + alias + ";"
      );

      await this.select(alias);

      alasql
        .promise(
          "USE Now; CREATE TABLE " +
          alias +
          " ; \
      SELECT * INTO Now." +
          alias +
          "  FROM ?",
          [data]
        )
        .then(function () {
          // Generara la tabla en Last (old)
          alasql
            .promise(
              "USE Last; CREATE TABLE " +
              alias +
              " ; \
          SELECT * INTO " +
              alias +
              " FROM Now." +
              alias
            )

            .catch(function (error) {
              console.error("Error al generar Vis_captura" + alias, error);
            });
        });

      // revisar despues si al insertar los datos el recno queda como lo habiamos generado
      // o seleccionar los recno para llenar el recnoval
      // recnoVal=this.localAlaSql(SELECT recno FROM Now.' + alias)

      this.View[alias].recnoVal = [...recnoVal]; // utilizamos el spread Operator
      // console.log('Db RecnoVal===>', this.View[alias].recnoVa)
    } else {
      this.View[alias].data = {};
    } // no hay datos
  }

  /// //////////////////////////////////////////////////
  // genera la tabla en alasql
  // respuesta : json con los renglones para generar la tabla
  // alias : nombre que tendra la tabla
  // noData : si es useNodata
  /// //////////////////////////////////////////////////

  genera_tabla = async (respuesta: any, alias: string, noData?: boolean) => {
    alias = alias.trim();
    this.num_are = this.are_tra.indexOf(alias) + 1; // regresa un -1 si no hay elemento

    // borra las tablas en ALA
    await this.localAlaSql("DROP TABLE IF EXISTS Now." + alias + ";");
    await this.localAlaSql("DROP TABLE IF EXISTS Last." + alias + ";");

    if (!this.View[alias]) {
      console.log("Db geneta_tabla ", alias);
      noData = true;
    } // No hay definicion de vista

    if (this.num_are == 0) {
      // si es una area de trabajo nueva
      this.are_tra.push(alias);
      noData = true;
    } /*
    else { // Si existe la tabla borra los registros
      // this.localAlaSql('USE Now ; ')
      await this.localAlaSql('delete from Now.' + alias)
      // this.localAlaSql('USE Last ; ')
      await this.localAlaSql('delete from  Last.' + alias)
    }
    */
    this.num_are = this.are_tra.indexOf(alias) + 1; // asigna el numero de area de trabajo

    // Inicializamos la vista

    if (noData) {
      this.View[alias] = {}; // Generamos el nuevo alias
      this.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
      this.View[alias].tip_obj = respuesta.tip_obj; // MODEL O VIEW
      this.View[alias].tablaSql = respuesta.nom_tab; // nombre de tabla en servidor SQL
      this.View[alias].exp_indice = respuesta.exp_indice;
      this.View[alias].exp_where =
        respuesta.exp_where == null ? " " : respuesta.exp_where;
      this.View[alias].order = respuesta.ord_vis; // orden de la vista

      this.View[alias].data = {}; // asignamos el valor del ultimo registro
      this.View[alias].val_def = { recno: "recno" }; // valores default
      this.View[alias].recCount = 0; // Total de registros de la vista
      this.View[alias].eof = false; // Fin de archivo
      this.View[alias].bof = false; // Principio de archivo
      this.View[alias].row = -1; // Renglon posicionado el registro

      // agregamos toda la definicion de la tabla

      if (!respuesta.est_tabla) {
        // Si no hay estructura de la tabla
        /// ///   Obtiene la Estructura
        const dat_est = {
          id_con: "",
          tip_llamada: "GETDEF",
          query: alias,
        };
        //    console.log('Db Axios ==>' + nom_vis, exp_where, replacements)
        try {
          const estructura = await this.axiosCall(dat_est);
          if (estructura == null) return null;
          // console.log('Db Data vista===>>', respuesta)

          respuesta.est_tabla = estructura;
          // console.log('Db Estructura vista===>>', respuesta)
        } catch (error) {
          console.error("SQL Error", error);
          this.errorAlert(
            "SQL Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
          );
          //MessageBox( error.response.status.toString() + " " + error.response.statusText, 16, "SQL Error " );

          return null;
        }

        /// /////////////////////////////
      }
      // borra las tablas en ALA
      //  await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + ';')
      //  await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + ';')

      this.View[alias].est_tabla = respuesta.est_tabla; // estructura de la tabla

      // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
      let des_tab = " CREATE TABLE " + alias + " (recno INT PRIMARY KEY";

      for (const nom_ele in respuesta.est_tabla) {
        // genera la descripcion de la tabla para generarla en alasql
        des_tab =
          des_tab + "," + nom_ele + " " + respuesta.est_tabla[nom_ele].tip_cam;

        if (respuesta.est_tabla[nom_ele].tip_cam == "STRING")
          des_tab = des_tab + "(" + respuesta.est_tabla[nom_ele].lon_dat + ")";

        const val_def = respuesta.est_tabla[nom_ele].val_def;
        // const val_def=respuesta.est_tabla[nom_ele].replace('undefined','null')

        this.View[alias].val_def[nom_ele] = val_def;

        //  this.View[alias]["val_def"] = val_def.replace('undefined','null')    ; // valores default

        //        val_def = val_def + nom_ele + ':' + respuesta.est_tabla[nom_ele].val_def + ','

        /*  Indexed Local Data base
        this.newTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
        this.oldTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
        */
      }
      // console.log('Db Estructura View respuesta===>', alias, respuesta)
      // console.log('Db Estructura View ===>', alias, this.View[alias].val_def)

      des_tab = des_tab + ")";
      // console.log('Db Valores default=====>',alias,this.View[alias].val_def)

      // console.log('Db ALASQL Estructura ===>',des_tab)
      // Creamos la tablas
      console.log("Db ins_sql=", des_tab);

      try {
        //  await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + '; ')
        await this.localAlaSql("USE Now ;" + des_tab);

        //  await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + '; ')
        await this.localAlaSql("USE Last ;" + des_tab);
      } catch (error) {
        console.warn("Db ala error", error, des_tab);
      }
    }

    // por reactividad borramos de uno por uno
    while (this.View[alias].recnoVal.length > 0) {
      this.View[alias].recnoVal.pop();
    }

    //    delete this.View[alias]['valores']  // borramos el registro de valores
    this.View[alias].recno = 0; // asignamos el ultimo numero registro de trabajo
    this.View[alias].recCount = 0; // registros totales

    /*    this.View[alias]["tablaSql"] = respuesta.nom_tab; // nombre de tabla en servidor SQL
        this.View[alias]["exp_indice"] =respuesta.exp_indice
        this.View[alias]["exp_where"] =respuesta.exp_where
        this.View[alias]["tip_obj"] = respuesta.tip_obj
    */
    // console.log('Db Genera_tabla final==>',this.View[alias],alias)
    if (noData) {
      console.log("Db genera_tabla View creada", alias, this.View[alias]);
      return await this.localAlaSql(`select * from ${alias} limit 0`);
    }

    // console.log('Db Genera_tabla datos==>', respuesta)

    if (respuesta.length > 0) {
      // si hay datos
      // Generamos el campo recno
      const recnoVal = [];
      for (let i = 0; i < respuesta.length; i++) {
        respuesta[i].recno = i + 1;
        //        recnoVal[i] = i + 1
        recnoVal[i] = { recno: i + 1, id: i };
      }

      // Asignamos los valores a la vista

      //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
      this.View[alias].recno = respuesta.length; // asignamos el ultimo numero registro de trabajo
      this.View[alias].recCount = respuesta.length; // registros totales
      //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL
      this.View[alias].data = respuesta[respuesta.length - 1]; // asignamos el valor del ultimo registro

      // Borra las tablas
      //      await this.localAlaSql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + ';')
      //      await this.localAlaSql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + ';')

      await this.select(alias);

      try {
        await this.localAlaSql(
          "USE Now; CREATE TABLE Now." +
          alias +
          " ; \
          SELECT * INTO Now." +
          alias +
          "  FROM ?",
          [respuesta]
        );
        await this.localAlaSql(
          "USE Last; CREATE TABLE Last." +
          alias +
          " ; \
          SELECT * INTO Last." +
          alias +
          "  FROM ?",
          [respuesta]
        );
      } catch (error) {
        console.error("Error al generar Vis_captura" + alias, error);
        return null;
      }

      this.View[alias].recnoVal = [...recnoVal]; // utilizamos el spread Operator

      //console.log('Db View leida respuesta ===>', alias, respuesta)

      // si  no hay asignacion a valores de componentes

      if (!this.View[alias].componente) {
        return respuesta;
      }

      const componente = this.View[alias].componente;
      // revisar no entiendo
      for (const comp in componente) {
        // recorre componente por componente
        for (let i = 0; i < comp.length; i++) {
          componente[comp][i].value = recnoVal[comp]; // asignamos el valor a c/componente del form
        }
      }

      return respuesta;
    } else {
      this.View[alias].data = {};
    } // no hay datos
  };

  /// /////////////  Vfp recCount() /////////////////////
  // alias    : Alias
  /// ////////////////////////////////////////////
  async recCount(alias?: string) {
    // const vis_act = obj_vis.value;
    //console.log('Db Reccount alias ===', alias)

    if (!alias) {
      // alias = this.are_tra[-1]; // buscamos a cual alias pertenece
      alias = this.are_tra[this.num_are - 1];
    }

    if (!this.View[alias]) {
      console.warn("recCount() No existe el alias", alias);
      return 0;
    }

    //    if (!alias) MessageBox('No existe el alias',alias)
    //         return 0

    return this.View[alias].recCount;
  }

  /// /////////////  Vfp reccno() /////////////////////
  // alias    : Alias
  /// ////////////////////////////////////////////
  async recno(alias: string) {
    // const vis_act = obj_vis.value;

    if (alias == null) {
      alias = this.are_tra[this.num_are - 1]; // buscamos a cual alias pertenece
    }
    return this.View[alias].recno;
  }

  /// /////////////////////////////  local Db ///////////////////////////////////

  // Borra  LocalDb
  borraLocalDb = async (db_name: string) => {
    const req = await indexedDB.deleteDatabase(db_name);
    req.onsuccess = function () {
      console.log("Db Deleted database successfully ", db_name);
    };
    req.onerror = function () {
      console.log("Couldn't delete database ", db_name);
    };
    req.onblocked = function () {
      console.log(
        "Couldn't delete database due to the operation being blocked ",
        db_name
      );
    };

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

                            console.log('Db Creo Temp_')
                          }).
                          catch((error)=>{
                            console.log('Db Error al borrar Base de datos Local')

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
MessageBox.this.errorAlert(
error,
"Error clear localDb ",
"error"
);
return false;
}

*/
  };

  // Crea tablas en  LocalDb

  async axiosCall(dat_lla: Record<string, unknown>) {
    if (
      !(this.session.id_con > " ") ||
      this.session.user == "" ||
      this.session.nom_emp == ""
    ) {
      console.log(
        "Data bases session =======>",
        this.session.id_con,
        this.session.user,
        this.session.nom_emp
      );
      this.errorAlert("Back End error : Session not active");
      //MessageBox("Back End error", 16, "SQL Error Open");

      const router = useRouter();
      //window.close()
      router.push("/Login");
      return;
    }

    dat_lla.id_con = this.session.id_con; // asignamos el id de connexion

    /*   Creo que ya quedo fuera de uso
   const broadcast=this.socketIo?this.session.socketId+new Date().getTime().toString():''

    if (broadcast>''){
       dat_lla.broadcast=broadcast
        this.socketIo.on(broadcast), async (res: {}) => {
          const respuesta = res.data
          console.log('Sockect response  ======>>>', dat_lla, 'respuesta', 'OK')
          return respuesta        

        }
          this.socketIo.emit('sql async',dat_lla)
    }

   */
    // hay socket de conexion // Tenemos que poner en verdadero para utilizar sockets

    if (this.socket.value && false) {
      try {
        if (dat_lla.tip_llamada == "UPDATE") {
          console.log(" DataBase Socket UPDATE data =", dat_lla.dat_act);
          /* // busqueda del campo timestamp para trasmitirlo
        for (const campo in dat_lla.dat_act) {

             console.log('Socket UPDATE campo =',campo,'valor ',dat_lla.dat_act[campo],'typeof=',typeof dat_lla.dat_act[campo])

              if (typeof dat_lla.dat_act[campo]=='buffer'){
                var buffArray = new Uint8Array(dat_lla.dat_act[campo]);
                dat_lla.dat_act[campo]=buffArray

              }
           }
         */
        }

        const data = await this.session.updateSql(dat_lla); // llama sockets
        console.log(" DataBase Socket UPDATE ok data=", data);
        return data;
      } catch {
        console.warn("Error SQL Scoket");
      }
    }

    const ThisForm: any = this.Form;
    let numIntentos = 0;
    let numLogin = 0;

    const controller = new AbortController();
    const signal = controller.signal;
    // cancel the request,  controller.abort()
    // el signal en la llamada no llevara nada  signal
    // console.log('Db Axios call llamada  ======>>>', dat_lla, this.url)
    // this.axiosActive = true;
    setTimeout(() => controller.abort(), 60000); // 60 segundos

    do {
      try {
        const response = await axios.post(this.session.url + "sql", dat_lla, {
          signal, //: AbortSignal.timeout(300000),  // milisegundos 5 minutos
          //    headers: { 'Content-type': 'application/json' },
        });
        /*
        data - The response body provided by the server. If the response from the server is a JSON, Axios will automatically parse data into a JavaScript object.
        status - The HTTP status code from the response e.g. 200, 400, 404.
         */
        //  this.axiosActive = false;
        const respuesta = response.data;
        console.log(
          "5 Db Axios call response  ======>>>",
          dat_lla,
          "respuesta",
          "OK",
          respuesta
        );
        return respuesta;
      } catch (error) {
        console.log("Axios stop=====>>>>>>> ", error);
        const messageError = error.response && error.response.data ? error.response.data : ''

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Axios error.response.data', error.response.data);
          //     console.log('Axios error.response.status',error.response.status);
          //    console.log('Axio error.response.headers',error.response.headers);

        }

        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
          this.errorAlert("User cancel request :");
          //await MessageBox( error.response.statusText, 16, "User cancel request "       );
          numLogin = 3;
        } else {
          //handle the error

          // status - The HTTP status code from the response e.g. 200, 400, 404.
          // statusText - The HTTP status message from the server response e.g. OK, Bad Request, Not Found.

          //  const error = thrown;


          //          this.errorAlert("SQL Data Base Error  :" + error.response.data);
          await this.errorAlert("SQL Data Base Error  :" + messageError);


          //await MessageBox( error.response.status.toString() + " " + error.response.statusText,16, "SQL Data Base Error "  );

          // si es un error de desconexion
          if (error.response.status.toString() == "401") {
            if (this.session.nom_emp == "") {
              const router = useRouter();
              router.push("/Login");
              return;
            }

            // this.axiosActive = false;
            const { id_con } = storeToRefs(this.session); //pasa los elementos por referencia al Global
            id_con.value = "";
          }
          numIntentos++;

          if (
            (!window.navigator.onLine &&
              !error.response &&
              error.code === "ERR_NETWORK") ||
            error.toJSON().message === "Network Error"
          ) {
            this.errorAlert(
              "No internet connection. Try " +
              numIntentos.toString() +
              " to reconnect"
            );
          } else return false;

          if (numIntentos == 5) {
            numLogin++;
            //const session=storeToRefs(Session)
            // const session = Session()
            const { id_con } = storeToRefs(this.session); //pasa los elementos por referencia al Global

            //          ThisForm.prop.login = false
            id_con.value = ""; // borra session
            await this.delay(10000); // espera 10 segundos
            if (id_con.value == "") numLogin = 3;
          } else await this.delay(2000); // espera 2 segundos para tratar de reconectar
        }
      } // Fin catch error
    } while (numLogin < 3);
    // this.axiosActive = false;
    MessageBox('Connection error. Try ' + numIntentos.toString() + ' to reconnect', 16, "ERROR");
    window.close();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  /// /////////////////////////////////////////////////
  // Instruccion sql base de datos local
  // db_name :Base de datos a utilizar
  // ins_sql : Instruccion SQL
  /// //////////////////////////////////////
  public async localSql(ins_sql: string, DataBase?: string) {
    if (!DataBase) {
      DataBase = "Now";
    }

    // console.log('Db localSql===>>', DataBase.toLowerCase)

    if (DataBase.toUpperCase() == "NEW" || DataBase.toUpperCase() == "NOW") {
      DataBase = "Now";
    }

    if (DataBase.toUpperCase() == "OLD" || DataBase.toUpperCase() == "LAST") {
      DataBase = "Last";
    }

    try {
      ins_sql = "USE " + DataBase + " ; " + ins_sql;
      // console.log('Db localSQL===>',ins_sql)
      const resultado = await this.localAlaSql(ins_sql);
      // console.log('Db Lectura SQL',resultado[1][0])
      return resultado[1];
    } catch (error) {
      console.error("localSql error==>", error);
    }
  }

  /// /////////////////////////////////////////////////
  // Instruccion sql base de datos local
  // db_name :Base de datos a utilizar
  // ins_sql : Instruccion SQL
  /// //////////////////////////////////////
  public async localAlaSql(ins_sql: string, datos?: any) {
    /*    if (ins_sql.slice(0,9)!='DROP DATA' || ins_sql.slice(0,11)!='CREATE DATA')
       await alasql('USE Now ;')
*/
    //  await alasql('USE Now ;') // 12/Feb/2024
    try {
      if (!datos) return await alasql(ins_sql);

      return await alasql(ins_sql, datos);
    } catch (error) {
      console.error("localAlaSql error==>", error, ins_sql);
      this.errorAlert("local SQL error :" + ins_sql);
      //      MessageBox(ins_sql + " " + error, 16, "Error Ala SQL ");

      return false;
    }
  }

  public async selectInto(ins_sql: string, alias?: string, filename?: string) {
    // alias  : TXT(filename)
    //          CSV(filename,options)
    //          XLSX("restest280b.xlsx")
    try {
      await this.localAlaSql(" USE Now ; ");

      if (!alias) {
        alias = "sqlresult";
      }

      alias = alias.toUpperCase();
      ins_sql = ins_sql.trim();

      let resultado = {};
      if (
        alias == "TXT" ||
        alias == "CSV" ||
        alias == "TAB" ||
        alias == "TSV" ||
        alias == "XLSX" ||
        alias == "HTML" ||
        alias
      ) {
        alasql
          .promise(ins_sql + " INTO " + alias + "(" + filename + ")")
          .then(function (data) {
            resultado = data;
            // console.log('Db Datos Guardados');
          })
          .catch(function (err) {
            console.error("select Into Error:", err);
          });
      } else {
        await this.localAlaSql("DROP TABLE IF EXISTS " + alias + "; ");

        const resultado = await this.localAlaSql(ins_sql + " INTO " + alias);

        if (resultado.length) {
          // el resultado es un arreglo
          this.select(alias);
          await this.localAlaSql(
            " CREATE TABLE IF NOT EXISTS" +
            alias +
            " ; \
        SELECT * INTO " +
            alias +
            "  FROM ?",
            [resultado]
          );
          const resp = await this.localAlaSql("select * from " + alias);
        }
      }
      return resultado;
    } catch (error) {
      console.error("SelectInto error==>", error);
    }
  }

  //= ===============================

  /// /////////////////////////////////////////////////
  // Lee Value de la tabla local
  /// //////////////////////////////////////
  readCampo = async (
    ControlSource: string,
    recno: number,
    DataBase?: string
  ) => {
    if (ControlSource == "") {
      return;
    } // No  hay ControlSource

    if (!DataBase) {
      DataBase = "Now";
    }

    if (DataBase.toUpperCase() == "NEW" || DataBase.toUpperCase() == "NOW") {
      DataBase = "Now";
    }

    if (DataBase.toUpperCase() == "OLD" || DataBase.toUpperCase() == "LAST") {
      DataBase = "Last";
    }

    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) {
      return;
    } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    //  console.log('Db readCampo=', tabla, campo, recno)

    const data = await this.readValue(tabla, campo, recno, DataBase);
    // console.log('Db Read renglon ',data[0])

    //    return data[0][campo]
    return data[0];
  };

  /// /////////////////////////////////////////////////
  // Lee Valor de un campo
  /// //////////////////////////////////////
  readValue = async (
    tabla: string,
    campos: string,
    recno: number,
    DataBase: string
  ) => {
    //console.log('Db readValue Select=====>', tabla, campos, recno)

    const data = await this.localAlaSql(
      "USE " +
      DataBase +
      " ; SELECT " +
      campos +
      ",key_pri  FROM " +
      tabla +
      " WHERE recno=? ;",
      recno
    );

    if (data.length > 1) {
      for (const campo in data[1][0]) {
        if (campo != "key_pri" && typeof data[1][0][campo] === "string") {
          data[1][0][campo] = data[1][0][campo].trim();
        }
      }
      this.View[tabla].Recno = recno // actualizamos el recno de la vista
      return data[1]; // todos los campos
    }
    return null;
  };

  /// /////////////////////////////////////////////////
  // Graba Value de la tabla local
  /// //////////////////////////////////////
  updateCampo = async (Value: any, ControlSource: string, recno: number) => {
    // async update(Value: any) {
    //  const ControlSource = this.ControlSource;
    // console.log('Db updateCampo===', Value, ControlSource)

    if (ControlSource == "" || recno == 0) {
      return;
    } // No  hay ControlSource
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) {
      return;
    } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    let valor = "";

    switch (typeof Value) {
      case "number":
        valor = Value.toString();
        break;
      case "string":
        valor = Value.replaceAll("'", "''");
        valor = "'" + valor + "'";
        break;
      case "boolean":
        valor = Value.toString();
        break;
      default:
        valor = "'" + Value + "'";
        break;
    }

    //    if (typeof Value=='string' || )

    try {
      //     await this.localAlaSql('USE Now;')
      const ins_sql = `USE Now; UPDATE ${tabla}  set ${campo}=${valor}  WHERE recno=${recno}`;
      // console.log("Db update ala===>", ins_sql);
      await this.localAlaSql(ins_sql);
    } catch (error) {
      console.error("AlaSql error==>", error);
    }
    return true;
  };

  /// /////////////////////////////////////////////////
  // Graba Value de la tabla local
  /// //////////////////////////////////////
  asignaComponente_xx = async (ControlSource: string, refValue: any) => {
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) {
      return;
    } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const alias = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

    // Si no esta dado de alta la vista, componente
    if (!this.View[alias]) {
      this.View[alias] = {
        recnoval: [],
      };
    } // objeto vacio

    if (!this.View[alias].componente) {
      this.View[alias].componente = {};
    } // arreglo vacio

    if (!this.View[alias].componente[campo]) {
      this.View[alias].componente[campo] = [];
    }

    this.View[alias].componente[campo].push(refValue); // aumenta el arreglo con las referencias componentes
  };

  /// /////////////////////////////////////////////////
  // goto : se mueve al registro donde si
  // despla : Si es numerico brinca al recno con ese numero,
  //          Si es string top=brinca la primer registro del alias, botton=brinca la ultimo registro del alias
  /// //////////////////////////////////////
  goto = async (despla: unknown) => {
    if (!this.are_tra[this.num_are - 1]) {
      return false;
    }
    const alias = this.are_tra[this.num_are - 1];

    this.View[alias].eof = false;
    this.View[alias].bof = false;

    let data = [];
    let recno = 0;
    if (typeof despla === "number") {
      recno = despla;
    } else {
      // desplazamiento top o bottom
      if (despla == "top") {
        data = await this.localAlaSql(
          "USE Now; SELECT top 1 recno   FROM " + alias + " order by recno desc"
        );
      }
      if (despla == "bottom") {
        data = await this.localAlaSql(
          "USE Now; SELECT top 1 recno   FROM " + alias + " order by recno "
        );
      }

      if (data.length > 1) {
        recno = data[1][0][recno]; // un solo campo
      }
      this.View[alias].row = -1;
      if (recno > 0) {
        for (let row = 0; this.View[alias].recnoVal.lenght; row++) {
          if (this.View[alias].recnoVal[row].recno == recno) {
            this.View[alias].row = row;
            break;
          }
        }
        //          this.View[alias].row   = this.View[alias].recnoVal
        //          this.View[alias].recno = this.nowValue(alias, 'recno', recno) // asignamos valores del alias posicionado
      } else {
        // this.View[alias].recnoVal = []
        this.View[alias].row = -1;
        if (despla == "top") {
          this.View[alias].eof = true;
        } else {
          this.View[alias].bof = true;
        }

        return false;
      }
    }

    // leedatos
    data = await this.localAlaSql(
      "USE Now; SELECT *   FROM " + alias + "  where recno=?",
      recno
    );
    // console.log('Db goto data ',data[1][0])

    if (data[1].length > 0) {
      this.View[alias].recno = recno;
      const row = this.View[alias].recnoVal.find((ele) => ele.recno == recno);
      this.View[alias].row = row.id;
      this.View[alias].data = data[1][0];
      // console.log('Db goto view',this.View[alias])
      if (data[1].length == 1) {
        this.View[alias].eof = true;
        this.View[alias].bof = true;
      }

      return data[1][0];
    }

    /*
        for (let i = 0; i < this.View[alias].recnoVal.length; i++) {
          if (recno==this.View[alias].recnoVal[i].recno){
             row=i
             break
          }
        }
    */
    this.View[alias].eof = true;
    this.View[alias].recno = 0;
    this.View[alias].row = -1;
    this.View[alias].data = {};

    return null;
  };

  /// /////////////////////////////////////////////////
  // skip : se mueve registro en forma relativa donde este el recno
  // despla : Si es positivo hacia adelante y negativo hacia atras
  /// //////////////////////////////////////
  skip = async (despla?: number) => {
    if (!despla) {
      despla = 1;
    }

    if (!this.are_tra[this.num_are - 1]) {
      return false;
    }
    const alias = this.are_tra[this.num_are - 1];
    this.View[alias].eof = false;
    this.View[alias].bof = false;

    let data = [];
    const row = this.View[alias].row;
    //    let recno = this.View[alias].recnoVal(row)
    let recno = this.View[alias].recnoVal[row].recno;

    if (despla > 0) {
      data = await this.localAlaSql(
        "USE Now; SELECT top " +
        despla.toString +
        "  FROM " +
        alias +
        " where recno>" +
        recno.toString +
        " order by recno "
      );
    } else {
      data = await this.localAlaSql(
        "USE Now; SELECT top " +
        despla.toString +
        "  FROM " +
        alias +
        " where recno<" +
        recno.toString +
        " order by recno desc"
      );
    }

    if (data[1].length > 0) {
      // Si regreso datos
      const ult_ele = data[1].length;
      if (despla > 0 && ult_ele < despla) {
        // si el desplazamiento es positivo
        this.View[alias].eof = true;
      }

      if (despla < 0 && ult_ele < despla * -1) {
        // si el desplazamiento es negativo
        this.View[alias].bof = true;
      }

      recno = data[1][ult_ele - 1][recno]; // asigna el ultimo elemento
    } else if (despla > 0) {
      this.View[alias].eof = true;
    } else {
      this.View[alias].bof = true;
    }
    return await this.goto(recno); // se va a leer registro
  };

  /// /////////////////////////////////////////////////
  // scatter Lee los datos del registro actual
  // tipo : MEMVAR (todos los registros), FIELDS (solo los campos que esten en FIELDS )
  /// //////////////////////////////////////
  scatter = async (tipo?: String, fields?: []) => {
    let resultado = {};
    if (!this.are_tra[this.num_are - 1]) {
      return false;
    }
    const alias = this.are_tra[this.num_are - 1];
    //    const recno = this.View[alias].recnoVal[this.View[alias].row]
    const recno = this.View[alias].recnoVal[this.View[alias].row].recno;

    const data = await this.goto(recno); // lee los datos actuales
    if (data[1] && data[1].length == 0) {
      return null;
    }

    if (tipo.toLowerCase() == "MEMVAR") {
      resultado = data[1];
    }

    if (tipo.toLowerCase() == "FIELDS") {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        resultado[field] = data[1][field];
      }
    }
    if (data[1].length > 0) {
      return data[1];
    }
    return null;
  };

  /// //////////////////////////////
  // Clona una vista local
  // baseAlias: Vista local la cual se va clonar
  // alias: Vista en donde quedara la vista clonada
  // filters: Variables que filtraran la vista clonada
  /// //////////////////////////////
  public localClone = async (
    baseAlias: string,
    alias: string,
    filters: any,
    force?: boolean
  ) => {
    alias = alias.trim();
    let where = "";
    console.log("Db DataBAse LocalCLone filters", filters);
    for (const variable in filters) {
      if (where > " ") where = where + " and ";

      var cam = filters[variable];
      var campo = "";
      const tipo = typeof cam;
      var comillas = "";
      var com_trim = "";
      var ter_trim = "";
      switch (tipo) {
        case "number":
          campo = cam.toString();
          break;
        case "bigint":
          campo = cam.toString();
          break;
        case "boolean":
          campo = cam ? "1" : "0";
          break;
        case "string":
          comillas = "'";
          campo = cam.trim();
          com_trim = "trim(";
          ter_trim = ")";
          break;
      }

      where =
        where +
        `${com_trim} ${variable} ${ter_trim}=${comillas}${campo}${comillas}`;
    }
    if (where > "") where = " where " + where;

    console.log("Db DataBase Clone where ", where);

    if (!this.View[alias] || force) {
      // si no existe el alias
      this.View[alias] = this.View[baseAlias]; // Copiamos su definicion

      // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
      let des_tab = " CREATE TABLE " + alias + " (recno INT PRIMARY KEY";
      const est_tabla = this.View[alias].est_tabla;
      for (const nom_ele in est_tabla) {
        // genera la descripcion de la tabla para generarla en alasql
        des_tab = des_tab + "," + nom_ele + " " + est_tabla[nom_ele].tip_cam;
      }

      des_tab = des_tab + ");";
      // Creamos la tablas
      await this.localAlaSql(
        "USE Now ; DROP TABLE IF EXISTS Now." + alias + "; " + des_tab + "; "
      );

      await this.localAlaSql(
        "USE Last ; DROP TABLE IF EXISTS Last." + alias + "; " + des_tab + "; "
      );

      //console.log('Db clone DB ',    await this.localAlaSql('select * from '+ alias ))
    }

    // borramos los datos
    await this.useNodata(alias);
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

    //console.log('Db Clone Datos  ',baseAlias,alias,await this.localSql(`select * from Now.${baseAlias}  ${where}`))

    // var query = `select * INTO ${alias} from Now.${baseAlias}  ${where}`
    var query = `select *  from Now.${baseAlias}  ${where}`;

    const respuesta = await this.localSql(query);
    console.log("Db Clone respuesta ", query, respuesta);
    //query = `select *  from Now.${alias} `
    //const respuesta = await this.localSql(query)

    // Generamos el campo recno
    if (respuesta.length > 0) {
      const recnoVal = [];
      for (let i = 0; i < respuesta.length; i++) {
        const recno = respuesta[i].recno;
        respuesta[i].recno = i + 1;
        /*  if (respuesta[i].recno!=recno){
           query = `update Now.${alias} set recno=${respuesta[i].recno} where recno=${recno} `
           await this.localSql(query)
         }
        */

        recnoVal[i] = { recno: i + 1, id: i };
        await this.localAlaSql("INSERT INTO Now." + alias + " VALUES ?", [
          respuesta[i],
        ]);
        await this.localAlaSql("INSERT INTO Last." + alias + " VALUES ?", [
          respuesta[i],
        ]);
      }

      console.log(
        "Db Clone Last ",
        await this.localSql("select * from Last." + alias)
      );

      //Generamos el Last
      //query = `select * INTO Last.${alias} from New.${alias}`

      this.View[alias].recno = respuesta.length; // asignamos el ultimo numero registro de trabajo
      this.View[alias].recCount = respuesta.length; // registros totales
      //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL
      this.View[alias].data = respuesta[respuesta.length - 1]; // asignamos el valor del ultimo registro
      this.View[alias].recnoVal = [...recnoVal]; // utilizamos el spread Operator
    }
  };

  public async jasperReport(query: string, for_rep: string, dataView?: string) {
    if (!dataView) dataView = "";

    const dat_rep = {
      id_con: this.session.id_con,
      tip_llamada: "JASPERREPORT",
      jrxml: for_rep,
      dataView,
      query,
    };
    console.log("Db JasperReport Llamada", dat_rep);
    // display contruyendo reporte

    try {
      const response = await axios.post(this.session.url + "sql", dat_rep, {
        responseType: "arraybuffer",
      });
      console.log;
      return response.data;
    } catch (error) {
      this.errorAlert("Report Server Error  :" + error.response.statusText);
      //await MessageBox(error.response.statusText, 16, "Report Server Error  ");
      return null;
    }

    //   const buffer=await this.axiosCall(dat_rep)
    //   return buffer
  }

  /// //////////////////////////////
  // portea la funcion alasql a VfpCursor
  /// //////////////////////////////
  public VfpCursor = async (query: String) => {
    const data = await this.localAlaSql(query);
    // console.log('Db VfpCursor ==>', data)
    return data;
  };


  async errorAlert(message: string) {

    await MessageBox(message, 16, "SQL Server Error  ");
    //alert(message);
  }

  // Fin de la clase================================
}
