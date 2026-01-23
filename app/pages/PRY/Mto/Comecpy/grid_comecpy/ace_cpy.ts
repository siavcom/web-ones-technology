//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : ace_cpy
// Destription : Aceptacion del cliente A=Aceptada E=Espera,C=Cancelada
// @author: El Fer Blocks
// Creation : 2025-02-23
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class ace_cpy extends COLUMN {
  constructor() {
    super()
    this.prop.ColumnTextLabel = 'Cotización '
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.ace_cpy'
    this.prop.Capture = true
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Aceptada",
        "Espera",
        "No ACEPTADA"
      ],
      ["A", "E", "N"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.style.width = '74px'
    this.prop.ColumnWidths = '80px,5px'

    //this.inputStyle.width = '124px'
  }
  override async when() {

    if (this.Form.est_pry.prop.Value != 'AU') {
      this.prop.ReadOnly = true
      return !this.prop.ReadOnly
    }


    const m = this.Sql.scatter(['est_cpy'], 'vi_cap_comecpy')

    if (m.est_cpy == 'B')  // Si esta bloqueado no se puede aceptar
      this.prop.ReadOnly = true
    else
      this.prop.ReadOnly = true

    return !this.prop.ReadOnly
  }


  /**
   * When the value of this component changes, this method is called.
   * It recieves an optional parameter styles, which is the styles of the component (style,inputStyle,labelsStyle).
   * If it is not provided, it uses the component styles of the object.
   * The method changes the color of the input depending on the value selected.
   * A = green, B = red, X = blue.
   * @param {any} styles - The style of the component.
   */
  override async onChangeValue(styles?: any) {

    const Styles = !styles ?
      {
        inputStyle: this.inputStyle,
        style: this.style,
        captionStyle: this.captionStyle
      } : styles.value


    switch (this.prop.Value) {
      case 'A': {
        Styles.inputStyle.color = 'green'
        break
      }
      case 'N': {
        Styles.inputStyle.color = 'red'
        break
      }
      case 'E': {
        Styles.inputStyle.color = 'blue'
        break
      }
    }


  }

}



