# This Framework is to make a simple SQL web data capture program in TypeScript (class-based), without knowledge of web programming (HTML, CSS, VUE).

# This Framework uses Vue 3 with Nuxt and SQL databases (MSSQL and POSTGRES).

# This Framework is based on VFP (Visual Fox Pro) functions and instructions.

# It uses:

- Vue 3 with SFC
- Nuxt 3
- Native HTML components
- Backend with Node express and VFPnode project https://github.com/siavcom/VFP-NODE
- SQL Database Postgres (12 or newer) or MSSQL (17 or newer)

# Objective:

- Make a simple program in TypeScript (class-based), without knowledge of web programming (HTML, CSS, VUE).

It's based on using a main form (like ThisForm in VFP) made only in TypeScript, where each form has its own components (editBox, comboBox, checkBox, grid, modalContainer, etc.) and its own methods (click(), when, valid(), etc.), forming a component tree.

                    this.Form
                 /     |      \
                /      |       \
               /       |        \
              /        |         \
             /         |          \
        Component1  Component2  Component..n
                    /     |     \ 
                   /      |      \
               click() when()  valid()...etc()

There are some components where each one has its own components (container and grid has several components  and column components).
                
                container
            /     |      \
           /      |       \
          /       |        \
         /        |         \
        Component1 Component2 Component..n

                grid
            /     |       \
           /      |        \
          /       |         \
         /        |          \
        Column1 Column2 Column..n

Each component has its own properties.

- Basic props
- Style props
- Position props (outdated)

and methods

- click
- when
- valid
- setFocus
- interactiveChange
- init
- keyPress
    Handles key press events for the input.
    The pressed key value is stored in this.prop.Key.
- onChangeValue 
    When the value of this component changes, this method is called.
    It receives an optional parameter styles, which is the styles of the component (style, inputStyle, labelsStyle).
    If it is not provided, it uses the component styles of the object.
    Sample: The method changes the color of the input depending on the value selected.
    A = green, B = red, X = blue.
    @param {any} styles - The style of the component.

To make a reference to a specific property you can do so by using a complete name reference tree Map (Object).
Example:
Properties:
this.Form.style.display="inline-block"
this.Form.style.width='800px'.
this.Form.component1.prop.Type = 'editText'
this.Form.component2.prop.Value='Customer name 1'
or
this.Parent.component2.prop.Value='Customer name 1'
this.Parent.component1.component2.prop.Value='Customer name 1'

Calling a method:

 this.Form.component4.click().
 this.Parent.component1.component2.click()

## Web components (vue/nuxt components)
- base64. Load and display base64 imgage. 
- browse. Display table.
- checkBox. Check Box input.
- comboBox. Combo Vox Input.
- container. Component container.
- editText. Text, number, json and check input.
- form. Form component container.
- grid. Grid componet container.
- image. Display image.
- imgButton. Button with image.
- modalComponent. Modal component container.
- optionGroup. Option group input.
- textLabel. Text label. 

## TypeScript classes
- Browse. Table display
- CaptureComponent. Component of CaptureForm
- CaptureForm. Main maintenance page form
- Column. Column component in a grid component
- Component. Basic component
- Form. Main page container
- Grid. Table maintenance

  Each component has several properties where each property affects visual and database behavior as values too.

## Base properties (prop):

 - BaseClass: `<`webComponent`>`  
      Type: string  
      Values : 'Form','editText',
                'textLabel',
                'comboBox',
                'checkBox',
                'optionGroup',
                'grid',
                'base64',
                'container'.

 - Name:`<`Name of the component`>`  
      Type :string

 - textLabel:`<`Text label showing before input`>`  
      Type: string

 - Type:`<`Data types when BaseClass="editText"`>`  
      Type: string  
      Values : 'number','text'
               'date',
               'dateTime',
               'spinner',
               'checkBox',
               'json',
               'checkBox'.

 - Value:`<`Value of the component`>`

