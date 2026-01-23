
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : Grid
// @class : vi_cap_cometac                                                  
// Description : Capture Grid
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { GRID } from '@/classes/Grid'

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { tap_tap } from "./tap_tap"
import { des_tap } from "./des_tap"
import { ctz_tap } from "./ctz_tap"

export class Grid extends GRID {

  public tap_tap = new tap_tap()
  public des_tap = new des_tap()
  public ctz_tap = new ctz_tap()

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    // this.Name = 'vi_cap_cometac                                                  '
    this.prop.Caption = ' '
    this.prop.RecordSource = 'vi_cap_cometac'
    this.prop.Visible = true
    this.prop.ReadOnly = false
    this.prop.autoLoad = true  // carga automaticamente la tabla en el grid
  }

}

