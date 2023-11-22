/// ///////////////////////////////////////////
// Clase : emp_emp
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  :
/// //////////////////////////////////////////

import dat_emp from '@/src/empresas/datos.json'
import { COMPONENT } from '@/classes/Component'
//import { Session } from '@/stores/currentSession'

export class emp_emp extends COMPONENT {
  

  //  constructor(parent: Record<string, never>) {

  constructor (Name:string) {
    super()
    
    this.Form=this.Parent
    
//    this.Name='emp_emp'
//    this.Name='emp_emp'
    this.prop.BaseClass = 'comboBox'
    //this.prop.Value = 'Demo'
    this.prop.Capture = true
    this.prop.RowSourceType = 5 // 1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2
    this.prop.Style = 2 // No permite captura 
    this.prop.BoundColumn = 1
    this.prop.RowSource = [[''], ['']]
    this.prop.ColumnWidths = '37%,60%'
    this.style.zIndex = 2
    this.style.width = 'auto'
    this.style.tabindex=1
    this.prop.componentStyle.width ='200px'
    
    let num_ren = 0

    if (dat_emp == null){
        this.prop.Visible=false
        return
    } 

    for (const nom_emp in dat_emp) {
      this.prop.RowSource[0][num_ren] = nom_emp // columna 1,renglon
      this.prop.RowSource[1][num_ren] = dat_emp[nom_emp].nem_emp // columna 2,renglon
      num_ren++
    }
    const session = Session()
    this.prop.Value=session.nom_emp

    // console.log('emp_emp RowSource >===',this.prop.RowSource)
    /*
    this.Parent = parent.value // solo asigno algo para que no de el error
    console.log('Emp_emp=== ctx',this.Parent)
    this.Form=this.Parent.ThisForm
    const This = this.Parent.ThisForm[this.Name].prop
    const style = this.Parent.ThisForm[this.Name].style
    const position = this.Parent.ThisForm[this.Name].position

    This.Name = "Demo";
    This.prop.textLabel = 'Empresa:';
    This.prop.ReadOnly = false;
    This.prop.Capture = true;
    This.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    This.prop.ColumnCount = 2;
    This.prop.BoundColumn = 2;
    let num_ren = 0
    for (const nom_emp in dat_emp) {
      This.RowSource[0][num_ren] = nom_emp  // columna 1,renglon
      This.RowSource[1][num_ren] = dat_emp[nom_emp].nem_emp // columna 2,renglon
      num_ren++
    }
  */
  }

  public valid = async () => {
    const ThisForm = this.Form
    const This = this.prop // Hace referencia a las propiedades del componente
    const m: any = {
      // cop_nom: '',
      // cod_nom: ''
    } // :  Record<string, never> ;
    return true
  } // fin metodo valid
}
// export const emp_emp= new EMP_EMP()
