
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : Container
// @class : modal_com
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
import { psi_cpy } from "./psi_cpy"

import { nop_cpy } from "./nop_cpy"
import { dap_cpy } from "./dap_cpy"
import { dis_cpy } from "./dis_cpy"
import { ctz_cpy } from "./ctz_cpy";
import { pec_cpy } from "./pec_cpy"
import { moc_cpy } from "./moc_cpy"
import { pac_cpy } from "./pac_cpy"

import { ted_cpy } from './ted_cpy' //tiempo de entrega en dias
import { ifl_cpy } from './ifl_cpy' // incluye flete
import { cfl_cpy } from './cfl_cpy'  //costo de flete
import { ubi_cpy } from './ubi_cpy'  //ubicacion
import { cpa_cpy } from './cpa_cpy'  //condiciones de pago
import { img_cpy } from './img_cpy'

import { obc_cpy } from "./obc_cpy"

import { cla_isu } from "./cla_isu" //
//import { des_isu } from "./des_isu" //

import { cod_nom } from "./cod_nom" //
//import { nom_nom } from "./nom_nom" //
import { con_con } from "./con_con" //
//import { noc_con } from "./noc_con" //
import { dip_cpy } from "./dip_cpy";

import { cla_prv } from "./cla_prv" //
import { dea_prv } from "./dea_prv" //
//import { med_cpy } from "./med_cpy" //

import { med_mov } from "./med_mov"

import { mop_prv } from "./mop_prv" //
import { fvi_prv } from "./fvi_prv"

import { fco_cpy } from "./fco_cpy" //
import { ppa_prv } from "./ppa_prv" //

import { pga_cpy } from "./pga_cpy" //

import { ave_cpy } from "./ave_cpy"
import { ect_prv } from "./ect_prv" //
import { est_cpy } from "./est_cpy"
import { uco_cpy } from "./uco_cpy"
//import { bt_save } from "./bt_save"

import { bt_accept } from "./bt_accept"
export class modal_com extends CONTAINER {
  public des_cpy = new des_cpy()
  public can_cpy = new can_cpy()
  public med_cpy = new med_cpy()

  public isi_cpy = new isi_cpy()
  public psi_cpy = new psi_cpy()
  // Datos proveedor externo
  public dip_cpy = new dip_cpy()
  public nop_cpy = new nop_cpy() // Nombre
  public dap_cpy = new dap_cpy() // Datos del proveedor
  public dis_cpy = new dis_cpy() // Datos del insumo que nos maneja el proveedor
  public ctz_cpy = new ctz_cpy() // Cotizacion 
  public pec_cpy = new pec_cpy() // Precio de cotizacion
  public moc_cpy = new moc_cpy() // Moneda de cotizacion
  public pac_cpy = new pac_cpy() // Paridad de cotizacion


  public ted_cpy = new ted_cpy() // tiempo de entrega en dias
  public ifl_cpy = new ifl_cpy()  //incluye flete
  public cfl_cpy = new cfl_cpy() // costo de flete
  public ubi_cpy = new ubi_cpy() //  ubicacion
  public cpa_cpy = new cpa_cpy() //  condiciones de pago
  public img_cpy = new img_cpy() // imagen del producto del proveedor

  public obc_cpy = new obc_cpy()
  public uco_cpy = new uco_cpy()
  public ect_prv = new ect_prv()

  // Datos proveedor interno

  public cla_isu = new cla_isu()
  // public des_isu = new des_isu()
  public med_mov = new med_mov()
  public cod_nom = new cod_nom()
  public con_con = new con_con()

  public cla_prv = new cla_prv()
  public dea_prv = new dea_prv()
  public ppa_prv = new ppa_prv()
  public mop_prv = new mop_prv()
  public fvi_prv = new fvi_prv()


  public fco_cpy = new fco_cpy()
  // public uni_mov = new uni_mov()
  // public mon_cpy = new mon_cpy()

  public pga_cpy = new pga_cpy()

  public est_cpy = new est_cpy()  // estatus
  public ave_cpy = new ave_cpy()

  //  public bt_save = new bt_save()
  public bt_accept = new bt_accept()

