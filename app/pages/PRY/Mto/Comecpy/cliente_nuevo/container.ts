
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : Container
// @class : modal_vta
// Description : Contenedor para datos clientes nuevos
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { CONTAINER } from "@/classes/Container";

/////////////////////////////////////////
// Component import
//////////////////////////////////////
import { cli_pry } from "./cli_pry";
//import { csf_pry } from "./csf_pry";

export class cliente_nuevo extends CONTAINER {

  public cli_pry = new cli_pry() // Datos Json cliente nuevo
  // public csf_pry = new csf_pry() // Conprobante de situasion fiscal

  //  public bt_save = new bt_save()
  // public bt_accept = new bt_accept()

  constructor() {
    super()
    this.prop.BaseClass = 'container'   //'modalContainer'
    this.prop.Visible = false

    //this.style.width = "auto" // "-moz-available";
    //this.style.maxHeight = "200px";
    //this.style.display = 'flex'
    //this.style.flexWrap = 'wrap'
    this.containerStyle.display = 'flex'
    this.containerStyle.flexWrap = 'wrap'
    this.style.maxWidth = '600px'

    // =======================<Bloque 0 >===============
    const container = this.container

    this.block[0] = structuredClone(container)
    this.block[0].component = {

      [0]: this.cli_pry,

    }

    this.block[0].title = 'Cliente Nuevo'
    this.block[0].style.width = '95%'

  }

  async open() {
    this.prop.Visible = true
  }
  async close() {
    this.prop.Visible = false
  }


}
