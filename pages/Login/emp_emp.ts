/// ///////////////////////////////////////////
// Clase : emp_emp
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  :
/// //////////////////////////////////////////

//import dat_emp from "@/src/empresas/datos.json";
import { COMPONENT } from "@/classes/Component";

export class emp_emp extends COMPONENT {
  //  constructor(parent: Record<string, never>) {

  constructor(Name: string) {
    super();

    this.Form = this.Parent;
    this.prop.BaseClass = "comboBox";
    this.prop.Caption = "Company/Empresa";
    this.prop.Capture = true;
    this.prop.RowSourceType = 5; // 1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.Style = 2;
    this.prop.BoundColumn = 1;
    this.prop.RowSource = [[""], [""]];
    this.prop.ColumnWidths = "200px,300px";
    this.prop.TabIndex = 1;
    // this.style.zIndex = 2;
    this.style.width = "auto";
    this.inputStyle.width = "230px";

    const session = Session();
    this.prop.Value = session.nom_emp;
    this.style.color = "black";
    this.style.fontWeight = "bold";
    this.style.fontSize = "15px";
    this.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
  }

  async init() {
    // Llamada a la API serevre para obtener las empresas
    const { data } = await useFetch('/api/callServer',
      {
        method: 'post',    // Se necesita para que haga la llamada y retorne los datos
        body: { call: 'leeEmpresas' }
      }
    )

    const dat_emp = data.value

    if (dat_emp == null) {
      this.prop.Visible = false;
      return;
    }
    let num_ren = 0;
    for (const nom_emp in dat_emp) {
      this.prop.RowSource[0][num_ren] = nom_emp; // columna 1,renglon
      this.prop.RowSource[1][num_ren] = dat_emp[nom_emp].nem_emp; // columna 2,renglon
      num_ren++;
    }

  }

  public valid = async () => {
    const ThisForm = this.Form;
    const This = this.prop; // Hace referencia a las propiedades del componente
    const m: any = {}; // :  Record<string, never> ;
    return true;
  }; // fin metodo valid
}
