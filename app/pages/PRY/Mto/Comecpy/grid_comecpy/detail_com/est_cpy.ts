//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : est_dpy
// Destription : Estatus de la partida de cotizacion A=Autorizado,B=Bloqueado
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class est_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Estatus '
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.est_cpy'
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Autorizado",
        "Bloqueado",
        "En rango"
      ],
      ["A", "B", "X"],
    ];
    this.inputStyle.width = '124px'
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.style.width = '212px'


  }


  async onChangeValue(styles?: any) {
    // Se paso por referencia el inputStyle


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
    // Actualiza el grid principal
    this.Form.grid_comecpy.est_cpy.prop.Value = this.prop.Value

  }



}
