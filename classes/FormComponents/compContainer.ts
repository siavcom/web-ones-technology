//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Container
// Class : modal_vta
// Description : Contenedor para datos clientes nuevos
// Author : El Fer Blocks (Fernando Cuadras)
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
import { mainTextLabel } from "./mainTextLabel";
import { propTextLabel } from "./propTextLabel";
import { propRowSource } from "./propRowSource";
import { bt_accept } from "./bt_accept";
//import { csf_pry } from "./csf_pry";

export class compContainer extends CONTAINER {

  public mainTextLabel = new mainTextLabel()
  public propTextLabel = new propTextLabel()
  public propRowSource = new propRowSource()
  public bt_accept = new bt_accept()

  constructor() {
    super()

    this.prop.BaseClass = 'modalContainer'
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

      [0]: this.mainTextLabel,
      [1]: this.propTextLabel,
      [2]: this.propRowSource
    }

    this.block[0].title = 'Componentes'
    this.block[0].style.width = '95%'

  }

  async open(refComp: any) {
    const comp = refComp.value
    this.textLabel.prop.Value = comp.textLabel;
    this.propTextLabel.prop.Value = comp.prop.textLabel;
    this.propRowSource.prop.Value = comp.prop.RowSource;
    this.prop.Visible = true

    const data = await this.Sql.localAlaSql(`select * from langages where map_lan='${comp.prop.Map}'  `)

  }
  async close() {
    const data = await this.Sql.localAlaSql('')

    //await this.Sql.execute(`select map_lan,wor_lan,tra_lan from vi_cap_db_languages \
    //  where lan_lan='${m.lan_lan}' and for_lan='${m.for_lan}' `, 'language'))

    this.prop.Visible = false
  }


}
