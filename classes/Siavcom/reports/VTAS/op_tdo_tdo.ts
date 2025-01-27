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
    this.prop.textLabel = "Documento"; // Etiqueta que tendra este componente
    this.prop.BaseClass = "comboBox"; // Tipo de componente
    this.prop.RowSourceType = 3; //Tipo de combo Box (Similar a VFP) 1-Value, 2-Alias local SQL ,3-Serv SQL 5-Array
    this.prop.RowSource =
      "select des_tdo,tdo_tdo,inv_tdo from man_cometdo where cop_nom='C' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo";
    this.prop.ColumnCount = 3; // = VFP
    this.prop.BoundColumn = 2; // = VFP
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "?? ";
   
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  async interactiveChange() {
      
      this.Parent.op_tcd_tcd.prop.RowSource =
       ` select des_tcd,tcd_tcd from man_cometcd where tdo_tdo='${this.prop.Value}' union select '  Todos ' as des_tcd,'??' as tcd_tcd order by des_tcd  `;
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
      
  
       this.Parent.op_tcd_tcd.prop.Visible=true;
      this.Parent.op_tcd_tcd.prop.Disabled=false;
      return true;
      }

  } //


