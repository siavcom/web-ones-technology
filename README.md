# COMPLETE WEB DEVELOPMENT PLATFORM for build SQL web applications.

# This Framework is to make a simple SQL web data capture program in TypeScript (class-based), without knowledge of web programming (HTML, CSS, VUE).

### MORE INFORMATION IN
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/siavcom/web-ones-technology)

# This Framework It's has 3 layers :

- Frontend . Programed in Vue/Nuxt and  web-ones-technology framework.
   This frontEnd  is based on VFP (Visual Fox Pro) functions and instructions.
   It's have :
  . SQL database maintenance dictionary, you can add tables with fields, index, and SQL views for manipulating data access. See the SqlDictionary page where you can add tables with fields, index, and SQL views for manipulating data access.

  . Menu maintenance page.

- Backend with Node express and VFPnode project https://github.com/siavcom/VFP-NODE. This backend is a server that provides a web service to the front-end of the framework.

- SQL Database . Programed in Postgres or MSSQL (12 or newer).

# It uses:
- Vue 3 with SFC
- Nuxt 3
- Native HTML components
- TypeScript (class-based)

# Objective:

- Make a simple program in TypeScript (class-based), without knowledge of web programming (HTML, CSS, VUE).

It's based in using a main form (like ThisForm in VFP) made only in TypeScript, where each form has its own visual html components (editBox, comboBox, checkBox, grid, modalContainer, etc.) and its own methods (click(), when, valid(), etc.), forming a component tree.


                     Form
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

and each component is linked to a web component (input box, combo box, check box, etc.) and these have their own properties like :

- Basic props
- Style props
- Position props (outdated)

 and methods :

- click
   When this component is clicked, this method is called.
- init
   When the component is initialized, this method is called.
- interactiveChange
   When the value of this component changes, this method is called. This method is called before valid method and only is eclusive of a comboBox component.
- keyPress
    Handles key press events for the input.
    The pressed key value is stored in this.prop.Key.
- setFocus
    Get fucus when is called this method.
- onChangeValue 
    When the value of this component changes, this method is called.
    It receives an optional parameter styles, which is the styles of the component (style, inputStyle, labelsStyle).
    If it is not provided, it uses the component styles of the object.
    Example: The method changes the color of the input depending on the value selected.
    A = green, B = red, X = blue.
    @param {any} styles - The style of the component.
- afterMounted
    When the component is mounted in the DOM, this method is called.
- recnoChange 
   When the recno of this component changes, this method is called.    
- valid
    When the component lost focus, this method is called. If the prop.Value if incorrect, this method returns false otherwise true.
- when
    When this component get focus, this method is called.

## Set Properties and styles

To make a reference to a specific property and styles you can do so by using a complete name reference tree Map (Object).
Example:
Properties:
this.Form.component1.prop.Type = 'editText'
this.Form.component2.prop.Value='Customer name 1'
or
this.Parent.component2.prop.Value='Customer name 1'
this.Parent.component1.component2.prop.Value='Customer name 1'
or style
this.Form.style.display="inline-block"
this.Form.style.width='800px'.

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
- textLabel. Text label. 

## TypeScript components 

 TypeScript components are components that are written in TypeScript. 
 
 These components are in a container component(Form, container or another component ) except Form component can't bge in a Form component.
 
 Each of these uses a belongs to a web component that will display in the web browser
 
  
  Example of a component :

`// Clase : dic_dat`  
`// Descripcion : tipo de mantenimiento del diccionario de datos`  
`// Author : Fernando Cuadras Angulo`  
`// Creacion : Diciembre/2021`  
`// Ult.Mod  : 6/Septiembre/2022`  

`import { COMPONENT } from "@/classes/Component";`  

`export class dic_dat extends COMPONENT {`  
    
