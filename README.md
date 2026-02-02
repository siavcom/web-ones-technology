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

Menu maintenance system

Visual components: EditBox, ComboBox, Grid, Container, etc.

Backend (Node.js + Express)
RESTful web services via VFP-NODE

Database connectivity and business logic

Real-time communication support

Database Layer

PostgreSQL  (12+)

Microsoft SQL Server (2017+)

SQL database dictionary management

Menu maintenance system


🚀 Key Features
VFP-Style Programming Model
typescript
// Program like VFP, deploy as web app
this.Form.customerName.prop.Value = 'Acme Corp';
this.Form.gridOrders.prop.RecordSource = 'vw_orders';
await this.SQLExecute("SELECT * FROM customers");
Visual Component Tree


📐 Component Tree Architecture
The framework uses a main form (like ThisForm in VFP) made only in TypeScript, where each form has its own visual HTML components and methods:



├── Form/  
│    ├── component1/            
│    ├── component2/          
│    ├── component3/          
│    ├── component4/          
│    │   ├── when()  
│    │   ├── inti()  
│    │   ├── valid()  
│    │   ├── click()  
│    │   ├── onChangeValue()  
│    │   ├── afterMounted()  
│    │   ├── recnoChange()  
│    │   └── ...          # Other Methods  
│    ├── component....../ # Other Components     

Some components contain other components:

├── Container/  
│    ├── component1/  
│    ├── component2/  
│    ├── component3/  
│    ├── component4/  


├── grid/
│    ├── column1/  
│    ├── column2/  
│    ├── column3/  
│    ├── column4/  


text
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


text

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
Some components contain other components:

text
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


🎨 Component Properties and Methods
Component Properties
Basic props - Core component properties

Style props - Visual styling properties

Position props - Layout positioning (deprecated)

Component Methods
click() - Called when component is clicked

init() - Called when component is initialized

interactiveChange() - Called when value changes (comboBox exclusive, before valid)

keyPress() - Handles key press events (key value in this.prop.Key)

setFocus() - Gets focus when called

onChangeValue(styles) - Called when value changes with optional style parameter

afterMounted() - Called when component is mounted in DOM

recnoChange() - Called when recno changes

valid() - Called when component loses focus (returns true/false)

when() - Called when component gets focus (returns true/false. Is false the componet is ReadOnly )

🔧 Setting Properties and Styles
Property References
typescript
// Properties
this.Form.component1.prop.Type = 'editText'
this.Form.component2.prop.Value = 'Customer name 1'
this.Parent.component2.prop.Value = 'Customer name 1'
this.Parent.component1.component2.prop.Value = 'Customer name 1'

// Styles
this.Form.style.display = "inline-block"
this.Form.style.width = '800px'

// Calling methods
this.Form.component4.click()
this.Parent.component1.component2.click()


🖥️ Web Components (Vue/Nuxt Components)
base64 - Load and display base64 images

browse - Display table

checkBox - Check Box input

comboBox - Combo List Box input

container - Component container

editText - Text, number, json, and check input

form - Form component container

grid - Grid component container

image - Display image

imgButton - Button with image

modalComponent - Modal component container

textLabel - Text label

📝 TypeScript Components
TypeScript components are written in TypeScript and exist within container components (Form, container, etc.) except Form components which can't be inside another Form component.

Example Component

