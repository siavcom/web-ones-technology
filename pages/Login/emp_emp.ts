/// ///////////////////////////////////////////
// Clase : emp_emp
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  :
/// //////////////////////////////////////////

import dat_emp from "@/src/empresas/datos.json";
import { COMPONENT } from "@/classes/Component";
//import { Session } from '@/stores/currentSession'

export class emp_emp extends COMPONENT {
  //  constructor(parent: Record<string, never>) {

  constructor(Name: string) {
    super();

    this.Form = this.Parent;
    this.prop.BaseClass = "comboBox";
    this.prop.Capture = true;
    this.prop.RowSourceType = 5; // 1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.Style = 2; // No permite captura
    this.prop.BoundColumn = 1;
    this.prop.RowSource = [[""], [""]];
    this.prop.ColumnWidths = "37%,60%";
    this.prop.TabIndex = 1;
    // this.style.zIndex = 2;
    this.style.width = "auto";
    this.inputStyle.width = "200px";

    let num_ren = 0;

    if (dat_emp == null) {
      this.prop.Visible = false;
      return;
    }

    for (const nom_emp in dat_emp) {
      this.prop.RowSource[0][num_ren] = nom_emp; // columna 1,renglon
      this.prop.RowSource[1][num_ren] = dat_emp[nom_emp].nem_emp; // columna 2,renglon
      num_ren++;
    }
    const session = Session();
    this.prop.Value = session.nom_emp;
  }

  public valid = async () => {
    const ThisForm = this.Form;
    const This = this.prop; // Hace referencia a las propiedades del componente
    const m: any = {}; // :  Record<string, never> ;
    return true;
  }; // fin metodo valid
}