`   constructor() {`  
`      super();`  
`      //****** Propierties ********//`  
`      this.prop.BaseClass = "comboBox";// Web component  `  
`      this.prop.Caption = "Diccionario  de datos";`  
`      this.prop.ToolTipText = this.prop.Caption;`  
`      this.prop.ReadOnly = false;`  
`      this.prop.Capture = false;`  
`      this.prop.RowSource = [`  
`      ["Tablas del SQL Server", "Definicion de Tabla", "Menú de programas"],`  
`      ["T", "D", "M"],];`  
`      this.prop.ControlSource = "vi_cap_comedat.dic_dat";`  
`      this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array`  
`      this.prop.ColumnCount = 2;`  
`      this.prop.BoundColumn = 2;`  
`      this.prop.ColumnWidths = "200px,10px";`  

`      //****** Component Style *******//`   
`      this.style.width = "500px";`  
`      this.style.fontSize = "17px";`  
`      this.style.fontWeight = "bold";`  
    
`      //****** input style component *******//`  
`      this.inputStyle.fontSize = "17px";`  
`      this.inputStyle.fontWeight = "bold";`  
`      this.inputStyle.width = "300px";`  

`      //****** label style component *******//`  
`      this.captionStyle.fontSize = "17px";`  
`      this.captionStyle.fontWeight = "bold";`    
`   }`  
`//*********** Methods *******************//`   
`   public init = async (form: any) => {`  
`     this.prop.Value = "T";`  
`   };`  
`   async interactiveChange() {`  
`     this.Form.nom_tab.prop.Visible = false`  
`     this.Form.bt_gen_all_models.prop.Visible = false`  
`     if (this.prop.Value == "M") {`  
`       this.Form.sis_sis.prop.Visible = false;`  
`       this.Form.bt_aceptar.prop.Visible = true;`  
`     } else {`  
`      this.Form.sis_sis.prop.Visible = true;`  
`      this.Form.bt_aceptar.prop.Visible = false;`  
`      }`  
`   }`  
`   public async when(sis_sis?: boolean) {`  
`     await this.interactiveChange()`  

`     this.Form.nom_tab.prop.Visible = false;`  
`     this.Form.tpr_prg.prop.Visible = false;`  

`     this.Form.grid_datos.prop.Visible = false;`  
`     this.Form.grid_indices.prop.Visible = false;`  
`     this.Form.grid_vistas.prop.Visible = false;`  
`     this.Form.grid_menu.prop.Visible = false;`  
`     this.Form.grid_tablas.prop.Visible = false;`  

`     this.Form.bt_gen_model.prop.Visible = false;`  
`     this.Form.bt_gen_indices.prop.Visible = false;`  
`     this.Form.bt_gen_vistas.prop.Visible = false;`  
`     this.Form.bt_gen_all_models.prop.Visible = false;`  
`     return !this.prop.ReadOnly;`  
`   }`
`}`  


## TypeScript components
- Browse. Table display
- CaptureComponent. Component of CaptureForm.
- CaptureForm. Main maintenance page form container.
- Column. Column component in a grid component.
- Component. Basic component. 
- Container. Container component.
- Form. Main page container.
- Grid. Table maintenance container.
- OptionGroup. A collection of checkBox components.
- Oprion. checkBox component of OptionGroup.

  Each component is a TypeScipt class  and has several properties where each property affects visual and database behavior as values too.

## Base properties 

