//////////////////////////////////////////////
// Clase : tpr_prg
// Descripcion : TIPO DE PROGRAMA M=MANTENIMIENTO; R=REPORTE; P=PROCESO
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class tpr_prg extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Tipo de programa'
        this.prop.BaseClass = 'comboBox'
        this.prop.ToolTipText ='Tipo de programa'
        this.prop.RowSource = [
            ["Mantenimiento", "Reporte", "Proceso","Menu "],
            ["M", "R", "P","S"],
          ]; // vi_cap_doc.tdo_tdo,des_tdo
        this.prop.ControlSource = 'vi_cap_prg.tpr_prg'

        this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths='80%,10%'        
        this.style.width = '120px' /* width/height  - initial value: auto */
        this.prop.Visible=false
      }

  
  }
