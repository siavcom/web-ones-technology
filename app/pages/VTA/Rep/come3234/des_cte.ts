//////////////////////////////////////////////
// @baseClass  : component
// @class : des_cte
// Description : desde que vendedor
// @author: MGSR
// Creation : 2025/jul/16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class des_cte extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Desde "; // Etiqueta que tendra este componente
    this.prop.BaseClass = "comboBox"; // Tipo de componente
    this.prop.ColumnCount = 2; // = VFP
    this.prop.BoundColumn = 2; // = VFP
    this.prop.ColumnWidths = "65%,35%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "?? ";
    this.style.maxHeight = "200px";
    this.inputStyle.width = "300px";
    this.prop.MultiSelect = false;
    this.style.width = "auto";
    this.prop.RowSourceType = 4;

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  override async init() {
    var tip_cop = "'C'", ins_sql = ''
    if (this.Form.Params[0].replaceAll("´", "") == 'CO')
      tip_cop = "'P'"
    if (this.Form.Params[0].replaceAll("´", "") == 'IN')
      tip_cop = "'P','C'"
    ins_sql = `select nom_nom,cod_nom,cop_nom from man_comenom where cop_nom in (${tip_cop}) `
    console.log('ins_sql=', ins_sql)
    const data = await SQLExec(`select nom_nom,cod_nom,cop_nom from man_comenom where cop_nom in (${tip_cop}) `, 'loc_comenom')
    this.prop.RowSource = ` select nom_nom,cod_nom from now.loc_comenom union select '  Todos ' as nom_nom,'?? ' as cod_nom  order by cod_nom `

  }
  override async valid() {
    if (this.Form.has_cte.prop.Value < this.prop.Value)
      this.prop.RowSource = ` select nom_nom,cod_nom from now.loc_comenom where cod_nom>='${this.prop.Value}' union select '  Todos ' as nom_nom,'?? ' as cod_nom  order by cod_nom `
    this.Form.has_cte.prop.Value = this.prop.Value;
    return true;
  }

}

