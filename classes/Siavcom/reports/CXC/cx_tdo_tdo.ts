//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cx_tdo_tdo
// Description : Tip de documento
// Author : MGSR
// Creation : 2025-06-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class cx_tdo_tdo extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Documento"; // Etiqueta que tendra este componente
    this.prop.BaseClass = "comboBox"; // Tipo de componente
    this.prop.ColumnCount = 3; // = VFP
    this.prop.BoundColumn = 2; // = VFP
    this.prop.ColumnWidths = "65%,20%,15%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "?? ";
    this.style.maxHeight = "200px";
    this.inputStyle.width = "300px";
    this.prop.MultiSelect = true;
    this.style.width = "auto";
    this.prop.RowSourceType = 4;

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  override async init() {
    var ins_loc = ''
    const data = await SQLExec(`select des_tdo,tdo_tdo,coa_tdo,cop_nom,inv_tdo from man_cometdo where coa_tdo in ('C','A') and cop_nom in ('C','P') `, 'loc_cometdo')
    switch (this.Form.prop.Name) {
      case 'come1207':	//& Relación de documentos
        {
          var tip_cop = this.Form.Params[0].replaceAll("´", "")
          this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from loc_cometdo where cop_nom='${tip_cop}' and coa_tdo='C' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo `
          break;
        }
      case 'come1211':	//& calculo de fluctuación
        {
          var tip_cop = this.Form.Params[0].replaceAll("´", "")
          this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from loc_cometdo where cop_nom='${tip_cop}' and coa_tdo=case when '${tip_cop}'='P' then 'A' else 'C' end union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo `
          break;
        }

      default: {
        var tip_cop = this.Form.Params[0].replaceAll("´", "")
        this.prop.RowSource = `select des_tdo,tdo_tdo,coa_tdo from loc_cometdo  where cop_nom='${tip_cop}'  and coa_tdo='C' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo `
        break;
      }
    }
  }


  override async interactiveChange() {
    //    if (this.prop.Value.trim().length<4 && this.prop.Value.trim()!="??")
    if (this.prop.Value.length < 4) {
      const data = await this.Sql.localAlaSql(`select count(*) as key_pri from loc_cometcd where tdo_tdo='${this.prop.Value}'`)
      console.log('dato=', data[0].key_pri)
      if (data[0].key_pri > 0) {
        if (this.Form.prop.Name == 'come1207')
          return true
        else {
          this.Parent.cx_tcd_tcd.prop.RowSource =
            ` select des_tcd,tcd_tcd from loc_cometcd where tdo_tdo='${this.prop.Value}' union select '  Todos ' as des_tcd,'??' as tcd_tcd order by des_tcd  `;
          this.Parent.cx_tcd_tcd.prop.Visible = true;
          this.Parent.cx_tcd_tcd.prop.Disabled = false;
          this.Parent.cx_tcd_tcd.prop.Value = "??"


          return true
        }

      }
    }
    // no hay clasificacion de documentos, apagamos el elemento
    this.Parent.cx_tcd_tcd.prop.Visible = false;
    this.Parent.cx_tcd_tcd.prop.Disabled = true;
    this.Parent.cx_tcd_tcd.prop.Value = "??"

    return true;
  } //
}

