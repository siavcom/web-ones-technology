//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : num_pry
// Description : Número
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class num_pry extends CAPTURECOMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Número";
    this.prop.Type = "number";
    this.prop.ControlSource = "vi_cap_comepry.num_pry";
    this.prop.ToolTipText = "Número de proyecto";
    this.prop.Min = "1";
    this.prop.Max = "2147483647";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.inputStyle.width = "64px";
    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.width = "400px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.Value = 1;

  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  override async when() {
    await super.when()
    await this.Form.tpy_tpy.when();

    // obtiene el ultimo numero de proyecto
    const data = await SQLExec(`         
           select max(num_pry)+1 as num_pry from man_comepry where tpy_tpy='${this.Form.tpy_tpy.prop.Value}'`);

    if (data[0]) {
      //  console.log("1 num_pry when data=", data[0], this.prop.Value);

      this.prop.Valid = true; // se pone en Verdadero para que no llame rutina validacion
      //this.sw_when = true;
      if (data[0].num_pry == null) this.prop.Value = 1;
      else this.prop.Value = +data[0].num_pry;
    }

    if (this.prop.Value == 0) this.prop.Value = 1;

    this.setFocus()
    return true;
  }

  override async valid(): Promise<boolean> {

    console.log('num_pry valid', this.prop.Value)

    if (this.prop.Value == 0) {
      return false;
    }
    this.Form.tpy_tpy.prop.Valid = true;


    let key_pri = 0;
    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value
    }

    let ins_sql = `select man_comepry.key_pri from man_comepry where man_comepry.tpy_tpy='${m.tpy_tpy}' and man_comepry.num_pry=${m.num_pry} ;\
    select key_pri from vi_cap_comepry where vi_cap_comepry.tpy_tpy='${m.tpy_tpy}' and vi_cap_comepry.num_pry=${m.num_pry} `
    const data = await SQLExec(ins_sql, "MEMVAR");
    // No hay datos o no tiene el usuario permiso de edicion del proyecto
    if (data[0] && !data[1]) {

      await MessageBox("No puedes modificar este número proyecto");
      // this.prop.Valid=false
      return false;
    }

    this.Form.Recno = 0;

    await nextTick()
    await super.valid();  // se llama a la validacion de la base para traer los datos del SQL Server

    this.Form.per_apy.prop.Value = 1;
    this.Form.per_apy.prop.Valid = true;

    //  console.log('valid num_pry=', await localAlaSql('select * from vi_cap_comepry'))
    const nom = await localAlaSql(`select key_pri,cop_nom,cod_nom from vi_cap_comepry`)

    // si ya existe el proyecto
    if (nom.length > 0 && nom[0].key_pri > 0) {
      // Buscas si ya hay registro en algun componete de captura
      this.Form.bt_actividades.prop.Visible = true;

      //this.Form.bt_delete.prop.Visible = true;

      if (this.Form.per_pry.prop.Value == "U")
        this.Form.per_apy.prop.Visible = false;
      else this.Form.per_apy.prop.Visible = true;

      console.log('3) validComponent num_pry this.Form.bt_modify.prop.Visible=', this.Form.bt_modify.prop.Visible)
      this.Form.cod_nom.codigoNuevo({ cop_nom: nom[0].cop_nom, cod_nom: nom[0].cod_nom })

    } else {
      this.Form.bt_actividades.prop.Visible = false;
      this.Form.per_apy.prop.Visible = false;
      this.Form.cod_nom.setFocus()

    }

    //    console.log('valid vi_cap_comepry=', await this.Sql.localAlaSql('select * from vi_cap_comepry'))
    const res = await this.Sql.localAlaSql(`select equ_equ,log_usu from now.vi_cap_comepry`)

    // lee todos los usuarios del equipo     
    this.Form.log_usu.prop.RowSource = `select nom_usu,log_usu from now.equusu  group by log_usu,nom_usu`
    this.Form.log_usu.prop.RowSourceType = 4;

    //if (res0.length == 0 || res0[0].key_pri == 0)
    //  this.Form.cod_nom.setFocus()
    console.log('validComponent num_pry this.Form.bt_modify.prop.Visible=', this.Form.bt_modify.prop.Visible)

    return true;
  }
}
