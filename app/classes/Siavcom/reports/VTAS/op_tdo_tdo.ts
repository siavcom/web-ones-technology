//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tdo_tdo
// Description : Tip de documento
// Author : El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class op_tdo_tdo extends COMPONENT {
   constructor() {
      super();
      this.prop.Caption = "Documento"; // Etiqueta que tendra este componente
      this.prop.BaseClass = "comboBox"; // Tipo de componente
      this.prop.RowSourceType = 4; //Tipo de combo Box (Similar a VFP)1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
      this.prop.ColumnCount = 3; // = VFP
      this.prop.BoundColumn = 2; // = VFP
      this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px
      this.prop.Value = "?? ";
      this.style.maxHeight = "200px";
      this.inputStyle.width = "300px";
      this.prop.MultiSelect = false;
      this.style.width = "auto";
      this.style.fontSize = '17px';
      this.inputStyle.fontSize = '17px'
      this.inputStyle.fontWeight = "bold";

      this.prop.ErrorMessage = "No hay documento seleccionado"

      //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
   }
   override async init() {
      const data = await SQLExec(`select des_tdo,tdo_tdo,coa_tdo,cop_nom,inv_tdo,nmo_tdo,tip_cfd,cer_cer from man_cometdo where cop_nom in ('C','P') `, 'loc_cometdo')
      var tip_cop = 'VE'
      if (this.Form.Params[0] && typeof this.Form.Params[0] == 'string')
         tip_cop = this.Form.Params[0].replaceAll("´", "")
      if (tip_cop == 'VE')
         tip_cop = 'C'
      if (tip_cop == 'CO')
         tip_cop = 'P'

      switch (this.Form.prop.Name) {
         case 'come5201':	//&  documentos
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}' and coa_tdo in ('C','A')  union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo `
               break;
            }
         case 'come5204':	//& Ventas por día
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}' and coa_tdo in ('C','A') and nmo_tdo>0 and inv_tdo<>'P' order by des_tdo `
               break;
            }
         case 'come5206':	//& Relación de documentos
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where cop_nom='${tip_cop}' and inv_tdo='P' order by des_tdo `
               this.prop.MultiSelect = true;
               break;
            }
         case 'come5208':	//& Insumos por surtir
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where cop_nom='${tip_cop}' and inv_tdo='P' order by des_tdo `
               this.prop.MultiSelect = true;
               break;
            }
         case 'come5212':	//& Estadisticas de ventas/compras
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}'  and nmo_tdo>0  and inv_tdo<>'P' order by des_tdo `
               break;
            }
         case 'come5213':	//& Análisis de ventas/compras
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}'  and nmo_tdo>0  and inv_tdo<>'P' order by des_tdo `
               break;
            }
         case 'come5217':	//& Comparativo de ventas/compras
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}'  and nmo_tdo>0  and inv_tdo<>'P' order by des_tdo `
               break;
            }
         case 'come5218':	//& Ventas por familia
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}'  and nmo_tdo>0  and inv_tdo<>'P' order by des_tdo `
               break;
            }
         case 'come3234':	//& Estadistica de insumos por documento
            {
               if (tip_cop == 'IN')
                  this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where inv_tdo<>'N'  and nmo_tdo>0  order by des_tdo `
               else
                  this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where cop_nom='${tip_cop}'  and nmo_tdo>0   order by des_tdo `
               break;
            }
         case 'come5226':	//& Estadistica de insumos por documento
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where cop_nom='${tip_cop}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo  order by des_tdo `
               break;
            }
         case 'come5227':	//& Estadistica de insumos por documento
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where cop_nom='${tip_cop}'and  CHARINDEX(tdo_tdo,(
               select val_dxm from comedxm where var_dxm='DOC_SUR' and nom_tab='COME5101'))>0
               union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as inv_tdo order by des_tdo `
               break;
            }
         case 'come5251':	//& CFDI'S
            {
               this.prop.RowSource = ` select des_tdo,tdo_tdo,tip_cfd from now.loc_cometdo where cop_nom='C' and tip_cfd in ('T ','I ','E ','P ')  and cer_cer <>' ' order by tip_cfd,des_tdo `
               break;
            }

         default: {
            this.prop.RowSource = ` select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where cop_nom='${tip_cop}' and coa_tdo in ('C','A')  union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo `
            break;
         }
      }

   }
   async interactiveChange() {
      //   En caso de tener clasificacion de documentos, llenamos comboBox de clasificacion
      const data = await this.Sql.localAlaSql(`select count(*) as key_pri from now.loc_cometcd where tdo_tdo='${this.prop.Value}'`)
      console.log('dato=', data[0].key_pri)
      if (data[0].key_pri > 0) {
         this.Parent.op_tcd_tcd.prop.RowSource =
            ` select des_tcd,tcd_tcd from now.loc_cometcd where tdo_tdo='${this.prop.Value}' union select '  Todos ' as des_tcd,'??' as tcd_tcd order by des_tcd  `;
         //for (let i = 0; i < columnas.length && !found; i++) {
         //   console.log('Buscando Valor comboBox Name=', props.prop.Name, 'i=', i, 'columnas=', columnas[i].value,  'Value.value=', Value.value)

         //if (columnas && columnas[0]) {
         // if ((typeof columnas[i].value == 'string' && typeof Value.value == 'string' && Value.value.trim() == columnas[i].value.trim()) ||
         //    Value.value == columnas[i].value) {


         // El objeto columna tiene dos campos value y text
         //   displayText.value = typeof columnas[i]['text'][0] == 'string' ? columnas[i]['text'][0].trim() : columnas[i]['text'][0]  // asigna el resultado a mostrar
         //    console.log('2) asignaValor  Encontro Valor comboBox Name=', This.Parent.prop.Name, props.prop.Name, 'displayText=', displayText.value, 'This.prop.Value=', This.prop.Value)
         //   found = true
         //     console.log('Found comboBox Name=', props.prop.Name, 'found ', 'Value=', Value.value, 'displayText.value=', displayText.value)

         //  } // else break
         this.Parent.op_tcd_tcd.prop.Visible = true;
         this.Parent.op_tcd_tcd.prop.Disabled = false;
         this.Parent.op_tcd_tcd.prop.Value = "??"
      }
      else {
         this.Parent.op_tcd_tcd.prop.Visible = false;
         this.Parent.op_tcd_tcd.prop.Disabled = true;
         this.Parent.op_tcd_tcd.prop.Value = "??"
      }
      return true;
   }

   //
   override async valid() {
      if (this.prop.Value == '') {
         //await MessageBox('Fecha inválida',6,'Error')
         return false
      }
      else
         return true
   }

}

