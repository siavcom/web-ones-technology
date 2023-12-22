//////////////////////////////////////////////
// BaseClass : reportForm
// Class : reportVtas
// Description : Documentos de ventas
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/reports/CXC/reportCXC";
import { con_doc } from "./con_doc";
export class ThisForm extends reportCXC {
  public con_doc = new con_doc()
  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "comenom";
    this.prop.Name = "come1205";
    this.prop.textLabel = "Estado de cuenta";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1201c"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1205c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.tip_rep.prop.Disabled = false
    this.tdo_tdo.prop.Visible = false; // Muestra general o detallado
    this.tdo_tdo.prop.Disabled = true; // Muestra general o detallado
    this.des_fec.prop.Visible = true; // Muestra general o detallado
    this.has_fec.prop.Visible = true; // Muestra general o detallado
    this.mon_rep.prop.Visible = true;
    this.des_cod.prop.Visible=true
    this.des_cod.prop.Disabled=false
    this.has_cod.prop.Visible=true
    this.has_cod.prop.Disabled=false
    this.mon_rep.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.tip_rep.prop.TabIndex = 4;
    this.con_doc.prop.TabIndex = 5;
    this.des_cod.prop.TabIndex = 6;
    this.has_cod.prop.TabIndex = 7;
    
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";

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

  public async sqlQuery(where: string,order: string) {
    let localWhere = "";
    const des_fec =await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec =await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep=this.tip_rep.prop.Value;
    const con_doc=this.con_doc.prop.Value;
    const var_ord=this.var_ord.prop.Value;
    const mon_rep=this.mon_rep.prop.Value;
    const des_cod=this.des_cod.prop.Value;
    const has_cod=this.has_cod.prop.Value;
    if (has_cod=="")
       {this.has_cod.prop.Value="ZZZZZZZZZZZZZZ"}
    localWhere = localWhere +where;
   
    localWhere=localWhere.replaceAll("'",'"')  
    console.log(
      "sqlQuery =",
      ` EXEC p_come1205 'C', '${des_fec}','${has_fec}',${mon_rep},${tip_rep},${con_doc},'${localWhere} ','${var_ord}','${des_cod} ','${has_cod}'  ` 
      
    );
    return ` EXEC p_come1205 'C', '${des_fec}','${has_fec}',${mon_rep},${tip_rep},${con_doc},'${localWhere} ','${var_ord}','${des_cod} ','${has_cod}'  `  ;
  
   
  }
  
  } // End ThisForm
  