
//////////////////////////////////////////////
// Clase : grid
// Descripcion :Grid de mensajes que tiene la forma
// Author : Fernando Cuadras Angulo
// Ult.Mod  : 4/Marzo/2025
/////////////////////////////////////////////

import { GRID } from '@/classes/Grid'
// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import { messageText } from './messageText'
import { titleBarText } from './titleBarText'

export class gridMessages extends GRID {

  public messageText = new messageText()
  public titleBarText = new titleBarText()


  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.Name = 'gridMessages'
    this.prop.textLabel = 'Mensajes de la forma'
    this.prop.Visible = true
    //  this.prop.autoLoad = true
  }

  //////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow_old() {
    // Obtiene el consecutivo con_ind del cursor local

    const data = await this.Form.db.VfpCursor("select max(num_ind) as num_ind from vi_cap_comeind ")

    console.log('appendRow', data[0])

    let num_ind = data[0].num_ind + 1
    if (num_ind == undefined ||
      Number.isNaN(num_ind))
      num_ind = 1
    // asigna campos que no estan en el grid
    const m = {
      nom_tab: this.Form.nom_tab.prop.Value.trim(),
      num_ind: num_ind
    }
    console.log('appendRow', m)
    await super.appendRow(m) // llama a la clase base

  }



}
