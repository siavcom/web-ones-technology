//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : otro
// Description : Componente otro
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {imgButton} from "@/classes/imgButton";

import { COMPONENT } from "@/classes/Component";
//imports

export class otro extends IMGBUTTON {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "imgButton";


    this.prop.Caption = "\<Otro";

    this.prop.Name = "otro"; this.prop.TabIndex = 19;
    this.prop.Position = 'bottom';
    this.prop.Visible = false;
    this.style.width = "80px";

    //propiedades
  }
  // Evento   :Click 
  // Objeto  :otro 
  // Tipo   :Commandbuttom 
  // Comentarios : 
  // switch de release 

  override async click() {
    let m = {}   // inicializamos m


    if (recCount('vi_cap_alm') > 0) {  // reviza si tiene abierta la vista de captura de pagos 

      await select('vi_cap_alm')

      m = appendM(m, await scatterBlank())

      this.Form.Captura_alm.prop.RecordSource = ''  // pone en nulos el record source 

      await useNodata('vi_cap_alm') // use vi_cap_alm vi_cap_alm nodata  // abre la vista sin datos 


    } // End If 

    this.Form.cla_isu.prop.ReadOnly = false
    this.Form.cla_isu.refresh
    return


  }   // Fin Procedure

}