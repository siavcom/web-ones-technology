//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////
//import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'
import { queryPri } from '@/classes/queryGen/queryPri'
import { queryUsu } from '@/classes/queryGen/queryUsu'
import { queryGen } from '@/classes/queryGen/queryGen'
import { bt_obtener } from './bt_obtener'
import { var_ord } from './var_ord'
import { for_imp } from './for_imp'
import { report } from './report/report'
import { bt_pdf } from './bt_pdf'

export class reportForm extends FORM {
  public var_ord = new var_ord()   // variable de orden principal de la vista
  public queryPri = new queryPri()
  public queryUsu = new queryUsu()
  public queryGen = new queryGen()
  public for_imp = new for_imp()
  public bt_obtener = new bt_obtener()
  public bt_pdf = new bt_pdf()
  public report = new report()
 
 
  tab_ord:string=''      // tabla para indicar el orden del reporte
  vis_rep: string = ''   // nombre de la vista sql a utilizar en el reporte
  ord_vis: string = ''   // variables extras para el orden del select
  query: string = ''     // query para ejecutar el reporte
  dataView:string ='vcomepge'    // Vista de datos generales
  sqlQuery:string=''             // Query a ejecutar antes de la vista del reporte
  pdfHeigth='1200px'  // PDF height 
  constructor() {
    super()
   // this.queryPri.Name = 'queryPri'
   // this.queryUsu.Name = 'queryUsu'
   // this.queryGen.Name = 'queryGen'
   // this.style.width='1210px'
  }

  public async init() {

    this.var_ord.prop.RowSource=`select ref_dat,cam_dat from man_comedat where nom_tab='${this.Form.tab_ord}' order by con_dat`
    this.var_ord.prop.RowSourceType = 3 
    //   init = async ()=> {

    //this.for_imp.prop.Value=this.Name
    this.queryUsu.prop.Disabled = true

    this.queryGen.prop.Disabled = true

    const db = this.db

    // vi_schema_views nos trae los campos que podemos utilizar en las condiciones
    const vis_rep = this.vis_rep

    await db.execute(`select ref_dat,cam_dat,tip_dat, CASE \
                        WHEN lower(cam_dat)='key_pri' or lower(cam_dat)='timestamp' or \ 
                         lower(cam_dat)='usu_usu' or lower(cam_dat)='tie_uac'  or \
                         lower(cam_dat)='usu_cre' or lower(cam_dat)='tie_cre' \
                         THEN 'zzzzzzzzzzz' \
                         ELSE nom_tab END as nom_tab \
        from vi_schema_views where nom_vis='${vis_rep}' `, 'campos', 'NULL')

    if (!db.View.campos || db.View.campos.recCount == 0) {
      MessageBox('No existe la vista Sql :' + vis_rep, 16, 'Error  ')

      return
    }

//    const tab_ord=this.tab_ord.trim()
//    await db.localAlaSql(`select * from campos where lower(nom_tab)='${tab_ord}`,'orden')

//    console.log('reportForm campos ',this.tab_ord, vis_rep, await db.localAlaSql(`select * from campos `)) //where lower(nom_tab)='${this.tab_ord}'
//    console.log('reportForm tabla campos ',this.tab_ord, vis_rep, await db.localAlaSql(`select * from campos where lower(nom_tab)='${tab_ord}`)) //where lower(nom_tab)='${this.tab_ord}'
    


    // todos los querys del reporte

    const m = {
      prg_prg: this.prop.Name,
      par_prg: this.Params.par_prg ? this.Params.par_prg : ' ',
      nom_vis: vis_rep
    }

    await db.use('vi_cap_query_db', m) // todos los querys del reporte


    // Query Principal
    const filter = { usu_que: 'MAIN' }
    // await db.localClone('vi_cap_query_db', 'query_main', filter)

    //this.queryPri.Grid.prop.RecordSource = 'query_main'
    await this.asignaRecordSource('queryPri', 'query_main')

    this.queryPri.prop.textLabel = 'Condiciones principales'

    //this.queryPri.usu_que = 'MAIN'
    //this.queryPri.prop.Disabled = false
    // this.queryPri.query.prop.Visible=true

    
    if (this.prop.Development == false) {
      this.queryPri.bt_add.prop.Visible = false
      this.queryPri.Grid.prop.saveData = false
    }

    // Query Usuario
    filter.usu_que = this.db.session.user
    //await db.localClone('vi_cap_query_db', 'query_user', filter)


    this.queryUsu.prop.textLabel = 'Condiciones usuario :' + this.db.user

    //this.queryUsu.Grid.prop.RecordSource = 'query_user'
    await this.asignaRecordSource('queryUsu', 'query_user')
    this.queryUsu.usu_que = this.db.session.user

    // Query Todos
    filter.usu_que = 'ALL'

    //await db.localClone('vi_cap_query_db', 'query_all', filter)

    this.queryGen.prop.textLabel = 'Condiciones generales'

    //this.queryGen.Grid.prop.RecordSource = 'query_all'
    await this.asignaRecordSource('queryGen', 'query_all')
    this.queryGen.usu_que = 'ALL'

    this.Form.queryPri.activa.prop.Value = 1
   // this.Form.queryPri.nco_que.prop.sw_add=true 

    //  this.queryPri.nco_que.prop.Value = 1
    //      await  this.Form.queryPri.nco_que.interactiveChange()
    //      this.Form.queryPri.activa.prop.Value = 1
    

    await this.Form.queryPri.nco_que.interactiveChange()


  }

