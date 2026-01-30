Web-Ones Technology: Complete SQL Web Development Platform
Migrate Visual FoxPro Applications to Modern Web with TypeScript

https://deepwiki.com/badge.svg

🎯 Overview
Web-Ones is a comprehensive framework for building SQL-based web applications using TypeScript (class-based) without requiring expertise in HTML, CSS, or Vue. It enables developers to migrate decades of Visual FoxPro (VFP) applications to modern web technology while preserving the familiar VFP programming paradigm.

✨ Why Web-Ones?
For VFP Developers
Continue programming with VFP-like syntax while targeting modern web browsers. I've been developing Fox systems since 1987 (FoxPlus, FoxPro Unix, VFP 5-9) and created this framework to migrate millions of lines of VFP code working with Postgres and MSSQL.

Key Advantages
Zero Web Programming Required: Build applications using only TypeScript classes

Legacy Migration: Convert VFP code to TypeScript with our built-in translator

Enterprise Ready: Full ERP system compatibility

No User Retraining: Identical UI/UX to VFP applications

Cross-Browser: Works on Chrome, Firefox, Safari, Edge

🏗️ Architecture (Three-Layer Design)
Frontend (Vue 3 / Nuxt 3)
VFP-like functions and instructions in TypeScript

SQL database dictionary management

Menu maintenance system

Visual components: EditBox, ComboBox, Grid, Container, etc.

Backend (Node.js + Express)
RESTful web services via VFP-NODE

Database connectivity and business logic

Real-time communication support

Database Layer
PostgreSQL (Recommended)

Microsoft SQL Server (12+)

Full SQL dictionary management

🚀 Key Features
VFP-Style Programming Model
typescript
// Program like VFP, deploy as web app
this.Form.customerName.prop.Value = 'Acme Corp';
this.Form.gridOrders.prop.RecordSource = 'vw_orders';
await this.SQLExecute("SELECT * FROM customers");
Visual Component Tree

Form/
├── grid/
│   ├── column1  # Column component
│   ├── column2  # Column component
│   ├── column3  # Column component
│   └── ...          # Other components
├── EditText1
│   ├── Help
│   ├── EditText
│   └── ...          # Other components
├── EditText2 # Component2
├── EditText3 # Component3
├── ComboBox1 # Component4

Database Operations (VFP-like Syntax)
typescript
// Familiar VFP database commands
USE('customers', m, 'cust');
SCATTER(m);
GOTO(5);
TABLEUPDATE(1, true, 'cust');
SQLEXEC("SELECT * FROM invoices WHERE customer_id = ?", [customerId]);
Component Properties & Methods
Properties: Value, Caption, Visible, ReadOnly, ControlSource

Methods: click(), valid(), when(), init(), interactiveChange()

Styles: Full CSS styling via TypeScript objects


📋 Components

Component is linked to a web component (input box, combo box, check box, etc.) and these have their own properties like :

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


📋 TypeScript components
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


📋 Form (Main web Form container)
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
`  <VueForm v-bind:ThisForm="Form">`
`    <template #header />`
`    <template #main />`
`    <template #footer />`
`  </VueForm>`
`</template>`
`<script lang="ts" setup>`
`import VueForm from "@/components/form.vue";`
`import { ThisForm } from './ThisForm'`
`const Form = reactive(new ThisForm) //no quitar el new `
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


📋Grid (component container). This component is for localSql table capture

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

 - showAddButton = `<`Show add button `>`
        Type : boolean
        Value = true to show add button.
        Value = false to hide add button.

 - showSaveButton = `<`Show save button `>`
        Type : boolean
        Value = true to show save button.
        Value = false to hide save button.

 - showDeleteButton = `<`Show delete button `>`
        Type : boolean
        Value = true to show delete button.
        Value = false to hide delete button.

- insertButton = `<`Show insert button `>`
        Type : boolean
        Value = true to show insert button.
        Value = false to hide insert button.

- autoUpdate = `<`Auto update`>`
        Type : boolean
        Value = true  update data when all row is valid.
        Value = false disable auto update.

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

📋 Column (Column component)

