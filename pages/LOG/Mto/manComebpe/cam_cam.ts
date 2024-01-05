//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cam_cam
// Description : Vehiculo (camion siavcom)
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class cam_cam extends captureComponent {
  constructor() {
    super();

    this.prop.textLabel = "Vehiculo (camion siavcom)";
    this.prop.Type = "number";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.cam_cam";
    this.prop.MaxLength = 4;
    this.prop.Min = "0";
    this.prop.Max = "2147483647";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Visible = false;
    this.prop.componentStyle.width = "64px";
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    console.log("when cam_cam tip_bpe.Value=", this.Form.tip_bpe.prop.Value);
    if (this.Form.tip_bpe.prop.Value == 0) {
      this.prop.ReadOnly = false;
    } else {
      this.prop.ReadOnly = true;
    }

    this.prop.Valid = true;
    return !this.prop.ReadOnly;
  }
  //////////////////////////////////
  // event valid
  ///////////////////////////////////

  async valid() {
    if (this.prop.Value == 0) {
      return true;
    }

    const res = await this.Sql.execute(
      `select cam_cam,pla_cam,des_mar,des_tiu from vcome2201 where cam_cam=${this.prop.Value}`
    );
    if (res && res[0].cam_cam && res[0].cam_cam > 0) {
      this.Form.pla_cam.prop.Value = res[0].pla_cam;
      this.Form.des_mar.prop.Value = res[0].des_mar;
      this.Form.des_tiu.prop.Value = res[0].des_tiu;
      this.prop.Valid = true;
    } else this.prop.Valid = false;
    return this.prop.Valid;
  }

  //////////////////////////////////
  // event click
  ///////////////////////////////////
  /*
    async click() {

    }
    */

  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////
  /*
    public keyPress = async ($event) => {
    const key=super.keyPress($event)

   }
  */
}
