//////////////////////////////////////////////
// Clase : dic_dat
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 6/Septiembre/2022
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class dic_dat extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
  //  this.prop.Name = 'dic_dat'
    this.prop.BaseClass = 'comboBox'
    this.prop.textLabel = "Tipo de diccionario  de datos";
    this.prop.ToolTipText=this.prop.textLabel 
        this.prop.ReadOnly = false;
    this.prop.Capture = false;
    this.prop.RowSource = [
      ["Definicion de Tabla", "Tablas del SQL Server", "Indices", "Vistas de captura", "Menú de programas"],
      ["D", "T", "I", "V", "M"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.ControlSource = 'vi_cap_dat.dic_dat'
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths='80%,20%'
    this.style.width='400px'
    this.style.zIndex=3
  }
  // init del componente 
  public init = async (form:any) =>{
   // await super.Init(form)
    this.prop.Value = "T";
    this.Form.nom_tab.Visible=true
    
  }
  
  public async when() {
  // public setFocus = async () => {
    await super.when()
    console.log('bt_aceptar when')
    this.Form.nom_tab.prop.Visible = false
    //this.Form.tip_men.prop.Visible = false
    this.Form.sis_sis.prop.Visible = false
    this.Form.tpr_prg.prop.Visible = false
    
    this.Form.grid_datos.prop.Visible=false
    this.Form.grid_indices.prop.Visible = false
    this.Form.grid_vistas.prop.Visible = false
    this.Form.grid_menu.prop.Visible = false
    this.Form.grid_tablas.prop.Visible = false

    //this.Form.btGenModel.prop.Visible = false
    //this.Form.btGenIndices.prop.Visible = false
    //this.Form.btGenVistas.prop.Visible = false

    return !this.prop.ReadOnly
  }

  public async valid_old () {
   // await super.valid()
    console.log('dic_dat valid',this.prop.Value)
    
    //const This = this.prop; // Hace referencia a las propiedades del componente

    if (this.prop.Value=='D' || 
        this.prop.Value=='V' || 
        this.prop.Value=='I' ){ // Datos , Vistas o Indices
 
      this.Form.nom_tab.prop.Visible = true
      this.Form.nom_tab.setFocus()
    }
   
    return true


  }
}