```typescript
// Clase: dic_dat  
// Descripcion: tipo de mantenimiento del diccionario de datos  
// Author: Fernando Cuadras Angulo  
// Creacion: Diciembre/2021  
// Ult.Mod: 6/Septiembre/2022  

import { COMPONENT } from "@/classes/Component";

export class dic_dat extends COMPONENT {
    constructor() {
        super();
        
        //****** Properties ********//
        this.prop.BaseClass = "comboBox"; // Web component
        this.prop.Caption = "Diccionario de datos";
        this.prop.ToolTipText = this.prop.Caption;
        this.prop.ReadOnly = false;
        this.prop.Capture = false;
        this.prop.RowSource = [
            ["Tablas del SQL Server", "Definicion de Tabla", "Menú de programas"],
            ["T", "D", "M"]
        ];
        this.prop.ControlSource = "vi_cap_comedat.dic_dat";
        this.prop.RowSourceType = 5; // 1-Value, 2-Alias, 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths = "200px,10px";

        //****** Component Style *******//
        this.style.width = "500px";
        this.style.fontSize = "17px";
        this.style.fontWeight = "bold";

        //****** Input style component *******//
        this.inputStyle.fontSize = "17px";
        this.inputStyle.fontWeight = "bold";
        this.inputStyle.width = "300px";

        //****** Label style component *******//
        this.captionStyle.fontSize = "17px";
        this.captionStyle.fontWeight = "bold";
    }

    //*********** Methods *******************//
    public init = async (form: any) => {
        this.prop.Value = "T";
    };

    async interactiveChange() {
        this.Form.nom_tab.prop.Visible = false;
        this.Form.bt_gen_all_models.prop.Visible = false;
        
        if (this.prop.Value == "M") {
            this.Form.sis_sis.prop.Visible = false;
            this.Form.bt_aceptar.prop.Visible = true;
        } else {
            this.Form.sis_sis.prop.Visible = true;
            this.Form.bt_aceptar.prop.Visible = false;
        }
    }

    public async when(sis_sis?: boolean) {
        await this.interactiveChange();

        this.Form.nom_tab.prop.Visible = false;
        this.Form.tpr_prg.prop.Visible = false;
        this.Form.grid_datos.prop.Visible = false;
        this.Form.grid_indices.prop.Visible = false;
        this.Form.grid_vistas.prop.Visible = false;
        this.Form.grid_menu.prop.Visible = false;
        this.Form.grid_tablas.prop.Visible = false;
        this.Form.bt_gen_model.prop.Visible = false;
        this.Form.bt_gen_indices.prop.Visible = false;
        this.Form.bt_gen_vistas.prop.Visible = false;
        this.Form.bt_gen_all_models.prop.Visible = false;

        return !this.prop.ReadOnly;
    }
}
```

📋 TypeScript Component Types
Browse - Table display

CaptureComponent - Component of CaptureForm

CaptureForm - Main maintenance page form container

Column - Column component in a grid component

Component - Basic component

Container - Container component

Form - Main page container

Grid - Table maintenance container

OptionGroup - A collection of checkBox components

Option - checkBox component of OptionGroup

Each component is a TypeScript class with properties affecting visual and database behavior.

📊 Component Properties Reference
Base Properties
typescript
this.prop.<Name of property> = <Value>

 BaseClass: <webComponent>  
 Type: string  
 Values: 'Form', 'editText', 'textLabel', 'comboBox', 'checkBox', 'optionGroup', 'grid', 'base64', 'container' 

 Caption: <Title of component> || <Text label showing before input>  
 Type: string  

 Disabled: <true when component is disabled>  
 Type: boolean  

 ErrorMessage: <Error message if component is not valid>  
 Type: string  

 First: <true. Component that receives focus when new record is inserted>  
 Type: boolean  

 Focus: <When set to true, this component takes focus>  
 Type: boolean  

 Format: <> (future version)  
 Type: string  

 Image: <Component background image path>  
 Type: string  

 InputMask: <> (future version)  
 Type: string  

Map: <Show structure map of this component>  
  Type: string  
  Example: "this.Form.componentName"  

 Max: <Maximum value for number>  
 Type: number  

 MaxLength: <Maximum character length>  
 Type: number  

 Min: <Minimum value for number>  
 Type: number  

 Name: <Name of component>  
 Type: string  

 Placeholder: <label inside input blurred>  
 Type: string  

 Position: <position in a form>  
 Type: string  
 Values: 'header', 'main', 'footer' 

  ReadOnly: <true when component is read only>  
  Type: boolean  

 Status: <Status of component>  
  Type: string  
  Values: P=Process, A=Active, I=Initialization  

  TabIndex: <Component tab index in form component>  
  Type: number  

  ToolTipText: <Component tool tip text>  
  Type: string  

  Type: <Data input type when BaseClass="editText">  
  Type: string  
  Values: 'number', 'text', 'date', 'dateTime', 'spinner', 'checkBox', 'json'  

  Valid: <true when component is valid>  
  Type: boolean  

  Value: <Value of component>  
  Type: string, date, number, boolean, json  

  Visible: <true when component is visible>  
  Type: boolean  

