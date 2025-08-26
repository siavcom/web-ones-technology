//////////////////////////////////////////////
// Clase : Celda de un gridd
// Author : Fernando Cuadras Angulo
// Creacion : Noviembre/2021
// Ult.Mod  : Agosto/2025
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";


export class COLUMN extends COMPONENT {
  //  constructor(parent: Record<string, never>) {

  Order = 1;
  BaseClass = "Column";
  // textLabel = "";
  headerStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#000000',
    minWidth: '-moz-available',
    background: '#dfdcdc',
    borderRadius: '5%',
    height: '30px',
    lineHeight: '11px',
    textAlign: '-moz-center'
  }



  constructor() {
    super();
    this.prop.Capture = true;
    this.prop.Valid = false;
    this.prop.Position = "main";
    this.style.width = "99%";
    this.style.height = "auto"; //99%";
    this.style.fontSize = '13px'
    this.style.fontWeight = 'bold'
    this.style.color = '#000000'
    this.inputStyle.width = "96%";
    this.inputStyle.height = "auto";  // auto para que en los componentes como json,
    this.captionStyle.textAlign = '-webkit-center'
  }

  public override async init() {
    if (this.prop.BaseClass == 'imgButton') {
      this.style.width = "26px"
      this.style.height = "auto"
      this.style.textAlign = '-moz-center'
      this.style.background = 'white'
      this.style.color = 'black'
      this.captionStyle = {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        minWidth: '-moz-available',
        background: '#dfdcdc',
        borderRadius: '5%',
      }
      this.inputStyle.background = 'white'
      this.inputStyle.color = 'black'
    }
  }

  override async valid() {
    return await this.Parent.validColumn(this);
  }
}
