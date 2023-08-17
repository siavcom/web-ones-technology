//////////////////////////////////////////////
// Clase : bt_excel
// Author : Fernando Cuadras Angulo
// Creacion : 25/Mayo/2023
// Ult.Mod. : 10/Agosto/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
import { read, writeFileXLSX,utils } from "xlsx";
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
    this.style.width='80px'

  } // Fin constructor

  async click() {

    //const result=this.Form.table.rows.value // obtenemos los rows
    const rows =  await multiFilter(this.Parent.browse.table.oriRows, this.Parent.browse.table.filters) 
    
    const workSheet = utils.json_to_sheet(rows);

    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "Data");
    writeFileXLSX(workBook, this.Form.for_imp.prop.Value.trim()+'.xlsx',{ compression: true })
  
  }

}