Database Component Properties

  ControlSource: <Name of SQL field>  
  Type: string  
  Example value: 'localTable.field'

  RecordSource: <local or remote table name>  
  Type: string  
  Example value: 'viewTableName'

  SqlUpdate: <True when component loses focus, update field component. When false, update field component using tableUpdate method>  
  Type: boolean  

  Behavior Properties
  Capture: <When capture is true, can't lose focus until Validate or esc>  
  Type: boolean  


  Recno: <Record Number for localSql field value>  
  Type: number  

  
Numeric Component Properties

typescript  
  Currency: <Currency to display>  
  Type: string  
  Example: 'USD', 'EUR', 'MXN'  

  CurrencyDisplay: 'code' // To use ISO currency code  
  Type: string  

  Decimals: <Decimals to show and capture>  
  Type: number  

  Max: <Maximum value in this component>  
  Type: number  

  Min: <Minimum value in this component>  
  Type: number  

  Step: <When spinner component number step>  
  Type: number  

ComboBox Properties  

typescript  
  Style: <Type of combo box>  
  Type: number  
  Values: 0=DropDown, 2=DropDown List  

  BoundColumn: <The value is attached to the column>  
  Type: number  

  ColumnCount: <Total column numbers in comboBox>  
  Type: number  

  ColumnWidths: <Width of each column>  
  Type: string  
  Example: '80%', '20%'  

  MultiSelect: <Can multiple select>  
  Type: boolean  

  List: <List array result when MultiSelect is true>  
  Type: array  

  RowSource: <Sql query or table.field>  
  Type: string  
  Examples:
    - when RowSourceType=2: 'tablename.field1,field2'  
    - when RowSourceType=3 or 4: 'SELECT column1,column2 FROM tablefield'  

  RowSourceType: <How to fill comboBox>  
  Type: number  
  Values:  
    1-Value   
      Example: RowSourceType=1, ColumnCount=2  
      RowSource="House,H,Building,B,Department,D"  
 
    2-Alias  
      Example: RowSourceType=2, ColumnCount=3  
      RowSource="tablename.House,Building,Department"  
 
    3-Query SQL Server  
      Example: RowSourceType=3, ColumnCount=2  
      RowSource='SELECT column1,column2 FROM servertable'
 
    4-Local SQL  
      Example: RowSourceType=4, ColumnCount=2  
      RowSource='SELECT column1,column2 FROM localtable'  
      Note: You already have a local table SQL  
 
    5-Array  
      Example: RowSourceType=5, ColumnCount=2  
      RowSource=[['column1','column2'],['value1','value2']]  


🎨 Style Properties

All Components

this.style.<name of property> = <Value>  

Input Component  

this.inputStyle.<name of property> = <Value>  
Caption Component  

Caption Component  
this.captionStyle.<name of property> = <Value>  
Example Styles  
typescript  
background: "white"  
color: "#b94295"  
width: "64px"  
height: "auto"  
maxHeight: '13px'  
maxWidth: 'auto'  
fontFamily: "Arial"  
fontSize: "13px"  
textAlign: "left"  
// ... several CSS style properties  

📄 Form (Main Web Form Container)
The principal main form (SPA). A complete system is made of several Forms, each located in a page directory of the NUXT structure.


[!IMPORTANT]
Each page folder is minimally composed of two files: index.vue and ThisForm.ts

Sample: For a web page called clientForm, in a pages directory:

text

