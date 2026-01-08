
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_agenda
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { GRID } from '@/classes/Grid'

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { bt_display_proyect } from "./bt_display_proyect"
import { tpy_tpy } from "./tpy_tpy"
import { num_pry } from "./num_pry"
import { per_pry } from "./per_pry"
import { per_apy } from "./per_apy"
import { con_apy } from "./con_apy"
//import { per_apy } from "./per_apy"
import { tap_tap } from "./tap_tap"
//import { fec_apy } from "./fec_apy"
import { est_apy } from "./est_apy"
import { dat_apy } from "./dat_apy"
import { obs_apy } from "./obs_apy"
import { res_apy } from "./res_apy"
//import { fco_apy } from "./fco_apy"
//import { fce_apy } from "./fce_apy"
import { fpr_apy } from "./fpr_apy"
import { tdo_tdo } from "./tdo_tdo"
import { ndo_doc } from "./ndo_doc"
//import { ord_tap } from "./ord_tap"
//import { fma_apy } from "./fma_apy"
import { fdo_apy } from "./fdo_apy"
//import { fms_apy } from "./fms_apy"
import { bt_add_activity } from "./bt_add_activity"


export class Grid extends GRID {
  public bt_display_proyect = new bt_display_proyect()
  public fpr_apy = new fpr_apy()
  public tpy_tpy = new tpy_tpy()
  public num_pry = new num_pry()
  public per_pry = new per_pry()
  public per_apy = new per_apy()
  public con_apy = new con_apy()

  public tap_tap = new tap_tap()
  // public fec_apy = new fec_apy()
  // public fce_apy = new fce_apy()  // Fecha de cambio de estatus
  public est_apy = new est_apy()
  public dat_apy = new dat_apy()
  public obs_apy = new obs_apy()
  public res_apy = new res_apy()
  // public fco_apy = new fco_apy()
  public tdo_tdo = new tdo_tdo()
  public ndo_doc = new ndo_doc()
  //public ord_tap = new ord_tap()
  // public fma_apy = new fma_apy()
  public fdo_apy = new fdo_apy()
  public bt_add_activity = new bt_add_activity()