Eqch column component has a label for the header 
   this.prop.columnLabel='Header 1'

  and an another type script component (editText, imgButton.. almost all type script component exept a Form container)

And each column component has it's owns propierties

- ControlSource = `<`localSqltable.field`>`
        Type : string
        Value = local Sql Table + field

> [!NOTE] :
> For a complete example, take a look in the page directory. Each directory is a Vue View Page. pages/SqlDictionary is the SQL database maintenance dictionary, you can add tables with fields, index, and SQL views for manipulating data access.


📋 Container (container component). Is a component contain one or containers blocks
       
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




🛠️ Getting Started
Prerequisites
Node.js 18+

PostgreSQL 12+ or MSSQL 2016+

Visual Studio Code (recommended)

Installation
1. Database Setup
bash
# Download database backup from repository
# Restore to your SQL Server or PostgreSQL
# Configure connection in db.config.js
2. Backend Installation
bash
git clone https://github.com/siavcom/VFP-NODE.git
cd VFP-NODE
npm install
# Edit db.config.js with your database credentials
node server_socket.js
3. Frontend Installation
bash
git clone https://github.com/siavcom/web-ones-technology.git
cd web-ones-technology
npm install

# Create systems directory at root
# Linux: /systems
# Windows: C:\systems
# Extract web-ones.zip into this directory

npm run dev
4. Configuration
Edit /systems/web-ones/public/Empresas.json:

json
{
  "yourcompany": {
    "url": "http://192.168.1.100:38080/",
    "nem_emp": "Your Company Name",
    "nom_sis": "menu",
    "path": { "name": "Menu" },
    "logoEmp": "/logos/YourLogo.bmp"
  }
}
🔧 Development Workflow

1. Design SQL Tables
Use the built-in SQL Dictionary (SqlDictionary page) to define:

Tables and fields with data types

Indexes and primary keys

SQL Views for data access

Data validation rules and defaults

Menu , submenues and pages

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


## Build Main Forms with use of TypeScript Components
typescript
// pages/customers/ThisForm.ts
import { FORM } from "@/classes/Form";
import { CustomerName } from "./CustomerName";
import { CustomerGrid } from "./CustomerGrid";
import { SaveButton } from "./SaveButton";

export class ThisForm extends FORM {
  public customerName = new CustomerName();
  public customerGrid = new CustomerGrid();
  public saveButton = new SaveButton();
  
  constructor() {
    super();
    this.prop.Name = "CustomerForm";
    this.prop.Caption = "Customer Maintenance";
    this.prop.Status = "A";
    
    // Form styling
    this.style.display = "flex";
    this.style.flexDirection = "column";
    this.style.padding = "20px";
    this.style.background = "#f5f5f5";
  }

  async init() {
    // Load initial data
    await this.customerGrid.loadCustomers();
  }
}
4. Create Vue Page
vue
<!-- pages/customers/index.vue -->
<template>
  <VueForm v-bind:ThisForm="Form">
    <template #header />
    <template #main />
    <template #footer />
  </VueForm>
</template>

<script lang="ts" setup>
import VueForm from "@/components/form.vue";
import { ThisForm } from './ThisForm'
const Form = reactive(new ThisForm)
</script>


### typescript component
// components/CustomerName.ts
import { COMPONENT } from "@/classes/Component";

export class CustomerName extends COMPONENT {
  constructor() {
    super();
    this.prop.BaseClass = "editText";
    this.prop.Caption = "Customer Name";
    this.prop.ControlSource = "customers.name";
    this.prop.MaxLength = 100;
    this.prop.Placeholder = "Enter customer name";
    
    // Styles
    this.style.width = "300px";
    this.style.margin = "10px";
    this.inputStyle.fontSize = "14px";
    this.inputStyle.padding = "8px";
  }

  async valid() {
    if (!this.prop.Value || this.prop.Value.trim() === '') {
      this.prop.ErrorMessage = "Customer name is required";
      return false;
    }
    return true;
  }

  async when() {
    console.log("Customer name field received focus");
    return true;
  }
}