pages/clientForm/index.vue      // Only file of the form (content never changes)

pages/clientForm/ThisForm.ts    // Principal form

pages/clientForm/component1.ts  // Component 1

pages/clientForm/component2.ts  // Component 2
...
pages/clientForm/componentN.ts  // Component N

index.vue (always has this content)

```typescript
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
const Form = reactive(new ThisForm) //no quitar el new 
</script>
```

and the principal form (ThisForm.ts) has this content:

```typescript

//////////////////////////////////////////////
// Page: SqlDictionary
// Clase base: ThisForm
// Author: Fernando Cuadras Angulo
// Creacion: Septiembre/2021
// Ult.Mod: Enero/2025
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
    // Properties
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
```

[!NOTE]
To see complete Form example, look in pages/SqlDictionary

📊 Grid (Component Container)
Grid component for local SQL table capture. Contains several column components.

Grid Properties

  textLabel = <Grid title>
  Type: string

  ControlSource: <Name of localSQL table>
  Type: string
  Example value: 'capture_view_items'

  SqlUpdate: <Automatic update>
  Type: boolean
  Value = true enable automatic update
  Value = false disable automatic update

  showAddButton = <Show add button>
  Type: boolean
  Value = true to show add button
  Value = false to hide add button

  showSaveButton = <Show save button>
  Type: boolean
  Value = true to show save button
  Value = false to hide save button

  showDeleteButton = <Show delete button>
  Type: boolean
  Value = true to show delete button
  Value = false to hide delete button

  insertButton = <Show insert button>
  Type: boolean
  Value = true to show insert button
  Value = false to hide insert button

  autoUpdate = <Auto update>
  Type: boolean
  Value = true update data when all row is valid
  Value = false disable auto update
Grid Methods
typescript
  appendRow(<memoryVariables>: {})
  Append a row where memoryVariables is object containing values defined in SqlDictionary table design
// Example:
m = {
  firstName: this.Form.name,
  age: this.Form.age,
  newcustomer: true,
}

 deleteRow(<recno to delete>?: number)
  If recno to delete is omitted, delete the grid row positioned

📋 Column Component
Each column component has a label for the header and another TypeScript component (editText, imgButton, etc., except Form container).

Column Properties

  ControlSource = <localSqltable.field>
  Type: string
  Value = local Sql Table + field

// Example:
this.prop.columnLabel = 'Header 1'
[!NOTE]
For complete example, look in page directory. Each directory is a Vue View Page. pages/SqlDictionary is the SQL database maintenance dictionary.

📦 Container Component
Component containing one or more container blocks.

Default Styles

```typescript

this.containerStyle.display = 'flex'
this.containerStyle.flexWrap = 'wrap'
this.style.maxWidth = '600px'
Block Definition

// =======================<Bloque 0>===============
const container = this.container
this.block[0] = structuredClone(container)
this.block[0].component = {
  [0]: this.name,
  [1]: this.age,
}
this.block[0].title = 'Cliente Nuevo'
this.block[0].style.width = '95%'

// Container Methods
async open() {
  this.prop.Visible = true
}

async close() {
  this.prop.Visible = false
}
```


🗄️ SQL Database Class (VFP SQL Instructions)
Class for manipulating SQL databases with VFP-like methods.

Database Methods

appendBlank(<alias>, <memoryObject>) - Append row in local SQL table with default TypeScript values

bof(<alias?>) - After locate, skip or goto, returns true if at last row

deleteSqlRow(<alias?>, <key_pri?>) - Delete current row in local SQL table

deleteSql(<recno>, <alias>, <SqlUpdate>) - Delete row with recno in local SQL table

eof(<alias?>) - After locate, skip or goto, returns true if at first row

found(<alias?>) - After locate, skip or goto, returns true if current row exists

gather(<object values>) - Gather values in local SQL table from object values

goto(<row>) - Goto record number of local SQL (row=0 for current row)

insert(<alias>, <memoryObject>) - (not in use)

