//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : med_mov
// Description : Medida
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";
export class med_mov extends COLUMN {
  med_mov = []
  cla_isu = ''
  old_value = ''
  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Unidad' // Column Header
    this.prop.Placeholder = 'Unidad a cotizar '
    this.prop.ControlSource = 'vi_cap_comecpy.uni_mov'
    this.prop.Capture = true
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 1;
    this.style.maxWidth = "58px";
    this.inputStyle.maxWidth = "44px";
    this.prop.Value = ''

  }
  async when() {

    if (this.Parent.isi_cpy.prop.Value != 'S') {
      this.prop.ReadOnly = true
      this.prop.Valid = true
      this.Parent.cla_isu.prop.Valid = true
      return false
    }


    //this.prop.BaseClass = 'comboBox'
    const res = await this.Sql.localAlaSql(`select cla_isu,uni_mov,med_mov from vi_cap_comecpy where recno=${this.Recno}`)
    const ins_sql =
      `select un3_isu as med_isu,3 as uni_isu from vi_cap_comecpy where recno=${this.Recno} and un3_isu>'   '  union \
       select un2_isu as med_isu,2 as uni_isu from vi_cap_comecpy where recno=${this.Recno} and un2_isu>'   ' union \
       select un1_isu as med_isu,1 as uni_isu from vi_cap_comecpy where recno=${this.Recno}  `


    if (res[0].cla_isu != this.cla_isu) {
      this.prop.Value = res[0].uni_mov  // asignamos nuevo valor
      this.old_value = 1

      this.prop.RowSourceType = 0;
      this.Parent.detail_vta.modal_vta.med_mov.prop.RowSourceType = 0
      this.Parent.detail_com.modal_com.med_mov.prop.RowSourceType = 0

      this.prop.BaseClass = 'comboBox'
      this.Parent.detail_vta.modal_vta.med_mov.prop.BaseClass = 'comboBox'
      this.Parent.detail_com.modal_com.med_mov.prop.BaseClass = 'comboBox'


      // this.med_mov = await SQLExec(ins_sql)


      this.prop.RowSource = ins_sql
      this.Parent.detail_vta.modal_vta.med_mov.prop.RowSource = ins_sql
      this.Parent.detail_com.modal_com.med_mov.prop.RowSource = ins_sql

      //  this.Parent.detail_vta.modal_vta.med_mov.prop.RowSource = ins_sql

      this.med_mov = await this.Sql.localAlaSql(ins_sql)
      this.cla_isu = res[0].cla_isu
      /*
            if (this.prop.Value.trim().length == 0) {
              this.prop.Value = this.med_mov[0].med_isu
              this.old_value = 1
              return true
            }
      */

      this.Parent.detail_vta.modal_vta.med_mov.med_mov = this.med_mov  // arreglo de medidas
      this.Parent.detail_vta.modal_vta.med_mov.prop.Value = this.prop.Value
      //this.Parent.detail_vta.modal_vta.med_mov.cla_isu=this.cla_isu

      this.Parent.detail_com.modal_com.med_mov.med_mov = this.med_mov // arreglo de medidas
      this.Parent.detail_com.modal_com.med_mov.prop.Value = this.prop.Value
      //  this.Parent.detail_com.modal_com.med_mov.cla_isu

      this.prop.RowSourceType = 4;
      this.Parent.detail_vta.modal_vta.med_mov.prop.RowSourceType = 4
      this.Parent.detail_com.modal_com.med_mov.prop.RowSourceType = 4
      return
    }

    // recorre el array de medidas para asignar el valor old_value



    // recorre el array de medidas para asignar el valor old_value
    for (const row in this.med_mov) {

      if (this.med_mov[row].med_isu == this.prop.Value) {
        this.old_value = this.med_mov[row].uni_isu
        return
      }
    }

    return
  }
  async insteractiveChange() {
    for (const row in this.med_mov) {
      if (this.med_mov[row].med_isu == this.prop.Value) {

        const medida = this.med_mov[row].uni_isu
        await this.Sql.localAlaSql(`update vi_cap_comecpy set med_mov=${medida},uni_mov=${this.prop.Value} where recno = ${this.Recno}`)

        break
      }
    }

    const old_data = await this.Sql.scatter(['med_mov', 'mon_mov', 'pve_mov'], 'vi_cap_comecpy')
    old_data['med_mov'] = this.old_value

    await this.Form.grid_comecpy.cla_isu.valid(old_data)

    for (const row in this.med_mov) {

      if (this.med_mov[row].med_isu == this.prop.Value) {
        this.old_value = this.med_mov[row].uni_isu
      }
    }

    if (this.Parent.detail_vta.modal_vta.med_mov.prop.Value != this.prop.Value)
      this.Parent.detail_vta.modal_vta.med_mov.prop.Value = this.prop.Value
    if (this.Parent.detail_com.modal_com.med_mov.prop.Value != this.prop.Value)
      this.Parent.detail_com.modal_com.med_mov.prop.Value = this.prop.Value

    return true
  }




}
