/// ///////////////////////////////////////////
// Clase : emp_emp
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  :
/// //////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dat_emp from '@/static/empresas/datos.json'

import { COMPONENT } from '@/classes/Component'

export class emp_emp extends COMPONENT {
  // name = 'emp_emp'

  //  constructor(parent: Record<string, never>) {

  constructor () {
    super()
    // this.prop.Name='emp_emp'
    this.prop.BaseClass = 'comboBox'
    //this.prop.Value = 'Demo'
    this.prop.textLabel = 'Empresa'
    this.prop.Capture = true
    this.prop.RowSourceType = 5 // 1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2
    this.prop.BoundColumn = 1
    this.prop.RowSource = [[''], ['']]
    this.prop.ColumnWidths = '37%,60%'
    this.style.width = '200px'
    this.style.zIndex = 2
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
    // console.log('emp_emp RowSource >===',this.prop.RowSource)
    /*
    this.Parent = parent.value // solo asigno algo para que no de el error
    console.log('Emp_emp=== ctx',this.Parent)
    this.Form=this.Parent.ThisForm
    const This = this.Parent.ThisForm[this.name].prop
    const style = this.Parent.ThisForm[this.name].style
    const position = this.Parent.ThisForm[this.name].position

    This.prop.Name = "Demo";
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
