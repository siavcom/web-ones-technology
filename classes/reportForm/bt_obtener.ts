//////////////////////////////////////////////
// Clase : bt_obtener
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_obtener extends COMPONENT {
  constructor() {
    super();
    this.Index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.textLabel = "Obtener datos";
    this.prop.Capture = false;
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/report-document.svg"; //print-color3.svg";
    this.prop.TabIndex = 1;
    this.style.width = "64px";
  } // Fin constructor

  async click() {
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

    this.Form.bt_obtener.prop.Visible = false;
    this.Form.bt_pdf.prop.Visible = false;

    //   const ins_sql = await this.Form.gen_query()

    this.Form.report.prop.Visible = true;
    this.Form.report.prop.Disabled = false;

    this.Form.report.displayBrowse.table.isLoading = true;

    const query = await this.Form.gen_query();
    const result = await SQLExec(query, "sqlresult");

    if (!result || result.length == 0) {

      await this.Form.report.bt_close.click();
      MessageBox("No data to show");
      return;
    }

    this.Form.report.displayBrowse.prop.RowSource = "Now.sqlresult";
    this.Form.report.displayBrowse.prop.Visible = true;

    // console.log('bt_obtener asigno RowSource',this.Parent.report)
    this.Form.report.bt_excel.prop.Visible = true;
    this.Form.report.bt_json.prop.Visible = true;
  }
}
