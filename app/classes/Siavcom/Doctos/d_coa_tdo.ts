//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_coa_tdo
// Description : Componente d_coa_tdo
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 07/08/25
// Update Date  :
/////////////////////////////////////////////

//imports

export class d_coa_tdo extends COMPONENT {
  //public
  constructor() {
    super();
    this.prop.BaseClass = 'textLabel'
    this.prop.ControlSource = "vi_cap_comedoc.coa_tdo";
    this.prop.RowSource = [
      ["Cargo", "Abono",],
      ["C", "A"]
    ];
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "64px,0px";

    this.inputStyle.width = '47px';
    this.prop.Disabled = true;
    this.inputStyle.color = 'black';

    //propiedades
  }

  //metodo
}