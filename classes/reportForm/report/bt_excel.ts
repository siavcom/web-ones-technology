//////////////////////////////////////////////
// Clase : bt_excel
// Author : Fernando Cuadras Angulo
// Creacion : 25/Mayo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_excel extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value ='File'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/excel-file.svg"  
    this.prop.TabIndex = 2
    this.prop.Visible=true
    this.style.width='40px'

  } // Fin constructor

  async click() {

    //const result=this.Form.table.rows.value // obtenemos los rows
    console.log('bt_excel rows',this.Parent.browse.table.rows)
    
    await this.Form.db.localAlaSql( "DROP TABLE IF EXISTS excelResult ;CREATE TABLE excelResult")
    await this.Form.db.localAlaSql('INSERT INTO excelResult SELECT * FROM ?',this.Parent.browse.table.row)
    console.log('bt_excel 11111', await this.Form.db.localAlaSql(`select *  from excelResult`) )
      
    await this.Form.db.localAlaSql(`select * into XLSXML("result.xlsx",?) from excelResult`) 
   //await this.Form.db.localAlaSql('INSERT INTO excelResult VALUES ?',this.Parent.browse.table.row)
   //console.log('bt_excel 2222', await this.Form.db.localAlaSql(`select *  from excelResult`) )

   //await this.Form.db.localAlaSql(`select * into XLSXML("result.xlsx",?) from result`) 

  }


}