  constructor() {
    super()

    this.prop.BaseClass = 'modalContainer'   //'modalContainer'
    this.prop.Caption = 'Insumo a cotizar en compras '
    this.prop.Visible = false
    this.prop.RecordSource = 'vi_cap_comecpy'  // RecordSource de la forma para asignar el recno
    this.asignaRecno()

    // =======================<Bloque 0 >===============

    const container = this.container

    this.block[0] = structuredClone(container)
    this.block[0].component = {
      [0]: this.des_cpy,
      [1]: this.can_cpy,
      [2]: this.med_cpy,
      [3]: this.isi_cpy,  // Inusumo en ERP
      [5]: this.psi_cpy  // Proveedor en ERP
    }

    this.block[0].title = 'Insumos a cotizar'
    // =======================<Bloque 0 Datos insumo Siavcom>=====================
    this.block[1] = structuredClone(container)

    this.block[1].component = {

      [0]: this.cla_isu,
      //  [1]: this.des_isu,
      [1]: this.med_mov,

    }
    this.block[1].prop.Visible = false
    this.block[1].title = 'Insumo Siavcom'


    // =======================<Bloque 2 Compra a proveedor de Siavcom >===============
    this.block[2] = structuredClone(container)

    this.block[2].component = {


      [0]: this.cod_nom,
      // [1]: this.nom_nom,

      [1]: this.con_con,
      // [3]: this.noc_con,

      [2]: this.cla_prv,
      //   [5]: this.cla_isu,
      [3]: this.dea_prv,
      [4]: this.ppa_prv, // Precio pactado
      [5]: this.mop_prv, // Moneda
      [6]: this.fvi_prv, // Fecha de vigencia

      [7]: this.ctz_cpy,// Cotizacion 
      [8]: this.fco_cpy, // Fecha de cotizacion
      [9]: this.fvi_prv, // Fecha de vigencia
      // garantia
      [10]: this.ted_cpy, // tiempo de entrega en dias
      [12]: this.pec_cpy, // Precio de cotizacion
      [13]: this.moc_cpy, // Moneda de cotizacion
      [14]: this.pac_cpy, // Paridad de cotizacion

      [15]: this.ifl_cpy,  // incluye flete
      [16]: this.cfl_cpy,  // costo de flete
      [17]: this.ubi_cpy,  // ubicacion
      [18]: this.cpa_cpy,  // condiciones de pago
      [19]: this.obc_cpy, // Observaciones
      [20]: this.ect_prv  // Estatus del proveedor
    }
    this.block[2].prop.Visible = false
    this.block[2].title = 'Compras. Proveedor interno'


    // =======================<Bloque 3 Compra a proveedor externo >===============

    this.block[3] = structuredClone(container)
    this.block[3].component = {
      [0]: this.cla_prv,
      [1]: this.dea_prv,
      [2]: this.dis_cpy,// Datos del insumo que nos maneja el proveedor
      [3]: this.img_cpy, // imagen

      [4]: this.nop_cpy, // Nombre del proveedor
      [5]: this.dap_cpy, // Datos del proveedor

      [6]: this.ctz_cpy,// Cotizacion 
      [7]: this.fco_cpy, // Fecha de cotizacion
      [8]: this.fvi_prv, // Fecha de vigencia
      // garantia
      [9]: this.ted_cpy, // tiempo de entrega en dias
      [10]: this.ifl_cpy,  // incluye flete
      [12]: this.cfl_cpy,  // costo de flete
      [13]: this.ubi_cpy,  // ubicacion
      [14]: this.cpa_cpy,  // condiciones de pago
      [15]: this.pec_cpy, // Precio de cotizacion
      [16]: this.moc_cpy, // Moneda de cotizacion
      [17]: this.pac_cpy, // Paridad de cotizacion
      [18]: this.obc_cpy, // Observaciones
      [19]: this.ect_prv, // Estatus de la cotizacion de compra
      [20]: this.uco_cpy, // Usuario de compra
    }
    this.block[3].prop.Visible = false
    this.block[3].title = 'Compras. Proveedor externo'
    // =======================<Bloque 4  Autorizacion >===============

    this.block[4] = structuredClone(container)
    this.block[4].component = {
      [0]: this.pga_cpy, // % de ganancia
      [1]: this.est_cpy, // Estatus de autorizacion porcentaje de ganancia
      [2]: this.ave_cpy // autorizacion del precio de venta

    }
    this.block[4].title = 'Autorizacion de detalle de compra'
    this.block[4].prop.Visible = false

    // =======================<Bloque 5 >===============


    this.block[5] = structuredClone(container)
    this.block[5].component = {
      [0]: this.bt_accept
    }
    this.block[5].style = {
    }

  }

  async graba() {

  }
  async close() {
    this.prop.Visible = false
  }


}

