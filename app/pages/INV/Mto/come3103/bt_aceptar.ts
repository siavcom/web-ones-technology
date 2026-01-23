//////////////////////////////////////////////
// Clase : bt_aceptar
// @author: Fernando Cuadras Angulo
// Creacion : 12/Julio/2023
/////////////////////////////////////////////


/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_aceptar extends IMGBUTTON {
  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Caption = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = " /Iconos/svg/accept.svg";
    this.prop.TabIndex = 1;
    this.style.width = "64px";
  } // Fin constructor

  override async click() {
    this.prop.Visible = false;

    this.Form.captura_fami.prop.RecordSource = ''
    const m = { num_fam: this.Parent.num_fam.prop.Value }
    await use('vi_cap_fam', m);
    if (recCount('vi_cap_fam') == 0)
      return

    this.Form.captura_fami.prop.RecordSource = ('vi_cap_fam')
    this.Form.captura_fami.prop.Visible = true
    return true
  }   // 

}

