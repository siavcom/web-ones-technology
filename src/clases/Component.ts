//////////////////////////////////////////////
// Clase : Componente Base
// Author : Fernando Cuadras Angulo
// Creacion : Noviembre/2021
// Ult.Mod  : 20/Marzo/2023
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

//import { THISFORM } from "@@/pages/come9101/ThisForm"
//import { nextTick } from "vue"

export class COMPONENT {
  Parent: any = {} //this.Dom.ctx; // Contexto
  Form: any = {} //this.Parent.ThisForm // Thisform
  Name = 'component'  // Se one aqui el name para que en el html poder hacer refere
  db: any
  Recno: number
  Ref: null | undefined
  //Focus: boolean = false
  Index!: number
  header: [] = []
  main: [] = []
  footer: [] = []

  elements: [] = []
  prop = {
    This: {},
    Name: "",
    textLabel: "",
    ToolTipText: '',
    Value: '',
    Placeholder: "",
    Format: "",
    InputMask: "",
    ReadOnly: false,
    Disabled: false,
    Tag: "",
    Valid: true,
    Capture: false,
    Key: 0,
    id: 0,
    ControlSource: "",
    Status: "I",
    ErrorMessage: '',
    ShowError: false,
    TabIndex: 0,
    BaseClass: "editText",
    Type: "text",
    RowSourceType: 0, //1-Value, 2-Alias, 5-Array
    ColumnCount: 1,
    BoundColumn: 1,
    RowSource: {},
    ColumnWidths: '100',
    Visible: true,
    Grid: false,
    RecordSource: '',
    Row: 0,
    Map: "",
    Autofocus: false,
    Position: 'main', // main, header , footer
    Image: '',
    Focus: false,
    First: false,
    Last: false,
    Order: 1,
    // Datos numericos
    Step: "1",
    Min: "0",
    Max: "999999999",
    Style: 'decimal', // decimal, currency,percent,unit
    Currency: 'MXN', //USD,EUR,MXN
    CurrencyDisplay: 'code', //to use the ISO currency code.
    Decimals: 2,
    MultiSelect: false,
    List: [],
    updateKey: false, // true when this component is a field index for a table select , update or delete
    SqlUpdate: false,  //Si es verdadero actualiza automaticamente
    MaxLength: 256,
    componentStyle: {
      background: "white",
      color: "black",
      width: "auto",
      height: "auto",
      maxHeigth: 'auto',
      maxWidth: 'auto',
      fontFamily: "Arial",
      fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
      textAlign: "left",
      textTransform: "none"
    },

  }
  style = {
    //display: "flex", "inline-block"
    display: "inline-flex",
    flexGrow: "0",     /* do not grow   - initial value: 0 */
    flexShrink: "0",   /* do not shrink - initial value: 1 */
    flexBasis: "auto", /* width/height  - initial value: auto */
    flexWrap: "wrap",


    alignContent: "center",
    background: "white",
    backgroundColor: "white",
    color: "#b94295",
    cols: "60",

    fontFamily: "Arial",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    width: "auto",
    height: "auto",
    maxWidth: "auto",
    minWidth: "auto",
    maxHeight: "auto",
    minHeight: "auto",


    textAlign: "left",
    position: "relative",
    wordWrap: "break-word", // Parte las palabras
    backgroundImage: "",
    zIndex: 1,  // profundidad


    // textAlign: "left";
  }

  position = {
    position: "left",
    width: "auto",
    height: "auto",

  }

  imagen = { src: "" }

  //  constructor(parent: Record<string, never>) {
  // contructor base on create 
  constructor() {
    //console.log('On Create Componente ====>',this.constructor.name,this)
    this.Name = this.constructor.name  //.toLowerCase()
    this.prop.Name = this.Name //.toLowerCase()
    this.Recno = 0
    this.prop.This = this
  }

  ///////////////////////////////////////////////////////////
  // Init
  ////////////////////////////////////////////////
  //public Init = async (Form) => {  Las Funciones arrow son funciones no metodos
  //    async Init(Form) {
  public async Init(Form?: any, TabIndex?: number) {  //Form est?: any
    console.log('Init TabIndex', this.Name, TabIndex)
    if (!Form) { // Inicializamos el this.Form
      Form = this
      this.Name = 'ThisForm'
      //      console.log('Init ThisForm', this.Name, this.Form)
      TabIndex = 1
    }
    this.Form = Form
    await this.init() // Corre el init principal
    let maxTabIndex = 1
    let id = 0
    //let comp = {}
    let header: [] = []
    let main: [] = []
    let footer: [] = []
    const elements: [] = []
    // asigna el mapa donde esta  ubicado el componente
    if (this.Name != 'ThisForm' && this.Parent.prop) { // Si tiene propiedades 
      this.prop.Map = this.Parent.prop.Map + '.' + this.prop.Name
    }
    for (const componente in this) {
      if (componente != 'Parent' &&
        componente != 'ThisForm' &&
        componente != 'Form' &&
        this[componente] != null &&
        this[componente] != undefined &&
        this[componente] &&
        this[componente].prop &&
        this[componente].Init) {
        const name = this[componente].prop.Name
        const Position = this[componente].prop.Position.trim().toLowerCase()

        if (Position == 'header')
          header.push(name)

        if (Position == 'main') 
          main.push(name)

        if (Position == 'footer')
          footer.push(name)

        const component = {
          Name: name,
          Id: id, // this[componente].prop.Order,
          Position: Position
        }
        elements.push(component)

        this[componente]['Parent'] = this // ref(this)

        id++
      }

    }

    for (const i in header) {
      const comp=header[i]
      this[comp].prop.TabIndex = TabIndex
      TabIndex++
      TabIndex = await this[comp]['Init'](Form, TabIndex)  // Corre el InitForm en todos los componentes
      // Se quito de aqui ya que el Init corre el init de c/componente
    }

    for (const i in main) {
      const comp=main[i]
      console.log('for next',comp)
      this[comp].prop.TabIndex = TabIndex
      TabIndex++
      TabIndex = await this[comp]['Init'](Form, TabIndex)  // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex)
        maxTabIndex = TabIndex

    }

    for (let i = footer.length - 1; i >= 0; i--) {
      const comp=footer[i]
      this[comp].prop.TabIndex = TabIndex
      TabIndex++
      TabIndex = await this[comp]['Init'](Form, TabIndex)  // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex)
        maxTabIndex = TabIndex

    }
    this.footer = footer.reverse()


    this.elements = elements
    this.header = header
    this.main = main
    /*
    TabIndex = maxTabIndex  // asignamos el TabIndex maximo de elementos
    if (footer.length > 0) {
      for (let i = footer.length - 1; i >= 0; i--) {
        const footerName = footer[i]

        this[footerName].prop.TabIndex = TabIndex
        TabIndex++
      }
    }
    this.footer = footer.reverse()

    */
    this.prop.Status = 'A'

    console.log('Component init', this.Name, this.prop.Map)
    return TabIndex
  }