## Visual properties

  - First:`<`true. Component that receives focus when a new record is inserted`>`  
      Type: boolean
    
  - Disabled:`<`True when disabled`>`  
      Type: boolean

  - ErrorMessage:`<`Error message if the component is not valid (after valid()=false or prop.Valid=false)`>`  
      Type: string

  - Format: `<``>`  
      Type: string

  - InputMask: `<``>`   
      Type: string
    
  - MaxLength:`<`Maximum character length`>`  
      Type: number  

  - Min:`<`Minimum value for number`>`  
      Type: number

  - Max:`<`Maximum value for number`>`  
      Type: number

  - Placeholder:`<`label inside input blurred`>`  
      Type: string 

  - Position:`<`Position in a form component`>`  
      Type: string   
      Values: 'header',
               'main',
               'footer'.
    
  - ReadOnly:`<`true when component is only readable`>`  
      Type: boolean
    
  - TabIndex:`<`Component tab index in a form component`>`  
      Type: number 

  - Image:`<`Component background image path`>`  
      Type : string
   
  - ToolTipText:`<`Component tool tip text`>`  
      Type: string

  - Visible: `<`true when component is visible`>`  
      Type: string

## style, inputStyle,labelStylenent and componentStyle properties ( all html style)
### sample:   
- background: "white",  
- color: "#b94295",  
- width: "64px",  
- height: "auto",  
- Maxheight: '13px',  
- MaxWidth: 'auto',  
- fontFamily: "Arial",  
- fontSize: "13px",  
- textAlign: "left",  
- ...... several CSS style properties: .

## Database components properties

# Each prop.Value component can be gathered from a field of local SQL where:

 - ControlSource: <Name of SQL field>  
        Type : string  
        Sample  value: 'localTable.field'

 - RecordSource: <local or remote table name>  
        Type :string 
        Sample  value:  'viewTableName'

- SqlUpdate: <True, when the component loses focus, update field component. When false, update field component using the tableUpdate method.>
        Type : boolean

## Internal properties

  - Capture: <When capture is true, can't lose focus until Validate or esc>
      Type : boolean

  - First: <In a Form or grid  component it has to be true the first capture component> false
      Type : boolean

  - Focus: <When set to true, this component takes focus>
      Type : boolean

  - Map:  <Show the structure map of this component>
      Type : string
      Sample : "this.Form.componentName"

  - Status: <Status of component>
      Type : string
      Values :  P=Process, A=Active, I=Initialization.

  - Valid: <True when component value is good>
      Type : boolean
  
  - Recno :  <Record Number for localSql field value>

## Numeric components propierties

  - Currency: <Currency to display>
      Type : string
      Sample : 'USD', 'EUR', 'MXN'

  - CurrencyDisplay: 'code' // To use the ISO currency code
      Type  
  - Decimals: <Decimals to show and capture>
      Type : number

  - Max: <Maximus value in this component>
      Type : number

  - Min: <Minumus value in this component>
      Type : number

  - Step: <When a spinner component number step>
     Type : number

## Combo box properties
  - Style : <Type of combo box>
      Type : number
      Values : 0=DropDown.  
               2=DropDown List 

  - BoundColumn <The value is attached to the column>
     Type : number

  - ColumnCount: <Total column numbers in a comboBox>
     Type : number

  - ColumnWidths: <Width of each column>
     Type : number
     Sample : '80%', '20%' 

  - MultiSelect: <Can multiple select>
     Type : boolean 

  - List: <List array result when MultiSelect is true>
     Type : array

  - RowSource : <Sql query or table.field>
     Type : string
     Sample :
         - when RowSourceType=2 : 'tablename.field1,field2' 
         - When RowSourceType=3 or 4 : ' select column1,column2 from tablefield '

  - RowSourceType: <How to fill the comboBox>
     Type : number
     Values : 
          1-Value.  
            Sample RowSourceType=1 
            ColumnCount =2
            RowSource="House,H,Building,B,Department,D"

          2-Alias. 
            Sample RowSourceType=2 
            ColumnCount =3
            RowSource="tablename.House,Building,Department"

          3-Query SQL Server.  
            Sample RowSourceType=3
            ColumnCount =2  
            RowSource= 'select column1,column2 from servertable '

          4-Local SQL.  
            Sample RowSourceType=4
            ColumnCount =2  
            RowSource= 'select column1,column2 from localable '
            Notes: You already have a local table SQL

          5-Array.  
            Sample RowSourceType=5
            ColumnCount =2  
            RowSource= [['column1','column2'],
                        ['value1','value2']]

