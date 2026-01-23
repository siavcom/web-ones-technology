//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : comecpy
// Description : Capture Form 
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { GRID } from "@/classes/Grid";
import { fec_cpy } from "./fec_cpy"
import { par_cpy } from "./par_cpy"
import { des_cpy } from "./des_cpy"
import { can_cpy } from "./can_cpy"
import { med_cpy } from "./med_cpy"
import { isi_cpy } from "./isi_cpy"
import { med_mov } from "./med_mov"
import { cla_isu } from "./cla_isu"
import { est_cpy } from "./est_cpy"
import { ace_cpy } from "./ace_cpy"
import { detail_com } from "./Bt_detail_com"
import { detail_vta } from "./Bt_detail_vta"

export class grid_comecpy extends GRID {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  public fec_cpy = new fec_cpy()
  public par_cpy = new par_cpy()
  public des_cpy = new des_cpy()
  public can_cpy = new can_cpy()
  public med_cpy = new med_cpy()
  public isi_cpy = new isi_cpy()
  public cla_isu = new cla_isu()
  public med_mov = new med_mov()
  public est_cpy = new est_cpy()
  public ace_cpy = new ace_cpy()

  public detail_com = new detail_com()
  public detail_vta = new detail_vta()

  constructor() {
    super()  // inicializa la clase base
    this.Name = 'grid_comecpy'
    this.prop.Caption = "Partidas a cotizar"
    this.prop.Status = 'A'
    this.prop.UpdateMessage = "Grabamos partida";
    this.prop.DeleteMessage = "Borramos partida";

  }

  override async appendRow() {
    const m = {
      par_cpy: 1,
      // log_usu: this.PublicVar.log_usu
      //     fec_cpy : this.PublicVar.fpo_pge, // o
    }

    const data = await this.Sql.localAlaSql(
      "select par_cpy+1 as par_cpy from now.vi_cap_comecpy order by par_cpy desc limit 1"
    );


    if (data[0] && data[0].par_cpy && data[0].par_cpy > 1) {
      m.par_cpy = data[0].par_cpy
    }
    await super.appendRow(m);

  }
  override async deleteRow(recno: number) {

    // Si estado es finalizado, bloqueado, reprogramado o cancelado. No permite borrar
    if (!await this.whenVta()) {
      MessageBox("No se puede borrar la partida", 16, "Warning");
      return;
    }
    return await super.deleteRow((recno));
  }


  async whenVta() {  // Busca si pertenece el usuario al equipo de ventas

    if (Public.value.log_usu.trim() == "ADMIN")
      return true
    if (this.Form.est_pry.prop.Value == 'AU' || this.Form.est_pry.prop.Value == 'CZ'
      || this.Form.est_pry.prop.Value == 'AC' || this.Form.est_pry.prop.Value == 'BL'
      || this.Form.est_pry.prop.Value == 'FM' || this.Form.est_pry.prop.Value == 'CA')
      return false


    let data = await localAlaSql(`select equipos.equ_equ from now.equipos join vi_cap_comepry on equipos.equ_equ=vi_cap_comepry.equ_equ`)

    if (data.length && data[0].equ_equ.length > 0)
      return true

    return false
  }

  async whenCompra() { // Busca si pertenece el usuario al equipo de compras
    if (Public.value.log_usu.trim() == "ADMIN")
      return true

    const equ_equ = this.Form.eco_tpy.trim()
    // checar aqui
    console.log(' whenCompra equ_equ', equ_equ)
    const data = await this.Sql.localAlaSql(`select equ_equ from equipos where rtrim(equ_equ)='${equ_equ}'`)

    if (data.length > 0)
      return true

    return false
  }

}

