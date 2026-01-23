
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : Container
// @class : modal_vta
// Description : Capture Grid
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { CONTAINER } from "@/classes/Container";

/////////////////////////////////////////
// Component import
//////////////////////////////////////
import { des_cpy } from "./des_cpy"
import { can_cpy } from "./can_cpy"
import { med_cpy } from "./med_cpy"

import { isi_cpy } from "./isi_cpy"

import { cla_isu } from "./cla_isu" //
import { fot_isu } from "./fot_isu";
import { dis_cpy } from "./dis_cpy";
import { des_isu } from "./des_isu" //
import { med_mov } from "./med_mov"

import { pve_mov } from "./pve_mov"
import { mon_mov } from "./mon_mov"
import { pv1_isu } from "./pv1_mov";
import { pga_cpy } from "./pga_cpy";
import { ptc_cpy } from "./ptc_cpy"; // Precio total cotizado en compras
import { moc_cpy } from "../detail_com/moc_cpy"


/*
import { de1_mov } from "./de1_mov"
import { de2_mov } from "./de2_mov"
import { de3_mov } from "./de3_mov";
import { de4_mov } from "./de4_mov";
import { de5_mov } from "./de5_mov";
*/

import { cla_tca } from "./cla_tca"
import { dea_tca } from "./dea_tca"
import { ppa_tca } from "./ppa_tca"
import { est_cpy } from "../detail_com/est_cpy"
import { img_cpy } from '../detail_com/img_cpy'
import { fvi_tca } from "./fvi_tca"

import { cla_prv } from '../detail_com/cla_prv'
import { dea_prv } from '../detail_com/dea_prv'
import { ppa_prv } from '../detail_com/ppa_prv'
import { mop_prv } from '../detail_com/mop_prv'
import { fvi_prv } from '../detail_com/fvi_prv'


import { nop_cpy } from "../detail_com/nop_cpy";
import { ted_cpy } from "../detail_com/ted_cpy";
import { pec_cpy } from "../detail_com/pec_cpy";
import { pac_cpy } from "../detail_com/pac_cpy";



//import { pga_cpy } from "./pga_cpy" // Porcentaje de ganancia

import { bt_accept } from "./bt_accept"
export class modal_vta extends CONTAINER {
  public des_cpy = new des_cpy()
  public can_cpy = new can_cpy()
  public med_cpy = new med_cpy()
  public isi_cpy = new isi_cpy() // datos del insumo

  public cla_isu = new cla_isu()
  public fot_isu = new fot_isu()
  public des_isu = new des_isu()
  public med_mov = new med_mov()

  public cla_tca = new cla_tca() // datos claves alternas por cliente
  public dea_tca = new dea_tca()
  public ppa_tca = new ppa_tca()

  public fvi_tca = new fvi_tca()

  public pv1_isu = new pv1_isu()

  public cla_prv = new cla_prv() // clave del proveedor
  public dea_prv = new dea_prv() // descripcion del inumo
  public dis_cpy = new dis_cpy() // Datos Insumo
  public img_cpy = new img_cpy() // imagen del producto del proveedor

  public ptc_cpy = new ptc_cpy() // Precio cotizado en compras
  public pec_cpy = new pec_cpy() // Precio de cotizacion
  public moc_cpy = new moc_cpy() // Moneda

  public pga_cpy = new pga_cpy() // porcentaje de ganancia
  public pve_mov = new pve_mov() // datos precio de venta
  public mon_mov = new mon_mov()

  public pac_cpy = new pac_cpy() // Paridad de cotizacion 

  public est_cpy = new est_cpy()

  public ppa_prv = new ppa_prv()
  public mop_prv = new mop_prv()
  public fvi_prv = new fvi_prv()
  public nop_cpy = new nop_cpy()
  public ted_cpy = new ted_cpy()  // tiempo de entrega en dias



  /*
    public de1_mov = new de1_mov()
    public de2_mov = new de2_mov()
    public de3_mov = new de3_mov()
    public de4_mov = new de4_mov()
    public de5_mov = new de5_mov()
  */


  //  public bt_save = new bt_save()
  public bt_accept = new bt_accept()

