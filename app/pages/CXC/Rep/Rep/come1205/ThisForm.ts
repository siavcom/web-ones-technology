//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : ThisForm
// Description : Estado de cuenta de clientes
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { con_doc } from "./con_doc";

export class ThisForm extends reportCXC {
  public con_doc = new con_doc()
  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "comenom";
    this.prop.Name = "come1205";
    this.prop.Caption = "Estado de cuenta";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1201c"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1205c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.tip_rep.prop.Disabled = false
    this.des_fec.prop.Visible = true; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false; //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.mon_rep.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.tip_rep.prop.TabIndex = 4;
    this.con_doc.prop.TabIndex = 5;

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Estado de cuenta de clientes ";
    else
      this.prop.Caption = "Estado de cuenta de proveedores ";

    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value
    );
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const con_doc = this.con_doc.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const has_cod = this.Form.has_dat.prop.Value;
    const des_cod = this.Form.des_dat.prop.Value;
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1205" + par_prg
    if (this.Form.tip_rep.prop.Value == 1)         // General
    {
      if (this.Form.con_doc.prop.Value == 1) {
        this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_2"
      }
      else {
        this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_d"

      }
    }
    else
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_g"
    // armamos titulo    
    if (par_prg == "C")
      this.Form.tit_rep = "Estado de cuenta de clientes "
    else
      this.Form.tit_rep = "Estado de cuenta de proveedores "
    this.Form.con_rep = where
    localWhere = localWhere + where;
    console.log(localWhere)
    localWhere = localWhere.replaceAll("'", '"')
    console.log(
      "sqlQuery =",
      ` EXEC p_come1205 '${par_prg}', '${des_fec}','${has_fec}',${mon_rep},${tip_rep},${con_doc},'${localWhere} ','${var_ord}','${des_cod} ','${has_cod}'  `

    );
    return ` EXEC p_come1205 '${par_prg}', '${des_fec}','${has_fec}',${mon_rep},${tip_rep},${con_doc},'${localWhere} ','${var_ord}','${des_cod} ','${has_cod}'  `;


  }

} // End ThisForm
