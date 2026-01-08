//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : manComepry
// Description : Capture Form
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { tpy_tpy } from "./tpy_tpy";
import { num_pry } from "./num_pry";
import { equ_equ } from "./equ_equ";
import { log_usu } from "./log_usu";
import { per_pry } from "./per_pry";
import { cop_nom } from "./cop_nom";
import { cod_nom } from "./cod_nom";

import { con_con } from "./con_con";

import { fec_pry } from "./fec_pry";
import { fcu_pry } from "./fcu_pry";
import { ven_ven } from "./ven_ven";

import { tit_pry } from "./tit_pry";
import { des_pry } from "./des_pry";
import { fco_pry } from "./fco_pry";
import { est_pry } from "./est_pry";
import { obs_pry } from "./obs_pry";
import { mco_pry } from "./mco_pry";
import { mes_pry } from "./mes_pry";

import { per_apy } from "./per_apy";
//import { grid_tap } from "./grid_tap";
import { Grid } from './grid_actividades/grid'
import { bt_actividades } from "./bt_actividades";

///////////////////////////////////////
// Base class
///////////////////////////////////////

//import { captureForm } from "@/classes/CaptureForm";

export class ThisForm extends captureForm {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public tpy_tpy = new tpy_tpy();
  public cop_nom = new cop_nom();
  public num_pry = new num_pry();
  public equ_equ = new equ_equ();
  public log_usu = new log_usu();

  public cod_nom = new cod_nom();
  public con_con = new con_con();

  public ven_ven = new ven_ven();

  public per_pry = new per_pry();
  public fec_pry = new fec_pry();
  public fcu_pry = new fcu_pry();


  public tit_pry = new tit_pry();
  public des_pry = new des_pry();
  public fco_pry = new fco_pry();
  public obs_pry = new obs_pry();
  public mco_pry = new mco_pry();
  public est_pry = new est_pry();
  public mes_pry = new mes_pry();

  public per_apy = new per_apy();
  public bt_actividades = new bt_actividades();
  public grid_actividades = new Grid();

  // public grid_tap = new grid_tap(); // Tabla de actividates

  constructor() {
    super(); // inicializa la clase base

    this.Development = true;
    this.prop.Name = "manComepry";
    this.prop.Caption = "Mantenimiento a proyectos";
    this.prop.RecordSource = "vi_cap_comepry";
    this.prop.Status = "A";
    this.asignaRecno()  // asignamos los Recno de los componentes de la forma de captura
    // asignacion del recno elementos contenedores
    this.cod_nom.asignaRecno()
    this.ven_ven.asignaRecno()
    this.con_con.asignaRecno()
    this.bt_save.prop.Caption = 'Grabamos el proyecto';
    this.bt_modify.prop.Caption = 'Modificamos el proyecto';
    this.bt_delete.prop.Caption = 'Borramos el proyecto';

    // this.cod_nom.cliente_nuevo.cli_pry.prop.ReadOnly = ref(this.cod_nom.prop.ReadOnly)

    //    this.mPublic.cop_nom='C'

  }

  override async init() {

    console.log('Public', Public)

    if (!await SQLExec('select equ_equ,max(des_equ) as des_equ,log_usu,max(nom_usu) as nom_usu from vi_cap_db_equusu GROUP by equ_equ, log_usu', 'equusu')) {
      MessageBox('No  hay definicion de equipos', 16, 'Error de base de datos');
      return
    }
    //    console.log('1) equipos=', await this.Sql.localAlaSql('select * from now.equusu'));

    //   console.log('2) equipos=', await this.Sql.localAlaSql('select des_equ,equ_equ from now.equusu group by equ_equ,des_equ'));

    this.Form.log_usu.prop.RowSource = `select nom_usu,log_usu from now.equusu \
    group by log_usu,nom_usu`

    this.Form.equ_equ.prop.RowSource = `select des_equ,equ_equ from now.equusu group by equ_equ,des_equ`;

    await useNodata("vi_cap_cometap");
    await super.init();
    /*
        this.tpy_tpy.prop.TabIndex = 1;
    
        this.num_pry.prop.TabIndex = 2;
        this.equ_equ.prop.TabIndex = 3;
    
        this.per_pry.prop.TabIndex = 5;
    
        this.fec_pry.prop.TabIndex = 6;
        this.fcu_pry.prop.TabIndex = 7;
    
        this.cod_nom.prop.TabIndex = 8;
        this.con_con.prop.TabIndex = 9;
        this.ven_ven.prop.TabIndex = 12;
    
        this.tit_pry.prop.TabIndex = 14;
        this.des_pry.prop.TabIndex = 15;
        this.fco_pry.prop.TabIndex = 16;
        this.obs_pry.prop.TabIndex = 17;
        this.mco_pry.prop.TabIndex = 18;
        this.est_pry.prop.TabIndex = 19;
        this.mes_pry.prop.TabIndex = 20;
        // this.grid_tap.prop.TabIndex = 21;
    
        this.cop_nom.prop.TabIndex = 22;
        */
    // this.asignaRecno()

  }

  showComponents(Visible: boolean) {
    for (let i = 0; i < this.Form.main.length; i++) {
      const main = this.Form.main[i]

      if (
        this.Form[main].prop.Capture &&
        !this.Form[main].prop.updateKey
      ) {

        //   if (this.Form[main].prop.ReadOnly == Visible)
        //     this.Form[main].prop.ReadOnly = !Visible

        //   this.Form[main].prop.ReadOnly = false
        if (this.Form[main].prop.Visible != Visible)
          this.Form[main].prop.Visible = Visible;
      }
      if (this.Form[main].prop.Visible)
        this.Form[main].prop.Valid = false

    }

  }

  /// //////////////////////////////
  // Class method : bt_deleteClick
  // Description   : verifica si el proyecto tiene actividades antes de eliminar
  // Parameters   : none
  // Returns       : boolean
  /// //////////////////////////////
  override async bt_deleteClick() {

    const data = await SQLExec(`select sum(key_pri) as key_pri from vi_cap_comeapy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' and num_pry=${this.Form.num_pry.prop.Value}`)
    if (data[0].key_pri > 0) {
      await MessageBox('El proyecto ya tiene actividades registradas', 16, 'Error')
      this.bt_delete.prop.Visible = false
      return false
    }
    //this.bt_save.prop.Visible = false
    this.bt_actividades.prop.Visible = false;

    return await super.bt_deleteClick()
  };

  /// //////////////////////////////
  // Classe : bt_saveClick
  // Descripcion : despues de grabar datos
  /// //////////////////////////////
  override async bt_saveClick() {
    if (await super.bt_saveClick()) {
      this.Form.bt_actividades.Visible = true;
      return true
    }
    return false
  }

  /// //////////////////////////////
  // Classe : bt_modifyClick
  // Descripcion : Permite modificar datos
  /// //////////////////////////////
  override async bt_modifyClick() {
    super.bt_modifyClick()
    this.cod_nom.cliente_nuevo.cli_pry.prop.ReadOnly = this.cod_nom.prop.ReadOnly
    return
  }


} // End ThisForm
