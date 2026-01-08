//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tap_tap
// Description : Actividad
// Author : El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tap_tap extends COLUMN {
  key_pri = 0
  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Actividad'
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = 'vi_cap_agenda.tap_tap'
    this.prop.RowSourceType = 4;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "150px,50px";
    this.style.width = "150px";
  }
  async when() {
    if (this.Recno < 0) {
      return false
    }
    this.prop.RowSourceType = 0
    const res = await this.Sql.localAlaSql(`select key_pri,tpy_tpy from now.vi_cap_agenda where recno=${this.Recno}`)
    console.log('1) when tap_tap=', this.prop.Value, 'res=', res,);

    this.key_pri = res[0].key_pri
    const tpy_tpy = res[0].tpy_tpy
    if (this.key_pri > 1) {// si es un actividad existente, no permite cambiar
      console.log('2) when tap_tap key_pri=', this.key_pri, 'tpy_tpy=', tpy_tpy);
      this.prop.ReadOnly = true
      this.prop.RowSource = `select des_tap,tpa_tpa from now.vi_con_actividades \
      where exists(select tpy_tpy from now.tipos_proyectos where tpy_tpy='${tpy_tpy}'`

      return false
    }

    // solo lee actividades que no lleven orden 
    console.log('Actividades====>', await this.Sql.localAlaSql(`select des_tap,tpa_tpa from now.vi_con_actividades \
          where tpy_tpy='${tpy_tpy}' and ord_tap=0`))

    // this.prop.RowSource = `select des_tap,tpa_tpa from now.vi_con_actividades \
    //       where exists(select tpy_tpy from now.tipos_proyectos where tpy_tpy='${tpy_tpy}' and ord_tap=0`

    this.prop.RowSource = `select des_tap,tpa_tpa from now.vi_con_actividades \
          where tpy_tpy='${tpy_tpy}' and ord_tap=0`


    this.prop.RowSourceType = 4;
    this.prop.ReadOnly = false
    return true
  }

  async interactiveChange() {
    // es actividad de inicio
    if (this.key_pri == 0) {
      return true
    }

    const res = await this.Sql.localAlaSql(`select est_apy, tap_tap from Last.vi_cap_agenda where recno = ${this.Recno} `)
    const oldValue = res[0].est_apy
    const tap_tap = res[0].tap_tap


    if (oldValue == 'I') { // Si esta inicio y hay equipo de autorización

      const res = await this.Sql.localAlaSql(`select eqa_tap from actividades where tap_tap = '${tap_tap}' and tpy_tpy = '${this.Parent.tpy_tpy.prop.Value}'`)
      if (res[0].eqa_tap > '   ') {
        this.prop.Value = oldValue
        return false
      }

    }

    if (oldValue == 'A') {
      if (this.prop.Value = 'F' || this.prop.Value == 'R') {
        return true
      }

      this.prop.Value = oldValue
      return false

    }
  }

}