this.prop.`<`Name of propierty`>'.`<`Value`>`
 Propierty :
 - BaseClass: `<`webComponent`>`  
      Type: string  
      Values : 'Form','editText','textLabel','comboBox','checkBox','optionGroup','grid','base64','container'.

 - Caption:`<`Title of the component`>` || `<`Text label showing before input`>`
      Type: string

 - Disabled:`<`true when the component is disabled`>`
      Type: boolean

 - ErrorMessage:`<`Error message if the component is not valid (after valid()=false or prop.Valid=false)`>`
      Type: string

 - First:`<`true. Component that receives focus when a new record is inserted`>`  
      Type: boolean

 - Format: `<``>`  (future version)
      Type: string

 - Image:`<`Component background image path`>`  
      Type : string

 - InputMask: `<``>`  (future version) 
      Type: string
 
 - Max:`<`Maximum value for number`>`  
      Type: number

 - MaxLength:`<`Maximum character length`>`
      Type: number

 - Min:`<`Minimum value for number`>`  
      Type: number

 - Name:`<`Name of the component`>`  
      Type :string

 - Placeholder:`<`label inside input blurred`>`
      Type: string

 - Position : = `<`position in a form `>`
      Type : string.
      Values : 'header','main','footer'

 - ReadOnly:`<`true when the component is read only`>`
      Type: boolean

 - TabIndex:`<`Component tab index in a form component`>`  
      Type: number 

 - ToolTipText:`<`Component tool tip text`>`  
      Type: string

 - Type:`<`Data types when BaseClass="editText"`>`  
      Type: string  
      Values : 'number','text','date','dateTime','spinner','checkBox','json'.

 - Valid:`<`true when the component is valid`>`
      Type: boolean

 - Value:`<`Value of the component`>`
      Type: string, date, number, boolean, json

 - Visible:`<`true when the component is visible`>`
      Type: boolean


## Database components properties

### Each prop.Value component can be gathered from a field of local SQL where:
this.prop.`<`name of propierty`>`.<Value`>`
Values :

 - ControlSource: `<`Name of SQL field`>`  
        Type : string  
        Example  value: 'localTable.field'

 - RecordSource: `<`local or remote table name`>`  
        Type :string 
        Example  value:  'viewTableName'

- SqlUpdate: `<`True, when the component loses focus, update field component. When false, update field component using the tableUpdate method.`>`
        Type : boolean

## Behaivor properties 
this.prop.`<`name of propierty`>`.`<`Value`>`

Values :
  - Capture: `<`When capture is true, can't lose focus until Validate or esc`>`
      Type : boolean

  - First: `<`In a Form or grid  component it has to be true the first capture component`>` false
      Type : boolean

  - Focus: `<`When set to true, this component takes focus`>`
      Type : boolean

  - Map:  `<`Show the structure map of this component`>`
      Type : string
      Example : "this.Form.componentName"

  - Status: `<`Status of component`>`
      Type : string
      Values :  P=Process, A=Active, I=Initialization.

  - Valid: `<`True when component value is good`>`
      Type : boolean
  
  - Recno :  `<`Record Number for localSql field value`>`

## Numeric components propierties
this.prop.`<`name of propierty`>`.`<`Value`>`

Values :
  - Currency: `<`Currency to display`>`
      Type : string
      Example : 'USD', 'EUR', 'MXN'

  - CurrencyDisplay: 'code' // To use the ISO currency code
      Type  
  - Decimals: `<`Decimals to show and capture`>`
      Type : number

  - Max: `<`Maximus value in this component`>`
      Type : number

  - Min: `<`Minimus value in this component`>`
      Type : number

  - Step: `<`When a spinner component number step`>`
     Type : number

## Combo box properties
this.prop.`<`name of propierty`>`.`<`Value`>`

Values :
  - Style : `<`Type of combo box`>`
      Type : number
      Values : 0=DropDown.  
               2=DropDown List 

  - BoundColumn `<`The value is attached to the column`>`
     Type : number

  - ColumnCount: `<`Total column numbers in a comboBox`>`
     Type : number

  - ColumnWidths: `<`Width of each column`>`
     Type : number
     Example : '80%', '20%' 

  - MultiSelect: `<`Can multiple select`>`
     Type : boolean 

  - List: `<`List array result when MultiSelect is true`>`
     Type : array

  - RowSource : `<`Sql query or table.field`>`
     Type : string
     Example :
         - when RowSourceType=2 : 'tablename.field1,field2' 
         - When RowSourceType=3 or 4 : ' select column1,column2 from tablefield '

  - RowSourceType: `<`How to fill the comboBox`>`
     Type : number
     Values : 
          1-Value.  
            Example RowSourceType=1 
            ColumnCount =2
            RowSource="House,H,Building,B,Department,D"

          2-Alias. 
            Example RowSourceType=2 
            ColumnCount =3
            RowSource="tablename.House,Building,Department"

          3-Query SQL Server.  
            Example RowSourceType=3
            ColumnCount =2  
            RowSource= 'select column1,column2 from servertable '

          4-Local SQL.  
            Example RowSourceType=4
            ColumnCount =2  
            RowSource= 'select column1,column2 from localable '
            > [!NOTE] You already have a local table SQL

          5-Array.  
            Example RowSourceType=5
            ColumnCount =2  
            RowSource= [['column1','column2'],
                        ['value1','value2']]


## style, inputStyle and captionStyle ( all html style)
All Component:
this.style.`<`name of propierty`>`.`<`Value`>`

Input component:
this.inputStyle.`<`name of propierty`>`.`<`Value`>`

Casption component:
this.captionStyle.`<`name of propierty`>`.`<`Value`>`

Values :
### example:   
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

## Form (Main web Form container)
  This is the principal main form ( SPA ). A complete system is made for serverlas Forms.

  Each one for is folder ubicated in a page directory of NUXT structure.

> [!IMPORTANT]
>  Each page folder is minimun composed of two files:
>  index.vue and ThisForm.ts

 Sample : We have a web page called clientForm. In a pages directory we have a directory called clientForm and in the clientForm directory we have:
 
  pages/clientForm/index.vue   // This is Only file of the form. The content of this file never change
  pages/clientForm/ThisForm.ts // Principal form

  and several components
  pages/clientForm/component1.ts // component 1
  pages/clientForm/component2.ts // component 2
        .
        .
        .
  pages/clientForm/severalComponents.ts // component n

 
### index.vue will always have this content

`<template>`  
` <VueForm v-bind:ThisForm="ThisForm">`  
`   <template #header />`  
`   <template #main />`  
`   <template #footer />`  
` </VueForm>`  
`</template>`  

