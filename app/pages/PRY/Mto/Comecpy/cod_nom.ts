//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : cod_nom
// Description : Código
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
import { nom_nom } from './nom_nom'
import { cliente_nuevo } from './cliente_nuevo/container'

export class cod_nom extends COMPONENT {
  public nom_nom = new nom_nom()
  public cliente_nuevo = new cliente_nuevo()

  constructor() {
    super();
    this.prop.Caption = "Código";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.cod_nom";
    this.prop.ToolTipText = "Codigo del cliente";
    this.prop.Disabled = true
    this.inputStyle.width = "128px";

    //this.style.width = "120px";
  }


  /**
   * Verifica si el codigo existe en la tabla de clientes o proveedores.
   * Si existe, asigna el nombre del cliente o proveedor a la propiedad nom_nom
   * @returns boolean
   */
  override async valid(cod_nom?: string) {
    //const pry = await scatter(  ['pry_pry', 'key_pri', 'cop_nom', 'cod_nom'], 'vi_cap_comepry')

    let m = await scatter(['num_pry', 'key_pri', 'cop_nom', 'cod_nom'], 'vi_cap_comepry')

    console.log('cod_nom valid pry=', m)

    /*
        let m = {
          cop_nom: pry.cop_nom,
          cod_nom: pry.cod_nom
        };
    */
    await use("lla1_tdn", m);
    const data = await goto(0, "lla1_tdn")

    m = appendM(m, data)

    //  console.log('cod_nom valid m=', m)

    if (m.sta_nom == 'B' || m.ecc_nom == 'B') {	// cliente bloqueado
      let men_blo = 'Cliente bloqueado. '
      men_blo = men_blo + m.dst_nom.trim()

      men_blo = men_blo.trim() + ' Revise estado de cuenta de este cliente'

      await MessageBox(men_blo)

      return false
    }

    m = appendM(m, this.Form.mPublic)

    // es cliente de mostrador
    // console.log('valid cod_nom ', m.cop_nom, m.cod_nom.trim() == m.mos_pge.trim(), m.mos_tdn)
    if (((m.cop_nom == 'C' && m.cod_nom.trim() == m.mos_pge.trim()) ||
      (m.cop_nom == 'P' && m.cod_nom.trim() == m.pva_pge.trim())) || m.mos_tdn == 1) {
      this.nom_nom.prop.Visible = false

      // const d = await scatter(['cli_pry'], 'vi_cap_comepry')

      await this.cliente_nuevo.open() // Muestra dato mostrador

    } else
      this.nom_nom.prop.Visible = true


    this.prop.Valid = true;

    return this.prop.Valid;

  }

}
