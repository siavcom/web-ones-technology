//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema a dar mantenimiento
// Author : Fernando Cuadras Angulo
// Creacion : 4/Octubre /2022
// Ult.Mod  : 27/Noviembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class sis_sis extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.ColumnTextLabel = 'Sistema'
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = 'vi_cap_cometab.sis_sis'
    this.prop.Capture = true;
    this.prop.ToolTipText = 'Sistema al cual pertenece'
    this.prop.RowSource = " select '~SQL dictionary' as des_prg,'CFG' as sis_sis union \
                   select des_prg,sis_sis from vi_cap_prg where sis_sis > '    ' and  tpr_prg = 'S' ";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidth = "300px,50px";
    this.prop.Style = 2; //Typode comboBox 1=DropDown Combo 2=DropDown List 
    this.style.width = '200px' /* width/height  - initial value: auto */

  }

}
