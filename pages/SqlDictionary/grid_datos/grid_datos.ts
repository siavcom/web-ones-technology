//////////////////////////////////////////////
// Clase : grid
// Descripcion : Mantenimiento al diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 23/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { GRID } from "@/classes/Grid";
// import {COLUMN} from  '@/classes/Column'
// import { COMPONENT } from '@/classes/Component'

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import { con_dat } from "./con_dat";
import { cam_dat } from "./cam_dat";
import { tip_dat } from "./tip_dat";
import { lon_dat } from "./lon_dat";
import { dec_dat } from "./dec_dat";
import { ref_dat } from "./ref_dat";
import { sou_dat } from "./sou_dat";
import { vue_dat } from "./vue_dat";
import { val_dat } from "./val_dat";
import { rea_dat } from "./rea_dat";
import { wri_dat } from "./wri_dat";
import { def_dat } from "./def_dat";
import { cal_dat } from "./cal_dat";



export class grid_datos extends GRID {
  // Columna que tiene el grid
  // public con_dat = new COLUMN()
  public con_dat = new con_dat();
  public cam_dat = new cam_dat();
  public tip_dat = new tip_dat();
  public lon_dat = new lon_dat();
  public dec_dat = new dec_dat();
  public ref_dat = new ref_dat();
  public vue_dat = new vue_dat();
  public cal_dat = new cal_dat();
  public def_dat = new def_dat();
  public rea_dat = new rea_dat();
  public wri_dat = new wri_dat();
  public val_dat = new val_dat();
  public sou_dat = new sou_dat();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.Name = "grid_datos";
    this.prop.Caption = "Definicion de campos";
    this.prop.RecordSource = "vi_cap_comedat";
    this.prop.Visible = false;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false;
    this.prop.ColumnCount = 8;
  }

  ///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public override async appendRow() {
    // Obtiene el consecutivo con_dat del cursor local
    const data = await this.Form.db.localSql(
      "select max(con_dat) as con_dat from vi_cap_comedat\
   where  lower(trim(cam_dat)) <> 'usu_cre' and \
   lower(trim(cam_dat)) <> 'usu_usu' and \
   lower(trim(cam_dat)) <> 'tie_uac' and \
   lower(trim(cam_dat)) <> 'tie_cre' and \
   lower(trim(cam_dat)) <> 'timestamp' and \
   lower(trim(cam_dat)) <> 'key_pri' "
    );
    const con_dat = +data[0].con_dat > 0 ? data[0].con_dat + 1 : 1;
    const m = {
      nom_tab: this.Form.nom_tab.prop.Value.trim(),
      sis_dat: "",
      arc_dat: "",
      con_dat: con_dat,
      cam_dat: " ",
      des_dat: " ",
      tip_dat: "C",
      lon_dat: 32,
      dec_dat: 0,
      ref_dat: " ",
      val_dat: " ",
      sou_dat: " ",
      vue_dat: " ",
    };

    //console.log('appendRow comedat grid_datos=', await this.Form.db.localSql('select * from vi_cap_comedat'))
    // console.log('appendRow comedat data=', data[0])
    // console.log('appendRow comedat m=', m)

    await super.appendRow(m); // llama a la clase base

  }

  async appendDatos() {
    const m = {
      nom_tab: this.Form.nom_tab.prop.Value.trim(),
      con_dat: 0,
      cam_dat: " ",
      des_dat: " ",
      tip_dat: "C",
      lon_dat: 32,
      dec_dat: 0,
      ref_dat: " ",
      val_dat: " ",
      sou_dat: " ",
      vue_dat: " ",
    };

    m.con_dat = 101;
    m.cam_dat = "usu_usu";
    m.des_dat = m.cam_dat;  // En Vfp se utiliza este campo para poner el nombre del campo
    m.tip_dat = "I";
    m.lon_dat = 2;
    m.dec_dat = 0;
    m.ref_dat = "Last user update";
    await this.Form.db.appendBlank("vi_cap_comedat", m); //Incertamos un renglon en blanco

    m.con_dat = 102;
    m.cam_dat = "tie_uac";
    m.des_dat = m.cam_dat;  // En Vfp se utiliza este campo para poner el nombre del campo
    m.tip_dat = "D";
    m.lon_dat = 8;
    m.dec_dat = 0;
    m.ref_dat = "Last time update";

    await this.Form.db.appendBlank("vi_cap_comedat", m); //Incertamos un renglon en blanco

    m.con_dat = 103;
    m.cam_dat = "usu_cre";
    m.des_dat = m.cam_dat;  // En Vfp se utiliza este campo para poner el nombre del campo
    m.tip_dat = "I";
    m.lon_dat = 2;
    m.dec_dat = 0;
    m.ref_dat = "User creator";
    await this.Form.db.appendBlank("vi_cap_comedat", m); //Incertamos un renglon en blanco

    m.con_dat = 104;
    m.cam_dat = "tie_cre";
    m.des_dat = m.cam_dat;  // En Vfp se utiliza este campo para poner el nombre del campo
    m.tip_dat = "D";
    m.lon_dat = 8;
    m.dec_dat = 0;
    m.ref_dat = "Time creation";
    await this.Form.db.appendBlank("vi_cap_comedat", m); //Incertamos un renglon en blanco

    m.con_dat = 105;
    m.cam_dat = "timestamp";
    m.des_dat = m.cam_dat;  // En Vfp se utiliza este campo para poner el nombre del campo
    m.tip_dat = "T";
    m.lon_dat = 8;
    m.dec_dat = 0;
    m.ref_dat = "Timestamp or Row Source Version";
    await this.Form.db.appendBlank("vi_cap_comedat", m); //Incertamos un renglon en blanco

    m.con_dat = 106;
    m.cam_dat = "key_pri";
    m.des_dat = m.cam_dat;  // En Vfp se utiliza este campo para poner el nombre del campo
    m.tip_dat = "I";
    m.lon_dat = 4;
    m.dec_dat = 0;

    m.ref_dat = "Id Column key_pri";

    await this.Form.db.appendBlank("vi_cap_comedat", m); //Incertamos un renglon en blanco
    console.log(
      "Grid_datos appendBlank ",
      await this.Form.db.localSql("select * from vi_cap_comedat")
    );
    for (const column of this.elements) {
      console.log("column=", column.Name);
      this[column.Name].prop.ReadOnly = false
      this[column.Name].prop.Valid = true
    }

    return;
  }
}
