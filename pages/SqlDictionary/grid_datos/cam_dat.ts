//////////////////////////////////////////////
// Clase : des_dat
// Descripcion : Nombre del campo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class cam_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 2
        this.textLabel = 'Campo'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_dat.cam_dat'
        this.prop.Placeholder = "Nombre del campo"
        this.prop.ToolTipText ='Nombre del campo'
        this.prop.componentStyle.textTransform='lowercase'
        this.style.width='00px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        const Value=this.prop.Value.trim().toUpperCase()
        
        if (Value=='USU_USU' || Value=='USU_CRE' ||
            Value=='TIE_UAC' || Value=='TIE_CRE' ||
            Value=='TIMESTAMP' || Value=='KEY_PRI') this.prop.ReadOnly=true
         else this.prop.ReadOnly=false  
       
 
      return !this.prop.ReadOnly
    }

    async valid() {
        if (this.prop.Valid)
           return
        const vfp=this.Form.db
        const valor=this.prop.Value.toUpperCase().trim() 
        const recno=this.Recno 
        const data=await vfp.localSql(`select count(key_pri) as existe from vi_cap_dat where trim(upper(cam_dat))="${valor}" and recno<>${recno}`) 
        if (data[0].existe>0){
            this.prop.Valid=false
            this.prop.ErrorMessage='Campo existente dentro del diccionario'
            //console.log('ErrorMessage VALID ====>',this.prop.ErrorMessage)
            return false
        }
           return true
      }


}
