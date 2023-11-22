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
   
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.tpy_tpy";
    this.prop.RowSourceType = 2;
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.componentStyle.fontSize='17px'
    this.prop.componentStyle.fontWeight="bold",
    this.style.zIndex=5;
    this.style.width='300px'
    this.style.fontSize= "17px"
    this.style.fontWeight="bold"

  }
  async init() {
    const data = await this.Form.db.execute(
      "select des_tpy,tpy_tpy,cop_nom from vi_cap_cometpy order by cop_nom,tpy_tpy",
      "cometpy"
    );
    if (data.length==0){
        MessageBox('No hay tabla de definición de proyectos')
    }    
    //this.Form.publicVar.cop_nom = data[0].cop_nom; // Se pone en el objeto Var para que cuando hage el appendBlank este en el objeto m.cop_nom
    this.Form.cop_nom.prop.Value=data[0].cop_nom
   
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

  async when(){
    this.Form.tap_tap.Grid.prop.RecordSource=''
    this.Form.tap_tap.Grid.tap_tap.prop.RowSourceType = 0

    this.Form.tap_tap.prop.Disabled=true
    this.Form.tap_tap.prop.Visible=false

    this.Form.nom_nom.prop.Value=''
    this.Form.nom_ven.prop.Value=''

    return true

  }

  async valid() {
    const data = await this.Form.db.localAlaSql(
      `select cop_nom from Now.cometpy where tpy_tpy='${this.prop.Value}'`
    );

   // this.Form.publicVar.cop_nom = data[0].cop_nom; // Se pone en el objeto Var para que cuando hage el appendBlank este en el objeto m.cop_nom

    this.Form.cop_nom.prop.Value=data[0].cop_nom
   /*
    if (data[0].cop_nom == "C") this.Form.des_cop.prop.Value = "Clientes";
    else this.Form.des_cop.prop.Value = "Proveedores";
   */
   return true
  }
}