  ///////////////////////////////////////////////////////////
  // InitForm : Iicializa los valores de toda la forma en cada/componente 
  ////////////////////////////////////////////////
  public async InitForm_ant(Form: any) {
    const elements: [] = []
    //console.log('Inicializando componente Parent ===> ', this.prop.Name,this.Parent)

    //console.log('InitForm  componente Parent ===> ',this.prop.Name)

    if (this.Name != 'ThisForm' && this.Parent.prop) { // Si tiene propiedades 
      this.prop.Map = this.Parent.prop.Map + '.' + this.prop.Name
    }
    //console.log('Mapa clase ======>', this.prop.Name, this.prop.Map)
    for (const componente in this) {
      if (componente !== 'db' &&
        componente !== 'Ref' &&
        componente !== 'Parent' &&
        this[componente] != null &&
        this[componente] != undefined &&
        this[componente] &&
        this[componente].prop &&
        this[componente].InitForm
      ) {
        const component = {
          Name: this[componente].prop.Name,
          Id: this[componente].prop.Order,
          Position: this[componente].prop.Position
        }
        elements.push(component)

        this[componente]['Parent'] = this // ref(this) Pasamos el padre al componente hijo
        await this[componente]['InitForm'](Form) //Hacemos el InitForm a cada componente hijo
        if (this[componente]['init']) await this[componente]['init']() // Init del componente
      }
    }
    this.elements = elements


    this.Form = Form  // asigna la forma a la propiedad Form 
    //console.log('Init form ====>', this.prop.Name)
    this.prop.Status = 'A'
    console.log('Componente Inicializado =========> ', this.prop.Name, this.elements)
    // console.log('Init Componente this.Form',this.Form)
  }





  /////////////////////////////////////////////////////////////////////
  // init
  // Descripcion: init del componente
  /////////////////////////////////////////////////////////////////
  public async init() {

  }
  /////////////////////////////////////////////////////////////////////
  // Valid
  // Descripcion: Cuando pierde el foco valida
  /////////////////////////////////////////////////////////////////
  public async valid() {
    this.prop.Valid = true
    return true
  }

  /////////////////////////////////////////////////////////////////////
  // Click
  // Descripcion: Hace el click
  /////////////////////////////////////////////////////////////////

  public async click() {
    return
  }

  /////////////////////////////////////////////////////////////////////
  // When VFP
  // Descripcion: Cuando recibe el foco
  /////////////////////////////////////////////////////////////////

  public async when() {
    //console.log('Super when ==>',this.prop.Name)
    return true
  }

  /////////////////////////////////////////////////////////////////////
  // Focus
  // Descripcion: Hace el setFocus
  // Obs : se anexa al stack de eventos a ejecutar en forma sincrona
  /////////////////////////////////////////////////////////////////
  //public setFocus = async () => {

  public async setFocus() {
    this.prop.Focus = true
    console.log('Super setFocus ==>', this.prop.Name)

  }

  /////////////////////////////////////////////////////////////////////
  // pushEvent
  // Descripcion: Hace push a la tabla de eventos sincronos
  //              Utiliza el map de la clase para saber la ruta completa de donde 
  //              pertencece en la clase
  //              ThisForm 
  /////////////////////////////////////////////////////////////////

  public pushEvent = async (evento: string) => {
    //console.log('Componente evento empujado====>>',this.prop.Map+ '.' + evento)

    this.Form.eventos.push(this.prop.Map + '.' + evento)
    //console.log('pushEvent eventos===>',this.Form.eventos)

  }


  /////////////////////////////////////////////////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////

  //public keyPress = async ($event) => {
  public keyPress($event) {
    this.prop.Key = $event.charCode
    return this.prop.Key
    //  console.log('KeyPress===>', key)

  }

  /////////////////////////////////////////////////////////////////////
  // Refe
  // Descripcion: asigna la ref html del componente desplegado
  /////////////////////////////////////////////////////////////////
  Refe(el: any) {
    this.Ref = el.$el
    console.log('Columna Ref===>', this.Ref)
  }
}
