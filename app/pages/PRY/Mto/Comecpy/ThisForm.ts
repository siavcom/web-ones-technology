/**
* This Form was generated automatically by web-ones-technology
* @baseClass  : captureForm
* @class : Comecpy
* @description : Capture Form
* @author: El Fer Blocks (Fernando Cuadras)
* @creation : 2024-04-09
* @updateDate  :
////////////////////////////////////////////*/

/*
@class (o @constructor): Indica que una función es una clase constructor.
@extends (o @augments): Indica que una clase hereda de otra.
@implements: Indica que una clase implementa una interfaz.
@readonly: Indica que una propiedad de un objeto no debe ser modificada.
@public, @private, @protected: Define la visibilidad de un miembro de la clase. 

*/
///////////////////////////////////////
// Base class
///////////////////////////////////////

import { FORM } from "@/classes/Form";

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { tpy_tpy } from "./tpy_tpy";
import { num_pry } from "./num_pry";
import { cod_nom } from "./cod_nom";
//import { nom_nom } from "./nom_nom";
import { noc_con } from "./noc_con";
import { des_tdn } from "./des_tdn";
import { fec_pry } from "./fec_pry";
import { ven_ven } from "./ven_ven";

import { nom_ven } from "./nom_ven";
import { tit_pry } from "./tit_pry";
import { des_pry } from "./des_pry";
import { est_pry } from "./est_pry";

import { ver_cpy } from "./ver_cpy"
import { des_equ } from "./des_equ";
import { bt_clonar } from "./bt_clonar";
import { bt_cotizacion } from "./bt_cotizacion";
import { bt_pdf } from "./bt_pdf";
import { grid_comecpy } from "./grid_comecpy/grid_comecpy"
import { displayPdf } from "./displayPdf";

//import { consoleLog } from "../../../../composables/Functions";

export class ThisForm extends FORM {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public tpy_tpy = new tpy_tpy();
  public num_pry = new num_pry();
  public fec_pry = new fec_pry();
  public ven_ven = new ven_ven();

  public cod_nom = new cod_nom();
  // public nom_nom = new nom_nom();
  public noc_con = new noc_con();

  public des_tdn = new des_tdn();
  public nom_ven = new nom_ven();
  public tit_pry = new tit_pry();
  public des_pry = new des_pry();
  public ver_cpy = new ver_cpy();
  public des_equ = new des_equ();
  public est_pry = new est_pry();

  public bt_clonar = new bt_clonar();
  public bt_cotizacion = new bt_cotizacion();
  public bt_pdf = new bt_pdf();
  public grid_comecpy = new grid_comecpy(); // Tabla de actividates
  public displayPdf = new displayPdf();

  equ_equ: string = ''; // equipo de pertenece el usuario
  eco_tpy: string = ''; // equipo de compras
  eqa_tap: string = ''; // equipo que autoriza
  esu_tap: string = ''; // equipo que supervisa
  tip_tdn: string = ''; // tipo de cliente/prooveedor

  ctz_tap: string = 'CTZ';  // actividades de cotizacion del proyecto

  dat_isu = {}

  constructor() {
    super(); // inicializa la clase base
    this.prop.Name = "manComepry";
    this.prop.Caption = "Cotizacion de un proyectos";
    this.prop.Status = "A";
    this.prop.RecordSource = 'vi_cap_comepry'

    // Aqui se tiene que  asignar el valor del recno por referencia de los componentes        

    this.asignaRecno() // asigna el Recno a los componentes por referencia
    this.cod_nom.asignaRecno()
    this.ven_ven.asignaRecno()

  }

  override async init() {
    await super.init();

    await useNodata("lla1_isu");

    await useNodata("lla1_nom");

    await useNodata("vi_cap_comepry");

    await useNodata("vi_cap_comecpy");
    await useNodata("vi_cap_cometap"); // Tabla de actividates por proyecto

    await SQLExec('select equ_equ,max(des_equ) as des_equ,max(log_usu) as log_usu,max(nom_usu) as nom_usu from vi_cap_db_equusu GROUP by equ_equ', 'equipos') //'equusu'

    this.tpy_tpy.prop.TabIndex = 1;
    this.num_pry.prop.TabIndex = 2;
    this.ver_cpy.prop.TabIndex = 3;

  }