📊 Component Properties Reference
Base Properties
typescript
this.prop.BaseClass = "editText";  // Component type
this.prop.Caption = "Field Label";  // Display label
this.prop.Value = "Initial Value";  // Component value
this.prop.Visible = true;  // Show/hide
this.prop.ReadOnly = false;  // Editability
this.prop.Disabled = false;  // Enable/disable
this.prop.ControlSource = "table.field";  // Data binding
this.prop.RecordSource = "viewName";  // Data source
this.prop.TabIndex = 1;  // Tab order
this.prop.ToolTipText = "Help text";  // Tooltip
this.prop.Valid = true;  // Validation state
this.prop.SqlUpdate = true;  // Auto-update to database
ComboBox Properties
typescript
this.prop.RowSourceType = 5;  // 1-Value, 2-Alias, 3-SQL Query, 4-Local SQL, 5-Array
this.prop.RowSource = [["Display", "Value"], ["Option 1", "1"], ["Option 2", "2"]];
this.prop.ColumnCount = 2;
this.prop.BoundColumn = 2;
this.prop.ColumnWidths = "200px,50px";
this.prop.Style = 2;  // 0=DropDown, 2=DropDown List
Grid Properties
typescript
this.prop.showAddButton = true;
this.prop.showSaveButton = true;
this.prop.showDeleteButton = true;
this.prop.autoUpdate = true;
this.prop.ControlSource = "localTableName";
Styling Properties
typescript
// Component container
this.style.backgroundColor = "white";
this.style.width = "100%";
this.style.padding = "10px";
this.style.margin = "5px";

// Input element
this.inputStyle.fontSize = "14px";
this.inputStyle.border = "1px solid #ccc";
this.inputStyle.borderRadius = "4px";

// Caption/label
this.captionStyle.fontWeight = "bold";
this.captionStyle.color = "#333";
🔄 Database Operations (VFP-Style)
SQL Class Methods
typescript
// Open a table/view
const data = await this.USE('vw_customers', m, 'customers');

// Get current record
const current = await this.SCATTER();

// Navigate
await this.GOTO(5);
await this.SKIP(1);
const recNo = await this.RECNO();

// Check bounds
const atEnd = await this.EOF();
const atStart = await this.BOF();

// Execute SQL queries
const result = await this.SQLEXEC("SELECT * FROM customers WHERE active = ?", [true]);

// Update data
await this.TABLEUPDATE(1, true, 'customers');

// Add new record
const m = { name: "New Customer", email: "email@example.com" };
await this.APPENDBLANK('customers', m);

// Delete record
await this.DELETESQLROW('customers', 123);
Local SQL Operations
typescript
// Create local cursor
await this.USENODATA('customer_structure', 'temp');

// Query local data
const localData = await this.LOCALALASQL(
  "SELECT * FROM temp WHERE balance > ?", 
  [1000]
);

// Read specific field
const name = await this.READCAMPO('customers', 'customer_name');
🧩 Component Methods
Lifecycle Methods
typescript
async init(form: any) {
  // Called when component initializes
  this.prop.Value = "Default";
}

async afterMounted() {
  // Called after component mounts in DOM
  console.log("Component mounted");
}

async when() {
  // Called when component receives focus
  return true; // Return false to prevent focus
}

async valid() {
  // Called when component loses focus
  if (!this.validateValue(this.prop.Value)) {
    this.prop.ErrorMessage = "Invalid value";
    return false;
  }
  return true;
}
Event Methods
typescript
async click() {
  // Handle click events
  await this.Form.showDetails();
}

async interactiveChange() {
  // Called when comboBox value changes (before valid)
  await this.Form.updateRelatedFields();
}

async onChangeValue(styles?: any) {
  // Handle value changes with style updates
  if (this.prop.Value === "A") {
    this.inputStyle.color = "green";
  } else if (this.prop.Value === "B") {
    this.inputStyle.color = "red";
  }
}

async keyPress() {
  // Handle keyboard input
  const key = this.prop.Key;
  if (key === "Enter") {
    await this.Form.nextField();
  }
}

