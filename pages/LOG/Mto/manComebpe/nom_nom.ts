//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : nom_nom
// Description : Nombre
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class nom_nom extends captureComponent {
  constructor() {
    super();
    this.prop.textLabel = "Nombre";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = '"vi_cap_comebpe.nom_nom"';
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.Disabled = true;
    this.prop.componentStyle.width = "600px";
  }

  async valid() {
    const m = {
      cop_nom: this.Form.cop_nom.prop.Value,
      cod_nom: this.prop.Value,
    };
    const data = await this.Sql.execute(
      `select nom_nom from man_comenom where cop_nom='${m.cop_nom}' and cod_nom='${m.cod_nom}'`
    );
    if (data && data[0] && data[0].nom_nom.trim() > " ") {
      this.Form.nom_nom.prop.Value = data[0].nom_nom;
      this.prop.Valid = true;
    } else this.prop.Valid = false;
    return !this.prop.ReadOnly;
  }
}
