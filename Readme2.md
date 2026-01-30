Key Advantages
Zero Web Programming Required: Build applications using only TypeScript classes

Legacy Migration: Convert VFP code to TypeScript with our built-in translator

Enterprise Ready: Full ERP system compatibility

No User Retraining: Identical UI/UX to VFP applications

Cross-Browser: Works on Chrome, Firefox, Safari, Edge

🏗️ Architecture (Three-Layer Design)
Frontend (Vue 3 / Nuxt 4)
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
text
Form
├── Grid
│   ├── Column1
│   ├── Column2
│   └── Column3
├── EditText1
├── EditText2
├── EditText3
└── ComboBox1

Database Operations (VFP-like Syntax)
typescript
// Familiar VFP database commands
USE('customers', m, 'cust');
SCATTER(m);
GOTO(5);
TABLEUPDATE(1, true, 'cust');
SQLEXEC("SELECT * FROM invoices WHERE customer_id = ?", [customerId]);
📋 Components
Each component is linked to a web component (input box, combo box, check box, etc.) and has its own properties and methods.

Component Methods
click() - When this component is clicked, this method is called

init() - When the component is initialized, this method is called

interactiveChange() - When the value changes (comboBox only)

keyPress() - Handles key press events

setFocus() - Get focus when called

onChangeValue(styles) - When value changes with style updates

afterMounted() - When mounted in the DOM

recnoChange() - When recno changes

valid() - Validate when losing focus

when() - When component gets focus

Web Components (Vue/Nuxt Components)
base64 - Load and display base64 image

browse - Display table

checkBox - Check Box input

comboBox - Combo Box input

container - Component container

editText - Text, number, json and check input

form - Form component container

grid - Grid component container

image - Display image

imgButton - Button with image

modalComponent - Modal component container

textLabel - Text label

📊 Component Properties Reference
Base Properties
typescript
this.prop.BaseClass = "editText";           // Component type
this.prop.Caption = "Field Label";          // Display label
this.prop.Value = "Initial Value";          // Current value
this.prop.Visible = true;                   // Show/hide
this.prop.ReadOnly = false;                 // Read-only
this.prop.Disabled = false;                 // Enable/disable
this.prop.ControlSource = "table.field";    // Data binding
this.prop.RecordSource = "viewName";        // Data source
this.prop.TabIndex = 1;                     // Tab order
this.prop.ToolTipText = "Help text";        // Tooltip
this.prop.Valid = true;                     // Validation status
this.prop.SqlUpdate = true;                 // Auto-update to DB
EditText Specific Properties
typescript
this.prop.Type = "text";                    // text, number, date, dateTime, spinner, checkBox, json
this.prop.MaxLength = 100;                  // Maximum character length
this.prop.Min = 0;                          // Minimum value
this.prop.Max = 1000;                       // Maximum value
this.prop.Currency = "USD";                 // Currency code
this.prop.Decimals = 2;                     // Decimal places
this.prop.Step = 1;                         // Increment step
ComboBox Properties
typescript
this.prop.RowSourceType = 5;                // 1-Value, 2-Alias, 3-SQL Query, 4-Local SQL, 5-Array
this.prop.RowSource = [                     // Data source
  ["Display", "Value"], 
  ["Option 1", "1"], 
  ["Option 2", "2"]
];
this.prop.ColumnCount = 2;                  // Number of columns
this.prop.BoundColumn = 2;                  // Value column
this.prop.ColumnWidths = "200px,50px";      // Column widths
this.prop.Style = 2;                        // 0=DropDown, 2=DropDown List
Grid Properties
typescript
this.prop.showAddButton = true;             // Show add row button
this.prop.showSaveButton = true;            // Show save button
this.prop.showDeleteButton = true;          // Show delete button
this.prop.autoUpdate = true;                // Auto-update rows
this.prop.ControlSource = "localTableName"; // Local SQL table
this.prop.textLabel = "Grid Title";         // Grid header title
Style Properties
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

2. Create TypeScript Components
typescript
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
}
3. Build Main Forms
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

// Execute SQL queries
const result = await this.SQLEXEC("SELECT * FROM customers WHERE active = ?", [true]);

// Update data
await this.TABLEUPDATE(1, true, 'customers');

// Add new record
const m = { name: "New Customer", email: "email@example.com" };
await this.APPENDBLANK('customers', m);
📁 Project Structure
text
web-ones-technology/
├── assets/           # Static assets
├── components/       # Vue components
├── classes/          # TypeScript base classes
├── composables/      # Composable functions
├── pages/            # Application pages
│   ├── SqlDictionary/  # Database dictionary
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
Date Functions
typescript
ADDMONTH(new Date(), 3);     // Add 3 months
ADDYEAR(new Date(), 1);      // Add 1 year
ADDDAY(new Date(), 7);       // Add 7 days
DATETOSQL(new Date());       // "20241225"
Utility Functions
typescript
MESSAGEBOX("Operation successful", "success", "Info", 3000);
DELAY(1000); // 1 second delay
ROUNDTO(123.4567, 2); // 123.46
APPENDM({a: 1}, {b: 2}); // {a: 1, b: 2}
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
📦 This Project Uses
Vue 3 SFC

Nuxt 4

@nuxtjs/axios

@pinia/nuxt

pinia-plugin-persistedstate

@zip.js/zip.js

alasql

socket.io-client

vue-sweetalert2

xlsx

Back End: https://github.com/siavcom/VFP-NODE

SQL Server (MSSQL, PostgreSQL)

Necessary Knowledge:
Object class programming

TypeScript

Basic HTML/CSS styles properties

ANSI 99 standard SQL instructions

SQL Server skills (MSSQL or PostgreSQL)

📞 Contact & Support
Primary Contact
Fernando Cuadras - Principal Architect & FoxPro Expert since 1987

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

