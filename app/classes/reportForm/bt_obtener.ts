//////////////////////////////////////////////
// Clase : bt_obtener
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////

import { IMGBUTTON } from "@/classes/imgButton";
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_obtener extends IMGBUTTON {
  constructor() {
    super();
    this.Index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.Caption = "Obtener datos";
    this.prop.Capture = false;
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/report-document.svg"; //print-color3.svg";
    this.prop.TabIndex = 1;
    this.style.width = "78px";
  } // Fin constructor

  async click() {
    this.prop.Visible = false;

    let bloque = 0
    for (bloque = 0; bloque < this.Form.block.length - 1; bloque++)
      this.Form.block[bloque].prop.Visible = false

    bloque = this.Form.block.length - 1

    this.Form.block[bloque].prop.Visible = true  // resultado

    this.Form.report.bt_excel.prop.Visible = false;
    this.Form.report.bt_json.prop.Visible = false;


    this.Form.report.displayPdf.prop.Source = "";
    const main = this.Form.main

    this.Form.queryPri.prop.Visible = false
    this.Form.queryUsu.prop.Visible = false
    this.Form.queryGen.prop.Visible = false
    this.Form.reportFields.prop.Visible = false


    for (let i = 0; i < main.length; i++) {
      if (!this.Form[main[i]].prop.Disabled)
        this.Form[main[i]].prop.Visible = false
    }


    this.Form.bt_pdf.prop.Visible = false;

    //   const ins_sql = await this.Form.gen_query()

    this.Form.report.prop.Visible = true;
    this.Form.report.prop.Disabled = false;

    this.Form.report.displayBrowse.table.isLoading = true;

    const query = await this.Form.gen_query();
    Processing()
    const result = await SQLExec(query, "sqlresult");

    this.Form.report.displayBrowse.table.isLoading = false

    if (!result || result.length == 0) {
      closeProcessing("No data to show")
      this.Form.block[bloque].prop.Visible = false  // resultado
      this.prop.Visible = true
      await this.Form.report.bt_close.click();

      return;
    }
    closeProcessing()

    // console.log("bt_obtener", "Form.block=", this.Form.block);
    // const i = this.Form.block.length - 1



    this.Form.report.displayBrowse.prop.RowSource = "now.sqlresult";
    this.Form.report.displayBrowse.prop.Visible = true;

    // console.log('bt_obtener asigno RowSource',this.Parent.report)
    this.Form.report.bt_excel.prop.Visible = true;
    this.Form.report.bt_json.prop.Visible = true;
  }
}
