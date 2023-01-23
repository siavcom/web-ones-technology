//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2020
// Ult.Mod  : 18/Octubre /2021
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
//import { nextTick } from 'vue';


export class nom_tab extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    
    this.prop.BaseClass = 'comboBox'
    this.prop.Visible= false
    this.prop.textLabel = "Tablas del sistema";
    this.prop.Capture = true // al quitarlo, quito reactividad oJo
    this.prop.Sw_val = false;
    this.prop.ErrorMessage = ''
    this.prop.Value = "COMETAB";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = "select des_tab,nom_tab from vi_cap_tab order by nom_tab"
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths ="70%,25%";
    this.prop.Visible = false;
    this.prop.MultiSelect= false;
    this.prop.List= [],
    this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
    this.style.width='400px'
    this.style.zIndex=2
  }


  ////////////////////////////////
  public async when() {
    // public setFocus = async () => {
    await super.when()
   // console.log('nom_tab when')
    this.Form.grid_datos.prop.Visible = false
    this.Form.grid_vistas.prop.Visible = false
    this.Form.grid_indices.prop.Visible = false
    await this.Form.db.useNodata('vi_cap_dat')
    await this.Form.db.useNodata('vi_cap_ind')
    await this.Form.db.useNodata('vi_cap_vis')
    
   return
  }

//  public async valid() {
//    await super.valid()

    /*    console.log('this.Value', this.prop.Value)
        if (ThisForm.dic_dat.prop.Value == 'D') {  // Datos
          //ThisForm.grid_datos.renglon.length=0 // Limpiamos los renglones que tenga el grid
          ThisForm.grid_datos.prop.Visible=true 
          ThisForm.grid_datos.prop.Status='A' 
    
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_dat')==0)  await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_dat",m)
    
    //      await ThisForm.db.vista_captura(m,"vi_cap_dat") // borrar vista_captura en DataBase
    
        }
    
        if (ThisForm.dic_dat.prop.Value == 'I') { // Indices
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_ind')==0) await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_ind",m) 
          ThisForm.grid_datos.prop.Visible=false
     
        }
    
        if (ThisForm.dic_dat.prop.Value == 'V') // Vistas
        {
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_vis')==0) await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_vis",m) 
          ThisForm.grid_datos.prop.Visible=false
    
        }
    */
//   return true
//  }; // fin metodo valid
}