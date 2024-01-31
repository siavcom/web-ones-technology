# Framework in Vue 3 with Nuxt for SQL databases. Using typescript programming with out web programming.

# I'm a old FOX programer with a lot experience in desing and programing in Visual Fox Pro (VFP),MSSQL and Postgres databases.

# This Framework is based in VFP functions and instruccions .

# This use:

- Vue 3 with SFC
- Nuxt 3
- Native HTML components
- Backend with Node express and VFPnode proyect https://github.com/siavcom/VFP-NODE
- SQL Data Base Postgres ]12.0 ( MSSQL soon) )

# Objetive:

- Make a simple program in typescript, but with out knowledge of web programming (HTML, CSS, VUE).

It's based in use a main form (like ThisForn in VFP) made in typescript only, where each form has it owns components ( editBox, comboBox,checkBox grid ,etc) forming a component tree.

                    ThisForm
                    /   |   \
                   /    |    \
                  /     |     \
                 /      |      \
                /       |       \
        Component1  Component2  Component..n

there are some components where each one have it's own components (grid have a several columns components)

                grid
               /  | \
              /   |  \
             /    |   \
            /     |    \
        Column1 Column2 Column..n

Each component has it own propierties.

- basic props
- Style props
- Position props (outdated)

and methods

- click
- when
- valid
- focus
- interactiveChange

To make a reference to especific propierty you can do by using a complete name reference tree
example:
propierties :
ThisForm.style.display="inline-block"
ThisForm.style.width='800px'.
ThisForn.component1.prop.Type = 'editText'
ThisForn.component2.prop.Value='Customer name 1'.

method:  
 ThisForm.component4.click().

## web components

- Form
- editText
- textLabel
- comboBox
- checkBox
- optionGroup
- grid

## typescript components

- Form (component container)
- Component
  Each component have serveral properties where each properties afect visual and database behaviour as values to.

### Base properties (prop):

    - BaseClass: "editText",  // HTML base class (Form, - - editText, comboBox, sppiner, grid, checkBox ...)
    - Name: "", // Name  of component.
    - textLabel: "", // text label showing before input.


    - Type 'text', //  data types :
                    - number
                    - text
                    - date
                    - spinner
                    - checkBox.

    - Value: '', // Value of component .

### Visual properties.

    - Autofocus: false // component who receives a focus when new register is inserted .
    - Disabled: false
    - ErrorMessage: ""
    - Format: ""
    - InputMask: ""
    - MaxLength: 0
    - Placeholder: ""
    - Position: 'main', // main, header , footer.
    Image: ''
    - ReadOnly: false
    - TabIndex: 0
    - ToolTipText: 'Principal name ',.
    - Visible: true

### Input component Style

componentStyle
{
background: "white",
color: "#b94295",
width: "auto",
height: "auto",
Maxheight: 'auto',
MaxWidth: 'auto',
fontFamily: "Arial",
fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
textAlign: "left",

    },

### Data Base properties.

    # each prop.Value component can be taked from a field of local SQL where :
    - ControlSource: "tableName.fieldName // Name of sql field.
    - RecordSource: 'tableName'
    - SqlUpdate: true   //true, when lost focus component, update field component. When false, update field component since tableUpdate method

### Internal properties.

    - Capture: true // When capture is true, can't lost focus until Validate or esc
    - First: false
    - Focus: false // When put 1 , take focus this component
    - Last: false
    - Map:  // Read only. Main structure map of this component, class, method  example : "ThisForm.componentName"
    - Grid: false
    - id: 0
    - Key: 0
    - Status: "I" //  P)rocess, A)ctive , I)nitialization.
    - Valid:true // (Internal use). the value of the component is good
    - KeyId : true when this component is a field index for a table select , update or delete

### Numeric components.

    - Currency: '   ' //USD,EUR,MXN
    - CurrencyDisplay : 'code' //to use the ISO currency code
    - Decimals : 2
    - Max: "999999999"
    - Min: "0"
    - Step: "1"
    - Style: 'decimal' // decimal, currency,percent,unit