## Grid (component container). This component is for table database capture

  A grid has several columns where each column is an input or label component where each component is bound to a SQL table field.

## For a complete example, take a look in the page directory. Each directory is a Vue View Page. pages/SqlDictionary is the SQL database maintenance dictionary, you can add tables with fields, index, and SQL views for manipulating data access.

This has 2 principal files, a view VUE (Main.vue) and TypeScript program (ThisForm.ts).
ThisForm.ts is the beginning TypeScript program where the component definition is.

Each component has a separate TypeScript file.

## SQL Database class (This method is based in VFP SQL instructions)

- select(`<`area`>`).

- useNodata(`<`table`>`,`<`alias?`>`).

- use(`<`table`>`,`<`memoryObject`>`,`<`alias?`>`).

- tableUpdate(`<`updateType`>`,`<`force`>`,`<`alias`>`).

- appendBlank(`<`alias`>`,`<`memoryObject`>`).

- deleteRow(`<`key_pri`>`,`<`alias`>`).

- delete(`<`recno`>`,`<`alias`>`,`<`SqlUpdate`>`).

- insert(`<`alias`>`,`<`memoryObject`>`).

- execute(`<`query`>`,`<`alias?`>`,`<`resultType`>`).

- select(`<`alias`>`).

- recCount(`<`alias`>`).

- recno(`<`alias`>`).

- goto(`<`row`>`).

- skip(`<`rowNumbers`>`).

- scatter(`<`type`>`,`<`fieldArray`>`).

### Values
 `<`area`>` type: number. VFP Area number

 `<`alias`>` type: string. Local SQL table alias.

 `<`table`>` type: string. SQL Server remote view name.

 `<`memoryObject`>` type: Object. It has field and value field SQL table. (In VFP is named only m )

### Example:
 const  m={ code_id : '000021',
            PurchaseDate : '2022-10-21' }

 `<`updateType`>` type: number.
     Value = 0 Only row which positioned.
      Value = 1 All table rows until update error. If error, return false else return true.
    Value= 2 All table rows.

 `<`force`>` type: boolean.
    Value = false If an update table fails because another user changed data first, return false.
    Value = true If an update table fails because another user changed data first.

 `<`key_pri`>` type: number. Table key_pri(id) number in SQLServer.

 `<`recno`>` type: number. Local SQL id recno number.

 `<`SqlUpdate`>` type: boolean.
    Value = true. Delete SQLServer.
   Value = false. Only local SQL.

 `<`sqlQuery`>` type: string. SQL Server query to execute.

 `<`resultType`>` type: string.

 `<`row`>` type: number. Recno row id to go.

 `<`rowNumbers`>` type: number. Row number. Forward it is positive and backward it is negative.

 `<`type`>` type: string.
    Value = 'MEMVAR'. Return an object with all field values.
    Value = 'FIELDS'. Return an object with specific field values.

 `<`fieldArray`>` type: array. Array with specific fields to obtain values.

# How to use this framework

- Install Node.js 18.x or newer (recommended active LTS release) https://nodejs.org/en/download/ or use nvm https://github.com/nvm-sh/nvm


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)

- Useful extensions for VSCode:
  - Eslint
  - Prettier Eslint
  - Vue Official