async recnoChange() {
  // Called when grid record changes
  await this.Form.loadRecordData();
}
📁 Project Structure
text
web-ones-technology/
├── assets/           # Static assets
├── components/       # Vue components
│   ├── form.vue     # Main form component
│   ├── editText.vue # Text input
│   └── ...          # Other components
├── classes/          # TypeScript base classes
│   ├── Component.ts # Base component
│   ├── Form.ts      # Base form
│   └── ...          # Other classes
├── composables/      # Composable functions
├── pages/            # Application pages
│   ├── SqlDictionary/  # Database dictionary
│   │   ├── ThisForm.ts
│   │   ├── dic_dat.ts
│   │   └── index.vue
│   ├── customers/      # Customer maintenance
│   └── ...            # Other pages
├── public/           # Public files
├── stores/           # Pinia stores
├── styles/           # Global styles
├── utils/            # Utility functions
└── app.vue           # Root component
🛠️ Utility Functions
String Functions
typescript
LEFT("Hello World", 5);      // "Hello"
RIGHT("Hello World", 5);     // "World"
SUBSTR("Hello World", 7, 5); // "World"
ALLTRIM("  Hello  ");        // "Hello"
STRTRAN("Hello", "l", "x");  // "Hexxo"
REPLICATESTRING("*", 10);    // "**********"
Date Functions
typescript
ADDMONTH(new Date(), 3);     // Add 3 months
ADDYEAR(new Date(), 1);      // Add 1 year
ADDDAY(new Date(), 7);       // Add 7 days
DATETOSQL(new Date());       // "20241225"
STRINGTODATE("2024-12-25");  // Date object
CURRENTTIME();               // "2024-12-25 14:30:45"
Utility Functions
typescript
MESSAGEBOX("Operation successful", "success", "Info", 3000);
DELAY(1000); // 1 second delay
OBJTOLOWERCASE({ Name: "John", AGE: 30 }); // {name: "John", age: 30}
ROUNDTO(123.4567, 2); // 123.46
APPENDM({a: 1}, {b: 2}); // {a: 1, b: 2}
🚀 Migration from VFP
Translation Features
VFP to TypeScript Translator: Built-in tool to convert VFP code

Report Translator: Convert VFP reports to Jasper Reports

Component Mapping: VFP UI components to Web-Ones components

Database Command Mapping: VFP SQL commands to TypeScript methods

Migration Process
Analyze: Review existing VFP application structure

Translate: Use translator for code conversion

Test: Validate functionality in web environment

Deploy: Launch as web application

Code Comparison
foxpro
&& VFP Code
USE customers IN 0
SCATTER MEMVAR
m.name = "Updated Name"
GATHER MEMVAR
TABLEUPDATE()

// TypeScript Equivalent (Web-Ones)
await this.USE('customers', null, 'cust');
const m = await this.SCATTER();
m.name = "Updated Name";
await this.GATHER(m);
await this.TABLEUPDATE();
📈 Real-World Implementation
Success Metrics
2 Production Applications running 100% TypeScript

80% ERP Migration Complete for SIAVCOM ERP

Zero User Retraining - Identical workflow to VFP

Cross-Platform - Runs on all modern browsers

Current Progress
text
ERP System Migration:    ██████████░░░░ 80%
Component Library:       ████████████░░ 90%
VFP Translator:          █████████████░ 95%
Performance Optimization:██████████░░░░ 75%
🔍 Debugging & Troubleshooting
Common Issues
typescript
// 1. Component not visible
this.prop.Visible = true;  // Ensure visibility is set

// 2. Data not binding
this.prop.ControlSource = "table.field";  // Check field name
this.prop.RecordSource = "viewName";     // Check view exists

// 3. Database connection
// Verify db.config.js settings
// Check backend server is running

// 4. Styles not applying
// Use this.style, this.inputStyle, this.captionStyle
// Ensure style properties use valid CSS values
Development Tips
Use VS Code Extensions:

ESLint

Prettier

Vue Official Extension

TypeScript Importer

Debug Commands:

bash
# Check Node.js version
node --version

# Clear npm cache if issues
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
🤝 Community & Contribution
Get Involved
Star the Repository on GitHub

Report Issues with detailed descriptions

Submit Pull Requests with improvements

Share Your Experience in discussions

Support Channels
GitHub Issues: Bug reports and feature requests

