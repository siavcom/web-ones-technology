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
    this.prop.Caption = "Numero de familia";
    this.prop.Value = 1;
    this.prop.Min = 1;
    this.prop.Max = 4;
    this.prop.Visible = false;
    this.prop.Disabled = true;

    this.inputStyle.width = "40px";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  override async init() {
    var ins_loc = ''
    const data = await SQLExec(`select des_fam,cla_fam,num_fam,case num_fam when 1 then 0 when 2 then pri_cla when 3 then ter_cla else cua_cla end pri_cla,
            case num_fam when 1 then pri_cla when 2 then seg_cla when 3 then ter_cla else len(rtrim(ima_pge)) end ult_cla,
            'des_fa'+cast(num_fam as char(1)) as que_fam
            from mPublic v,man_comefam
     `, 'loc_comefam')
  }
  async valid() {
    console.log("num_fam Interactivechange Value=", this.prop.Value);
    this.Parent.op_des_fam.prop.RowSource = "";
    this.Parent.op_has_fam.prop.RowSource = "";
    this.Parent.op_des_fam.prop.RowSource = `select des_fam,cla_fam,num_fam from loc_comefam  where num_fam=${this.prop.Value} order by num_fam,cla_fam  `;
    this.Parent.op_has_fam.prop.RowSource = `select des_fam,cla_fam,num_fam from loc_comefam  where num_fam=${this.prop.Value} order by num_fam,cla_fam  `;
    return true;
  }
}