- Download the back-end framework from https://github.com/siavcom/VFP-NODE and extract it in a folder.
- Make a company folder in the back-end folder/app/empresas/`<`your company name`>`
- Copy a sample folder company in the company folder
- Rename the sample folder to your company name
- Change the db.config.js file and use your SQL Server connection parameters
- Open a terminal in the back-end folder and run node server_socket.js

- Download this framework from https://github.com/siavcom/web-ones-technology and extract it in a folder.

- Open a terminal in the framework folder 
  run npm install
  
  You have to make a company folder in your computer in /sistemas/name`>`
  run npx nuxi dev
   
## Design SQL Table
- Create a new SQL table.
  Go to SQL data dictionary in the menu.
 - Choose SQL Server table
 - Choose system menu
 - Add a new table
 - Fill all data table characteristics
 - Save table

- Create a new definition SQL table
  Go to SQL data dictionary in the menu.
  - Choose table definition
  - Choose system menu
  - Choose table
  - Add a new definition
  - Click accept
  - Insert fields
  - Fill up all characteristics
  - Click accept
  Notes:
    When a field is a primary key, the default value has to be m.`<`namefield`>`

- Create a new SQL view.
- Create a new SQL index.   

## Make a personal menu pages
In this framework use the file directory structure of NUXT . All pages are in page directory and each page must have 3 directories 
  1) Mto . Maintenance pages
  2) Rep.  Reporting pages
  3) Pro.  Process pages
 and in this directories has a directory for each page 
 
 To make a menu :
 Go to SQL data dictionary in the menu.
  - Choose Menu pages
  - Chose menu type 
  - Chose system
  fill data execpt data of VFP 
    

## This project uses

- Vue 3 SFC
- Nuxt 3
- @nuxtjs/axios
- @pinia/nuxt
- pinia-plugin-persistedstate
- @zip.js/zip.js
- alasql
- buffer
- file-saver
- socket.io-client
- vue-sweetalert2
- xlsx
- @nuxt/image
- maska
 
- Back End https://github.com/siavcom/VFP-NODE
- SQL Server (MSSQL, Postgres soon)

## Necessary Knowledge:

- Object class programming.
- TypeScript.
- Some basic HTML CSS styles properties.
- ANSI 99 standard SQL instructions.
- SQL Server skills (MSSQL or/and Postgres).

## Notes:
- This framework is based on a SQL database.
- It's not complete yet. If you require installation and use, let me know by mail or Skype siavcom@hotmail.com. 
- If you want a new feature, let me know by mail or Skype siavcom@hotmail.com.
- To use this Framework, you have to restore an initial SQL backup.
- If you are a VFP programmer, clipper, dbase III or IV, this is the right option for programming on the web.
- If you have a question, let me know by mail or Skype siavcom@hotmail.com.
- I can help you if you want to use this framework.
- I use Linux (Ubuntu 22.04, Ubuntu 24.04) and Windows 10 to make this project.

# About
- I'm an old FOX programmer with a lot of experience in VFP design and programming, MSSQL, and Postgres databases.

- Author:
  - El Fer Blocks (Principal design, programming, and project director).
    LinkedIn: https://www.linkedin.com/in/fernando-cuadras-846a20102/.

  - Lupita Sotelo (Reports and SQL design).
  - Raul Castro (HTML and CSS design).

- http://siavcom.com.mx
  Skype & e-mail: siavcom@hotmail.com

## Reserved Word

position
estatus

## Other notes:
Development:
$ npx nuxi dev --port=3000
$ npm run dev

## Other function:
// Append data in m

const m = { name: 'John',
            phone: '(312) 123-1234'
          }

m = appendM(m, { zipCode: '23455' })

Result:
console.log(m) =
  { name: 'John',
    phone: '(312) 123-1234',
    zipCode: '23455'
  }

  ## Other
  Login to the framework
 `<`user`>`@`<`busines nickname`>`
     `<`user`>` : personal login
     `<`busines nickname`>` :  SQL data base name



> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
