//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : cod_nom
// Description : Código
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :2024-04-23
/////////////////////////////////////////////

import { help } from '@/classes/Siavcom/help/cod_nom/help'
import { nom_nom } from './nom_nom'
import { cliente_nuevo } from './cliente_nuevo/container'

export class cod_nom extends CAPTURECOMPONENT {
  public help = new help()
  public nom_nom = new nom_nom()
  public cliente_nuevo = new cliente_nuevo()
  constructor() {
    super();
    this.prop.Caption = "Código";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.RecordSource = "vi_cap_comepry"
    this.prop.ControlSource = "vi_cap_comepry.cod_nom";
    this.prop.ToolTipText = "Codigo del cliente/proveedor";
    this.prop.Capture = true;
    this.prop.ErrorMessage = "Código inexistente";
    this.prop.Help = true;
    this.inputStyle.width = "120px";
    this.style.width = 'auto'
    this.prop.Messages[0] = ' Revise estado de cuenta de este cliente'
    this.prop.Messages[1] = ' Cliente bloqueado. '
    // this.containerStyle.width = '-moz-available'

  }

  override async when() {
    if (this.prop.ReadOnly) return true;

    this.old_value = this.prop.Value
    const m = await goto(0, 'vi_cap_comepry')
    console.log('when cod_nom cop_nom=', m)

    if (m.cop_nom != "C" && m.cop_nom != "P") {
      this.prop.Valid = true;
      this.prop.Help = false;
      return false
    }

    await this.cliente_nuevo.close()
    this.prop.Help = true;
    this.help.cop_nom = m.cop_nom
    return !this.prop.ReadOnly;
  }

  /**
   * Verifica si el codigo existe en la tabla de clientes o proveedores.
   * Si existe, asigna el nombre del cliente o proveedor a la propiedad nom_nom
   * @returns boolean
   */
  override async valid(cod_nom?: string) {

    let m = await goto(0, 'vi_cap_comepry');
    console.log('valid cod_nom pry=', m)


    if (this.prop.Value.trim().length == 0)
      return false;

    if (!cod_nom)
      cod_nom = this.prop.Value.trim();

    if (cod_nom.trim().length == 0) {

      return false;
    }

    // let m = { cop_nom: pry.cop_nom.Value, cod_nom: cod_nom };

    await use("vi_cap_comenom", m);
    const nom = await goto(0, 'vi_cap_comenom')
    console.log('1) valid cod_nom mnom=', nom)

    if (nom.key_pri && nom.key_pri == 0)
      return false;

    this.nom_nom.prop.Value = nom.nom_nom

    if (nom.sta_nom == 'B' || nom.ecc_nom == 'B') {	// cliente bloqueado
      let men_blo = this.prop.Messages[1]
      men_blo = men_blo + nom.dst_nom.trim()
      men_blo = men_blo.trim() + this.prop.Messages[0]
      MessageBox(men_blo)
      return false
    }

    if (nom.key_pri == 0 && nom.ven_ven > 0) {
      this.Form.ven_ven.prop.Value = nom.ven_ven;
      await this.Form.ven_ven.valid()
    }

    await this.codigoNuevo(nom)
    console.log('2 valid cod_nom m=', m)

    // es cliente/proveedor NUEVO
    console.log('3) valid cod_nom m=', m.cop_nom, m.cod_nom.trim() == m.mos_pge.trim(), m.mos_pge)

    return true;

  }

  async codigoNuevo(m: {}) {
    m.mos_pge = this.Form.mPublic.mos_pge
    m.pva_pge = this.Form.mPublic.pva_pge

    if (((m.cop_nom == 'C' && m.cod_nom.trim() == m.mos_pge.trim()) ||
      (m.cop_nom == 'P' && m.cod_nom.trim() == m.pva_pge.trim())) || m.mos_tdn == 1) {
      this.nom_nom.prop.Visible = false

      const d = await scatter(['cli_pry'], 'vi_cap_comepry')
      if (d.cli_pry == null || d.cli_pry.trim().length <= 5) {
        let val_eval = View.vi_cap_comepry.est_tabla.cli_pry.val_def
        val_eval = val_eval.replaceAll(String.fromCharCode(13), ' ')
        val_eval = val_eval.replaceAll(String.fromCharCode(10), ' ')
        const data = eval(val_eval)
        console.log('valid cod_nom typeof=', typeof d.cli_pry)
        await localAlaSql(`update vi_cap_comepry set cli_pry='${data}'`)
      }

      await this.cliente_nuevo.open()

    } else {
      this.nom_nom.prop.Visible = true   // aparecemos el nombre del cliente
      await localAlaSql(`update vi_cap_comepry set cli_pry=null`)
    }

  }

}
