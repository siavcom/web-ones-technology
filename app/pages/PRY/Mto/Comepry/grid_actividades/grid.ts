//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_cometap
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { GRID } from "@/classes/Grid";

/////////////////////////////////////////
// Component import
//////////////////////////////////////
import { per_apy } from "./per_apy";
import { con_apy } from "./con_apy";
import { ord_tap } from "./ord_tap";

import { tap_tap } from "./tap_tap";
//import { des_tap } from "./des_tap_ant";
//import { fec_apy } from "./fec_apy";
import { est_apy } from "./est_apy";
import { dat_apy } from "./dat_apy";
import { fpr_apy } from "./fpr_apy";
import { fco_apy } from "./fco_apy";
import { res_apy } from "./res_apy";
import { obs_apy } from "./obs_apy";
import { fce_apy } from "./fce_apy";
import { tdo_tdo } from "./tdo_tdo";
import { ndo_doc } from "./ndo_doc";

export class Grid extends GRID {
  public per_apy = new per_apy();
  public con_apy = new con_apy();
  public ord_tap = new ord_tap();
  public tap_tap = new tap_tap();
  // public des_tap = new des_tap();
  // public fec_apy = new fec_apy();
  public fpr_apy = new fpr_apy();

  public est_apy = new est_apy();
  public dat_apy = new dat_apy();
  public obs_apy = new obs_apy();
  public res_apy = new res_apy();

  public fco_apy = new fco_apy();
  public fce_apy = new fce_apy();

  public tdo_tdo = new tdo_tdo();
  public ndo_ndo = new ndo_doc();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    // this.Name = 'vi_cap_cometap'
    this.prop.Caption = "Actividades del proyecto";

    this.prop.UpdateMessage = "Grabamos actividades";
    this.prop.DeleteMessage = "Borramos actividad";
  }

  public async init() {
    await SQLExec(
      "select ' ' as des_tdo,'   ' as tdo_tdo union select des_tdo,tdo_tdo from man_cometdo order by des_tdo",
      "cometdo"
    );

    await useNodata("vi_cap_cometap");
    return;
  }

  async grabaTabla_old() {
    this.prop.Visible = false
    await super.saveTable()

    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value,
      per_apy: this.Form.per_apy.prop.Value
    }
    // Lee la tabla de actividades que tiene este proyecto

    // this.prop.RecordSource = ""
    if (!(await use("vi_cap_comeapy", m))) {
      alert("Open error table " + "vi_cap_comeapy");
      return;
    }

    if (this.Sql.View.vi_cap_comeapy.RecCount == 0) {
      MessageBox("No tiene actividades en este periodo");
      return;
    }


    this.prop.Visible = true


  }

  ///////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////

  public async appendRow() {
    // if (m)
    //  console.log('1) Grid Proyectos appendRow m=',m)
    let con_apy = 1; // Consecutivo
    let ord_tap = 1; // Orden
    let per_apy = 1; // Periodo

    const con = await localAlaSql(
      "select con_apy+1 as con_apy,per_apy from now.vi_cap_comeapy order by per_apy desc,con_apy desc limit 1"
    );

    if (con[0] && con[0].con_apy && con[0].con_apy > 1) {
      con_apy = con[0].con_apy;
      per_apy = con[0].per_apy
    }
    // busca la ultima actividad
    const data = await localAlaSql(
      "select ord_tap,est_apy,tap_tap from now.vi_cap_comeapy where ord_tap>0 order by ord_tap desc limit 1"
    );
    console.log("Grid appendRow ultima actividad data=", data);

    let ins_sql = "";
    if (data.length > 0 && data[0].ord_tap) {
      ord_tap = data[0].ord_tap;
      const est_apy = data[0].est_apy.trim();
      const tap_tap = data[0].tap_tap.trim();

      // leer el estatus de la ultima actividad
      ins_sql = `select efi_tap from now.vi_cap_cometap where rtrim(tap_tap)='${tap_tap}'  `
      const res1 = await localAlaSql(ins_sql);
      //console.log('Grid appendRow estatus de la ultima actividades =', await  localAlaSql('select * from now.vi_cap_cometap'));

      const efi_tap = res1[0].efi_tap.trim(); // Estatus de autorización
      if (efi_tap != est_apy) {
        // No esta finalizada
        MessageBox("No esta finalizada la ultima actividad", 16, "Warning");
        if (ord_tap == 0) //Si la ultima actividad no lleva orden, se debe de finalizar primero
          return;
      }

      //      ins_sql = `select * from now.vi_cap_cometap where ord_tap>${ord_tap} order by ord_tap limit 1 `;
      ins_sql = `select * from now.vi_cap_cometap where ord_tap=0 limit 1 `;


    } else {
      ins_sql = "select * from vi_cap_cometap where ord_tap=1";
    }

    const res = await localAlaSql(ins_sql);
    console.log("Grid appendRow ins_sql", ins_sql, res);

    const res2 = await SQLExec('select getdate() as fpr_apy');
    const fpr_apy = res2[0].fpr_apy.slice(0, 16)

    const { ...m } = res[0]; //
    m.con_apy = con_apy; // asigna consecutivo
    m.fpr_apy = fpr_apy
    m.per_apy = per_apy

    await super.appendRow(m);

    const columns = this.elements
    // ponemos como validadas todas las columnas
    console.log('append colmns==>', columns, this)
    for (const element in columns) {
      const Name = columns[element].Name
      console.log('append row column=', element, this[Name])
      this[Name].prop.Valid = true
    }

    this.tap_tap.old_val = "";
  }

  override async deleteRow(recno: number) {

    const data = await localAlaSql(`select est_apy,ord_tap from now.vi_cap_comeapy where recno=${recno}`)
    const est_apy = data[0].est_apy
    const ord_tap = data[0].ord_tap
    // Si estado es finalizado, bloqueado, reprogramado o cancelado. No permite borrar
    if ((this.Form.mPublic.log_usu != 'sa' && (est_apy == 'F' || est_apy == 'C') || est_apy == 'B' || est_apy == 'R') ||
      (this.Form.mPublic.log_usu != 'sa' && ord_tap > 0)) {
      MessageBox("No se puede borrar esta actividad", 16, "Warning");
      return;
    }

    return await super.deleteRow((recno));
  }
}
