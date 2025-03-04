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
import { ColumnTextLabel } from "./columnTextLabel";
import { textlabel } from "./TextLabel";
import { RowSource } from "./RowSource";
import { PlaceHolder } from "./PlaceHolder";
import { ToolTipText } from "./ToolTipText";
import { gridMessages } from "./gridMessages/gridMessages";

//import { show_messages } from "./show_messages";
import { bt_accept } from "./bt_accept";
//import { csf_pry } from "./csf_pry";

export class compContainer extends CONTAINER {

  public ColumnTextLabel = new ColumnTextLabel()
  public textlabel = new textlabel()
  public RowSource = new RowSource()
  public PlaceHolder = new PlaceHolder()
  public ToolTipText = new ToolTipText()
  public gridMessages = new gridMessages()

  //  public show_messages = new show_messages()
  public bt_accept = new bt_accept()

  constructor() {
    super()
    this.prop.textLabel = 'Traductor '
    this.prop.BaseClass = 'modalContainer'
    this.prop.Visible = false
    this.prop.RecordSource = 'vi_cap_db_languages'

    //this.style.width = "auto" // "-moz-available";
    //this.style.maxHeight = "200px";
    //this.style.display = 'flex'
    //this.style.flexWrap = 'wrap'
    this.containerStyle.display = 'flex'
    this.containerStyle.flexWrap = 'wrap'
    this.style.width = '600px'
    this.style.height = 'auto'
    this.labelStyle.fontSize = '20px'


    this.asignaRecno()  // asigna recno a c/componente de captura de la forma

    // =======================<Bloque 0 >===============
    const container = this.container

    this.block[0] = structuredClone(container)
    this.block[0].component = {

      [0]: this.ColumnTextLabel,
      [1]: this.textlabel,
      [2]: this.RowSource,
      [3]: this.PlaceHolder,
      [4]: this.ToolTipText,
    }

    this.block[0].title = 'Components'
    this.block[0].style.width = '95%'

    // =======================<Bloque 1 >===============

    this.block[1] = structuredClone(container)
    this.block[1].component = {
      [0]: this.bt_accept
    }
    this.block[1].style = {}

    // =======================<Bloque 1 >===============

    this.block[2] = structuredClone(container)
    this.block[2].component = {
      [0]: this.gridMessages
      //     [1]: this.show_messages
    }
    this.block[2].title = 'Messages'
    this.block[2].style.width = '95%'

  }


  async open(refComp: any) {

    if (!this.Form.language)
      return

    this.gridMessages.prop.RecordSource = ' '

    const comp = refComp.value

    // this.block[0].title = comp.prop.Name
    /*  
      if (comp.prop.Type.toLowerCase() != 'combobox')
        this.RowSource.prop.Visible = false
      else
        this.RowSource.prop.Visible = true
  
      if (comp.BaseClass && comp.BaseClass.toLowerCase() == "column")
        this.ColumnTextLabel.prop.Visible = false
      else
        this.ColumnTextLabel.prop.Visible = true
  */


    let rowsource = ""
    if (typeof comp.prop.RowSource != 'string') {
      let arr = comp.prop.RowSource
      arr = arr.map((item) => JSON.stringify(item))

      for (let i = 0; i < arr.length; i++) {
        console.log('1) comp.prop.RowSource=', i, arr[i])
        if (rowsource.length > 0)
          rowsource = rowsource + "," + arr[i]
        else
          rowsource = "[" + arr[i]

      }
      rowsource = rowsource + "]"
      console.log('2) comp.prop.RowSource=', rowsource)

    } else
      rowsource = comp.prop.RowSource

    console.log('end rowsource=', rowsource)

    const m = {
      for_lan: this.Form.prop.Name,
      lan_lan: this.Form.publicVar.lan_lan ? this.Form.publicVar.lan_lan : '   ',
      map_lan: comp.prop.Map,
      message: '  ',
      columntextlabel: comp.prop.ColumnTextLabel,
      textlabel: comp.prop.textLabel,
      rowsource: rowsource,
      placeholder: comp.prop.Placeholder,
      tooltiptext: comp.prop.ToolTipText,
      errormessage: comp.prop.ErrorMessage
    }


    const data = await this.Sql.localAlaSql(`select recno from vi_cap_db_languages where trim(map_lan)='${m.map_lan.trim()}'  `)

    if (data.length > 0) {
      this.Recno = data[0].recno
    } else {
      const valores = await this.Sql.appendBlank('vi_cap_db_languages', m)
      this.Recno = valores.recno
    }

    this.prop.Visible = true
    this.gridMessages.prop.RecordSource = 'vi_cap_db_messages'
    this.gridMessages.prop.Visible = true

  }

  async close() {
    this.prop.Visible = false

    // Grabamos las traducciones


    await this.Sql.tableUpdate(0, false, 'vi_cap_db_languages')
    await this.Sql.tableUpdate(0, false, 'vi_cap_db_messages')



  }
}