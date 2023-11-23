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
import { con_apy } from "./con_apy";
import { ord_tap } from "./ord_tap";

import { tap_tap } from "./tap_tap";
//import { des_tap } from "./des_tap_ant";
import { fec_apy } from "./fec_apy";
import { est_apy } from "./est_apy";
import { dat_apy } from "./dat_apy";
import { fpr_apy } from "./fpr_apy";
import { fco_apy } from "./fco_apy";
import { res_apy } from "./res_apy";
import { fce_apy } from "./fce_apy";
import { tdo_tdo } from "./tdo_tdo";
import { ndo_doc } from "./ndo_doc";

export class Grid extends GRID {
  public con_apy = new con_apy();
  public ord_tap = new ord_tap();
  public tap_tap = new tap_tap();
  // public des_tap = new des_tap();
  public fec_apy = new fec_apy();
  public est_apy = new est_apy();
  public fpr_apy = new fpr_apy();
  public dat_apy = new dat_apy();

  public fco_apy = new fco_apy();
  public res_apy = new res_apy();
  public fce_apy = new fce_apy();

  public tdo_tdo = new tdo_tdo();
  public ndo_ndo = new ndo_doc();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    // this.Name = 'vi_cap_cometap'
    this.prop.textLabel = "Tabla de actividades";
    this.prop.Visible = true;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false; // carga automaticamente la tabla en el grid
    this.tap_tap.prop.First=true
  }

  public async init() {
    await this.Form.db.execute(
      "select ' ' as des_tdo,'   ' as tdo_tdo union select des_tdo,tdo_tdo from man_cometdo order by des_tdo",
      "cometdo"
    );
    return;
  }

  ///////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////

  public async appendRow() {
    // if (m)
    //  console.log('1) Grid Proyectos appendRow m=',m)
    let con_apy=1 // Consecutivo
    let ord_tap=1 // Orden

    const con = await this.Form.db.localAlaSql(
      "select con_apy+1 as con_apy from Now.vi_cap_comeapy order by con_apy desc limit 1"
    )

    if (con[0] && con[0].con_apy && con[0].con_apy>1 )
        con_apy = con[0].con_apy; 

    const data = await this.Form.db.localAlaSql(
      "select ord_tap,est_apy,tap_tap from Now.vi_cap_comeapy where ord_tap>0 order by ord_tap desc limit 1"
    );
    console.log('Grid appendRow data=',data)


    let ins_sql=''
    if (data.length>0 && data[0].ord_tap){
      ord_tap = data[0].ord_tap;
      const est_apy = data[0].est_apy.trim();
      const tap_tap= data[0].tap_tap;
  
      const res1=await this.Form.db.localAlaSql(`select efi_tap from Now.vi_cap_cometap where tap_tap='${tap_tap}' `)
     // console.log('Grid appendRow ultima actividad data=',data[0],'Estatus resl=',res1)

      const efi_tap=res1[0].efi_tap.trim() // Estatus de autorización
      if (efi_tap!=est_apy){ // No esta finalizada
          MessageBox('No esta finalizada la ultima actividad',16,"Error " );
        return
      } 

      ins_sql=  `select * from Now.vi_cap_cometap where ord_tap>${ord_tap} order by ord_tap limit 1 `;
    } else {
      ins_sql =   "select * from vi_cap_cometap where ord_tap=1";
    }
    
    const res = await this.Form.db.localAlaSql(ins_sql)
    console.log('Grid appendRow ins_sql',ins_sql,res)

    const {...m}=res[0]   // 
    m.con_apy=con_apy  // asigna consecutivo
    
    await super.appendRow(m)
    this.con_apy.prop.Valid=true
    this.ord_tap.prop.Valid=true
    this.tap_tap.prop.Valid=true
    this.tap_tap.old_val=''

   // console.log('Grid appendRow vi_cap_comeapy',await this.Form.db.localAlaSql('select * from vi_cap_comeapy'))
 
   // this.tap_tap.interactiveChange()
  }
}