Email: siavcom@hotmail.com

Microsoft Teams: Direct messaging available

Documentation: Contribute to DeepWiki

📚 Learning Resources
For VFP Developers
TypeScript Basics - Learn modern JavaScript with types

Vue 3 Concepts - Understanding the underlying framework

SQL Database - Deepen your ANSI SQL knowledge

Web-Ones Examples - Study included sample applications

Recommended Path
Start with simple forms and basic components

Progress to grid-based data maintenance

Implement complex business logic

Build complete application modules

🏢 Enterprise Features
Multi-Company Support
typescript
// Configuration-based company switching
const companyConfig = {
  arcor: { url: "http://arcor-server:38080/", database: "arcor_db" },
  other: { url: "http://other-server:38080/", database: "other_db" }
};

// User login: username@company
// Example: john@arccor, maria@othercompany
Security Features
Database-level permissions

Form and field-level access control

Audit logging

Session management

Performance Optimization
Lazy loading of components

Efficient database queries

Client-side caching

Optimized re-rendering

🔮 Future Roadmap
Short-term (Next 6 Months)
PostgreSQL full support

Enhanced visual form designer

Additional component library

Performance benchmarking tools

Medium-term (6-12 Months)
Mobile-responsive components

Real-time collaboration features

Advanced reporting engine

Plugin architecture

Long-term (1+ Years)
AI-assisted code migration

Cloud deployment automation

Internationalization support

Marketplace for components

📞 Contact & Support
Primary Contact
Fernando Cuadras
Principal Architect & FoxPro Expert since 1987

Email: siavcom@hotmail.com

LinkedIn: Fernando Cuadras

Microsoft Teams: siavcom@hotmail.com

Website: SIAVCOM

Development Team
El Fer Blocks - Architecture & Core Development

Lupita Sotelo - Reports & SQL Design

Raul Castro - UI/UX & CSS Design

Resources
GitHub: https://github.com/siavcom/web-ones-technology

Backend: https://github.com/siavcom/VFP-NODE

Documentation: https://deepwiki.com/siavcom/web-ones-technology

Demo: Please contact siavcom@hotmail.com

Upcoming ERP: http://killo-technology.xyz

📄 License & Usage
Web-Ones Technology is released as open-source software. You are free to:

Use in personal and commercial projects

Modify and adapt to your needs

Contribute improvements back to the community

Attribution
If you use Web-Ones in your projects, please consider:

Starring the GitHub repository

Sharing your success stories

Contributing improvements

Referencing the project in documentation

💭  This project uses

- Vue 3 SFC
- Nuxt 4
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
> If you have a question, let me know by mail or Microsoft Teams siavcom@hotmail.com.
> If you want a new feature or have a sugestion, let me know by mail or Mirosoft Teams siavcom@hotmail.com.
> To use this Framework, you have to restore an initial SQL backup an back end server (It is in  https://github.com/siavcom/VFP-NODE)
> If you are a VFP programmer, clipper, dbase III or IV, this is the right option for programming on the web.
> I use Linux (Ubuntu 22.04, Ubuntu 24.04) and Windows 10 to make this project.
> node requeriments. See Nuxt documentation https://nuxt.com/docs/getting-started/installation



💭 Final Thoughts
As a FoxPro developer since 1987, I created Web-Ones to solve a critical problem: how to migrate decades of VFP investment to modern web technology without losing the programming paradigm that made FoxPro so productive.

This framework represents 30+ years of database application development experience, distilled into a tool that lets VFP developers continue working the way they know best, while delivering modern web applications.

Whether you're maintaining a legacy VFP system or starting a new web project with a database-centric approach, Web-Ones provides the bridge between the proven productivity of FoxPro and the limitless potential of modern web development.

Fernando Cuadras
Creator of Web-Ones Technology

Note: Daily improvements ongoing. Current focus: 100% ERP migration completion by year-end.

Tip: Start with a small module to learn the framework, then scale to full applications.

Important: Login format is username@company. Contact for multi-company setup assistance.

Warning: Always backup your database before major schema changes.

Success Story: "Our users switched from VFP to web without any training - the interface works exactly the same!" - Happy Client

