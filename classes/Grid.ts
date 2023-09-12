//////////////////////////////////////////////
// Clase : Grid
// Author : Fernando Cuadras Angulo
// Creacion : Febrero/2022
// Ult.Mod  :  10/Julio/2023
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class GRID extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  // Tenemos que utilizar renglon o data
  data = [{}]; // arreglo donde esta el data
  Row = -1;
  // autoLoad=false
  // declare variable:string='Hola'

  //elements = [{}]
  constructor() {
    super();
    this.Name = "Grid";
    this.prop.ColumnCount = 1;
    this.prop.BaseClass = "grid";
    this.prop.Capture = true;
    this.prop.RecordSource = "";
    this.prop.Row = 0;
    this.prop.textLabel = "Grid de datos";
    this.prop.SqlUpdate = false; //Si es verdadero actualiza automaticamente
    this.prop.addButton = true;
    this.prop.deleteButton = true;
    this.prop.saveData = true;
    this.prop.updated = false;
    this.prop.Visible = false;
    this.prop.messageUpdate = "Grabamos la tabla";
  }

  ////////////////////////////////////////
  // Metodo : init
  // Descripcion : Si es un grid de captura general y esta visible,
  //              Inicializa la tabla
  //              si ya tiene el RecordSource
  /// /////////////////////////////////////

  /*
  public async init() {
    if (this.autoLoad && this.prop.RecordSource.length > 1) {// Si hay recordSource
      console.log('================Grid.ts Init autoLoad=============',this.autoLoad)
 
      await this.valid()
      this.prop.Visible=true
      console.log('================Grid.ts Fin Init autoLoad===========',this.autoLoad)
    }
  }
  */

  ////////////////////////////////////////
  // Metodo : Valid
  // Descripcion : Valida los datos de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  public async valid(): Promise<boolean> {
    if (this.prop.RecordSource.length < 2) {
      // No hay recordSource
      this.prop.Valid = false;
      return this.prop.Valid;
    }
    const RecordSource = this.prop.RecordSource;
    //    this.prop.RecordSource=''
    const m = {};

    for (const i in this.Form.main) {
      // asigna a m los componentes de ThisForm
      const comp = this.Form.main[i];
      if (this.Form[comp].prop.updateKey) {
        //Obtiene solo los de llaves de actualizacion
        //console.log('CaptureForm comp', comp, this[comp].prop.Valid)
        if (!this.Form[comp].prop.Valid) {
          return;
        } // Si es un dato no esta  validado

        // asignamos variables de memoria
        if (this.Form[comp].prop.Type == "numeric")
          m[comp] = +this.Form[comp].prop.Value;
        else m[comp] = this.Form[comp].prop.Value;
      }
    }

    // Leemos datos de la tabla de actualizacion. Envia las variables m
    const data = await this.Form.db.use(RecordSource, m);

    if (!data || data == "400") {
      return false;
    } // Hubo error al leer los datos

    this.prop.Valid = true;

    if (data.length == 0) {
      // No tiene registros

      console.log("Grid valid no tiene registros ", this.Name);
      await this.appendRow(m);
    }
    //    this.prop.RecordSource=RecordSource
    this.prop.Visible = true;
    ///////////////////
    console.log("Grid Valid ", this.prop);

    return this.prop.Valid;
  }

  ////////////////////////////////////////
  // Metodo : Valid Column
  // Descripcion : Valida una columna. Si es un campo key y si no esta repetido en la forma
  /////////////////////////////////////////////////////

  public async validColumn(name: string) {
    const column = this[name];

    this.prop.Valid = true;

    if (this.prop.updateKey) {
      console.log("Column valid updateKey ", column);
      this.Parent.prop.Valid = false;
      if (
        typeof column.prop.Value == "string" &&
        column.prop.Value.trim().length == 0
      ) {
        column.prop.ErrorMessage = "No permite datos en blanco";
        column.prop.ShowError = true;
        column.prop.Valid = false;
      }
      if ((await this.Parent.ValidKey()) == false) {
        column.prop.ErrorMessage = "Dato duplicado";
        column.prop.ShowError = true;
        column.prop.Valid = false;
      }
    }
    return this.prop.Valid;
  }

  async validKey() {
    if (this.prop.Valid) return true;

    const db = this.Form.db;
    const View = db.View[this.Parent.prop.RecordSource];
    const Recno = View.Recno;
    let where = " where ";
    for (let i = 0; i < this.elements.length; i++) {
      const column = this.elements[i].Name;
      if (this[column].prop.updateKey) {
        if (!this[column].Valid) return true;

        const comillas = this[column].prop.Type == "numeric" ? "" : "'";
        where =
          where +
          this[column].prop.ControlSource.trim() +
          "=" +
          comillas +
          this[column].prop.Value +
          comillas +
          " and ";
      }
    }
    where = where + ` recno<>${Recno} `;
    const select = `select exists(select recno from ${this.Parent.prop.RecordSource} ${where})`;
    console.log("Grid select exists=", select);

    const data = await db.localSql(select);
    console.log("Grid ", data);
    if (data[0].exists) this.prop.Valid = false;
    else this.prop.Valid = true;

    return this.prop.Valid;
  }

  /////////////////////////////////////////////////////
  // asignaRenglon
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon(row: number, colName: string) {
    //   console.log('asignaRenglon row ',row,this.Form.db.View[this.prop.RecordSource].recnoVal)
    //    if (row>this.Form.db.View[this.prop.RecordSource].recnoVal.length-1)
    //      row=this.Form.db.View[this.prop.RecordSource].recnoVal.length-1

    this.Row = row;
    console.log("Grid asignaRenglon ", this);
    this[colName].prop.First = true;

    //nextTick(() =>
    //    this.Row=row
    // )
  }

  ///////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(m?: {}) {
    if (!m) m = {};

    this.Row = -1; // Quitamos donde esta el renglon
    //this.Form.db.select(this.prop.RecordSource)
    const values = await this.Form.db.appendBlank(this.prop.RecordSource, m); //Incertamos un renglon en blanco
    this.prop.Valid = false;

    console.log(
      "grid Incertaremos renglon=======>",
      this.prop.RecordSource,
      "View=",
      this.Form.db.View[this.prop.RecordSource]
    );

    //this[this.elements[0].Name].prop.First=true
  }

  //////////////////////////
  // Borra renglon
  // row: renglon a borrar
  /////////////////////////
  async deleteRow(recno: number) {
    await this.Form.db.delete(
      recno,
      this.prop.RecordSource,
      this.prop.SqlUpdate
    );
    this.Row = -1;
    //await this.asignaRenglon(recno)
  }

  //////////////////////////////////
  // Graba Tabla
  // vis_cap: Vista de captura
  /////////////////////////////////
  async grabaTabla() {
    let resultado = true;

    //resultado =
    if ((await MessageBox(this.prop.messageUpdate, 4, "")) != 6) return false;

    this.Form.prop.Visible = false;

    resultado = await this.Form.db.tableUpdate(
      1,
      false,
      this.prop.RecordSource
    );
    if (resultado) {
      // Actualiza todos los registros
      MessageBox("Datos grabados");
    } else {
      MessageBox("No se grabaron los datos", 16, "ERROR");
    }
    return resultado;
  }

  //////////////////////////////////
  // Graba Renglon
  //
  /////////////////////////////////
  async grabaRenglon() {
    let resultado = 0;
    resultado = await MessageBox(this.prop.messageUpdate, 4, "");
    console.log("bt_aceptar Messagebox resultado", resultado);

    this.Form.prop.Visible = false;

    if (
      (await this.Form.db.tableUpdate(1, false, this.prop.RecordSource)) == true
    ) {
      // Actualiza todos los registros
      MessageBox("Datos grabados");
      return true;
    } else {
      MessageBox("No se grabaron los datos", 16, "ERROR");
      return false;
    }
  }
}
