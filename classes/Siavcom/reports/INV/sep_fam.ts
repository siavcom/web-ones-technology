//////////////////////////////////////////////
// BaseClass : component
// Class : sep_fam
// Description : Se separa por familias
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class sep_fam extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Por familia";
    this.prop.Type = "checkBox";
    this.prop.Value = 0;
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  async interactiveChange() {
    if (this.prop.Value == 1) {
      this.Parent.num_fam.valid();
      this.Parent.num_fam.prop.Visible = true;
      this.Parent.num_fam.prop.Disabled = false;

      this.Parent.des_fam.prop.Visible = true;
      this.Parent.des_fam.prop.Disabled = false;

      this.Parent.has_fam.prop.Visible = true;
      this.Parent.has_fam.prop.Disabled = false;

      return true;
    }

    this.Parent.num_fam.prop.Visible = false;
    this.Parent.num_fam.prop.Disabled = true;

    this.Parent.des_fam.prop.Visible = false;
    this.Parent.des_fam.prop.Disabled = true;

    this.Parent.has_fam.prop.Visible = false;
    this.Parent.has_fam.prop.Disabled = true;
  } //
}
