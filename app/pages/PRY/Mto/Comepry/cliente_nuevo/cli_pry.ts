//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : cli_pry
// Description : Datos Json cuando es un cliente nuevo
// @author: El Fer Blocks
// Creation : 2024-12-13
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class cli_pry extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "json";
    this.prop.ControlSource = "vi_cap_comepry.cli_pry";
    this.prop.Capture = true;
    this.style.width = "99%";
    this.inputStyle.width = "min-content";
    this.inputStyle.display = 'flex';
    this.inputStyle.flexWrap = 'wrap';

  }
  /*
  override async when() {
    if (this.prop.Value == "") {


    }


  }
  */
}
/*
const a='{ "nom_nom": 
           {"type": "edit", 
            "label": "Nombre ",  
            "value": "",
            "readOnly":false , 
            "style":{"width":"auto"}}, 
         "dir_nom": 
           {"type": "edit", 
            "label": "Dirección ",  
            "value": "",
            "readOnly":false , 
            "style":{"width":"auto"}}, 
         "ext_nom": 
           {"type": "edit", 
            "label": "Exterior",  
            "value": "",
            "readOnly":false , 
            "style":{"width":"auto"}}, 
         "int_nom": 
           {"type": "edit", 
            "label": "Interior ",  
            "value": "",
            "readOnly":false , 
            "style":{"width":"auto"}}, 
         "cpo_nom": 
            {"type": "edit", 
             "label": "Codigo Postal ",  
             "value": "",
             "readOnly":false , 
             "style":{"width":"auto"}}, 
         "pob_nom": 
             {"type": "edit", 
              "label": "Población ",  
              "value": "",
              "readOnly":false , 
              "style":{"width":"auto"}}, 
         "pai_nom": 
              {"type": "edit", 
               "label": "Codigo Postal ",  
               "value": "",
               "readOnly":false , 
               "style":{"width":"auto"}}, 
           }'
*/