localAlaSql(<query>) - Execute query in local SQL table

readCampo(<alias>, <field>) - Read field in local SQL table

recCount(<alias?>) - Get record count of local SQL table

recno(<alias?>) - Get current record number of local SQL table

select(<alias?>) - Select default values in local SQL table

skip(<rowNumbers>) - Skip record number of local SQL table

scatter(<fieldArray?>, <alias?>) - Scatter values into object from local SQL table

scatterBlank(<fieldArray>, <alias?>) - Scatter blank values from local SQL table

SQLExecute(<query>) - Execute query in SQL-Server

tableUpdate(<updateType>, <force>, <alias>) - Update local SQL table to SQL-Server table

use(<table>, <memoryObject>, <alias?>) - Prepare local SQL table with data (clone of SQL-Server view)

useNodata(<table>, <alias?>) - Prepare local SQL table without data (clone of SQL-Server view)

Parameter Types:

<area> - VFP Area number (type: number)

<alias> - Local SQL table alias (type: string)

<fieldArray> - Array with field and value of SQL table (type: Array)

<force> - Force update (type: boolean)

false: If update fails because another user changed data first, return false

true: If update fails because another user changed data first

<key_pri> - Table key_pri(id) number in SQLServer (type: number)

<memoryObject> - Object with field and value of SQL table (type: Object)

<query> - SQL Server query to execute (type: string)

<recno> - Local SQL recno number (type: number)

<row> - Recno row id to go (type: number)

<resultType> - Result type (type: string)

<rowNumbers> - Row numbers to skip (type: number)

<SqlUpdate> - SQL update flag (type: boolean)

true: Delete SQLServer

false: Only local SQL

<sqlQuery> - SQL Server query to execute (type: string)

<table> - SQL Server remote view name (type: string)

<type> - Type parameter (type: string)

'MEMVAR': Return object with all field values

'FIELDS': Return object with specific field values

<updateType> - Update type (type: number)

0: Update only current record

1: Update all records (fails at first error)

2: Update all records (continues on error)

🔧 Web-Ones Functions

String Functions :
addMonth(<date>, <month>) - Add months to date

addYear(<date>, <year>) - Add years to date

addDay(<date>, <day>) - Add days to date

left(<string>, <length>) - Return leftmost characters

right(<string>, <length>) - Return rightmost characters

at(<string>, <index>) - Return character at specified index

atc(<string>, <index>) - Return character at specified index (case-insensitive)

space(<length>) - Return string of spaces

len(<string>) - Return string length

int(<number>) - Return integer part of number

rTrim(<string>) - Remove trailing spaces

lTrim(<string>) - Remove leading spaces

allTrim(<string>) - Remove leading and trailing spaces

replicateString(<string>, <length>) - Repeat string specified times

rat(<string>, <index>) - Return last position of substring

replace(<string>, <oldString>, <newString>) - Replace substring

asc(<char>) - Return ASCII code of character

substr(<string>, <first>, <length?>) - Extract substring

strtran(<string>, <oldString>, <newString>) - Replace substring

Date Functions :

dateToSql(<date>) - Convert date to YYYYMMDD format

dateToString(<date>) - Convert date to YYYY-MM-DD format

stringToDate(<string>) - Convert string to YYYY-MM-DD format

currentTime() - Return current time as YYYY-MM-DD HH24:MI:SS

dateTimeToSql(<date>) - Convert date to YYYYMMDDHHMMSS format

stringToTime(<string>) - Convert string to YYYY-MM-DD HH24:MI format

dayToMilliseconds(<day>, <Type?>) - Convert days to milliseconds

addDate(<date>, <data>, <Type?>) - Add time to date (Type: 'D'=days, 'M'=months, 'Y'=years, 'W'=weeks)

Utility Functions
multiFilter(<array>, <filters>) - Filter array based on field values

MessageBox(<text>, <type?>, <title?>, <timer?>) - Display message box

Delay(<ms>) - Wait for milliseconds

objToLowerCase(<object>) - Convert object element names to lowercase

