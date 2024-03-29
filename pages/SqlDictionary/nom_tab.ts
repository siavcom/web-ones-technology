//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : Tablas del servidor SQL Server
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2020
// Ult.Mod  : 18/Octubre /2021
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";


export class nom_tab extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.Visible = false;
    this.prop.textLabel = "Tablas del SQL Server";
    this.prop.Capture = true; 
    this.prop.Value = "COMETAB";
    this.prop.RowSourceType = 0; // 3   1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource ='' // "select des_tab,nom_tab,sis_sis from vi_cap_cometab order by sis_sis,nom_tab";
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "60%,30%,10%";
    this.prop.Visible = false;
    this.prop.MultiSelect = false;
    this.prop.List = [];
    this.prop.Style = "2"; //0=DropDown Combo 2=DropDown List
    this.style.width = "650px";
    this.inputStyle.width = "300px";
    //this.style.zIndex=2
  }

  ////////////////////////////////
  public async when() {
    // public setFocus = async () => {
    // console.log('nom_tab when')
    this.Form.grid_datos.prop.Visible = false;
    this.Form.grid_vistas.prop.Visible = false;
    this.Form.grid_indices.prop.Visible = false;
    await this.Form.db.useNodata("vi_cap_comedat");
    await this.Form.db.useNodata("vi_cap_comeind");
    await this.Form.db.useNodata("vi_cap_comevis");
    this.Form.bt_gen_model.prop.Visible = false;
    this.Form.bt_gen_indices.prop.Visible = false;
    this.Form.bt_gen_vistas.prop.Visible = false;
    return true;
  }

  //  public async valid() {
  //    await super.valid()

  /*    console.log('this.Value', this.prop.Value)
        if (ThisForm.dic_dat.prop.Value == 'D') {  // Datos
          //ThisForm.grid_datos.renglon.length=0 // Limpiamos los renglones que tenga el grid
          ThisForm.grid_datos.prop.Visible=true 
          ThisForm.grid_datos.prop.Status='A' 
    
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_comedat')==0)  await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_comedat",m)
    
    //      await ThisForm.db.vista_captura(m,"vi_cap_comedat") // borrar vista_captura en DataBase
    
        }
    
        if (ThisForm.dic_dat.prop.Value == 'I') { // Indices
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_comeind')==0) await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_comeind",m) 
          ThisForm.grid_datos.prop.Visible=false
     
        }
    
        if (ThisForm.dic_dat.prop.Value == 'V') // Vistas
        {
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_comevis')==0) await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_comevis",m) 
          ThisForm.grid_datos.prop.Visible=false
    
        }
    */
  //   return true
  //  }; // fin metodo valid
}
/*
man_comebpe
 left outer join man_cometba on   man_comebpe.tba_tba=man_cometba.tba_tba
 left outer join man_comecam on
man_comebpe.cam_cam=man_comecam.cam_cam
*/