  // public fms_apy = new fms_apy()

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    // this.Name = 'vi_cap_agenda'
    this.prop.Caption = ' '
    this.prop.autoLoad = false  // carga automaticamente la tabla en el grid
    this.prop.showAddButton = false; // Estos componentes estan en grid.vue
    this.prop.showDeleteButton = false;


  }
  override async init() {

    await SQLExec(
      "select ' ' as des_tdo,'   ' as tdo_tdo union select des_tdo,tdo_tdo from man_cometdo order by des_tdo",
      "cometdo"
    );
    return;
  }

  override async saveTable() {
    this.prop.Visible = false
    await super.saveTable()
    this.leeTabla()
  }

  async leeTabla() {

    const fpr = await SQLExec('select getdate() as fpr_apy');
    const fpr_apy = fpr[0].fpr_apy.slice(0, 10)

    this.prop.RecordSource = ''
    const has_fec = dateToString(addDate(fpr_apy, 1, 'W')) // sumale una semana
    const m = {
      has_fec: has_fec
    }
    console.log("leeTabla has_fec=", m.has_fec, 'fpr_apy=', fpr_apy)

    //actividades vigente de los proyectos activos
    await use('vi_cap_agenda', m)
    this.prop.RecordSource = 'vi_cap_agenda'

    this.tpy_tpy.prop.RowSource = "";
    this.tap_tap.prop.RowSource = "";

    await SQLExec("select des_tpy,tpy_tpy from vi_cap_cometpy ", "tipos_proyectos");

    this.tpy_tpy.prop.RowSource = "select des_tpy,tpy_tpy from now.tipos_proyectos \
        where exists(select tpy_tpy from now.vi_cap_agenda where tpy_tpy=tipos_proyectos.tpy_tpy) "

    // -- actividades que puede tener el proyecto
    await SQLExec("select * from vi_con_actividades", "vi_con_actividades")

    /*
        await SQLExec("select tap_tap,des_tap from vi_con_actividades \
           group by tap_tap,des_tap order by des_tap", "actividades");
     */
    //    this.tap_tap.prop.RowSource = await  localAlaSql("select des_tap,tpa_tpa from now.actividades \
    //        where exists(select tpy_tpy from now.vi_cap_agenda where tpy_tpy=actividades.tpy_tpy) ");// , "cometap"

    // *****Aqui me quede al insertar un renglon****
    this.tap_tap.prop.RowSource = "select des_tap,tap_tap from vi_con_actividades \
    where exists(select tpy_tpy from now.vi_cap_agenda where vi_cap_agenda.tpy_tpy=vi_con_actividades.tpy_tpy)\
    group by tap_tap,des_tap order by des_tap"

    /*
        m.log_usu = this.Form.mPublic.log_usu // lee los equipos que pertenece al usuario
        await  use('vi_cap_db_equusu', m, 'equipos')
    */

    await SQLExec('select * from vi_cap_db_equusu', 'equipos')


    //this.prop.RowSourceType = 2;

    // this.tpy_tpy.prop.RowSourceType = 4
    // this.tap_tap.prop.RowSourceType = 4

    // this.tpy_tpy.prop.RowSource = "cometpy.des_tpy,tpy_tpy";
    // this.tap_tap.prop.RowSource = "cometap.des_tap,tap_tap";

    this.prop.Visible = true
    this.Disabled = false

  }

  ///////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////

  async appendRow(tpy_tpy: string, num_pry: number, per_apy: number) {

    // lee los datos de la primer actividad que no tenga orden
    const res = await localAlaSql(`select * from vi_con_actividades where tpy_tpy='${tpy_tpy}' and ord_tap=0 limit 1`);

    if (res.length == 0) {
      await MessageBox('Hay actividades sin orden activas', 16, 'Warning');
      return
    }

    /*  
      const res1 = await  localAlaSql(`select * from vi_con_actividades where tpy_tpy='${tpy_tpy}' and ord_tap=0 \
        and not exists(select tpy_tpy from now.vi_cap_agenda where tpy_tpy=vi_con_actividades.tpy_tpy and \
          num_pry=${num_pry} AND \
          vi_con_actividades.tap_tap=vi_cap_agenda.tap_tap) `);
  */

    // leemos la fecha de hoy
    const fpr = await SQLExec('select getdate() as fpr_apy');
    const { ...m } = res[0];
    m.tpy_tpy = tpy_tpy
    m.num_pry = num_pry
    m.per_apy = per_apy
    m.fpr_apy = fpr[0].fpr_apy
    m.key_pri = 0
    m.recno = 0
    // leemos el consecutivo de la ultima actividad en el sevidor SQL
    const con = await SQLExec(
      `select top 1 con_apy+1 as con_apy from vi_cap_comeapy where tpy_tpy='${tpy_tpy}' \
            and num_pry=${num_pry} and per_apy=${per_apy} order by con_apy desc `
    );

    if (con.length > 0 && con[0].con_apy) {
      m.con_apy = con[0].con_apy
    }
    else {
      MessageBox('No tienes proyectos activos', 16, 'Error');
      return
    }

    console.log('Grid appendRow actividades=', m)
    await super.appendRow(m);
    const columns = this.elements

    // ponemos como validadas todas las columnas
    for (const element in columns) {
      const Name = columns[element].Name
      console.log('append row column=', element, this[Name])
      this[Name].prop.Valid = true
    }
    return
  }

  override async asignaRenglon(row: number, colName: string): Promise<void> {
    this.Form.grid_actividades.prop.RecordSource = "";
    this.Form.grid_actividades.prop.Visible = false;


    await super.asignaRenglon(row, colName);
  }
}