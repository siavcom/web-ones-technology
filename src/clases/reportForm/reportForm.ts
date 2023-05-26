//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////
//import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'
import { queryGen as query } from '@/classes/queryGen/queryGen'
import { bt_obtener } from './bt_obtener'
import { var_ord } from './var_ord'
import { for_imp } from './for_imp'
import { report } from './report/report'

export class reportForm extends FORM {
  public var_ord = new var_ord()   // variable de orden principal de la vista
  public queryPri = new query()
  public queryUsu = new query()
  public queryGen = new query()
  public for_imp = new for_imp()
  public bt_obtener = new bt_obtener()
  public report = new report()
  vis_rep :string = ''   // nombre de la vista sql a utilizar en el reporte
  ord_vis :string = ''   // variables extras para el orden del select
  query :string = ''     // query para ejecutar el reporte

  constructor() {
    super()
    this.queryPri.Name = 'queryPri'
    this.queryPri.prop.Name = 'queryPri'
    this.queryUsu.Name = 'queryUsu'
    this.queryUsu.prop.Name = 'queryUsu'
    this.queryGen.Name = 'queryGen'
    this.queryGen.prop.Name = 'queryGen'

  }

  public async init() {
    //   init = async ()=> {


    this.queryUsu.prop.Disabled = true

    this.queryGen.prop.Disabled = true

    const db = this.db

    // vi_schema_views nos trae los campos que podemos utilizar en las condiciones
   const vis_rep= this.vis_rep 

    await db.execute(`select ref_dat,cam_dat,tip_dat, CASE \
                        WHEN lower(cam_dat)='key_pri' or lower(cam_dat)='timestamp' or \ 
                         lower(cam_dat)='usu_usu' or lower(cam_dat)='tie_uac'  or \
                         lower(cam_dat)='usu_cre' or lower(cam_dat)='tie_cre' \
                         THEN 'zzzzzzzzzzz' \
                         ELSE nom_tab END as nom_tab \
        from vi_schema_views where nom_vis='${vis_rep}' order by nom_tab,ref_dat `, 'campos','NULL')

        if (!db.View.campos || db.View.campos.recCount==0){
          MessageBox('No existe la vista Sql :'+vis_rep,16,'Error  ')
   
          return
       }



  console.log('reportForm campos ',vis_rep, await db.localAlaSql('select * from campos'))



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

    //this.queryPri.table.prop.RecordSource = 'query_main'
    await this.asignaRecordSource('queryPri', 'query_main')

    this.queryPri.prop.textLabel = 'Condiciones principales'

    this.queryPri.prop.usu_que = 'MAIN'
    this.queryPri.prop.Disabled=false



    // await this.queryPri.nco_que.interactiveChange()

    if (this.prop.Development == false) {
      this.queryPri.bt_add.prop.Visible = false
      this.queryPri.table.prop.saveData = false
    }

    // Query Usuario
    filter.usu_que = this.db.user
    //await db.localClone('vi_cap_query_db', 'query_user', filter)


    this.queryUsu.prop.textLabel = 'Condiciones usuario :' + this.db.user

    //this.queryUsu.table.prop.RecordSource = 'query_user'
    await this.asignaRecordSource('queryUsu', 'query_user')
    this.queryUsu.prop.usu_que = this.db.user

    // Query Todos
    filter.usu_que = 'ALL'

    //await db.localClone('vi_cap_query_db', 'query_all', filter)

    this.queryGen.prop.textLabel = 'Condiciones generales'

    //this.queryGen.table.prop.RecordSource = 'query_all'
    await this.asignaRecordSource('queryGen', 'query_all')
    this.queryGen.prop.usu_que = 'ALL'

    this.queryPri.activa.prop.Value = 1
    this.queryPri.nco_que.prop.Value = 1

    this.var_ord.prop.RowSource = "campos.ref_dat,cam_dat"
    // console.log('reportForm Init ',this.queryPri,this.queryPri.activa.prop.Value,this.queryPri.nco_que.prop.Value)
  }

  // asignamos RecordSource y ControlSource de cada columna
  async asignaRecordSource(nom_que: string, RecordSource: string) {

    const tabla = this[nom_que].table
    tabla.prop.RecordSource = RecordSource
    for (let i = 0; i < tabla.elements.length; i++) {

      const column = tabla.elements[i].Name
      tabla[column].prop.RecordSource = RecordSource
      tabla[column].prop.ControlSource = RecordSource + '.' + column
    }
    //  this.prop.ControlSource =this.Parent.prop.RecordSource.trim()+'.ren_que'
    console.log('table asigna', nom_que, this[nom_que].table)

  }


  public async gen_where(where: string, tip_con: string) {
    if (this[tip_con].prop.Disabled) return where
    
    const view=this[tip_con].table.prop.RecordSource
   
    const  usu_que= this.Parent.prop.usu_que
    const  nco_que= this[tip_con].nco_que.prop.Value
   

    const ins_sql=`select * from vi_cap_query_db where usu_que='${usu_que}'' and nco_que={nco_que}`
    console.log('gen_where ins_sql',ins_sql)
   
    console.log('nco_que localSql resultado', ins_sql, await this.db.localAlaSql(ins_sql))

    const data = await this.Form.db.localAlaSql(ins_sql)

    // console.log('nco_que interactiveChange data',data)

    if (data.length == 0) return where

    let query = '('
    let sig_uni = ' '

    for (let i = 0; i < data.length; i++) {

      const m = data[i] //Scatter Memvar

      query = query + `${sig_uni} ${m.pai_que} ${m.nom_cam} ${m.con_que} ${m.val_que} ${m.pad_que} ${sig_uni} `
      sig_uni = m.uni_que.trim()


    } // EndFor (
    query = query + ')'
    return query
  }


  public async gen_query() {
    var where :string = ''
    var orden :string = ' order by ' + this.var_ord.prop.Value   // variable de orden principal de la vista
    var query_gen :string = 'select * from '+ this.vis_rep
 
    if (this.ord_vis.length > 1) { // variables extras para el orden del select
      orden = orden + ',' + this.ord_vis
    }
 
    if (this.query.length > 1)
      query_gen = this.query

    where=await this.gen_where('','queryPri')
    
    if (this.queryUsu.prop.Visible)
       where=where.length>0? where:'' +'and '+await this.gen_where('','queryUsu')

    if (this.queryGen.prop.Visible)
       where=where.length>0? where:'' +'and '+await this.gen_where('','queryMain')

   return query_gen+where+orden
    //   init = async ()=> {
  }


}