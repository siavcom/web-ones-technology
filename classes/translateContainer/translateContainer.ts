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
//import { gridMessages } from "./gridMessages/gridMessages";
import { messages } from "./Messages";

//import { show_messages } from "./show_messages";
import { bt_accept } from "./bt_accept";
//import { csf_pry } from "./csf_pry";

export class translateContainer extends CONTAINER {

  public ColumnTextLabel = new ColumnTextLabel()
  public textlabel = new textlabel()
  public RowSource = new RowSource()
  public PlaceHolder = new PlaceHolder()
  public ToolTipText = new ToolTipText()
  public messages = new messages()

  // public gridMessages = new gridMessages()

  //  public show_messages = new show_messages()
  public bt_accept = new bt_accept()

  constructor() {
    super()
    this.prop.Caption = 'Language translator'
    this.prop.BaseClass = 'modalContainer'
    this.prop.Visible = false
    this.prop.RecordSource = 'vi_cap_db_languages'

    //this.style.width = "auto" // "-moz-available";
    //this.style.maxHeight = "200px";
    //this.style.display = 'flex'
    //this.style.flexWrap = 'wrap'

    //this.containerStyle.display = 'flex'
    //this.containerStyle.flexWrap = 'wrap'

    this.style.width = '600px'
    this.style.height = 'auto'
    this.captionStyle.fontSize = '20px'


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
      [5]: this.messages
    }

    this.block[0].title = 'Components'
    this.block[0].style.width = '95%'

    // =======================<Bloque 1 >===============

    this.block[1] = structuredClone(container)
    this.block[1].component = {
      //[0]: this.gridMessages
      //     [1]: this.show_messages
    }
    this.block[1].title = 'Messages'
    this.block[1].style.width = '95%'

    // =======================<Bloque 2 >===============

    this.block[2] = structuredClone(container)
    this.block[2].component = {
      [0]: this.bt_accept
    }
    this.block[2].style = {}

  }

  async open(refComp: any) {

    if (!this.Form.language)
      return

    //  this.gridMessages.prop.RecordSource = ' '

    const comp = refComp.value

    // this.block[0].title = comp.prop.Name

    // console.log('BasseClass=', comp.prop.BaseClass.toLowerCase())

    if (comp.BaseClass && comp.BaseClass.toLowerCase() == "column")
      this.ColumnTextLabel.prop.Visible = true
    else
      this.ColumnTextLabel.prop.Visible = false


    let rowsource = ""
    //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
    if (comp.prop.BaseClass.toLowerCase() == 'combobox' &&
      (comp.prop.RowSourceType == 1 || comp.prop.RowSourceType == 5)) {
      this.RowSource.prop.Visible = true

      if (typeof comp.prop.RowSource != 'string') {
        let arr = comp.prop.RowSource
        arr = arr.map((item) => JSON.stringify(item))

        for (let i = 0; i < arr.length; i++) {
          //  console.log('1) comp.prop.RowSource=', i, arr[i])
          if (rowsource.length > 0)
            rowsource = rowsource + "," + char(13) + arr[i]
          else
            rowsource = "[" + arr[i]

        }
        rowsource = rowsource + "]"
        //    console.log('2) comp.prop.RowSource=', rowsource)

      } else
        rowsource = comp.prop.RowSource

    }
    else
      this.RowSource.prop.Visible = false

    // console.log('end rowsource=', rowsource)

    let messages = ""
    let arr = comp.prop.Messages

    // console.log('0) comp.prop.Messages=', arr)

    arr = arr.map((item) => JSON.stringify(item))

    for (let i = 0; i < arr.length; i++) {
      //   console.log('1) comp.prop.Messages=', i, arr[i])
      if (messages.length > 0)
        messages = messages + "," + char(13) + arr[i]
      else
        messages = "[" + arr[i]

    }
    messages = messages + "]"
    //  console.log('2) comp.prop.Messages=', messages)


    const m = {
      for_lan: this.Form.prop.Name,
      lan_lan: this.Form.mPublic.lan_lan ? this.Form.mPublic.lan_lan : '   ',
      map_lan: comp.prop.Map,
      message: '  ',
      messages: messages,
      columntextlabel: comp.prop.ColumnTextLabel,
      textlabel: comp.prop.Caption,
      rowsource: rowsource,
      placeholder: comp.prop.Placeholder,
      tooltiptext: comp.prop.ToolTipText,
      errormessage: comp.prop.ErrorMessage
    }

    const data = await this.Sql.localAlaSql(`select recno,messages,rowsource from vi_cap_db_languages where trim(map_lan)='${m.map_lan.trim()}'  `)

    if (data.length > 0) {

      this.Recno = data[0].recno
      // Actualizamos el recno en la vista para que actualice este registro al hacer el tableUpdate
      this.Sql.View.vi_cap_db_languages.recno = this.Recno
      const message: string = comp.prop.Messages
      //  console.log('1)- messages=', data)

      if (data[0].messages.trim() == '')
        this.messages.prop.Value = m.messages

      if (data[0].rowsource.trim() == '')
        this.RowSource.prop.Value = m.rowsource

    } else {
      const valores = await this.Sql.appendBlank('vi_cap_db_languages', m)
      this.Recno = valores.recno
    }

    // console.log('1)- messages=', this)


    this.prop.Disabled = false
    this.prop.Visible = true

    // this.gridMessages.prop.RecordSource = 'vi_cap_db_messages'
    // this.gridMessages.prop.Visible = true

  }

  async close() {
    this.prop.Disabled = true
    this.prop.Visible = false
    // Grabamos las traducciones

    await tableUpdate(0, false, 'vi_cap_db_languages')
  }
}