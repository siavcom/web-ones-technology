//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : COLUMN
// BaseClass : Component
// Description : Porcentaje de ganancia en ventas
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class pga_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Ganancia'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.pga_cpy'
    this.prop.Value = 0
    this.prop.Min = "-99"
    this.prop.Max = "999.999"
    this.prop.Currency = "%"
    this.prop.MaxLength = 9
    this.prop.Decimals = 3
    this.prop.Capture = true
    this.inputStyle.width = "64px"
  }

  override async when(): Promise<boolean> {
    if (this.prop.Value == 0)
      this.prop.Value = +this.Sql.View.vi_cap_comecpy.est_tabla.pga_cpy.val_def

    if (this.Form.grid_comecpy.isi_cpy.prop.Value == 'E') {
      this.prop.ReadOnly = false
      return !this.prop.ReadOnly

    }


    if (this.Parent.ptc_cpy.prop.Value <= 0) {
      this.prop.ReadOnly = true
      this.Parent.est_cpy.prop.Value = 'B'
    }
    else
      this.prop.ReadOnly = false
    return !this.prop.ReadOnly
  }

  public override onChangeValue(styles?: any) {
    if (this.Form.grid_comecpy.isi_cpy.prop.Value == 'E' && this.Parent.pec_cpy)
      return this.Parent.pec_cpy.onChangeValue()

  }

  override async valid(pga_cpy?: number, sw_tca?: number) {

    if (this.Form.grid_comecpy.isi_cpy.prop.Value == 'E')
      return true

    if (!sw_tca)
      sw_tca = 0

    // Lee dato default
    const val_min = +this.Sql.View.vi_cap_comecpy.est_tabla.pga_cpy.val_def

    if (!pga_cpy) {
      this.Parent.pve_mov.prop.Value = this.Parent.ptc_cpy.prop.Value * ((100 + this.prop.Value) / 100)
      this.Parent.mon_mov.prop.Value = this.Parent.moc_cpy.prop.Value
    }
    else
      this.prop.Value = roundTo(pga_cpy, 5)



    if (sw_tca == 0) {
      if (this.prop.Value < val_min)
        this.Parent.est_cpy.prop.Value = 'B'
      //await this.Sql.localAlaSql(`update vi_cap_comecpy set est_cpy='B' where recno=${this.Recno}`)
      else
        this.Parent.est_cpy.prop.Value = 'X'
      //  await this.Sql.localAlaSql(`update vi_cap_comecpy set est_cpy='X' where recno=${this.Recno}`)
    }
    else
      this.Parent.est_cpy.prop.Value = 'X'

    return true
  }
  // Validacion cuando es una lista externa de precios
  async valid_lista_externa(): Promise<boolean> {
    const Public = this.Form.mPublic
    const val_mon = [0, Public.va1_pge, Public.va2_pge, Public.va3_pge, Public.va4_pge, Public.va5_pge]

    const m = await this.Sql.scatter(['mon_cpy', 'pec_cpy', 'mon_mov'], 'vi_cap_comecpy')

    let pve_mov = m.pec_cpy * ((this.prop.Value + 100) / 100) // calculamos el precio de venta en moneda de compra
    pve_mov = pve_mov * val_mon[m.moc_cpy] / val_mon[m.mon_mov]  // Queda en moneda de compra
    this.Parent.pve_mov.prop.Value = pve_mov  // actualizamos el precio de venta

    return true
  }
}

