//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : num_pry
// Description : Número
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class num_pry extends COMPONENT {
  eqa_tap = '' // Equipo que autoriza
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Número";
    this.prop.Type = "number";
    this.prop.BaseClass = "editText";
    this.prop.ToolTipText = "Número de proyecto";
    this.prop.MaxLength = 16;
    this.prop.Min = "0";
    this.prop.Max = "2147483647";
    this.prop.InputMask = "999,999,999"
    this.prop.Decimals = 0;
    this.prop.ErrorMessage = "Número de proyecto inválido";
    this.inputStyle.width = "64px";
    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.width = "400px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    this.prop.Value = 0;
  }


  async init() {
    await super.init();
    this.when();
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async change() {
    const tpy_tpy = this.Parent.tpy_tpy.prop.Value


    // Asigna equipo de compras y supervision de este proyecto
    let data = await localAlaSql(`select eco_tpy,esu_tpy from now.cometpy where tpy_tpy='${tpy_tpy}'`)
    this.Form.eco_tpy = data[0].eco_tpy
    this.Form.esu_tpy = data[0].esu_tpy

    const ins_sql = `select eqa_tap,eco_tap from  vi_cap_cometap tap\ 
    join  vi_cap_cometac tac on tap.tap_tap=tac.tap_tap and tac.ctz_tap=1 \
     where  tpy_tpy='${tpy_tpy}' `

    data = await SQLExec(ins_sql)
    this.Form.eqa_tap = data[0].eqa_tap


    return
  }

  override async when() {
    this.Form.ver_cpy.prop.Disabled = true
    this.Form.est_pry.prop.Disabled = true
    this.Form.bt_clonar.prop.Visible = false
    this.Form.bt_cotizacion.prop.Visible = false
    this.Form.bt_pdf.prop.Visible = false
    this.Form.displayPdf.prop.Source = ''
    this.Form.displayPdf.prop.Visible = false

    this.Form.cod_nom.cliente_nuevo.close();

    console.log("when num_pry this.Form.tpy_tpy.prop.Value=", this.Form.tpy_tpy.prop.Value)
    if (this.Form.tpy_tpy.prop.Value.trim() == '') return true;


    await this.Form.tpy_tpy.when()
    await this.change()

    this.prop.Valid = true; // se pone en Verdadero para que no llame rutina validacion
    const data = await SQLExec(`         
           select max(num_pry) as num_pry from man_comepry where tpy_tpy='${this.Form.tpy_tpy.prop.Value}'`);

    if (data[0]) {
      //this.sw_when = true;
      if (data[0].num_pry == null)
        this.prop.Value = 1;
      else
        this.prop.Value = +data[0].num_pry;

      this.setFocus()
    }


    return true;
  }

  override async valid(): Promise<boolean> {

    if (this.prop.Value == 0) {
      this.prop.Focus = true
      return true

    }

    // busca el documento de tipo cotizacion del projecto

    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value,
      tap_tap: 'CTZ'

    }
    await use("vi_cap_comepry", m);
    const vi_cap_comepry = await goto(0, "vi_cap_comepry")

    if (vi_cap_comepry == null) {
      // await MessageBox("No existe el proyecto", 16, 'Error');

      return true;
    }

    this.Form.tip_tdn = vi_cap_comepry.tip_tdn

    // busca si esta en cotizacion y obtiene equipo de compras, autorizacion y supervision

    let data = await SQLExec(`\
    select est_apy,tap.tap_tap,eco_tap,eqa_tap,esu_tap,est_tap from vi_cap_cometap tap \
    join man_comeapy on tap.tap_tap=man_comeapy.tap_tap \
    where tap.tpy_tpy='${m.tpy_tpy}' and num_pry=${m.num_pry}  and ctz_tap=1 and est_apy='I' `)

    if (data.length == 0) {
      await MessageBox("El proyecto no esta en etapa de cotización", 16, 'Error');
      return false;
    }

    const eco_tpy = data[0].eco_tap.trim(); // equipo de compras
    const eqa_tap = data[0].eqa_tap.trim(); // equipo que autoriza
    // const esu_tap = data[0].esu_tap.trim(); // equipo que supervisa
    this.Form.eco_tpy = eco_tpy
    //this.Form.esu_tpy = esu_tap
    this.Form.eqa_tap = eqa_tap

    // checa si la actividad esta en cotizacion

    this.Form.Recno = this.Sql.View.vi_cap_comepry.recno
    this.Form.ver_cpy.prop.Disabled = false
    this.Form.est_pry.prop.Disabled = false
    this.Form.est_pry.when()

    if (await this.Form.ver_cpy.when())
      this.Parent.bt_cotizacion.prop.Visible = true

    // Checa si pertenece al equipo de compras

    console.log('num_pry valid eco_tpy=', eco_tpy, 'eqa_tap=', eqa_tap)
    data = await localAlaSql(`select equ_equ from equipos where rtrim(equ_equ)='${eco_tpy}' \
       or rtrim(equ_equ)='${eqa_tap}'  `)

    if (data.length > 0) {
      this.Form.grid_comecpy.detail_com.prop.Visible = true
      this.Form.bt_pdf.prop.Visible = false
      this.Form.bt_clonar.prop.Visible = false
      this.Form.bt_pdf.prop.Disabled = true
      this.Form.bt_clonar.prop.Disabled = true

    }
    else
      this.Form.grid_comecpy.detail_com.prop.Visible = false

    // Checa si pertenece al equipo de ventas
    data = await localAlaSql(`select equipos.equ_equ from now.equipos join vi_cap_comepry on equipos.equ_equ=vi_cap_comepry.equ_equ`)
    if (data.length && data[0].equ_equ.length > 0)
      this.Form.grid_comecpy.detail_vta.prop.Visible = true
    else
      this.Form.grid_comecpy.detail_vta.prop.Visible = false

    await this.Form.cod_nom.valid(this.Parent.cod_nom.value)


    return true
  }
}

