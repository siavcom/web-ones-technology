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
  //  Container={}; // Contenedor
  Form: any = {}; //this.Parent.ThisForm // Thisform
  //Name = 'component'  // Se pone aqui el name para que en el html poder hacer refere
  //name = this.Name
  Sql;
  // db: any;
  Recno: number;
  Ref: null | undefined;
  Show: true = true;
  //Focus: boolean = false
  Index!: number;
  header: [] = []; // elementos que tiene el componente en header
  main: [] = []; // elementos que tiene el componente en main
  footer: [] = []; // elementos que tiene el componente en footer
  elements: [] = []; // elementos que tiene el componente
  status: {} = {}; // status de todos los hijos del componente

  prop = {
    autoLoad: false,
    Autofocus: false,

    BaseClass: "editText",
    BoundColumn: 1,

    Capture: false,
    ControlSource: "",
    ColumnCount: 1,
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

    Grid: false,

    id: 0,
    Image: "",
    InputMask: "", //'XX-XX' '$999,999.99' '!!!-XXXXXX-9'

    htmlId: "",

    Key: 0,

    Map: "", // Nos indica el mapSource del componente
    MaxLength: 254,
    // Datos numericos
    Max: "999999999",
    Min: "0",
    MultiSelect: false,

    Name: "",

    Last: false,
    List: [],

    Order: 1,

    Placeholder: "",
    Position: "main", // main, header , footer

    ReadOnly: false,
    RecordSource: "",
    Row: 0,
    RowSource: {},
    RowSourceType: 0, //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array

    ShowError: false,
    ShowValue: false,
    SqlUpdate: false, //Si es verdadero actualiza automaticamente
    Status: "I",
    Step: "1",
    Style: "decimal", // decimal, currency,percent,unit

    TabIndex: 0,
    Tag: "",
    textLabel: "",
    This: null,
    ToolTipText: "",
    Type: "text",

    updateKey: false, // true when this component is a field index for a table select , update or delete

    Valid: true,
    Value: "",
    ValidOnRead: false, // Si es verdadero, cuando cambia se lee su valor desde AlaSql manda a la rutina de validacion del componente
    Visible: true,

    When: true,

    componentStyle: {
      background: "white",
      color: "black",
      width: "auto",
      height: "85%",
      maxHeight: "auto",
      maxWidth: "100%",
      fontWeight: "normal",
      fontFamily: "Arial",
      fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
      textAlign: "left",
      textTransform: "none",
      zIndex: 1, // profundidad
      cols: 100,
      rows: 5,
    },
  };
  style = {
    //display: "flex", "inline-block"
    display: "inline-flex",
    flexGrow: "0" /* do not grow   - initial value: 0 */,
    flexShrink: "0" /* do not shrink - initial value: 1 */,
    flexBasis: "auto" /* width/height  - initial value: auto */,
    flexWrap: "wrap",
    fontWeight: "normal",
    alignContent: "center",
    background: "transparent",
    backgroundColor: "transparent", // semi "rgba(170, 187, 97, 0.5)",  //
    color: "#b94295",
    cols: "60",

    fontFamily: "Arial",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    width: "95%",
    height: "95%",
    maxWidth: "auto",
    minWidth: "auto",
    maxHeight: "auto",
    minHeight: "auto",

    textAlign: "left",
    position: "relative",
    wordWrap: "break-word", // Parte las palabras
    backgroundImage: "",

    // un valor negativo (usualmente tabindex="-1") significa que el elemento debe ser enfocado, pero no debe de ser accesible a través de la navegación secuencial del teclado. Es útil para crear widgets accesibles con JavaScript.
    // tabindex="0" significa que el elemento debe ser enfocado y ser accesible a través de la navegación secuencial del teclado, pero su orden relativo es definido por convención de la plataforma.
    // un valor positivo significa que debe poder recoger el foco y alcanzable a través de la navegación secuencial del teclado; su orden relativo es definido por el valor del atributo: la secuencia sigue el aumento del número de tabindex.
    // Si varios elementos comparten el mismo tabindex, su orden relativo sigue la posición relativa en el documento.

    tabindex: 0,
    zIndex: 0, // profundidad
    // textAlign: "left";
  };

  position = {
    position: "left",
    width: "auto",
    height: "auto",
  };

  imagen = { src: "" };

  constructor() {
    this.Name = this.constructor.name;
    this.Recno = 0;
    this.prop.This = this;
  }

  ///////////////////////////////////////////////////////////
  // Init
  ////////////////////////////////////////////////
  //public Init = async (Form) => {  Las Funciones arrow son funciones no metodos
  //    async Init(Form) {
  public async Init(Form?: any, TabIndex?: number) {
    //Form est?: any
    if (this.prop.Name.length == 0) this.prop.Name = this.Name;
    let sw_component = true;
    if (!TabIndex) TabIndex = 1;
    if (!Form) {
      // Inicializamos el this.Form
      //console.log("ThisForm.name 2", this.constructor.name);

      Form = this;
      this.prop.Map = "ThisForm"; // this.constructor.name

      //      console.log('Init ThisForm', this.Name, this.Form)
      TabIndex = 1;
      sw_component = false;
      /* console.log(
        "Init constructor.name",
        this.constructor.name,
        "Name=",
        this.Name,
        "Map =",
        this.prop.Map
      );
      */
    }
    //console.log('Init TabIndex', this.Name, TabIndex,this)

    this.Form = Form;

    let maxTabIndex = 1;
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
      if (this.Form.db) this.Sql = this.Form.db;
      /*
      console.log(
        "Init constructor.name",
        this.constructor.name,
        "Name=",
        this.Name,
        "Map =",
        this.prop.Map
      ); */
    }
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
        //  console.log('Init Component '+componente,'Name==',this[componente].Name)
        if (this[componente].Name == undefined) {
          console.warn("Component ", componente + " has Name=undefined");

          return;
        }
        // const name = this[componente].Name.trim()
        // let name = this[componente].constructor.name
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
        const Position = this[componente].prop.Position.trim().toLowerCase();

        //if (Position == "header") header.push(name);

        // if (Position == "main") main.push(name);

        //  if (Position == "footer") footer.push(name);

        const component = {
          Name: name,
          Id: this[componente].prop.TabIndex, // this[componente].prop.Order,
          Position: Position,
        };
        elements.push(component);

        this[componente].Parent = this; // Asignamos el Parent ref(this)

        id++;
      }
    }

    // Ordenamos los elementos segun su TabIndex
    elements.sort((a, b) => {
      return a.Id - b.Id;
    });

    // console.log('1 Component mainElement Name=',this.prop.Name,'mainElement',mainElement)
    /////////////////////// Header ////////////////////////////////////
    //let arreglo:[]=[]
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

    //arreglo=[]

    /*
    for (const i in header) {
      const comp = header[i];
      this[comp].prop.TabIndex = TabIndex;
      TabIndex++;
      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      // Se quito de aqui ya que el Init corre el init de c/componente
    }
   */
    //////////////////////  Main //////////////////////////////

    const mainElement = await multiFilter(elements, { Position: "main" });

    for (const i in mainElement) {
      const comp = mainElement[i].Name; // Obtenemos el nombre

      //   console.log('Component.ts in main comp=',comp,this[comp])
      this[comp].prop.TabIndex = TabIndex;
      TabIndex++;
      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex) maxTabIndex = TabIndex;

      mainElement[i].Id = TabIndex;
      main.push(comp);
    }

    //    arreglo=[]
    //  console.log('2 Component mainElement Name=',this.prop.Name,'mainElement',mainElement)
    /*
    for (const i in main) {
      const comp = main[i]; // Obtenemos el nombre

      //   console.log('Component.ts in main comp=',comp,this[comp])
      this[comp].prop.TabIndex = TabIndex;
      TabIndex++;
      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex) maxTabIndex = TabIndex;
    }

*/

    ///////////////// Footer ///////////////////////////////

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

    /*
    for (let i = footer.length - 1; i >= 0; i--) {
      const comp = footer[i];
      this[comp].prop.TabIndex = TabIndex;
      TabIndex++;
      TabIndex = await this[comp].Init(Form, TabIndex); // Corre el InitForm en todos los componentes
      if (maxTabIndex < TabIndex) maxTabIndex = TabIndex;
    }
*/

    this.footer = footer.reverse();

    this.header = header;
    this.main = main;

    const arrayTot = headerElement.concat(mainElement);

    this.elements = arrayTot.concat(footerElement);

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
      //  console.log('Component init Name=', this.Name,'Map=', this.prop.Map)
      await this.init(); // Corre el init principal
    }
    return TabIndex;
  }

  ///////////////////////////////////////////////////////////
  // InitForm : Iicializa los valores de toda la forma en cada/componente
  ////////////////////////////////////////////////
  /*
  public async InitForm_ant(Form: any) {
    const elements: [] = []
    //console.log('Inicializando componente Parent ===> ', this.Name,this.Parent)

    //console.log('InitForm  componente Parent ===> ',this.Name)

    if (this.Name != 'ThisForm' && this.Parent.prop) { // Si tiene propiedades 
      this.prop.Map = this.Parent.prop.Map + '.' + this.Name
    }
    //console.log('Mapa clase ======>', this.Name, this.prop.Map)
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
          Name: this[componente].Name,
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
    //console.log('Init form ====>', this.Name)
    this.prop.Status = 'A'
    console.log('Componente Inicializado =========> ', this.Name, this.elements)
    // console.log('Init Componente this.Form',this.Form)
  }

  */
  public async init() {
    return;
  }

  public async mounted() {
    return;
  }

  /////////////////////////////////////////////////////////////////////
  // Valid
  // Descripcion: Cuando pierde el foco valida
  /////////////////////////////////////////////////////////////////
  public async valid(Valid: boolean): Promise<boolean> {
    this.prop.Valid = true;
    return this.prop.Valid;
  }

  /////////////////////////////////////////////////////////////////////
  // interactiveChange
  // Descripcion: Cuando cambia el valor interactivo (spiner, checkBox)
  ////////////////////////////////////////////////////////////////////

  public async interactiveChange() {}

  /////////////////////////////////////////////////////////////////////
  // Click
  // Descripcion: Hace el click
  /////////////////////////////////////////////////////////////////

  public async click() {
    return;
  }

  /////////////////////////////////////////////////////////////////////
  // When VFP
  // Descripcion: Cuando recibe el foco
  /////////////////////////////////////////////////////////////////

  public async when() {
    return !this.prop.ReadOnly;
  }

  /////////////////////////////////////////////////////////////////////
  // Focus
  // Descripcion: Hace el setFocus
  // Obs : se anexa al stack de eventos a ejecutar en forma sincrona
  /////////////////////////////////////////////////////////////////
  //public setFocus = async () => {

  public async setFocus() {
    this.prop.Focus = true;
    //console.log('Super setFocus ==>', this.Name)
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

    this.Form.eventos.push(this.prop.Map + "." + evento);
    //console.log('pushEvent eventos===>',this.Form.eventos)
  };

  /////////////////////////////////////////////////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////

  //public keyPress = async ($event) => {
  public keyPress($event) {
    this.prop.Key = $event.charCode;
    return this.prop.Key;
    //  console.log('KeyPress===>', key)
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
