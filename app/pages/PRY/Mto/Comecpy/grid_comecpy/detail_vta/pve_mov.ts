//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Description : PRECIO DE VENTA
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class pve_mov extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Precio de venta' // Column Header
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.pve_mov'
    this.prop.Min = "0"
    this.prop.Max = "2147483647"
    this.prop.MaxLength = 12

    this.prop.Capture = true
    this.prop.ErrorMessage = 'Precio inválido'
    this.inputStyle.width = "92px"

  }
  override async init() {
    this.prop.Decimals = this.Form.mPublic.dcp_pge
  }
  override async when() {

    const m = await this.Sql.scatter(['mon_mov', 'moc_cpy'], 'vi_cap_comecpy')
    if (m.mon_mov == 0) {
      m.mon_mov = 1
      if (this.Parent.mon_mov)
        this.Parent.mon_mov.prop.Value = m.mon_mov
    }
    if (m.moc_cpy == 0) {
      m.moc_cpy = 1
      if (this.Parent.moc_cpy)
        this.Parent.moc_cpy.prop.Value = m.moc_cpy

    }

    if (this.Form.grid_comecpy.isi_cpy.prop.Value == 'E')
      return true

    const data_old = await this.Sql.scatter(['cla_isu', 'med_mov', 'mon_mov', 'pve_mov', 'key_pri'], 'vi_cap_comecpy')


    if (data_old.key_pri == 0 || +this.prop.Value == 0)  // es un registro nuevo o valor 0
      await this.Form.grid_comecpy.cla_isu.valid(data_old)
    else
      await this.Form.obtInsumo(data_old.cla_isu.trim())


    return true

  }

  override async keyPress() {

    if (this.Form.grid_comecpy.isi_cpy.prop.Value == 'E')
      return true

    //const key = this.prop.Key
    let Car: string = await char(this.prop.Key)
    Car = Car.toUpperCase()
    if (Car >= 'A' && Car <= 'E') {

      let pve_mov = 0
      const cla_isu = this.Form.grid_comecpy.cla_isu.prop.Value

      // Obtenemos el valor de las monedas
      const vmo_pge = [0, 0, 0, 0, 0, 0]
      vmo_pge[1] = 1
      vmo_pge[2] = this.Form.mPublic.va2_pge
      vmo_pge[3] = this.Form.mPublic.va3_pge
      vmo_pge[4] = this.Form.mPublic.va4_pge
      vmo_pge[5] = this.Form.mPublic.va5_pge

      // Obtenemos la moneda que se pidio la cotizacion

      const d = await this.Sql.scatter(['mco_pry'], 'vi_cap_comepry')


      const mon_isu = this.Parent.mon_mov.prop.Value  // moneda en la que esta expresado este precio de venta

      switch (Car) {
        case 'A':
          pve_mov = this.Form.dat_isu[cla_isu].pv1_isu * vmo_pge[d.mco_pry] / vmo_pge[mon_isu]
          break
        case 'B':
          pve_mov = this.Form.dat_isu[cla_isu].pv2_isu * vmo_pge[d.mco_pry] / vmo_pge[mon_isu]
          break
        case 'C':
          pve_mov = this.Form.dat_isu[cla_isu].pv3_isu * vmo_pge[d.mco_pry] / vmo_pge[mon_isu]
          break
        case 'D':
          pve_mov = this.Form.dat_isu[cla_isu].pv4_isu * vmo_pge[d.mco_pry] / vmo_pge[mon_isu]
          break
        case 'E':
          pve_mov = this.Form.dat_isu[cla_isu].pv5_isu * vmo_pge[d.mco_pry] / vmo_pge[mon_isu]
          break
      }
      if (pve_mov > 0)
        this.prop.Value = pve_mov
    }

  }

  override async onChangeValue(styles?: any) {

    if (this.Form.grid_comecpy.isi_cpy.prop.Value != 'E')
      return

    const Public = this.Form.mPublic
    const val_mon = [0, Public.va1_pge, Public.va2_pge, Public.va3_pge, Public.va4_pge, Public.va5_pge]
    const m = await this.Sql.scatter(['mon_mov', 'pve_mov', 'moc_cpy', 'pec_cpy'], 'vi_cap_comecpy')
    m.pve_mov = +this.prop.Value


    if (m.pec_cpy == 0 || m.pve_mov == 0)
      return

    m.pve_mov = m.pve_mov * val_mon[m.mon_mov]   // Queda en moneda de venta
    m.pec_cpy = m.pec_cpy * val_mon[m.moc_cpy]   // Queda en moneda de cotizacion

    m.pga_cpy = roundTo(((m.pve_mov / m.pec_cpy) - 1) * 100, 3)


    if (m.pga_cpy != this.Parent.pga_cpy.prop.Value)
      this.Parent.pga_cpy.prop.Value = m.pga_cpy





  }
  override async valid() {


    const d = await this.Sql.scatter(['cla_isu', 'key_pri', 'med_mov'], 'vi_cap_comecpy')
    const cla_isu = d.cla_isu.trim()

    if (this.prop.Value <= 0)
      return false

    if (this.Parent.isi_cpy.prop.Value != 'S') { // No es un producto del siavcom
      this.Parent.pga_cpy.valid(((this.prop.Value / this.Parent.ptc_cpy.prop.Value) - 1) * 100)
      return true
    }

    if (!this.Form.dat_isu[cla_isu])
      await this.Form.obtInsumo(cla_isu)


    const m = { ...this.Form.mPublic, ...this.Form.dat_isu[cla_isu] };  // Junta los valores de Public y


    // precio minimo de venta
    //&& m.tin_tti == 'P') {

    const fac_isu = [0, 0, 0, 0]
    fac_isu[1] = 1
    fac_isu[2] = m.fa2_isu
    fac_isu[3] = m.fa3_isu

    const uni_isu1 = [0, 0, 0, 0]
    uni_isu1[1] = m.un1_isu
    uni_isu1[2] = m.un2_isu
    uni_isu1[3] = m.un3_isu

    const pve_isu = [0, 0, 0, 0, 0, 0]
    // asignamos precios de venta
    pve_isu[1] = m.pv1_isu
    pve_isu[2] = m.pv2_isu
    pve_isu[3] = m.pv3_isu
    pve_isu[4] = m.pv4_isu
    pve_isu[5] = m.pv5_isu

    const vmo_pge = [0, 0, 0, 0, 0, 0]
    vmo_pge[1] = 1
    vmo_pge[2] = m.va2_pge
    vmo_pge[3] = m.va3_pge
    vmo_pge[4] = m.va4_pge
    vmo_pge[5] = m.va5_pge



    m.prr_pro = m.prr_pro * fac_isu[d.med_mov]  // actualizamos el precio de reposicion segun su medida
    m.cst_isu = m.cst_isu * fac_isu[d.med_mov]  // actualizamos el precio de reposicion segun su medida

    // calculamos precios de venta
    // si la politica de ventas es diferente a factor de ganancia o
    for (let pre = 1; pre <= 5; pre++) {
      // pasamos a la moneda del precio capturado de venta
      if (pve_isu[pre] > 0) {
        pve_isu[pre] = pve_isu[pre] * vmo_pge[m.mon_isu] / vmo_pge[this.Parent.mon_mov.prop.Value]
        pve_isu[pre] = pve_isu[pre] * fac_isu[d.med_mov]  // actualizamos el precio segun su medida
        pve_isu[pre] = roundTo(pve_isu[pre], m.dcp_pge)
      }
    }

    m.prr_pro = m.prr_pro * vmo_pge[m.mon_isu] / vmo_pge[this.Parent.mon_mov.prop.Value]
    m.cst_isu = m.cst_isu * vmo_pge[m.mon_isu] / vmo_pge[this.Parent.mon_mov.prop.Value]

    m.prr_pro = roundTo(m.prr_pro, m.dcp_pge)
    m.cst_isu = roundTo(m.cst_isu, m.dcp_pge)

    // revisa si hay precio minimo de venta y no es un precio por contrato
    // 26/10/2009 se aumenta    && m.pmv_pge<='E'
    if ((m.pmv_pge >= 'A' && m.pmv_pge <= 'E') || m.pmv_pge == 'S' || m.pmv_pge == 'R') {

      if (m.sw_tca == 0 && (m.pmv_pge <= 'E' || m.pmv_pge == 'R')) {// no tiene claves alternas y el precio de ventas es menor al E

        if (m.pmv_pge <= 'E')
          if (this.prop.Value < pve_isu[asc(m.pmv_pge) - 64] && pve_isu[asc(m.pmv_pge) - 64] > 0) {
            this.prop.ErrorMessage = '1) Precio no valido. precio minimo permitido :$' + await numberFormat(pve_isu[asc(m.pmv_pge) - 64], '  ', 16, this.prop.Decimals)
            //await MessageBox('1)Precio no valido. precio minimo permitido :' + await numberFormat(pve_isu[asc(m.pmv_pge) - 64], 'mx', 16, 2), 16, "ERROR")
            this.prop.Value = m.pve_mov
            return false
          }
        if (pve_isu[asc(m.pmv_pge) - 64] == 0) {
          this.prop.ErrorMessage = '2) Precio no valido. No hay precio minimo permitido :$' + await numberFormat(pve_isu[asc(m.pmv_pge) - 64], '  ', 16, this.prop.Decimals)
          //await MessageBox('2) Precio no valido. No hay precio minimo permitido :' + await numberFormat(pve_isu[asc(m.pmv_pge) - 64], 'mx', 16, 2), 16, "ERROR")
          this.prop.Value = m.pve_mov
          return false

        }

        if (m.prr_pro == 0) {
          const vmo_pge = [0, 0, 0, 0, 0, 0]
          vmo_pge[1] = 1
          vmo_pge[2] = this.Form.mPublic.va2_pge
          vmo_pge[3] = this.Form.mPublic.va3_pge
          vmo_pge[4] = this.Form.mPublic.va4_pge
          vmo_pge[5] = this.Form.mPublic.va5_pge

          // Obtenemos la moneda que se pidio la cotizacion

          const d = await this.Sql.scatter(['mco_pry'], 'vi_cap_comepry')

          const mon_isu = this.Parent.mon_mov.prop.Value  // moneda en la que esta expresado este precio de venta
          m.prr_pro = this.Form.dat_isu[cla_isu].pv1_isu * vmo_pge[d.mco_pry] / vmo_pge[mon_isu]


        }


        if (m.pmv_pge == 'R' && this.prop.Value < m.prr_pro) {

          this.prop.ErrorMessage = '3) Precio no valido. precio minimo permitido :$' + await numberFormat(m.prr_pro, '  ', 16, this.prop.Decimals)
          //await MessageBox('3) Precio no valido. precio minimo permitido :' + await numberFormat(m.prr_pro, 'mx', 16, 2), 16, "ERROR")
          this.prop.Value = m.pve_mov
          return false
        }

      }

      // si hay politica de precios minimo de venta y el precio
      // minimo es igual a cero
      if (m.sw_tca == 0 && m.prr_pro >= this.prop.Value) {
        this.prop.ErrorMessage = '4) El precio de venta es menor o igual precio de reposición '
        //await MessageBox('4) El precio de venta es menor o igual precio de reposición ', 16, "ERROR")    // de'+TRANSF||M(m.prr_pro,'$###,###,###.##'))
        this.prop.Value = m.pve_mov
        return false
      }

      if (m.sw_tca == 0 && m.prr_pro > this.prop.Value && m.pmv_pge != 'N') { // si esta dentro del minimo permitido
        this.prop.ErrorMessage = 'El precio de venta es menor al precio permitido '
        //await MessageBox('El precio de venta es menor al permitido precio de reposición ', 16, "ERROR")    // de'+TRANSF||M(m.prr_pro,'$###,###,###.##'))
        this.prop.Value = m.pve_mov     //    pve_isu(asc(m.pmv_pge)-64)
        return false
      }

      if (m.sw_tca == 0 && m.cst_isu > this.prop.Value && m.pmv_pge == 'S') {
        this.prop.ErrorMessage = 'El precio de venta es menor al costo estandar '
        //await MessageBox('El precio de venta es menor al costo estandar ', 16, "ERROR")    // de'+TRANSF||M(m.prr_pro,'$###,###,###.##'))
        this.prop.Value = m.pve_mov
        return false
      }


    }
    let pga_cpy = 0

    if (m.prr_pro >= 0)
      pga_cpy = ((this.prop.Value / m.prr_pro) - 1) * 100



    this.Parent.pga_cpy.valid(pga_cpy, m.sw_tca)
    return true

    // return true
  }
  /*
    async calculo_pga_cpy() {
      const pve=this.prop.Value // Precio de venta
      const pec_cpy=this.Parent.pec_cpy.prop.Value // precio cotizado por el proveedor sin impuestos
      return  this.Parent.pga_cpy.valid((pve/pec_cpy)-1*100 )
  
  }*/
}