roundTo(<n>, <digits?>) - Round number to decimal places

appendM(m, additionalObject) - Append data to m object

appendM Example :

```typescript
const m = { 
  name: 'John',
  phone: '(312) 123-1234'
}

m = appendM(m, { zipCode: '23455' })

// Result:
console.log(m) = {
  name: 'John',
  phone: '(312) 123-1234',
  zipCode: '23455'
}
```

📁 Project Structure NUXT 4


web-ones-technology/  
├── app/  
│    ├── assets/           # Static assets  
│    ├── classes/          # TypeScript base classes  
│    │   ├── Component.ts # Base component  
│    │   ├── Form.ts      # Base form  
│    │   └── ...          # Other classes  
│    ├── components/       # Vue components  
│    │   ├── form.vue     # Main form component  
│    │   ├── editText.vue # Text input  
│    │   └── ...          # Other components
│    ├── composables/      # Composable functions
│    │   ├── composables.ts  
│    │   └── ...          # Other composables  
│    ├── layouts/          # Layouts  
│    │   ├── layout.vue  
│    │   └── ...          # Other layouts  
│    ├── middleware/       # Middleware  
│    │   ├── middleware.ts  
│    │   └── ...          # Other middleware  
│    ├── pages/            # Application pages  
│    │   ├── SqlDictionary/  # Database dictionary  
│    │   │   ├── ThisForm.ts  
│    │   │   ├── dic_dat.ts  
│    │   │   └── index.vue  
│    │   ├── customers/      # Customer maintenance  
│    │   └── ...            # Other pages  
│    ├── plugins/          # Plugins
│    │   ├── plugins.ts  
│    │   └── ...          # Other plugins
│    ├── stores/           # Pinia stores  
│    │   ├── stores.ts  
│    │   └── ...          # Other stores  
├── server/           # Server files (nitro)  
│    ├── server.ts  
│    └── ...          # Other server files  
├── public/           # Public files  
│    └── ...          # Other public files  
└── app.vue           # Root component  

🛠️ Installation Guide
Prerequisites
VSCode recommended

Useful VSCode Extensions
Eslint

Prettier Eslint

Vue Official

📋 How to Use This Framework


1. Install SQL-Server Database and Backend
Download backend from https://github.com/siavcom/VFP-NODE

Install SQL-server database (MSSQL or Postgres)

Find backup file in web-ones DataBase Postgres (soon) or web-ones DataBase MSSQL directory

Restore backup to SQL-server (creates database called web-ones)

2. Install Backend Framework
Edit db.config.js in web-ones folder with SQL Server connection parameters

Open terminal in backend folder and run: node server_socket.js

3. Custom Company Setup
Create company folder in: backend_folder/app/empresas/<your company name>

Copy web-ones folder content to company folder

Update db.config.js with connection parameters

Run: npm install

4. Install Frontend Framework
Download from https://github.com/siavcom/web-ones-technology

Run: npm install

[!TIP]
Windows users: If errors after npm install, delete package-lock.json and node_modules folders, then run npm install again.

5. System Directory Setup
Create systems directory at root:

Linux: /systems

Windows (project on C:): C:\systems

Place web-ones.zip in this directory and unzip. This creates web-ones directory with public folder containing Empresas.json.

6. Empresas.json Configuration

```json
"arcor": {
  "url": "http://<ip back-end server>:<ip port>/",
  "nem_emp": "<Company name>",
  "nom_sis": "menu",
  "path": { "name": "Menu" },
  "logoEmp": "/logos/YourLogo.bmp"
}
```

Configuration fields:

"url": Backend server location (e.g., "http://192.168.154.1:38080/")

"nem_emp": Company name (e.g., "My company")

"nom_sis": System mnemonic (e.g., "menu")

"path": System start path (e.g., {"name": "Menu"})

"logoEmp": Company logo path (e.g., "/logos/YourLogo.bmp")

Editable fields:

"nem_emp": "My Name company"

