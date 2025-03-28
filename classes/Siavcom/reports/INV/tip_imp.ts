//////////////////////////////////////////////
// BaseClass : component
// Class : alm_rep
// Description : Almacenes
// Author : El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_imp extends COMPONENT {
  constructor() {
    super();
    this.prop.textLabel = "Tipo de impresión";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Con existencia",
        "Sin existencia",
        "Solo con movimientos",
        "Existencia en negativo",
        "Todos"
      ],
      [1, 2, 3, 4, 5]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value="1";
  
  }
  public async init() {
    await super.init()
  //  this.var_ord.prop.Value = "";

  if (this.Form.prop.Name == 'come3220'){
    this.prop.textLabel = "Expresado en ";
    this.prop.RowSource = [
      ["Unidades ","Importes"],
      [1, 2]
    ];
    this.prop.Value=1;
  }
  }

  async interactiveChange() {

    if (this.Form.prop.Name == 'come3220' && this.prop.Value ==2){
  
   this.Parent.tip_cos.prop.Visible = true
   this.Parent.tip_cos.prop.Disabled = false
   this.Parent.tip_ana.prop.Visible = true
   this.Parent.tip_ana.prop.Disabled = false
  return true;
  }
  if (this.Form.prop.Name == 'come3220' && this.prop.Value ==1){
  
    this.Parent.tip_cos.prop.Visible = false
    this.Parent.tip_cos.prop.Disabled = true
    this.Parent.tip_ana.prop.Visible = false
    this.Parent.tip_ana.prop.Disabled = true
    this.Parent.tip_for.prop.Visible = false
    this.Parent.tip_for.prop.Disabled = true
    this.Parent.for_cal.prop.Visible = false
    this.Parent.for_cal.prop.Disabled = true
    return true;
   }
  
 
}
}