  // asignamos RecordSource y ControlSource de cada columna
  async asignaRecordSource(nom_que: string, RecordSource: string) {

    const tabla = this[nom_que].Grid
    tabla.prop.RecordSource = RecordSource
    for (let i = 0; i < tabla.elements.length; i++) {

      const column = tabla.elements[i].Name
      tabla[column].prop.RecordSource = RecordSource
      tabla[column].prop.ControlSource = RecordSource + '.' + column
    }
    //  this.prop.ControlSource =this.Parent.prop.RecordSource.trim()+'.ren_que'
    //console.log('Grid asigna', nom_que, this[nom_que].Grid)

  }

  /////////////////////////////////////
  // gwn_where : genera la parte del where de cada modulo de condicion
  // where : where ya generado y que se le amentara el resultado de este
  // tip_con : tipo de condicion puede ser queryUsu,queryPri, queryGen
  ////////////////////////////////////////

  async gen_where(tip_con: string) {

    console.log('where ===>>>', tip_con, this[tip_con])
    var where = ''
    if (this[tip_con].activa.prop.Value == 0) return where

//    if (this[tip_con].Grid.prop.Visible ) // si esta en edicion, graba la tabla
//      return where

    const view = this[tip_con].Grid.prop.RecordSource

    const usu_que = this[tip_con].usu_que
    const nco_que = this[tip_con].nco_que.prop.Value
    let tabla='query_main'
    if (tip_con=='queryUsu')
        tabla='query_user'

    if (tip_con=='queryGen')
       tabla='query_all'

//trim(usu_que)='${usu_que}' and
    console.log('reportForm alias') 
    if (!this.Form.db.View[tabla]){ // Si no existe el alias
      const filter = {
        usu_que: this[tip_con].usu_que,
        nco_que: this[tip_con].nco_que.prop.Value
      }
         await this.Form.db.localClone('vi_cap_query_db', tabla, filter)
     }

    const ins_sql = `select * from ${tabla} where nco_que=${nco_que} order by ren_que`
    const data = await this.Form.db.localAlaSql(ins_sql)

    if (data.length == 0) return where  // No hay condición 

    let query = '('
    let sig_uni = ' '

    for (let i = 0; i < data.length; i++) {
      const m = data[i] //Scatter Memvar
      m.cam_dat = m.cam_dat.trim()
      m.con_que = m.con_que.trim()
      m.val_que = m.val_que.trim()
      const data1 = await this.Form.db.localAlaSql(`select trim(tip_dat) as tip_dat from campos where trim(cam_dat)='${m.cam_dat}' `)

      const tip_dat = data1[0].tip_dat.slice(0,4)

      if (tip_dat == 'char' || tip_dat == 'date' || tip_dat.slice(0, 8) == "time")
        m.val_que = "'" + m.val_que + "'"

        
      query = query + `${sig_uni} ${m.pai_que} ${m.cam_dat} ${m.con_que} ${m.val_que} ${m.pad_que} `
      sig_uni = m.uni_que.trim()
      if (sig_uni.trim()=='')
           sig_uni=' AND '
    } // EndFor 
    query = query + ')'
    return query
  }

  public async gen_query() {
    var where: string = ''
    var orden: string = ' order by ' + this.var_ord.prop.Value   // variable de orden principal de la vista
    var query_gen: string = 'select * from ' + this.vis_rep

    if (this.ord_vis.length > 1) { // variables extras para el orden del select
      orden = orden + ',' + this.ord_vis
    }

    if (this.query.length > 1)
      query_gen = this.query

    where = await this.gen_where('queryPri')

    if (this.queryUsu.prop.Visible) {
      const where_usu = await this.gen_where('queryUsu')
      if (where_usu.length > 3) {
        if (where.length == 0)
          where = where_usu
        else
          where = where + ' and ' + where_usu
      }
    }
    if (this.queryGen.prop.Visible) {
      const where_gen = await this.gen_where('queryGen')
      if (where_gen.length > 3) {
        if (where.length == 0)
          where = where_gen
        else
          where = where + ' and ' + where_gen
      }
    }

    console.log('reportForm query', query_gen + where + orden)
  if (where.length>2 )
      where=' where '+where
   
    return query_gen + where + orden
    //   init = async ()=> {
  }
}