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
text
         Form
      /    |    \
   EditBox ComboBox Grid
                    |
                 Columns
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

📋 Available Components
Visual Components
Form - Main container

EditText - Text/number/date input (types: text, number, date, dateTime, spinner, checkBox, json)

ComboBox - Dropdown selections with multiple RowSourceType options

CheckBox - Boolean input

Grid - Tabular data display with add/save/delete buttons

Browse - Table viewer

Container - Component grouping with flexible layouts

ModalComponent - Dialog windows

Image/ImgButton - Graphics handling

base64 - Base64 image display

textLabel - Text labels

OptionGroup - Radio button collections

Specialized Components
CaptureForm - Data maintenance forms

CaptureComponent - Component for CaptureForm

Column - Grid column definitions

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

  async when() {
    console.log("Customer name field received focus");
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

Demo: http://web-ones-technology.xyz

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

