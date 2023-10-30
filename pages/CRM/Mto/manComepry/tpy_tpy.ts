//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tpy_tpy
// Description : Tipo
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { captureComponent } from "@/classes/captureComponent";

export class tpy_tpy extends captureComponent {
  constructor() {
    super();

    this.prop.textLabel = "Tipo";
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.tpy_tpy";
    this.prop.RowSourceType = 2;
    //        this.prop.RowSourceType = 2 //1-Value, 2-Alias,3-sql 5-Array
    //        this.prop.RowSource ="select des_tpy,tpy_tpy from vi_cap_cometpy"
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.style.zIndex=5;

  }
  async init() {
    const data = await this.Form.db.execute(
      "select des_tpy,tpy_tpy,cop_nom from vi_cap_cometpy order by cop_nom,tpy_tpy",
      "cometpy"
    );
    if (data.length==0){
        MessageBox('No hay tabla de definición de proyectos')
    }    
    this.Form.publicVar.cop_nom = data[0].cop_nom; // Se pone en el objeto Var para que cuando hage el appendBlank este en el objeto m.cop_nom
    this.Form.cop_nom.Value=data[0].cop_nom
   
    this.prop.RowSource = "cometpy.des_tpy,tpy_tpy,cop_nom";

    /*
    if (data[0].cop_nom == "C") 
          this.Form.des_cop.prop.Value = "Clientes";
    else 
      this.Form.des_cop.prop.Value = "Proveedores";

    */  
    this.prop.ReadOnly=false

   //  await this.interactiveChange()
  }

  async interactiveChange() {
    const data = await this.Form.db.localAlaSql(
      `select cop_nom from Now.cometpy where tpy_tpy='${this.prop.Value}'`
    );

    this.Form.publicVar.cop_nom = data[0].cop_nom; // Se pone en el objeto Var para que cuando hage el appendBlank este en el objeto m.cop_nom

    this.Form.cop_nom.Value=data[0].cop_nom
   /*
    if (data[0].cop_nom == "C") this.Form.des_cop.prop.Value = "Clientes";
    else this.Form.des_cop.prop.Value = "Proveedores";
   */
  }
}
