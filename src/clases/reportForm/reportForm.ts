//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 28/Abril/2023
/////////////////////////////////////////////
//import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'
import { queryGen as query } from '@/classes/queryGen/queryGen'
import { bt_print } from './bt_print'

export class reportForm extends FORM {
  public queryPri = new query()
  public queryUsu = new query()
  public queryGen = new query()

  public bt_print = new bt_print()
 
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
  
 
    this.queryUsu.prop.Visible=false
 
    this.queryGen.prop.Visible=false
   
    const db = this.db
    
    // vi_schema_views nos trae los campos que podemos utilizar en las condiciones
   
    await db.execute(`select ref_dat,cam_dat,tip_dat, CASE \
                        WHEN lower(cam_dat)='key_pri' or lower(cam_dat)='timestamp' or \ 
                         lower(cam_dat)='usu_usu' or lower(cam_dat)='tie_uac'  or \
                         lower(cam_dat)='usu_cre' or lower(cam_dat)='tie_cre' \
                         THEN 'zzzzzzzzzzz' \
                         ELSE nom_tab END as nom_tab \
        from vi_schema_views where nom_vis='${this.prop.ReportView}' order by nom_tab,ref_dat `,'campos') 

    console.log('reportForm campos',await  db.localAlaSql('select * from campos'))  
    

    // todos los querys del reporte
 
    const m = {
      prg_prg: this.prop.Name,
      par_prg: this.Params.par_prg ? this.Params.par_prg : ' ',
      nom_vis: this.prop.ReportView
    }
 
    await db.use('vi_cap_query_db', m) // todos los querys del reporte
    
    // Query Principal
    const filter = { usu_que: 'MAIN' }
    // await db.localClone('vi_cap_query_db', 'query_main', filter)

    //this.queryPri.table.prop.RecordSource = 'query_main'
    await this.asignaRecordSource('queryPri', 'query_main')

    this.queryPri.prop.textLabel = 'Condiciones principales'

    this.queryPri.prop.usu_que = 'MAIN'

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

    this.queryPri.activa.prop.Value=1
    this.queryPri.nco_que.prop.Value=1
    console.log('reportForm Init ',this.queryPri,this.queryPri.activa.prop.Value,this.queryPri.nco_que.prop.Value)
  }

  // asignamos RecordSource y ControlSource de cada columna
  async asignaRecordSource(nom_que: string, RecordSource: string) {
  
    const tabla = this[nom_que].table
    tabla.prop.RecordSource=RecordSource
    for (let i=0; i<tabla.elements.length; i++) {

      const column=tabla.elements[i].Name
      tabla[column].prop.RecordSource = RecordSource
      tabla[column].prop.ControlSource = RecordSource+'.'+column
    }
      //  this.prop.ControlSource =this.Parent.prop.RecordSource.trim()+'.ren_que'
      console.log('table asigna',nom_que,this[nom_que].table)

    }

}