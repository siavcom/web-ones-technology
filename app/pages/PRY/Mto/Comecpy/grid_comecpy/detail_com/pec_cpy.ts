//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : COLUMN
// BaseClass : Component
// Description : Precio cotizado por el proveedor
// Author : El Fer Blocks
// Creation : 2024-04-02
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class pec_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Precio unitario proveedor'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.pec_cpy'
    this.prop.ToolTipText = 'Precio unitario cotizado por el proveedor sin impuestos y flete'
    this.prop.Decimals = 5
    this.inputStyle.width = '92px'
    //    this.style.width = '237px'

  }


  async when() {

    const m = await this.Sql.scatter(['mon_mov', 'pga_cpy', 'moc_cpy'], 'vi_cap_comecpy')

    if (this.Parent.pga_cpy && (m.pga_cpy == 0 || m.pga_cpy == null))
      this.Parent.pga_cpy.prop.Value = +this.Sql.View.vi_cap_comecpy.est_tabla.pga_cpy.val_def
    return true
  }

  public override async onChangeValue(styles?: any) {
    if (this.Form.grid_comecpy.isi_cpy.prop.Value != 'E')  // calcula precio total cotizado
      return
    const Public = this.Form.mPublic
    const val_mon = [0, Public.va1_pge, Public.va2_pge, Public.va3_pge, Public.va4_pge, Public.va5_pge]
    const m = await this.Sql.scatter(['mon_mov', 'pga_cpy', 'moc_cpy'], 'vi_cap_comecpy')

    if (m.pec_cpy == 0)
      return

    //m.pve_mov = m.pve_mov * val_mon[m.mon_mov] / val_mon[m.moc_cpy]  // Queda en moneda de compra
    let pve_mov = this.prop.Value * ((100 + m.pga_cpy) / 100) // Calculamos el precio con la ganancia
    pve_mov = roundTo(pve_mov * val_mon[m.moc_cpy] / val_mon[m.mon_mov], 5)  // Queda en moneda de compra

    if (this.Parent.pve_mov) {

      if (pve_mov != this.Parent.pve_mov.prop.Value)
        this.Parent.pve_mov.prop.Value = pve_mov

    }
  }

  override async valid(Valid: boolean): Promise<boolean> {
    const m = await this.Sql.scatter(['pga_cpy', 'mon_mov', 'pve_mov', 'ifl_cpy', 'cfl_cpy', 'can_cpy'], 'vi_cap_comecpy')
    let cos_fle = 0


    if (m.ifl_cpy == 1) {
      cos_fle = m.cfl_cpy.Value / m.can_cpy
    }
    m.pve_mov = (this.prop.Value + cos_fle) * ((100 + m.pga_cpy) / 100) // Calcula el precio de venta
    m.mon_mov = this.Parent.moc_cpy.prop.Value  // iguala la moneda de venta
    //await this.Sql.gatter('vi_cap_comecpy', m)

    // Obtiene el valor minimo de ganancia
    const val_min = +this.Sql.View.vi_cap_comecpy.est_tabla.pga_cpy.val_def

    // si el porcentaje de ganancia es menor al valor minimo
    if (m.pga_cpy < val_min)
      this.Form.grid_comecpy.detail_com.modal_com.est_cpy.prop.Value = 'B'
    //await this.Sql.localAlaSql(`update vi_cap_comecpy set est_cpy='B' where recno=${this.Recno}`)
    else
      this.Form.grid_comecpy.detail_com.modal_com.est_cpy.prop.Value = 'X'

    // Precio de venta en el boton de precios de venta  
    this.Form.grid_comecpy.detail_vta.modal_vta.pve_mov.prop.Value = m.pve_mov

    // si se llamo desde ventas y es una lista de precios externa

    // await this.Sql.localAlaSql(`update vi_cap_comecpy set pve_mov=${m.pve_mov},mon_mov=${m.mon_mov} where recno=${this.Recno}`)
    return true
  }

}