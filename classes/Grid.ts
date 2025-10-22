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
  Column = ""; // Columna actual
  // autoLoad=false
  // declare variable:string='Hola'

  //elements = [{}]
  rowStyleActive = {
    backgroundColor: 'antiquewhite'
  }

  rowStyleInactive = {
    backgroundColor: 'aliceblue' //'darkgray'   //'white' //
  }

  constructor() {
    super();
    //this.Name = "Grid";
    this.prop.ColumnCount = 1;
    this.prop.BaseClass = "grid";
    this.prop.Capture = false;
    this.prop.RecordSource = "";
    this.prop.Row = 0;
    this.prop.Caption = "Grid de datos";
    this.prop.SqlUpdate = false; //Si es verdadero actualiza automaticamente
    this.prop.addRow = true; // Si es verdadero aumenta renglon automaticamente
    this.prop.Visible = false;

    this.prop.showAddButton = true; // Si es verdadero muestra el boton de agregar
    this.prop.showDeleteButton = true; // Si es verdadero muestra el boton de borrar
    this.prop.showSaveButton = true; // Si es verdadero muestra el boton de grabar
    this.prop.autoUpdate = false; // Si es verdadero actualiza automaticamente
    this.prop.UpdateMessage = "Grabamos la tabla";
    this.prop.DeleteMessage = "Borramos renglon";
    this.prop.ErrorMessage = 'Datos no actualizados'
    this.prop.OkMessage = 'Actualización exitosa'
    this.prop.headerHeight = "30px";
    this.prop.Rows = 10;   // renglones de la grid por defecto

    this.style.width = '-moz-available' //"max-content"
    //this.style.minHeight = "120px";
    this.style.minHeight = "fit-content";
    this.style.height = "max-content";
    this.Recno = 0;

    //  this.prop.Messages[0] = "Actualizamos la tabla";
    //  this.prop.Messages[1] = "Actualizamos el renglon";
    // this.prop.Messages[2] = "Datos actualizados ";
    //this.prop.Messages[3] = "Datos no actualizados  ";
    //this.prop.Messages[4] = "Renglon no actualizado ";

    //this.prop.Messages[6] = "No permite datos en blanco";
    //this.prop.Messages[7] = "Dato duplicado";

  }

  override async init(): Promise<void> {
    this.rowStyleInactive = this.Form.mainStyle.backgroundColor
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
  public override async valid(): Promise<boolean> {

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
    //  console.log("Grid Valid ", this.prop);

    return this.prop.Valid;
  }

  ////////////////////////////////////////
  // Metodo : Valid Column
  // Descripcion : Valida una columna. Si es un campo key y si no esta repetido en la forma
  /////////////////////////////////////////////////////

  public async validColumn(refColumn: void): Promise<boolean> {
    //const column = this[name];
    //   console.log("Column valid refColumn=", refColumn)
    const column = refColumn.value

    if (column.prop.updateKey) {

      if (
        typeof column.prop.Value == "string" &&
        column.prop.Value.trim().length == 0
      ) {

        return false;
      }
      if (!(await this.validKey(column.prop.name, column.Recno))) {
        //column.prop.ErrorMessage = this.prop.Messages[7];
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




  /*
  /////////////////////////////////////////////////////
  // asignaRenglon
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon_old(row: number, colName: string) {
   
    this.Row = row;

    nextTick(() => {
      //  console.log("Grid.ts asignaRenglon row ", row, " Columna=", colName, this[colName].prop.BaseClass);

      this[colName].prop.Focus = true;
   
    });
  }

*/

  ////////////////////////////////
  // Aumenta la pila de eventos a ejecutar de la forma principal
  // En caso que hay una estatus de un componente
  // no ejecuta el evento
  /////////////////////////////////
  //const asignaRenglon = (newEvento: string) => {
  public async asignaRenglon_new(Row: number, ColumnName: string) {
    ColumnName = ColumnName.trim();
    if (this.Row >= 0) { // Si hay un renglon seleccionado, checa las validaciones
      //   console.log('asignaRenglon LocalAla=', await localAlaSql(`select  * from ${This.prop.RecordSource} `))
      /*
            for (const columna of this.elements) {
      
              if (!this[columna.Name].prop.Valid)
                return this[columna.Name].setFocus() // Se posiciona el cursor en el componente no validado
            }
      */

    }
    this.Row = Row;
    this.Column = ColumnName
    this[ColumnName].prop.Focus = true; // Establece el foco en la columna seleccionada
    console.log('asignaRenglon ColumnaName =', ColumnName, this[ColumnName].prop.Focus)

    //  console.log('asignaRenglon ColumnaName =', ColumnName, this[ColumnName].prop)

  }

  ///////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(mem?: {}) {
    if (this.prop.RecordSource.length < 3)
      return

    this.prop.Disabled = true;

    //this.Row = -1;

    this[this.main[this.main.length - 1]].prop.Last = true;

    if (!mem) mem = {};

    let m = appendM(mem, this.Form.mPublic)

    for (const comp of this.Form.main) {
      if (!m[comp])
        m[comp] = this.Form[comp].prop.Value;

    }
    // select(this.prop.RecordSource)

    const values = await appendBlank(this.prop.RecordSource, m); //Incertamos un renglon en blanco
    console.log('Append Row this.prop RecordSource= ', this.prop.RecordSource, '  ', await localAlaSql(`select  * from ${this.prop.RecordSource} `))
    this.prop.Disabled = false;

    this.Row = -10; // Ponemos en -10 para refrescar la pagina con el renglon insertado
  }

  //////////////////////////
  // Borra renglon
  // recno: renglon a borrar
  // force: si es verdadero borra sin preguntar
  /////////////////////////
  async deleteRow(recno: number, force?: boolean) {

    // borramos el renglon?
    if (force || await MessageBox(this.prop.DeleteMessage, 4, '') == 6) {
      this.prop.Status = 'A'
      const result = await deleteSqlRow(recno, this.prop.RecordSource);
      console.log('deleteRow result=', result)
      // await restableceStatus()
      if (result)
        this.Row = -1;

    }
    return result
  }



  /*
    async saveRow() {
      await this.saveTable(true)  // solo graba el renglon actual
    }
  */
  //////////////////////////////////
  // Graba Tabla
  // vis_cap: Vista de captura
  /////////////////////////////////
  async saveTable(oneRow?: boolean) {

    if (oneRow == undefined)
      oneRow = false

    let resultado = true;

    let updateType = 1;  // actualiza todos los registros
    if (oneRow) {
      updateType = 0;  // actualiza solo el renglon actual
    }

    /*
        for (let i = 0; i < this.main.length; i++) { // Recorre todos los estatus del grid
    
          if (this[this.main[i]].prop.Capure && !this[this.main[i]].prop.Valid) { // Si alguno no esta Validado
            this[this.main[i]].prop.ShowError = true
    
            this[This.main[i]].setFocus()
            return
          }
        }
    */

    if (updateType) {
      if (await MessageBox('', 4, this.prop.UpdateMessage) != 6)
        return false;
    }
    else {
      if (await MessageBox('', 4, this.prop.Messages[1]) != 6)
        return false;
    }

    this.Form.prop.Visible = false;
    resultado = await tableUpdate(
      updateType,
      false,
      this.prop.RecordSource
    );
    if (resultado)  //actualizacion con exito
      MessageBox(this.prop.OkMessage);

    else {

      MessageBox(this.prop.ErrorMessage + this.prop.RecordSource, 16, "ERROR");

      return false;
    }
    this.Row = -1
    return resultado;
  }

  //////////////////////////////////
  // Graba Renglon
  //
  /////////////////////////////////
  async saveRow(columnName?: string) {

    const resultado = await tableUpdate(
      0,
      false,
      this.prop.RecordSource
    );
    if (resultado)  //actualizacion con exito
      await MessageBox(this.prop.OkMessages);
    else
      return false;
    /*
    
    {
      //    MessageBox(this.prop.Messages[4] + this.prop.RecordSource, 16, "ERROR");
      if (columnName) {
        const Este = this[columnName]
        Este.prop.Valid = false
        nextTick(() => {
          Este.setFocus()
        })
      } //fin columnName
    } //Fin else
  */
    return true;
  }
}