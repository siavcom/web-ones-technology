//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : est_dpy
// Destription : Estatus de la partida de cotizacion A=Autorizado,B=Bloqueado
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class est_cpy extends COLUMN {
  constructor() {
    super()
    this.prop.ColumnTextLabel = '% ganancia '
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.est_cpy'
    this.prop.Capture = true
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Autorizado",
        "Bloqueado",
        "En rango"
      ],
      ["A", "B", "X"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Disabled = true
    this.style.width = '74px'
    this.prop.ColumnWidths = '80px,5px'

    //this.inputStyle.width = '124px'
  }

  override async init() {
    this.inputStyle.color = 'green'

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
      case 'B': {
        Styles.inputStyle.color = 'red'
        break
      }
      case 'X': {
        Styles.inputStyle.color = 'blue'
        break
      }
    }


  }

}



