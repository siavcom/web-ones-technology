//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : are_tap
// Description : Actividad en caso de reporgramar
// Author : El Fer Blocks
// Creation : 2023-12-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class are_tap extends COLUMN {
  /**
   * @description Constructor de la clase are_tap.
   * @remarks
   * Establece los valores iniciales de la propiedad de la clase.
   * La propiedad BaseClass se establece en "comboBox".
   * La propiedad ControlSource se establece en "vi_cap_cometap.are_tap".
   * La propiedad RowSourceType se establece en 4, lo que significa que la fuente de datos
   * se establecer  en una tabla de la base de datos que se encuentra en la vista vi_cap_cometap.
   * La propiedad MaxLength se establece en 3, lo que significa que la lista desplegable
   * tendr  3 columnas.
   * La propiedad BoundColumn se establece en 2, lo que significa que la columna que se
   * mostrar  en la lista desplegable ser  la segunda columna.
   * La propiedad Capture se establece en true, lo que significa que los datos de la lista
   * desplegable se guardar  en la base de datos.
   * La propiedad ColumnWidths se establece en "230px,60px,20px", lo que significa que
   * la primera columna tendr  un ancho de 230 p xels, la segunda columna tendr  un ancho
   * de 60 p xels y la tercera columna tendr  un ancho de 20 p xels.
   * La propiedad inputStyle.width se establece en "-moz-available", lo que significa que
   * el ancho de la lista desplegable ser  el ancho disponible en el navegador.
   * La propiedad style.width se establece en "220px", lo que significa que el ancho del
   * contenedor de la lista desplegable ser  de 220 p xels.
   */
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Reprogramación"; // Column Header
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.are_tap";
    this.prop.RowSourceType = 4;
    //  this.prop.RowSource =
    //    "select '..   No hay  ..' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";
    // "select des_tap,tap_tap,ord_tap from now.vi_cap_cometap union select '..   No hay  ..' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";

    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.ColumnWidths = "230px,60px,20px";
    //this.inputStyle.width = "220px";
    this.inputStyle.width = "-moz-available";
    this.style.width = "220px";

  }

  async when() {


    console.log("are_tap.when", this.Sql.View.vi_cap_cometap, 'Data=', await this.Sql.localAlaSql("select * from vi_cap_cometap"));
    if (this.Sql.View.vi_cap_cometap && this.Sql.View.vi_cap_cometap.recnoVal.length > 0)
      this.prop.RowSource =
        "select des_tap,tap_tap,ord_tap from now.vi_cap_cometap union select '..   No hay  ..' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";
    else
      this.prop.RowSource =
        "select '..   No hay  ..' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";
    return true
  }
  async init() {

    if (this.Sql.View.vi_cap_cometap && this.Sql.View.vi_cap_cometap.recnoVal.length > 0)
      this.prop.RowSource =
        "select des_tap,tap_tap,ord_tap from now.vi_cap_cometap union select '..   No hay  ..' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";
    else
      this.prop.RowSource =
        "select '..   No hay  ..' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";




  }
}
