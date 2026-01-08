//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : comboBox
// Class : alm_tda
// Description : Componente alm_tda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {comboBox} from "@/classes/comboBox";

import { COMPONENT } from "@/classes/Component";
//imports

export class alm_tda extends COMPONENT {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "comboBox";
    this.prop.Caption = "Almacen";
    this.prop.Multiselect = false;
    this.prop.BoundColumn = 2;
    this.prop.ColumnCount = 2;
    this.prop.RowSourceType = 4;  // 4-LocalAlaSql

    this.prop.RowSource = "SELECT des_tda,alm_tda from vi_cap_tda ORDER BY des_tda";
    this.prop.ColumnWidths = "160px,30px";


    this.prop.Visible = false;

    //propiedades
  }
  override async when() {
    this.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos 

    return true
  }   // Fin Procedure



  // Evento   :LostFocus 
  // Objeto  :cla_isu 
  // Comentarios : 

  override async interactiveChange() {
    let m = {}   // inicializamos m
    this.Form.bt_aceptar.prop.Visible = true
    /*
        m.des_cla = this.Form.des_cla.prop.Value
        m.has_cla = this.Form.has_cla.prop.Value
        m.alm_tda = this.prop.Value
    
        const data1 = await use('vi_cap_alm', m) // use vi_cap_alm_cla vi_cap_alm_cla ALIAS  // esta vista es para la captura de almacenes 
    
        if (this.Form.sep_fam.prop.Value == 2) {  // si hay separacion por familias 
    
          let num_fam = this.Form.num_fam.prop.Value  // nÃºmero de familia 
    
          let pri_cla = at('-', Public.value.ima_pge, num_fam - 1) + 1
          let ult_cla = at('-', Public.value.ima_pge, num_fam)
    
          if (ult_cla == 0) {
            ult_cla = len(rTrim(Public.value.ima_pge)) + 1
          } // End If 
    
          this.prop.InputMask = replicateString('!', Public.value.ult_cla - Public.value.pri_cla)
    
    
        } // End If 
    
        this.Form.Captura_alm.ulr_act = 0  // inicializamos el ultimo rengon que se actualizo 
        this.Form.Captura_alm.sw_ins = false  // inicializamos el switch de insercion 
        this.Form.prop.key = 0  // inicializamos en 0 la ultima tecla 
    
        this.Form.Captura_alm.prop.RecordSource = 'vi_cap_alm'  // actualiza la tabla en el grid 
    */
    return true


  }   // Fin Procedure


  //metodo
}