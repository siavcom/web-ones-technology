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
    this.prop.Visible = false;

    this.prop.addButton = true; // Estos componentes estan en grid.vue
    this.prop.deleteButton = true;
    this.prop.saveData = true;
    this.prop.updated = false;
    this.prop.messageUpdate = "Grabamos la tabla";

    this.style.width = "max-content"; // "95%";
    this.style.minHeight = "150px";
    this.style.height = "max-content";
    this.Recno = 0;
  }

  ////////////////////////////////////////
  // Metodo : Valid
  // Descripcion : si el autoLoad= true, valida los datos de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  public async valid(): Promise<boolean> {
    console.log("Grid Valid autoload", this.prop);
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
          return false;
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

    if (column.prop.updateKey) {
      console.log("Column valid updateKey ", column);
      if (
        typeof column.prop.Value == "string" &&
        column.prop.Value.trim().length == 0
      ) {
        column.prop.ErrorMessage = "No permite datos en blanco";
        column.prop.ShowError = true;
        column.prop.Valid = false;
        return false;
      }
      if (!(await this.validKey(name, column.Recno))) {
        column.prop.ErrorMessage = "Dato duplicado";
        column.prop.ShowError = true;
        column.prop.Valid = false;
        return false;
      }
    }
    return true;
  }

  async validKey(name: string, Recno: number) {
    //  if (this.prop.Valid) return true;
    console.log("validKeys Recno=", Recno);
    //const View = this.Form.Sql.View[this.prop.RecordSource];

    let where = " where ";
    for (let i = 0; i < this.elements.length; i++) {
      const column = this.elements[i].Name;
      console.log("Grid  validKeys column=", column, " where=", where);
      if (this[column].prop.updateKey) {
        if (name != column && !this[column].Valid) return true;

        const comillas = this[column].prop.Type == "numeric" ? "" : "'";
        where =
          where +
          "trim(" +
          this[column].prop.ControlSource.trim() +
          ")=" +
          comillas +
          this[column].prop.Value +
          comillas +
          " and ";
      }
    }
    where = where + ` recno<>${Recno} `;
    const select = `select count(recno) as existe from ${this.prop.RecordSource} ${where} `;

    const data = await this.Sql.localSql(select);

    if (data[0].existe && data[0].existe >= 1) return false;

    return true;
  }

  /////////////////////////////////////////////////////
  // asignaRenglon
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon(row: number, colName: string) {
    //    if (row>this.Form.db.View[this.prop.RecordSource].recnoVal.length-1)
    //      row=this.Form.db.View[this.prop.RecordSource].recnoVal.length-1

    for (let i = 0; i < this.main.length; i++) {
      this[this.main[i]].prop.ReadOnly = false;
    }

    this.Row = row;

    nextTick(() => {
      // console.log("asignaRenglon row ", row, " Columna=", colName);
      this[colName].prop.First = true;
    });
  }

  ///////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(mem?: {}) {
    this.prop.Disabled = true;
    //this.Row = -1;

    this[this.main[this.main.length - 1]].prop.Last = true;

    if (!mem) mem = {};

    const { ...m } = mem;

    // Leemos variables publicas
    for (const variable in this.Form.publicVar)
      m[variable] = this.Form.publicVar[variable];

    // leemos valores de los componentes de la forma

    // for (const i in this.Form.main)
    // Forma principal de captura. Los valores de los componentes de captura se pasan a memoria
    for (const comp of this.Form.main) m[comp] = this.Form[comp].prop.Value;

    //this.Form.db.select(this.prop.RecordSource)

    const values = await this.Form.db.appendBlank(this.prop.RecordSource, m); //Incertamos un renglon en blanco
    /*console.log(
      "grid appendRow rows ",
      await this.Form.db.localAlaSql(`select * from ${this.prop.RecordSource}`)
    ); */
    this.prop.Disabled = false;
    this.Row = -10; // Ponemos en -10 para refrescar la pagina
    // this[this.main[0]].prop.First = true;
    //    this.prop.Valid = false;
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
      MessageBox("Datos actualizados correctamente de " + this.prop.textLabel);
    } else {
      MessageBox(
        "No se grabaron los datos de la tabla =" + this.prop.RecordSource,
        16,
        "ERROR"
      );
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
      MessageBox("Renglon actualizado correctamente");
      return true;
    } else {
      MessageBox(
        "No se grabó el reglon de la tabla =" + this.prop.RecordSource,
        16,
        "ERROR"
      );
      return false;
    }
  }
}