`<script lang="ts" setup>`  
  import VueForm from "@/components/form.vue";  
  import { ThisForm } from './ThisForm'  
`</script>`  
 

### ThisForm.ts  

Is the principal form file. It will have the componets for this form.

//////////////////////////////////////////////  
// Page: SqlDictionary  
// Clase base : ThisForm  
// Author : Fernando Cuadras Angulo  
// Creacion : Septiembre/2021  
// Ult.Mod  : Enero/2025  
/////////////////////////////////////////////  

/////////////////////////////////////////  
// TypeScript base class  
/////////////////////////////////////////  
import { FORM } from "@/classes/Form"  

/////////////////////////////////////////  
// TypeScript component  
/////////////////////////////////////////  

import { dic_dat } from "./dic_dat"  
import { nom_tab } from "./nom_tab"  
import { sis_sis } from "./sis_sis"  

import { tpr_prg } from "./tpr_prg"  
import { bt_aceptar } from "./bt_aceptar"  
import { bt_gen_indices } from "./bt_gen_indices"  
import { bt_gen_model } from "./bt_gen_model"  
import { bt_gen_vistas } from "./bt_gen_vistas"  
import { bt_gen_all_models } from "./bt_gen_all_models"  

import { grid_datos } from "./grid_datos/grid_datos"  
import { grid_indices } from "./grid_indices/grid_indices"  
import { grid_vistas } from "./grid_vistas/grid_vistas"  
import { grid_menu } from "./grid_menu/grid_menu"  
import { grid_tablas } from "./grid_tablas/grid_tablas"  


export class ThisForm extends FORM {  
  public dic_dat = new dic_dat()  
  public tpr_prg = new tpr_prg()  
  public sis_sis = new sis_sis()  
  public nom_tab = new nom_tab()  

  public bt_aceptar = new bt_aceptar()  
  public bt_gen_indices = new bt_gen_indices()  
  public bt_gen_model = new bt_gen_model()  
  public bt_gen_vistas = new bt_gen_vistas()  
  public bt_gen_all_models = new bt_gen_all_models()  

