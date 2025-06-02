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
    this.prop.Capture = false;
    this.prop.RecordSource = "";
    this.prop.Row = 0;
    this.prop.Caption = "Grid de datos";
    this.prop.SqlUpdate = false; //Si es verdadero actualiza automaticamente
    this.prop.Visible = false;

    this.prop.addButton = true; // Estos componentes estan en grid.vue
    this.prop.deleteButton = true;
    this.prop.saveButton = true;
    this.prop.updated = false;
    this.prop.messageUpdate = "Grabamos la tabla";
    this.prop.messageDelete = "Borramos renglon";
    this.prop.headerHeight = "30px";

    this.style.width = '-moz-available' //"max-content"
    this.style.minHeight = "150px";
    this.style.height = "max-content";
    this.Recno = 0;

    this.prop.Messages = [
      ["Actualizamos la tabla"], // 0
      ["Actualizamos el registro"], // 1
      ["Datos actualizados de la tabla"], //2 ["Data updated of "], // 3
      ["Datos no actualizados de la tabla "], //3 No se grabaron los datos de la tabla"], // 4
      ["Registro no actualizado de la tabla "], // 4
      ['Borramos el reglon '], //5
    ];
  }

  ////////////////////////////////////////
  // Metodo : Valid
  // Descripcion : si el autoLoad= true, valida los datos de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  /**
   * Verifica si el Formulario esta validado.
   * Si el AutoLoad es verdadero, Valida los datos de la forma.
   * Si es un dato nuevo, manda refrescar la forma para permitir su captura.
   * Si no es un dato nuevo: Muestra los datos para permitir su modificacion
   * @returns {Promise<boolean>} Verdadero si el formulario esta validado
   */
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
          return false;
        } // Si es un dato no esta  validado

        // asignamos variables de memoria
        if (this.Form[comp].prop.Type == "number")
          m[comp] = +this.Form[comp].prop.Value;
        else m[comp] = this.Form[comp].prop.Value;
      }
    }

    // Leemos datos de la tabla de actualizacion. Envia las variables m

    // console.log("Grid Valid autoload", RecordSource);
    const data = await use(RecordSource, m);

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

        const comillas = this[column].prop.Type == "number" ? "" : "'";
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
  public async asignaRenglon_old(row: number, colName: string) {
    //    if (row>this.Sql.db.View[this.prop.RecordSource].recnoVal.length-1)
    //      row=this.Sql.db.View[this.prop.RecordSource].recnoVal.length-1
    //let sw_recno = false
    /*
        for (let i = 0; i < this.main.length; i++) {
          this[this.main[i]].prop.ReadOnly = false;
          
        }
    */
    this.Row = row;

    nextTick(() => {
      //  console.log("Grid.ts asignaRenglon row ", row, " Columna=", colName, this[colName].prop.BaseClass);

      this[colName].prop.Focus = true;
      /*
            if (this[colName].prop.BaseClass == 'imgButton')
              this[colName].click()
            else
              this[colName].prop.First = true;
      */
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
    for (const variable in this.Form.mPublic)
      m[variable] = this.Form.mPublic[variable];

    // leemos valores de los componentes de la forma

    // for (const i in this.Form.main)
    // Forma principal de captura. Los valores de los componentes de captura se pasan a memoria
    for (const comp of this.Form.main) {
      if (!m[comp])
        m[comp] = this.Form[comp].prop.Value;

    }
    // select(this.prop.RecordSource)

    console.log('2) appendRow comedat m=', m)
    const values = await appendBlank(this.prop.RecordSource, m); //Incertamos un renglon en blanco
    this.prop.Disabled = false;

    this.Row = -10; // Ponemos en -10 para refrescar la pagina con el renglon insertado
  }

  //////////////////////////
  // Borra renglon
  // row: renglon a borrar
  /////////////////////////
  async deleteRow(recno: number) {
    if (await MessageBox(this.prop.Messages[5][0], 4, '') == 6) {

      this.prop.Status = 'A'
      await deleteRow(recno, this.prop.RecordSource);
      // await restableceStatus()
      this.Row = -1;
      // load_data = true

    }
  }
  //////////////////////////////////
  // Graba Tabla
  // vis_cap: Vista de captura
  /////////////////////////////////
  async grabaTabla() {
    let resultado = true;

    /*
        for (let i = 0; i < this.main.length; i++) { // Recorre todos los estatus del grid
    
          if (this[this.main[i]].prop.Capure && !this[this.main[i]].prop.Valid) { // Si alguno no esta Validado
            this[this.main[i]].prop.ShowError = true
    
            this[This.main[i]].setFocus()
            return
          }
        }
    */

    if ((await MessageBox(this.prop.Messages[0][0], 4, "")) != 6) return false;

    this.Form.prop.Visible = false;
    resultado = await tableUpdate(
      1,
      false,
      this.prop.RecordSource
    );
    if (resultado) {
      // Actualiza todos los registros
      MessageBox(this.prop.Messages[2][0] + this.prop.Caption);
    } else {
      MessageBox(
        this.prop.Messages[3][0] + this.prop.RecordSource,
        16,
        "ERROR"
      );
    }
    this.Row = -1
    return resultado;
  }

  //////////////////////////////////
  // Graba Renglon
  //
  /////////////////////////////////
  async grabaRenglon() {

    for (let i = 0; i < this.main.length; i++) { // Recorre todos los estatus del grid

      if (this[this.main[i]].prop.Capure && !this[this.main[i]].prop.Valid) { // Si alguno no esta Validado
        this[this.main[i]].prop.ShowError = true

        this[this.main[i]].setFocus()
        return
      }
    }
    //if (await MessageBox(this.prop.messageUpdate, 4, "") != 6) return
    this.Form.prop.Visible = false;

    if (
      (await tableUpdate(1, false, this.prop.RecordSource)) == true
    ) {
      // Actualiza todos los registros
      // MessageBox("Renglon actualizado correctamente");
      return true;
    } else {
      MessageBox(
        this.prop.Messages[5][0] + this.prop.RecordSource,
        16,
        "ERROR"
      );
      return false;
    }
  }
}