### Combo box properties .

    - BoundColumn: 2  // The value is atached to column
    - ColumnCount: 2 // Total column numbers in a comboBox
    - ColumnWidths: '80%','20%' //  width each column
    - MultiSelect: true, // Can multiple select
    - List: [>, // List array result when MultiSelect=true
    - Row: 0
    - RowSourceType: 1 // How to fill the comboBox :
          1-Value.
          2-Alias,
          3-Query SQL Server
          5-Array

#### example value :

    - RowSourceType: 1
    - ColumnCount = 2
    - RowSource:"House,H,Building,B,Departament,D"

    #### example local SQL :
    - RowSourceType : 2
    - RowSource : 'table.cod_nom,nom_nom'
    Notes : You already have a local table SQL

    #### example SQL Server :
    - RowSourceType : 3
    - RowSource : 'select cod_nom,nom_nom from lla1_nom order by nom_nom'

#### example array :

    - RowSourceType: 5
    - ColumnCount = 2
    - RowSource:[["Datos", "Tablas", "Indices", "Vistas", "Menú del sistema","Otros">,<"D", "T", "I", "V", "M","O"]]

    ### Others
    - Style = 2; //0=DropDown Combo 2=DropDown List
    - Tag: ""

### Style propierties (style) .

    - display: "inline-block"
    - flexGrow: "0"     /* do not grow   - initial value: 0 */
    - flexShrink: "0"   /* do not shrink - initial value: 1 */
    - flexBasis: "auto" /* width/height  - initial value: auto */
    - flexWrap: "wrap"

    - background: "white"
    - color: "#b94295"
    - width: "auto"
    - maxWidth: "auto"
    - minWidth: "auto"
    - height: "auto"
    - fontSize: "13px"
    - fontFamily: "Arial"
    - zIndex: 100  // tabIndex
    - alignContent: "center"
    - textAlign: "left"

    ....... serveral .

- Grid (componet container). This component is for table data base capture

  A grid have a several columns where each column is a input or label component where each component if bind to a SQL table field .

## For a complete example, take a look in views directory. Each directory is a Vue View Page. Check come9101. This is the SQL database maintennce dicctionary, you can add tables with fields, index and SQL views for manipulate data access.

This have a 2 principal files, a view VUE (Main.vue) and typescript program (ThisForm.ts)
ThisForm.tx is the begin typesccript program where is a component definition .

Each component has a separate typescript file.

## SQL DataBase class

- select (<area>).

- useNodata (<table>, <alias?>).

- use (<table>,<memoryObject>,<alias?> ).

- tableUpdate(<updateType>,<force>,<alias>).

- appendBlank(<alias>,<memoryObject>).

- deleteRow(<key_pri>,<alias>).

- delete(<recno>,<alias>,<SqlUpdate>).

- insert(<alias>,<memoryObject>).

- execute(<query>,<alias?>,<resultType>).

- select(<alias>).

- recCount(<alias>).

- recno(<alias>).

- goto(<row>).

- skip(<rowNumbers>).

- scatter(<type>,<fieldArray>).

[alias] type : string .Local SQL table alias.

[table] type : string .SQL Server remote view name.

[memoryObject] type : Object. It have field and value field SQL table
example : m={ code_id : '000021',
PurchaseDate : '01012022' }.

[updateType] : type: number .
Value = 0 Only row witch posisioned.
Value = 1 All table rows until update error. if error, return a false else return true.
Value= 2 All table rows.

[force]: type : boolean .
Value =false If a update table fail because other user change data first, return false.
Value =true If a update table fail because other user change data first.

[key_pri]: type: number. Table key_pri(id) number in SQLServer.

[recno] : type: number .Local SQL id recno number.

[SqlUpdate] type: boolean .
Value=true. Delete SQLServer.
Value=false. Only local SQL .

[sqlQuery] type: string. Sql Server query to execute.

[resultType] type : string.

[row] type: number. Recno row id to go.

[rowNumbers] type: number Row number. Forward it is Positive and backward it is negative.

[type] type: string .
Value='MEMVAR'. Return a object with all field values).
Value= 'FIELDS',). Return a object with specific field values).

[fieldArray] type: array. Array with specific field to obtain values.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar).

## this project use

- Vue 3 SFC
- Nuxt 3
- @nuxtjs/axios
- @pinia/nuxt
- @zip.js/zip.js
- alasql
- file-saver
- pinia
- vue-sweetalert2

- Back End https://github.com/siavcom/VFP-NODE
- SQL Server ( Postgres or MSSQL soon )

## Knowledge Necesary :

- Object class programing.
- TypeScript.
- Some basic css styles and propierties.
- Ansi 99 SQL instructions.

## Notes:

- To use this Framework, you have to restore a initial SQL backup .
- If you are a VFP programer, clipper, dbase III or IV, this is the right option for programing in the web.
- If you have a question, let me now by mail or skype siavcom@hotmail.com
- I can help you if you want to use this framwork.
- I use linux (ubuntu 21.04) to make this project.

# About

- Author :

  - Fer Blocks (Principal desing,programinig and project director) .
    Linkedin https://www.linkedin.com/in/fernando-cuadras-846a20102/ .

  - Lupita Sotelo (Reports and SQL desing) .
  - Raul Castro (html and css desing) .

- http://siavcom.com.mx
  skype & e-mail : siavcom@hotmail.com

## Reserved Word

position

## Other notes :

Development:
$ npx nuxi dev --port=3000
$ npm run dev

## Project manager

Old with vite
(vue ui old)
(npx vite --port=38000 old)