  public grid_datos = new grid_datos()  
  public grid_indices = new grid_indices()  
  public grid_vistas = new grid_vistas()  
  public grid_tablas = new grid_tablas()  
  public grid_menu = new grid_menu()  

  constructor() {  
    super()   
    // Propierties  
    this.prop.Name = "SqlDictionary"  
    this.prop.tag = ""  
    this.prop.Caption = "Mantenimiento al diccionario de datos"  
    this.prop.Status = "A"  
    // Style  
    this.style.display = "inline-flex"  
    this.style.background = "white"  
    this.style.color = "#b94295"  
    this.style.fontSize = "13px"   
    this.style.position = "center"   
   }  
}  


 > [!NOTE] :
 > To see the complete Form of this example, look in pages/SqlDictionary.


## Grid (component container). This component is for localSql table capture

  A grid has several columns table where each column is a column component.

### Grid component has it's own propierties
 - textLabel = `<`Grid title`>`  
        Type: string

 - ControlSource: `<`Name of localSQL table`>`  
        Type : string  
        Example  value: 'capture_view_items'.

 - SqlUpdate: `<` Automatic update`>`
        Type : boolean
        Value = true enable automatic update.
        Value = false disable automati update

 - addButton = `<`Show add button `>`
        Type : boolean
        Value = true to show add button.
        Value = false to hide add button.

 - saveButton = `<`Show save button `>`
        Type : boolean
        Value = true to show save button.
        Value = false to hide save button.

 - deleteButton = `<`Show delete button `>`
        Type : boolean
        Value = true to show delete button.
        Value = false to hide delete button.

- insertButton = `<`Show insert button `>`
        Type : boolean
        Value = true to show insert button.
        Value = false to hide insert button.

### Grid component has it's own methods

- appendRow(`<`memoryVariables`>`: {}) 
  Append a row where memoryVariables is a object contain values of variables definided in values of field in SqlDictionary table design
  Example : 
       m={
          firstName: this.Form.name,
          age : this.Form.age,
          newcustomer : true,
        }

- deleteRow( `<`recno to delete`>`?: number) 
  if <recno to delete is omited> , delete the grid row positioned

### Column (Column component)

Eqch column component has a label for the header 
   this.prop.columnLabel='Header 1'

  and an another type script component (editText, imgButton.. almost all type script component exept a Form container)

And each column component has it's owns propierties

- ControlSource = `<`localSqltable.field`>`
        Type : string
        Value = local Sql Table + field

> [!NOTE] :
> For a complete example, take a look in the page directory. Each directory is a Vue View Page. pages/SqlDictionary is the SQL database maintenance dictionary, you can add tables with fields, index, and SQL views for manipulating data access.


## Container (container component). Is a component contain one or containers blocks
       
  by default has this Style:

    this.containerStyle.display = 'flex' 

    this.containerStyle.flexWrap = 'wrap' 

    this.style.maxWidth = '600px' 

  
and each block has to be is defined  

  // =======================<Bloque 0 >=============== 

    const container = this.container 

    this.block[0] = structuredClone(container) 
    
    this.block[0].component = { 

      [0]: this.name, 

      [1]: this.age, 
 
    } 
    
    this.block[0].title = 'Cliente Nuevo'
    this.block[0].style.width = '95%'

  
  ### container component has it's own methods

  async open() {
    this.prop.Visible = true
  }

  async close() {
    this.prop.Visible = false
  }


## SQL Database class (This method is based in VFP SQL instructions)
this class is used to manipulate a SQL database it's have several methods:

- appendBlank(`<`alias`>`,`<`memoryObject`>`).
   Append a row in a local SQL table with default Type Script Value defined in SqlDictionary form

- bof(`<`alias?`>`).
  after locate, skip or goto get true if there is locate at last row in a local SQL table

