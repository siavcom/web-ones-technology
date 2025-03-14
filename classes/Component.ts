/**
 * //////////////////////////////////////////////
 *  Clase : Componente Base
 *  Author : Fernando Cuadras Angulo
 *  Creacion : Noviembre/2021
 *  Ult.Mod  : 20/Marzo/2023
 *
 *  RowSourceType: 0, //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
 *
 * @export
 * @class COMPONENT
 */

export class COMPONENT {
  Name: string; // =(typeof this.constructor.name =="string") ? this.constructor.name :'Undefined'   //.toLowerCase()
  Parent = {}; //this.Dom.ctx; // Contexto

  Form: any = {}; //this.Parent.ThisForm // Thisform
  //Name = 'component'  // Se pone aqui el name para que en el html poder hacer refere
  //name = this.Name
  Sql: any = {};
  Recno: number = 0; // ref(0)
  //Ref: null | undefined;
  Show: true = true;
  Index!: number;
  header: [] = []; // elementos que tiene el componente en header
  main: [] = []; // elementos que tiene el componente en main
  footer: [] = []; // elementos que tiene el componente en footer
  elements: [] = []; // elementos que tiene el componente
  status: {} = {}; // status de todos los hijos del componente
  Position: [] = []; // Posicion del componente
  block: [] = [] // bloque del componentes
  error = false
  sw_init = false
  Help = false
  textLabel = ""
  sw_translate = true

  prop = {
    autoLoad: false,
    Autofocus: false,

    BaseClass: "editText",
    BoundColumn: 1,

    Capture: false,
    ControlSource: "",
    ColumnCount: 1,
    ColumnTextLabel: '',
    ColumnWidths: "75%,25%",
    Currency: "", //USD,EUR,MXN
    CurrencyDisplay: "code", //to use the ISO currency code.

    Development: false,
    Disabled: false,
    Decimals: 2,

    ErrorMessage: "",

    First: false,
    Focus: false,
    Format: "", //"ke" tipo fecha seleccionada al input

    Help: false,
    Grid: false,

    htmlId: "",

    id: 0,
    Image: "",
    Init: true,
    InputMask: "", //'XX-XX' '$999,999.99' '!!!-XXXXXX-9'
    /*
        // # represents numbers 0 - 9
        '#': { pattern: /[0-9]/ },
    
        // X represents alphanumeric characters 0 - 9, a - z and A - Z
        'X': { pattern: /[0-9a-zA-Z]/ },
    
        // S represents alphabets a - z and A - Z
        'S': { pattern: /[a-zA-Z]/ },
    
        // A represents alphabets a - z and A - Z transformed to uppercase
        'A': { pattern: /[a-zA-Z]/, uppercase: true },
    
        // a represents alphabets a - z and A - Z transformed to lowercase
        'a': { pattern: /[a-zA-Z]/, lowercase: true },
    
        // ! escapes next token (mask !# will render #)
        '!': { escape: true },
    
        // * is a repeat symbol that allows repeating current token until it’s valid (e.g. mask #* for all digits or A* A* A* A* for ALLOW FOUR WORDS ONLY)
        '*': { repeat: true }
    */
    InputProp: { Enabled: true, Visible: true },

    Key: 0,

    Map: "", // Nos indica el mapSource del componente
    MaxLength: 254,
    // Datos numericos
    Max: "999999999",
    Messages: [[]],   // Mensaje a emitir en este componente
    Min: "0",
    MultiSelect: false,

    Name: "",
    nextFocus: false,

    Last: false,
    ListCount: [],

    Order: 1,

    Placeholder: "",
    Position: "main", // main, header , footer

    ReadOnly: false,
    RecordSource: "",
    RefValue: null, // Valor por Referencia de otro componente
    Row: 0,
    RowSource: '',
    RowSourceType: 0, //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array

    ShowError: false,
    ShowValue: false,
    SqlUpdate: false, //Si es verdadero actualiza automaticamente
    Status: "I",
    Step: "1",
    Style: 1, //commonly in comboBox

    TabIndex: 0,
    Tag: "",
    textLabel: "",
    This: null,
    ToolTipText: "",
    Type: "text",  // text, number, date, time, checKBox

    updateKey: false, // true when this component is a field index for a table select , update or delete

    Valid: true,
    Value: '', // MaybeRefOrGetter<string | number | boolean | Date | null>("") >, // Valor del componente
    ValidOnRead: false, // Si es verdadero, cuando cambia se lee su valor desde AlaSql manda a la rutina de validacion del componente
    Visible: true,

    When: true,
  };

  containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '600px',
    //  alignContent: "flex-end",
    //  alignItems: "flex-end",
    //  display: "flex",
    //  flexDirection: "row",
    //  flexWrap: "nowrap",
    //  justifyContent: "flex-end",
    //  width: "100%"
    paddingLeft: "auto",
  }

  labelStyle = {
    accept: "",
    background: "", //transparent
    borderRadius: "1px",
    color: "",
    fontFamily: "Arial",
    fontSize: "inherit", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    fontWeight: "normal",
    height: "auto", // "auto","fit-content"
    left: 'auto',
    maxHeight: "auto",
    maxWidth: "auto",
    textAlign: "left",
    textTransform: "none",
    zIndex: 1, // profundidad
    width: "fit-content",
    alignContent: "flex-start" //"flex-end",
  }

  inputStyle = { ...this.labelStyle }

  style = {
    //display: "flex", "inline-block"
    alignContent: "baseline",
    background: "transparent",
    backgroundColor: "transparent", // semi "rgba(170, 187, 97, 0.5)",  //
    backgroundImage: "",
    border: "",  //    backgroundImage: "",
    borderRadius: "", //"2px",
    color: "#b94295", // '#872169', //    
    cols: "60",
    display: "inline-flex",
    flexGrow: "0" /* do not grow   - initial value: 0 */,
    flexShrink: "0" /* do not shrink - initial value: 1 */,
    flexBasis: "auto" /* width/height  - initial value: auto */,
    flexWrap: "wrap",
    fontWeight: "normal",
    fontFamily: "Arial",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    height: "99%",     // 95%
    maxHeight: "auto",
    marginLeft: "2px", //5px
    maxWidth: "auto",
    minHeight: "auto",
    minWidth: "auto",
    padding: "",
    position: "relative",
    textAlign: "left",
    width: "max-content",      // 95%
    wordWrap: "break-word", // Parte las palabras
    zIndex: 1, // profundidad

  };

  position = {
    position: "left",
    width: "auto",
    height: "auto",
  };

  // Se utiliza para inicializar los block[] container
  /*
     const container = this.container
      // =======================<Bloque 0 >===============
      this.block[0] = structuredClone(container)
   */


  container =
    {
      component: {
      },
      prop: {
        Visible: true
      },
      style: {
        border: '1px solid rgb(0, 0, 0)',
        background: 'bisque',
        borderRadius: '5px',
        boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)',
        padding: '10px',
        // display: 'inline-flex',
        width: '-moz-available',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-around' // 'space-between'  
      },
      title: '',
      titleStyle: {
        color: 'black',
        fontSize: '17px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center'
      },

    }


  imagen = { src: "" };
  old_value = ""

  constructor() {
    this.Name = this.constructor.name;
    this.prop.Name = this.Name; //21/abril/2024
    this.Recno = 0;
    this.prop.This = this;
    this.inputStyle.cols = 100 // textArea cols
    this.inputStyle.rows = 5 // textArea rows
    this.inputStyle.borderRadius = '3px'

    if ((this.prop.Type == 'number' || this.prop.Type == 'checkBox') && typeof this.prop.Value == "string")
      this.prop.Value = 0

  }

  /**
   * Asigna el número de registro (Recno) a cada componente dentro de la forma.
   * 
   * Itera sobre todos los componentes del objeto actual. Para cada componente que
   * tenga la propiedad `Capture` y cuyo `ControlSource` empiece con el mismo valor
   * que `RecordSource` del objeto, asigna una referencia al número de registro 
   * actual (`Recno`) a la propiedad `Recno` del componente.
   * 
   * @returns {Promise<void>}
   */
  public asignaRecno() {
    for (const comp in this) {
      const Comp = this[comp]

      // ControlSource contiene el RecordSource de la forma
      if (Comp && Comp.prop && Comp.prop.ControlSource && Comp.prop.ControlSource.indexOf(this.prop.RecordSource) == 0) {
        console.log('Asignado recno por referencia al padre', Comp.prop.Name)
        Comp.Recno = ref(this.Recno)  // asignamos el recno de c/componente de la forma
      }
    }

  }

  /**
   * Init Component
   * @param Form Formulario que contiene al componente actual
   * @param TabIndex Numero de TabIndex para el componente actual
   * 
   * Inicializa el componente actual, asigna el Formulario que lo contiene, y el TabIndex
   * 
   * Crea el Map donde esta ubicado el componente, y llama a Init en todos los componentes
   * que esten dentro de este. Genera los arreglos Header, Main y Footer para luego poder
   * recorrerlos y llamar a Init en cada uno de los componentes.
   * 
   * @returns {Promise<number>} TabIndex final despues de inicializar todos los componentes
   */
  public async Init(Form?: any, TabIndex?: number) {
    // console.log('1) Init Component', this.Name)
    if (this.sw_init) return
    this.sw_init = true

    //Form est?: any
    if (this.prop.Name.length == 0) this.prop.Name = this.Name;
    let sw_component = true;
    if (!TabIndex) TabIndex = 1;

    if (!Form) {   // Inicializamos el this.Form

      Form = this;
      this.prop.Map = "ThisForm"; // this.constructor.name
      TabIndex = 1;  // inicializamos el TabIndex
      sw_component = false; // No es un componente del Form

      if (this.Form.prop) {
        const m = {
          for_lan: this.Form.prop.Name,
          lan_lan: this.Form.publicVar.lan_lan ? this.Form.publicVar.lan_lan : '   ',
        }

        if (Form.publicVar.lan_lan > '   ') {
          await this.Sql.use('vi_cap_db_languages', m)
          await this.Sql.use('vi_cap_db_messages', m)
          this.Form.language = true
          // this.Form.language = false
        }
        else
          this.Form.publicVar.lan_lan = ''
      }
    }

    //console.log('Init TabIndex', this.Name, TabIndex,this)

    this.Form = Form;
    let maxTabIndex = 1; // primer TabIndex
    let id = 0;
    //let comp = {}
    let header: [] = [];
    let main: [] = [];
    let footer: [] = [];
    const elements: [] = [];
    // Generamos  el MAP donde esta  ubicado el componente
    if (sw_component && this.Parent.prop) {
      // Si tiene propiedades el componente padre

      // original sin compilar      this.prop.Map = this.Parent.prop.Map + '.' + this.Name
      this.prop.Map = this.Parent.prop.Map + "." + this.Name;

      console.log(this.Form.prop.Name, 'Init Component', this.Name, this.prop.BaseClass, this.prop.Map)

      if (this.Form.db) this.Sql = this.Form.db;  // Asugnamos la clase manejo SQL

    }
    this.translate()  // Traduce al lenguaje del usuario


    /* 26/Dic/2024
        // Si el componente esta en algun bloque  le quita su posiscion 
        if (this.block.length > 0) {
          // Recorre todos los bloques
          let sw_block = true
          for (let i = 0; i < this.block.length && sw_block; i++) {
            for (let j in this.block[i].component) {
              //              if (sw_block && this.block[i].component[j].Name == componente) {
              //this[componente].prop.Position = 'block'
              sw_block = false
              const Name = this.block[i].component[j].Name
              console.log('2) Init Component', Name)
              //console.log(this.Name, "cod_nom Block Componente", this[Name].prop)
              console.log('2.1) Init Component', Name)
              //  this[Name].prop.Position = 'block'
    
              //              }
            }
          }
        }
       */

    for (const componente in this) {
      if (
        componente != "Parent" &&
        componente != "ThisForm" &&
        componente != "Form" &&
        componente != "_init" &&
        this[componente] != null &&
        this[componente] != undefined &&
        this[componente] &&
        this[componente].prop &&
        this[componente].Init
      ) {

        //console.log('3) Init Component', componente)
        if (this[componente].Name == undefined) { // Si no es un componente del Form
          console.warn("Component ", componente + " has Name=undefined");
          return;
        }

        const name = componente;
        //        console.log('Component =',componente,'contructor.name=',this[componente].constructor.name)

        if (componente != this[componente].constructor.name) {
          console.warn(
            "Component =",
            componente,
            "has diferent contructor.name=",
            this[componente].constructor.name
          );
          this[componente].Name = componente; // tenemos que obtener el nombre original
          this[componente].prop.Map = this.prop.Map.trim() + "." + componente;
          console.warn(
            "Arreglado Component =",
            componente,
            this[componente].prop.Map
          );

          // return
        }
        // name=componente  // Modificar para el compilador

        // asigna posicion en el Form Header, Main o Footer 
        //  console.log('4) Init Component', componente)
        const Position = this[componente].prop.Position.trim().toLowerCase();

        const component = {
          Name: name,
          Id: this[componente].prop.TabIndex, // this[componente].prop.Order,
          Position: Position,
        };
        elements.push(component);  // generamos el array de elementos

        this[componente].Parent = this; // Asignamos el Parent ref(this)

        id++;
      }
      // console.log('Fin) Init Component', this.Name)
    }
    // Recorrido todos los componentes sorteamos los elementos segun su TabIndex
    elements.sort((a, b) => {
      return a.Id - b.Id;
    });

    /////////////////////// Header ////////////////////////////////////
    // Obtenemos solo los elementos del Header
    const headerElement = await multiFilter(elements, { Position: "header" });
    for (const i in headerElement) {
      const comp = headerElement[i].Name; // Obtenemos el nombre
      this[comp].prop.TabIndex = TabIndex;

      TabIndex++;
      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex) maxTabIndex = TabIndex;

      headerElement[i].Id = TabIndex;
      header.push(comp);
      // arreglo.push[comp]
    }

    //////////////////////  Main //////////////////////////////
    // Obtenemos solo los elementos del Main
    const mainElement = await multiFilter(elements, { Position: "main" });


    for (const i in mainElement) {  // recorremos todos los componentes del main
      const comp = mainElement[i].Name; // Obtenemos el nombre

      // Si un componente contenedor y tiene bloques 
      if (this[comp].block && this[comp].block.length > 0) {

        for (const numero in this[comp].block) { // Recorremos todos los bloques
          //    console.log('Bloque Principal', this[comp].block[numero].title, numero, 'No Elementos=', this[comp].block[numero].component)
          // Si el elemento tiene componentes
          let num_Comp = 0
          while (this[comp].block[numero].component && this[comp].block[numero].component[num_Comp]) {

            // Recorremos todos los componentes del bloque
            console.log('Bloque', this[comp].block[numero].component[num_Comp].prop.Name, 'Num Comp=', num_Comp, 'TabIndex=', TabIndex)
            this[comp].block[numero].component[num_Comp].prop.TabIndex = TabIndex;

            TabIndex++;
            num_Comp++;
          }
        }
      } else {
        this[comp].prop.TabIndex = TabIndex; // asignamos el TabIndex
        //       console.log('1) block Main Init Component =', this[comp].prop.Name, 'TabIndex=', TabIndex)

        TabIndex++;
      }


      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex)
        maxTabIndex = TabIndex;

      mainElement[i].Id = TabIndex;
      main.push(comp);
    }


    ///////////////// Footer ///////////////////////////////
    // Obtenemos solo los elementos del Footer
    const footerElement = await multiFilter(elements, { Position: "footer" });
    for (const i in footerElement) {
      // Solo componentes es main

      const comp = footerElement[i].Name; // Obtenemos el nombre

      //   console.log('Component.ts in main comp=',comp,this[comp])
      this[comp].prop.TabIndex = TabIndex;

      TabIndex++;
      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex) maxTabIndex = TabIndex;

      footerElement[i].Id = TabIndex;
      footer.push(comp);
    }


    this.footer = footer.reverse();

    this.header = header;
    this.main = main;

    const arrayTot = headerElement.concat(mainElement);

    this.elements = arrayTot.concat(footerElement);

    this.prop.Status = "A";
    /*
    console.log(
      "Component init Name=",
      this.Name
         this.prop.Map,
           "Elements=",
           this.elements ,
           "header=",
           this.header,
          "main=",
          this.main,
          "footer=",
          this.footer
    );
*/
    if (this.init) {
      // console.log('Component init Name=', this.Name, 'Map=', this.prop.Map, 'This=', this)
      await this.init(); // Corre el init principal
    }
    return TabIndex;
  }

  /**
   * Initializes the component.
   *
   * This method is called after the component is rendered and the elements are
   * created. It is the entry point for the component to initialize itself.
   
   */
  public async init() {
    return;
  }


  public async onChangeValue() {

  }

  public async recnoChange() {
    return;
  }


  /////////////////////////////////////////////////////////////////////
  // Valid
  // Descripcion: Cuando pierde el foco valida
  /////////////////////////////////////////////////////////////////

  /**
   * @description
   * Cuando pierde el foco valida
   * @param {boolean} Valid - Indica si es valido o no
   * @returns {Promise<boolean>} - Indica si es valido o no
   */
  public async valid(Valid: boolean): Promise<boolean> {
    this.prop.Valid = true;
    return this.prop.Valid;
  }

  /////////////////////////////////////////////////////////////////////
  // interactiveChange
  // Descripcion: Cuando cambia el valor interactivo (spiner, checkBox)
  ////////////////////////////////////////////////////////////////////


  public async interactiveChange() { }

  /////////////////////////////////////////////////////////////////////
  // Click
  // Descripcion: Hace el click
  /////////////////////////////////////////////////////////////////


  /**
   * @description
   * Hace el click
   * @returns {Promise<never>}
   */

  public async click() {

  }

  /**
   * When VFP
   * Descripcion: Cuando recibe el foco
   * 
   * @returns boolean
   */
  public async when() {
    this.old_value = this.prop.Value

    return !this.prop.ReadOnly;
  }



  /////////////////////////////////////////////////////////////////////
  // Focus
  // Descripcion: Hace el setFocus
  // Obs : se anexa al stack de eventos a ejecutar en forma sincrona
  /////////////////////////////////////////////////////////////////
  //public setFocus = async () => {

  /**
   * Setea el foco en el elemento actual.
   * @returns void
   */
  public async setFocus() {
    this.prop.Focus = true;

  }

  /////////////////////////////////////////////////////////////////////
  // GotFocus
  // Descripcion: Llamado cuando el elemento recibe el foco
  /////////////////////////////////////////////////////////////////
  public async gotFocus() {
  }

  /////////////////////////////////////////////////////////////////////
  // pushEvent
  // Descripcion: Hace push a la tabla de eventos sincronos
  //              Utiliza el map de la clase para saber la ruta completa de donde
  //              pertencece en la clase
  //              ThisForm
  // Nota : No se puede utilizar este evento porque se pierde la reactiviada de array eventos
  /////////////////////////////////////////////////////////////////
  /*
    public pushEvent = async (evento: string) => {
      //console.log('======watch ThisForm.eventos Evento empujado====>>', this.prop.Map + '.' + evento)
      this.Form.eventos.push(this.prop.Map + "." + evento);
      console.log('<<======watch ThisForm.eventos Evento empujado====>>', this.Form.eventos)
    };
  */
  /////////////////////////////////////////////////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////

  //public keyPress = async ($event) => {

  /*
   *
   * Cada tecla que se presiona en el input
   * en this.prop.Key queda el valor presionado
   */


  /**
   * Handles key press events for the input.
   * The pressed key value is stored in this.prop.Key.
   */
  public keyPress(): void {
    // Implementation goes here
  }

  /*
   *
   * onMounted VFP
   * Descripcion: Cuando se monta el componente en el DOM
   * 
   * No se puede utilizar como nombre onMounted porque NUXT lo interpreta comom el onMounted de VUE y hace 
   * la importacion automaticamente de la libreria
  */

  public async afterMounted() {
    this.prop.Status = "A";

  }


  /**
   * Translates component properties based on the current language settings (pubicVar.lan_lan).
   * This function checks if the form and publicVar are defined and attempts
   * to retrieve translations from the 'vi_cap_db_languages' table. If translations
   * are found, it updates the component's properties such as ColumnTextLabel, textLabel,
   * RowSource, Messages, Placeholder, ToolTipText, and ErrorMessage. If the translation
   * table is not available or the record count is zero, the function returns without changes.
   */

  async translate() {

    if (!this.Form || !this.Form.publicVar)
      return

    console.log('2) this.prop.Map=', this.prop.Map)

    const m = {
      for_lan: this.Form.prop.Name,
      lan_lan: this.Form.publicVar.lan_lan ? this.Form.publicVar.lan_lan : '   ',
      map_lan: this.prop.Map,
      message: '  ',
      messages: this.prop.Messages,
      columntextlabel: this.prop.ColumnTextLabel,
      textlabel: this.prop.textLabel,
      rowsource: this.prop.RowSource,
      placeholder: this.prop.Placeholder,
      tooltiptext: this.prop.ToolTipText,
      errormessage: this.prop.ErrorMessage
    }

    if (m.lan_lan.trim() == '')
      return
    /*
        // Busca si hay tabla de traduccion
        if (!this.Form.language && !this.Sql.View.vi_cap_db_languages &&
          await this.Sql.use('vi_cap_db_languages', m))
          this.Form.language = true
        // this.Form.language = false
        else
          this.Form.publicVar.lan_lan = ''
        */


    if (!this.Form.language || !this.sw_translate || this.Sql.View.vi_cap_db_languages.recCount == 0)
      return

    const data = await this.Sql.localAlaSql(`select * from vi_cap_db_languages where trim(map_lan)='${this.prop.Map.trim()}' and trim(message)='' `)

    if (data.length > 0 && data[0].recno > 0) {

      const Value = data[0]


      if (Value.columntextlabel.length > 0)
        this.prop.ColumnTextLabel = Value.columntextlabel

      if (Value.textlabel.length > 0)
        this.prop.textLabel = Value.textlabel

      // checar aqui
      if (Value.rowsource.trim().length > 0) {
        //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
        if (this.prop.RowSourceType == 5) {

          this.prop.RowSource = eval(Value.rowsource)
        } else
          this.prop.RowSource = Value.rowsource
      }

      if (Value.messages != null && Value.messages.trim().length > 0) {

        const lineBreak = char(13)
        Value.messages = Value.messages.replaceAll(lineBreak, '')


        this.prop.Messages = eval(Value.messages)
      }
      if (Value.placeholder.length > 0)
        this.prop.Placeholder = Value.placeholder.trim()

      if (Value.tooltiptext.length > 0)
        this.prop.ToolTipText = Value.tooltiptext

      if (Value.errormessage.length > 0)
        this.prop.ErrorMessage = Value.errormessage

    }
    /*
     else {
      console.log('Init vi_cap_db_languages', await this.Sql.localAlaSql(`select * from vi_cap_db_languages `), m)
      this.Sql.appendBlank('vi_cap_db_languages', m)
    }
    */
    this.sw_translate = false
    return
  }

  async getWord(prop: any) {
    if (!this.Form.languages || this.Sql.Views.vi_cap_db_languages.recCount == 0)
      return


  }
  /////////////////////////////////////////////////////////////////////
  // Refe
  // Descripcion: asigna la ref html del componente desplegado
  /////////////////////////////////////////////////////////////////
  Refe(el: any) {
    this.Ref = el.$el;
    // console.log("Columna Ref===>", this.Ref);
  }
}
