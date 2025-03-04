//////////////////////////////////////////////
// Clase : bt_json
// Author : Fernando Cuadras Angulo
// Creacion : 25/Mayo/2023
// Ult.Mod : 10/Agosto/2023
/////////////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
import { saveAs } from "file-saver";
/**
 *
 *
 * @export
 * @class bt_json
 * @extends {COMPONENT}
 */
export class bt_json extends COMPONENT {
  constructor() {
    super();
    this.Index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.Value = "File";
    this.prop.Capture = false;
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/json.svg";
    this.prop.TabIndex = 2;
    this.prop.Visible = true;
    this.style.width = "80px";
  }

  async click() {
    console.log('===================bt_json objJson ==================')
    const rows = await multiFilter(
      this.Parent.displayBrowse.table.oriRows,
      this.Parent.displayBrowse.table.filters
    );

    if (rows.length == 0) return;  // No hay datos

    // sumamos los valores data al renglon [0]
    for (const comp in this.Form.data) {
      rows[0][comp] = this.Form.data[comp];
    }
    rows[0]['tit_rep'] = this.Form.tit_rep
    //    rows[0]=await this.Form.obtData(rows[0])
    // console.log("bt_json rows[0]", rows[0]);
    const objJson = JSON.stringify(rows);

    const blobJson = new Blob([objJson], { type: "text/plain" });
    saveAs(blobJson, `${this.Form.for_imp.prop.Value.trim()}.json`);
  }
}