- deleteSqlRow(`<`alias?`>`,`<`key_pri?`>`,).
   Delete current row in a local SQL table

- deleteSql(`<`recno`>`,`<`alias`>`,`<`SqlUpdate`>`).
   Delete a row with recno in a local SQL table

- eof(`<`alias?`>`).
  after locate, skip or goto get true if there is locate at first row in a local SQL table

- found(`<`alias?`>`).
  after locate, skip or goto get true if there is a current row in a local SQL table

- gatther (`<`object values`>`).
  Return :Gatther values in a local SQL table from a object values

- goto(`<`row`>`).
  Goto a reccord number of a local SQL 
  If row=0 the record number is a current row
  Return: Data of reccord number

- insert(`<`alias`>`,`<`memoryObject`>`). ( not in use)

- localAlaSql(`<`query`>`). 
  Execute a query in a local SQL table

- readCampo(`<`alias`>`,`<`field`>`).
  Read a field in a local SQL table

- recCount(`<`alias?`>`).
  Get a reccord count of a local SQL table

- recno(`<`alias?`>`).
  Get a current reccord number of a local SQL table

- select(`<`alias?`>`).
  Select default values in a local SQL table
  Return: Data of current reccord


- skip(`<`rowNumbers`>`).
  Skip a reccord number of a local SQL table

- scatter(`<`fieldArray?`>`,`<`alias?`>`).
  Scatter values in a object values of a local SQL table 
  Return: data current row 


- scatterBlank(`<`fieldArray`>`,`<`alias?`>`).
  Scatter values with blank values of a local SQL table

- SQLExecute(`<`query`>`).
  Execute a query in a SQL-Server
  return: Data row array 

- tableUpdate (`<`updateType`>`,`<`force`>`,`<`alias`>`).
  Update a local SQL table in to SQL-Server table

- use(`<`table`>`,`<`memoryObject`>`,`<`alias?`>`).
   Prepare a local SQL table with data and is a clone of the original SQL-Server view
   Return: Data result of use

- useNodata(`<`table`>`,`<`alias?`>`).
   Prepare a local SQL table without data and is a clone of the original SQL-Server view 

### Values
 `<`area`>` type: number. VFP Area number

 `<`alias`>` type: string. Local SQL table alias.

 `<`fieldArray`>` type: Array. It has field and value field SQL table.

 `<`force`>` type: boolean.
    Value : false If an update table fails because another user changed data first, return false.
            true If an update table fails because another user changed data first.

 `<`key_pri`>` type: number. Table key_pri(id) number in SQLServer

 `<`memoryObject`>` type: Object. It has field and value field SQL table. (In VFP is named only m )

 `<`query`>` type: string. SQL Server query to execute.

 `<`recno`>` type: number. Local SQL recno number

 `<`row`>` type: number. Recno row id to go.

 `<`resultType`>` type: string.

 `<`rowNumbers`>` type: number. Row numbers to skip.


 `<`SqlUpdate`>` type: boolean.
    Values : true. Delete SQLServer.
             false. Only local SQL.

 `<`sqlQuery`>` type: string. SQL Server query to execute.

 `<`table`>` type: string. SQL Server remote view name.
 
 `<`type`>` type: string.
    Values : 'MEMVAR'. Return an object with all field values.
             'FIELDS'. Return an object with specific field values.

 
 `<`updateType`>` type: number.
     Values: 0 will only update the current record
             1 will update all records. If TableUpdate encounters a record that cannot be updated, it will fail at that point and return a value of false 
             2 will update all records. If a record cannot be updated, it will continue with the remaining records and update as many as it can. TableUpdate will return a value of false.

