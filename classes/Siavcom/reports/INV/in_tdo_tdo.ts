//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : in_tdo_tdo
// Description : Tip de documento
// Author : El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class in_tdo_tdo extends COMPONENT {
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
    this.prop.MultiSelect = false;
    this.style.width = "auto";
    this.prop.RowSourceType = 4;

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  override async init() {
    var ins_loc = ''
    const data = await SQLExec(`select des_tdo,tdo_tdo,inv_tdo,cop_nom,nmo_tdo from man_cometdo where inv_tdo in ('S','E') and nmo_tdo >0 `, 'loc_cometdo')
    switch (this.Form.prop.Name) {
      case 'come3210':	//& tipo de analisis sobre ganancia
        this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where cop_nom='C' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
        break;
      case 'come3214':
        {
          var tip_cop = this.Form.Params[0].replaceAll("´", "")
          this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where cop_nom='${tip_cop}' and inv_tdo<>'N' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
          break;
        }
      case 'come3226':
        {
          this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where cop_nom='C' and inv_tdo<>'N'  order by des_tdo `
          break;
        }
      case 'come5203_gv':	//& tipo de analisis sobre ganancia
        {
          var tip_cop = this.Form.Params[0].replaceAll("´", "")
          if (tip_cop == "VE")
            tip_cop = 'C'
          else
            tip_cop = 'P'
          this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where cop_nom='${tip_cop}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
          break;
        }
      default:
        this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where inv_tdo='S' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
        break;
    }
    /*   if (this.Form.prop.Name=="come3210" )
          this.prop.RowSource=" select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where cop_nom='C' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo"
       if (this.Form.prop.Name=="come3214")
       {  var tip_cop=this.Form.Params[0].replaceAll("´","")
          this.prop.RowSource=` select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where cop_nom='${tip_cop}' and inv_tdo<>'N' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
       }
       else
         this.prop.RowSource = "select des_tdo,tdo_tdo,inv_tdo from Now.loc_cometdo where inv_tdo='S' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo "
      */ //  RowSourceType: 0, //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array

  }


  override async interactiveChange() {
    //    if (this.prop.Value.trim().length<4 && this.prop.Value.trim()!="??")
    if (this.prop.Value.length < 4) {
      const data = await this.Sql.localAlaSql(`select count(*) as key_pri from Now.loc_cometcd where tdo_tdo='${this.prop.Value}'`)
      console.log('dato=', data[0].key_pri)
      if (data[0].key_pri > 0) {
        if (this.Form.prop.Name == 'come3220' || this.Form.prop.Name == 'come3214')
          return true
        else {
          this.Parent.in_tcd_tcd.prop.RowSource =
            ` select des_tcd,tcd_tcd from Now.loc_cometcd where tdo_tdo='${this.prop.Value}' union select '  Todos ' as des_tcd,'??' as tcd_tcd order by des_tcd  `;
          this.Parent.in_tcd_tcd.prop.Visible = true;
          this.Parent.in_tcd_tcd.prop.Disabled = false;
          this.Parent.in_tcd_tcd.prop.Value = "??"
          this.Parent.in_tcd_tcd.prop.TabIndex = 3;

          return true
        }

      }
    }
    // no hay clasificacion de documentos, apagamos el elemento
    this.Parent.in_tcd_tcd.prop.Visible = false;
    this.Parent.in_tcd_tcd.prop.Disabled = true;
    this.Parent.in_tcd_tcd.prop.Value = "??"

    return true;
  } //
}

