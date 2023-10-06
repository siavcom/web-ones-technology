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
    this.prop.Value = "Obtener datos";
    this.prop.Capture = false;
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/report-document.svg"; //print-color3.svg";
    this.prop.TabIndex = 1;
    this.style.width = "35px";
  } // Fin constructor

  async click() {
    this.Form.report.displayPdf.prop.Source = "";
    this.Form.report.displayPdf.prop.Visible = false;

    this.Form.queryPri.prop.Visible = false;
    this.Form.queryUsu.prop.Visible = false;
    this.Form.queryGen.prop.Visible = false;

    this.Form.var_ord.prop.Visible = false;
    this.Form.for_imp.prop.Visible = false;

    this.Form.bt_obtener.prop.Visible = false;
    this.Form.bt_pdf.prop.Visible = false;
/*
    let query = "";

    const m = await this.Form.obtData(); // Variable de memoria los propiedades de la forma

    if (this.Form.sqlQuery.length > 0)
      try {
        const val_eval = "`" + this.Parent.sqlQuery + "`";
        query = eval(val_eval) + ";";
      } catch (error) {
        MessageBox("eval(" + this.Parent.sqlQuery + ") " + error, 16);
        return;
      }
 */

    this.Form.bt_obtener.prop.Visible = false;
    this.Form.bt_pdf.prop.Visible = false;

    //   const ins_sql = await this.Form.gen_query()

    this.Form.report.prop.Visible = true;
    this.Form.report.prop.Disabled = false;
    this.Parent.report.browse.table.isLoading = true;
    const query = await this.Form.gen_query();
    const result = await this.Form.db.execute(query, "sqlresult");

    if (!result || result.length == 0) {
      MessageBox("No data to show");
      this.Form.report.prop.Disabled = true;
      this.Form.report.bt_close.click();
      return;
    }

    this.Parent.report.browse.prop.RowSource = "Now.sqlresult";
    // console.log('bt_obtener asigno RowSource',this.Parent.report)
    this.Form.report.bt_excel.prop.Visible = true;
    this.Form.report.bt_json.prop.Visible = true;
  }
}