## web-ones functions
- addMonth(`<`date`>``<`month`>`) . Add a specified number of months to a given date.
- addYear(`<`date`>``<`year`>`) . Add a specified number of years to a given date.
- addDay(`<`date`>``<`day`>`) . Add a specified number of days to a given date.
- left(`<`string`>``<`length`>`) . Return the leftmost characters of a string.
- right(`<`string`>``<`length`>`) . Return the rightmost characters of a string.
- at(`<`string`>``<`index`>`) . Return the character at a specified index in a string.
- atc(`<`string`>``<`index`>`) . Return the character at a specified index in a string.
- space(`<`length`>`) . Return a string of spaces.
- len(`<`string`>`) . Return the length of a string.
- int(`<`number`>`) . Return the integer part of a number.
- rTrim(`<`string`>`) . Return a string with trailing spaces removed.
- lTrim(`<`string`>`) . Return a string with leading spaces removed.
- allTrim(`<`string`>`) . Return a string with leading and trailing spaces removed.
- replicateString(`<`string`>``<`length`>`) . Return a string repeated a specified number of times.
- rat(`<`string`>``<`index`>`) . Return the last position of a given substring in a string.
- replace(`<`string`>``<`oldString`>``<`newString`>`) . Replace a substring with another substring in a string.
- asc(`<`char`>`) . Return the ASCII code of a character.
- substr(`<`string`>``<`first`>``<`length?`>`) . Extract a substring from a string.
- strtran(`<`string`>``<`oldString`>``<`newString`>`) . Replace a substring with another substring in a string.
- dateToSql(`<`date`>`) . Convert a date to a string in the format YYYYMMDD.
- dateToString(`<`date`>`) . Convert a date to a string in the format YYYY-MM-DD.
- stringToDate(`<`string`>`) . Convert a string to a date in the format YYYY-MM-DD.
- currentTime() . Return the current time as a string in the format YYYY-MM-DD HH24:MI:SS.
- dateTimeToSql(`<`date`>`) . Convert a date to a string in the format YYYYMMDDHHMMSS.
- stringToTime(`<`string`>`) . Convert a string to a date in the format YYYY-MM-DD HH24:MI.
- dayToMilliseconds(`<`day`>``<`Type?`>`) . Convert days to milliseconds.
- addDate(`<`date`>``<`data`>``<`Type?`>`) . Add a specified amount of time to a given date. Type='D' (default) to add days, 'M' to add months, 'Y' to add years, 'W' to add weeks.
- multiFilter(`<`array`>``<`filters`>`) . Filter an array based on the values of specific fields.
- MessageBox(`<`text`>``<`type?`>``<`title?`>``<`timer?`>`) . Display a message box with the specified text, type, title, and timer duration. 
- Delay(`<`ms`>`) . Wait for a specified number of milliseconds.
- objToLowerCase(`<`object`>`) . Convert a name of elements of an object to lowercase.
- roundTo(`<`n`>``<`digits?`>`) . Rounds a number to a specified number of decimal places.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)

- Usefull extensions for VSCode:
  - Eslint
  - Prettier Eslint
  - Vue Official

## How to use this framework
To use this framework, you have first to install the SQL-server data base and the back-end framework.

Installing the SQL-server data base
- Download the back-end framework from https://github.com/siavcom/VFP-NODE and extract it in a folder.
- Install the SQL-server data base (MSSQL or Postgres).
- Look in a web-ones DataBase Postgres ( soon ) or web-ones DataBase MSSQL directory a backup file of the database and extract it
- Restore the backup file in the SQL-server data base
This create a database called web-ones.

Installing the back-end framework
- Change the db.config.js file ( in web-ones folder) and use your SQL Server connection parameters.
- Open a terminal in the back-end folder and run node server_socket.js

if you want to use the back-end framework with own name company 

- Make a company folder in the back-end folder/app/empresas/`<`your company name`>`
- Copy a web-ones folder content in the company folder name
- Change the db.config.js file and use your SQL Server connection parameters

- Open a terminal in the back-end folder 
  run npm install
This procedure install all libraries needed for this project

Install the front-end framework

- Download this framework from https://github.com/siavcom/web-ones-technology and extract it in a folder and chage in.
- Open a terminal in the back-end folder 
  run npm install
  
