//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////
//import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'
import { queryGen } from '@/classes/queryGen/queryGen'
import { bt_print } from './bt_print'

export class reportForm extends FORM {
    public queryPri = new queryGen()
    public queryUsu = new queryGen()
    public queryGen = new queryGen()

    public bt_print = new bt_print()
    //  constructor(){
    //    super()
    //  }
    init = async ()=> {
        console.log('reportForm init()')
        const db = this.Form.db
        // Query Principal
        const m = {
            prg_prg: this.Form.Name,
            par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg:'' ,
//            usu_que: 'MAIN'
        }

        db.use('vi_cap_query_db', m) // todos los querys del reporte

        const filter={usu_que: 'MAIN'}
        db.localClone('vi_cap_query_db','query_main',filter)
        this.Form.queryPri.prop.usu_que = 'MAIN'
        this.Form.queryPri.prop.RecordSource = 'query_main'
        console.log('reportForm querypri',this.Form.queryPri)
        this.Form.queryPri.mensaje.prop.textLabel='Condiciones principales'
        this.Form.queryPri.num_con.prop.Value=1
        this.Form.queryPri.num_con.interactiveChange('query_main')

        if (this.Form.prop.Development==false) {
            this.Form.queryPri.prop.appendRow=false
            this.Form.queryPri.prop.saveData=false
        }
        // Query Usuario
        filter.usu_que = this.Form.usu_usu
        db.localClone('vi_cap_query_db','query_user',filter)
        this.Form.queryUser.mensaje.prop.textLabel='Condicion Usuario'

        this.Form.queryUser.num_con.prop.Value=0
        this.Form.queryUser.prop.RecordSource = 'query_user'
        this.Form.queryUser.num_con.interactiveChange('query_user')

        // Query Usuario
        filter.usu_que = 'ALL'

        db.localClone('vi_cap_query_db','query_all',filter)
 
        this.Form.queryGen.num_con.prop.Value=0
        this.Form.queryGen.mensaje.prop.textLabel='Condiciones generales'
        this.Form.queryGen.prop.RecordSource = 'query_all'
    }

}