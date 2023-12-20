//////////////////////////////////////////////
// BaseClass : component
// Class : num_fam
// Description : numero de familia
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class num_fam extends COMPONENT {
  constructor() {
    super();

    this.prop.Type = "spinner";
    this.prop.textLabel = "Numero de familia";
    this.prop.Value = 1;
    this.prop.Min = 1;
    this.prop.Max = 4;
    this.prop.Visible = false;
    this.prop.Disabled = true;

    this.prop.componentStyle.width = "40px";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  async valid() {
    console.log("num_fam Interactivechange Value=", this.prop.Value);
    this.Parent.des_fam.prop.RowSource = "";
    this.Parent.has_fam.prop.RowSource = "";
    this.Parent.des_fam.prop.RowSource = `select des_fam,cla_fam,num_fam from man_comefam  where num_fam=${this.prop.Value} order by num_fam,cla_fam  `;
    this.Parent.has_fam.prop.RowSource = `select des_fam,cla_fam,num_fam from man_comefam  where num_fam=${this.prop.Value} order by num_fam,cla_fam  `;
    return;
  } //
}