> [!TIP]
> If you are a Windows User and after npm install you have errors, delete package-lock.json and mode_modules folders 
> and run again the command npm install  
  
This procedure install all libraries needed for this project

-In the project directory, you will find a zip file called web-ones. This file should be in a directory called systems that you need to create at the root of your disk where you have your project

Example:
    If you use Linux .- Generate the systems directory in /systems

    If you use Windows and the project is on drive C: .- Generate the systems directory in C:\systems

-Give read/write permission to this directory. In this directory put the web-ones.zip file and unzip it.

This will generate a web-ones directory and inside web-ones is the public folder and in that folder has a Empresas.json file

In this file has the comunications parameters to the back-end server

 ` "arcor": {`

 `    "url": "http://<ip back-end server>:<ip port>/",`

 `   "nem_emp": "<Company name>",`

 `   "nom_sis": "menu",`

 `   "path": { "name": "Menu" },`

 `   "logoEmp": "/logos/YourLogo.bmp"`

 `}`


  "url": "http://192.168.154.1:38080/"      Where the back-end server is.

  "nem_emp": "My company "                  Company name.

  "nom_sis": "menu"                         Mnemonic of the system.

  "path": { "name": "Menu" }                Path where the system will start.

  "logoEmp": "/logos/YourLogo.bmp"          Company logo.

The fields you can modify are: 
 "nem_emp": "My Name company"               Company name.
 
  "logoEmp": "/logos/MyLogo.bmp"            Company logo.


Edit it and indicate the name of the file where your logo is.
The logos are in the logos directory in the web-ones directory

Change to the project directory and now run the command npm run dev
This will start the project and you can start seeing it in your browser at http://localhost:3000

# Begining to work
- Login 

## Design a SQL Table. (The first step to work with the framework)
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
  > [!NOTE]:
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
  fill data exept data of VFP 
 
### This project uses

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

### Necessary Knowledge:

- Object class programming.
- TypeScript.
- Some basic HTML CSS styles properties.
- ANSI 99 standard SQL instructions.
- SQL Server skills (MSSQL or/and Postgres).

> [!NOTE]
> This framework is based on a SQL database.
> If you need suport about installation and use, let me know by mail or Microsoft Teams  siavcom@hotmail.com. 
> If you have a question, let me know by mail or Skype siavcom@hotmail.com.
> If you want a new feature or have a sugestion, let me know by mail or SMirosoft Teams siavcom@hotmail.com.
> To use this Framework, you have to restore an initial SQL backup an back end server (It is in  https://github.com/siavcom/VFP-NODE)
> If you are a VFP programmer, clipper, dbase III or IV, this is the right option for programming on the web.
> I use Linux (Ubuntu 22.04, Ubuntu 24.04) and Windows 10 to make this project.
> node requeriments. See Nuxt documentation https://nuxt.com/docs/getting-started/installation


# About
- I'm an old FOX programmer (since 1981) with a several years of experience in design and programming using VFP, MSSQL, and Postgres databases.

- Author:
  - El Fer Blocks (Principal design, programming, and project director).
  
  - LinkedIn: https://www.linkedin.com/in/fernando-cuadras-846a20102/.

  - Microsoft Teams & e-mail: siavcom@hotmail.com

  - Lupita Sotelo (Reports and SQL design).

  - Raul Castro (HTML and CSS design).

  - http://wwww.web-ones.technology.xyz (soon) and https://deepwiki.com/siavcom/web-ones-technology
  
  - My ERP http://siavcom.com.mx

  - My new ERP usin web-ones-technology http://killo-technology.xyz (soon)
  

Fell free to contact me if you have any questions or suggestions.


> [!IMPORTANT] Reserved Word
> position
> estatus

> [!NOTE]
> Development:
> $ npx nuxi dev --port=3000
> $ npm run dev

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


> [!TIP]
> Helpful advice for doing things better or more easily.

> [!NOTE]
> Key information users need to know to achieve their goal.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
