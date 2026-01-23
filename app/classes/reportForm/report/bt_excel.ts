//////////////////////////////////////////////
// Clase : bt_excel
// @author: Fernando Cuadras Angulo
// Creacion : 25/Mayo/2023
// Ult.Mod. : 10/Agosto/2023
/////////////////////////////////////////////

/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */


//  revisar utilería https://vue-xlsx.netlify.app/guide/#quick-start

import { read, writeFileXLSX, utils } from "xlsx";
export class bt_excel extends IMGBUTTON {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = 'File'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/excel-file.svg"
    this.prop.TabIndex = 2
    this.prop.Visible = true
    this.style.width = '80px'

  } // Fin constructor

  async click() {

    //const result=this.Form.table.rows.value // obtenemos los rows
    const rows = await multiFilter(this.Parent.displayBrowse.table.oriRows, this.Parent.displayBrowse.table.filters)

    const workSheet = utils.json_to_sheet(rows);

    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "Data");
    writeFileXLSX(workBook, this.Form.for_imp.prop.Value.trim() + '.xlsx', { compression: true })

  }

}