  constructor() {
    super()

    // this.prop.ColumnTextLabel = 'Insumo a cotizar en compras'
    this.prop.BaseClass = 'modalContainer'   //'modalContainer'
    this.prop.Visible = false
    // this.style.width = "80%";
    //this.style.height = "80%";
    this.est_cpy.prop.Disabled = true
    this.moc_cpy.prop.Disabled = true
    this.ptc_cpy.prop.Disabled = true
    this.img_cpy.prop.Disabled = true

    this.des_isu.inputStyle.width = "690px"

    // =======================<Bloque 0 >===============

    const container = this.container

    this.block[0] = structuredClone(container)
    this.block[0].component = {
      [0]: this.des_cpy,
      [1]: this.can_cpy,
      [2]: this.med_cpy,
      [3]: this.isi_cpy,  // Inusumo en ERP

    }
    console.log('block[0]', this.block[0].component)
    this.block[0].title = 'Insumos a cotizar (bloque 0)'
    // =======================<Bloque 0 Datos insumo Siavcom>=====================
    this.block[1] = structuredClone(container)

    this.block[1].component = {

      [0]: this.cla_isu,
      [1]: this.fot_isu,
      [2]: this.des_isu,
      [3]: this.med_mov,
      [4]: this.pve_mov,
      [5]: this.mon_mov,
      [6]: this.pv1_isu,
      [7]: this.pga_cpy, // porcentaje de ganancia
      [8]: this.est_cpy,  // estatus del porcentaje de ganancia

    }
    this.block[1].prop.Visible = false
    this.block[1].title = 'Insumo Siavcom (bloque 1)'


    // =======================<Bloque 2 Datos claves alternas cliente a proveedor de Siavcom >===============
    this.block[2] = structuredClone(container)

    this.block[2].component = {

      [0]: this.cla_tca,
      [1]: this.dea_tca,
      [2]: this.ppa_tca, // Precio pactado
      [3]: this.fvi_tca, // Fecha de vigencia

    }
    this.block[2].prop.Visible = true
    this.block[2].title = 'Datos claves alternas de clientes (bloque 2)'


    // =======================<Bloque 3 >===============

    this.block[3] = structuredClone(container)
    this.block[3].component = {

      [0]: this.pve_mov,
      [1]: this.mon_mov,
      [2]: this.ptc_cpy,  // Precio cotizado en compras
      [3]: this.moc_cpy,
      [4]: this.pga_cpy, // porcentaje de ganancia
      [5]: this.est_cpy,  // estatus del porcentaje de ganancia
      [6]: this.img_cpy
    }
    this.block[3].prop.Visible = true
    this.block[3].title = 'Precio cotizado del insumo en compras (bloque 3)'

    // =======================<Bloque 4 >===============


    this.block[4] = structuredClone(container)
    this.block[4].component = {
      [0]: this.dea_prv,
      [1]: this.dis_cpy,   // Datos Insumo
      [2]: this.img_cpy, // imagen
      [3]: this.nop_cpy, // Nombre del proveedor
      [4]: this.fvi_prv, // Fecha de vigencia
      // garantia
      [5]: this.ted_cpy, // tiempo de entrega en dias
      [6]: this.pec_cpy, // Precio del proceedor
      [7]: this.moc_cpy, // Moneda de cotizacion
      //   [9]: this.pac_cpy, // Paridad de cotizacion
      [8]: this.pga_cpy, // % de ganancia
      [9]: this.pve_mov, // Precio de venta cotizado
      [10]: this.mon_mov, // Moneda de venta

      // [16]: this.obc_cpy, // Observaciones
      // [17]: this.esc_cpy, // Estatus de la cotizacion de compra
      // [18]: this.uco_cpy, // Usuario de compra

    }
    this.block[4].prop.Visible = false
    this.block[4].title = 'Lista externa de precios de proveedores (cotizador bloque 4)'

    // =======================<Bloque 5 >===============
    this.block[5] = structuredClone(container)
    this.block[5].component = {
      [0]: this.bt_accept
    }
    this.block[5].style = {
    }
  }

  async open(visible: boolean) {
    this.prop.Visible = true
    await this.isi_cpy.interactiveChange()
    /*
     async when() {
    
        const res = await this.Sql.localAlaSql(`select key_pri,tap_tap from now.vi_cap_agenda where recno=${this.Recno}`)
        // si es un registro nuevo, no debe ser modificado
       
        if ( res.lenght>0 && res[0].key_pri && res[0].key_pri > 0) {
          this.key_pri = res[0].key_pri
          this.tap_tap = res[0].tap_tap.trim()
    
          const res2 = await this.Sql.localAlaSql(`select est_apy from Last.vi_cap_agenda where recno=${this.Recno}`)
          this.oldValue = res2[0].est_apy.trim()
    
          const data = await this.Sql.localAlaSql(`select eqa_tap,amu_tap from now.vi_con_actividades where rtrim(tap_tap)='${this.tap_tap}' and tpy_tpy='${this.Parent.tpy_tpy.prop.Value}'`)
          this.eqa_tap = data[0].eqa_tap.trim() // Equipo que puede autorizar
          this.amu_tap = data[0].amu_tap // Actividad multiple
    
          if (this.oldValue == 'C' || this.oldValue == 'F') {
            this.prop.Value = this.oldValue
            this.prop.Readonly = false
            return true
          }
    
    
          this.prop.Readonly = false
          return true
        }
        this.prop.Readonly = true
    
        return false
      }
    */

  }

  async close() {
    this.prop.Visible = false
  }

}