  async obtInsumo(d_cla_isu: string) {
    const cla_isu = d_cla_isu.trim()
    if (this.dat_isu[cla_isu]) {
      console.log('1) OBT_DAT_ISU_GEN this.dat_isu=', this.dat_isu[cla_isu])
      return this.dat_isu[cla_isu]
    }

    const mem = {
      cla_isu: cla_isu,
      cod_nom: this.cod_nom.prop.Value,
      tip_tdn: this.tip_tdn,
      cop_nom: 'C',
      con_con: null
    }

    //  const med_mov = await this.Sql.localAlaSql(`select med_mov from vi_cap_comecpy where recno = ${this.Recno}`)
    //   const med_mov = await this.Sql.scatter(  ['med_mov'], 'vi_cap_comecpy')


    const par_sql = ` '${mem.cla_isu}',null,null,'${mem.cop_nom}','${mem.cod_nom}',${mem.con_con},'${mem.tip_tdn}',0 `
    let data = []

    // console.log('1) OBT_DAT_ISU_GEN sql=', `exec P_OBT_DAT_ISU_GEN ${par_sql}`)

    if (this.Sql.session.dialect == 'mssql')
      data = await SQLExec(`exec P_OBT_DAT_ISU_GEN ${par_sql}`)
    else
      data = await SQLExec(`select * from P_OBT_DAT_ISU_GEN(${par_sql})`)

    console.log('1) OBT_DAT_ISU_GEN data=', data)
    if (data[0].resultado == 0)
      return data[0]


    const dat_isu = await objToLowerCase(data[0])
    dat_isu['fvi_tca'] = "1900-01-01";
    dat_isu['ppa_tca'] = 0


    const Pub = this.mPublic

    const m = { ...dat_isu, ...Pub }

    /************************************* */

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


    const d = await this.Sql.scatter(['mco_pry'], 'vi_cap_comepry')

    for (let pre = 1; pre <= 5; pre++) {
      pve_isu[pre] = pve_isu[pre] * vmo_pge[m.mon_isu] / vmo_pge[d.mco_pry] // precio a moneda de cotizacion del proyecto
      //  console.log("2) obtInsumo pre=", pre, pve_isu[pre])
    }

    dat_isu.pv1_isu = pve_isu[1]
    dat_isu.pv2_isu = pve_isu[2]
    dat_isu.pv3_isu = pve_isu[3]
    dat_isu.pv4_isu = pve_isu[4]
    dat_isu.pv5_isu = pve_isu[5]

    if (dat_isu.sw_tca == 1) {  // busca en la tabla de tca el precio pactado
      const res = await SQLExec(`select cast(getdate() as date) as fpo_pge,fvi_tca,ppa_tca from  man_cometca where cla_tca ='${m.cla_isu}' \
        and cop_nom='${m.cop_nom}' and cod_nom='${m.cod_nom}' and fpo_pge<=fvi_tca `)
      console.log("2) obtInsumo res=", res)
      if (res[0].length > 0 && res[0].fvi_tca) {
        dat_isu['fvi_tca'] = res[0]['fvi_tca']
        dat_isu['ppa_tca'] = res[0]['ppa_tca']
      } else
        dat_isu.sw_tca == 0
    }

    dat_isu.pve_mov = m.pve_mov  // * (vmo_pge[m.mon_isu] / vmo_pge[d.mco_pry])
    dat_isu.prr_pro = m.prr_pro / vmo_pge[m.mon_isu]  //*  (vmo_pge[m.mon_isu] / vmo_pge[d.mco_pry])  // actualizamos el precio de reposicion segun su medida
    dat_isu.cst_isu = m.cst_isu / vmo_pge[m.mon_isu] //* (vmo_pge[m.mon_isu] / vmo_pge[d.mco_pry])

    this.dat_isu[cla_isu] = dat_isu

    return dat_isu

  }



} // End ThisForm