"logoEmp": "/logos/MyLogo.bmp"

Logos are in logos directory within web-ones directory.

7. Start Development
bash  
npm run dev  
Access at: http://localhost:3000  

🔑 Login

Format: <user>@<business nickname> 

<user>: Personal login 

<business nickname>: SQL database name 

📊 Beginning to Work

Design SQL Tables (First Step)

Create new SQL table:

Go to SQL data dictionary in menu

Choose "SQL Server table"

Choose system menu

Add new table

Fill table characteristics

Save table

Create table definition:

Go to SQL data dictionary

Choose "table definition"

Choose system menu

Choose table

Add new definition

Click accept

Insert fields

Fill characteristics

Click accept

[!NOTE]
When field is primary key, default value must be m.<namefield>

Create SQL view

Create SQL index

Create Menu Pages
Framework uses NUXT directory structure. All pages are in page directory with 3 subdirectories:

Mto - Maintenance pages

Rep - Reporting pages

Pro - Process pages

Each has directory for each page.

To create menu:

Go to SQL data dictionary

Choose "Menu pages"

Choose menu type

Choose system

Fill data (except VFP data)

📦 Technologies Used (The libraries are intended to be Open Source)

Frontend:
Vue 3 SFC  
Nuxt 4  
zip.js,  
alasql,  
axios,  
file-saver,  
pinia,  
vue-sweetalert2,  
vue3-table-lite,  
maska,  
xlsx,  
whatsapp-web.js 

Backend:
NODE/Express,  
sequelize,  
Socket.IO,  
Jasper reports library,  
axios,  
body-parser,  
cors,  
crypto-js,  
he,  
npm,  
pg,  
pg-hstore,  
sequelize,  
socket.io,  
tedious,  
uuid,  
xml2json  


Backend
https://github.com/siavcom/VFP-NODE

SQL Server (MSSQL, Postgres )

🧠 Required Knowledge

Object class programming

TypeScript

Basic HTML/CSS style properties

ANSI 99 standard SQL instructions

SQL Server skills (MSSQL or PostgreSQL)

[!NOTE]

Framework is SQL database based

For installation/use support: siavcom@hotmail.com by mail or Microsoft Teams

For questions/suggestions/feature requests: siavcom@hotmail.com by mail or Microsoft Teams

Requires initial SQL backup and backend server from https://github.com/siavcom/VFP-NODE  

Ideal for VFP, Clipper, dBase III/IV programmers  

Developed on Linux (Ubuntu 22.04, 24.04) and Windows 10  

Node requirements: See Nuxt documentation https://nuxt.com/docs/getting-started/installation  

👨‍💻 About
I'm an experienced Fox programmer (since 1981) with extensive experience designing and programming using VFP, MSSQL, and PostgreSQL databases.  
I'm old but I'm not lazy.  
I am young in my heart and in my thinking  
I'm a human being.  

Author
El Fer Blocks - Principal design, programming, and project director

LinkedIn: https://www.linkedin.com/in/fernando-cuadras-846a20102/

Microsoft Teams & Email: siavcom@hotmail.com

Team
Lupita Sotelo - Reports and SQL design

Raul Castro - HTML and CSS design

Resources
Website: http://www.web-ones.technology.xyz

Documentation: https://deepwiki.com/siavcom/web-ones-technology

My ERP: http://siavcom.com.mx (soon in this year using this technology)

New ERP using web-ones-technology: http://killo-technology.xyz (soon)

Feel free to contact me with questions or suggestions.

⚠️ Reserved Words
position

estatus

🚀 Development Commands
bash
npx nuxi dev --port=3000
npm run dev
💡 Tips
[!TIP]
Helpful advice for doing things better or more easily.

[!NOTE]
Key information users need to know to achieve their goal.

[!IMPORTANT]
Key information users need to know to achieve their goal.

[!WARNING]
Urgent info that needs immediate user attention to avoid problems.

[!CAUTION]
Advises about risks or negative outcomes of certain actions. 