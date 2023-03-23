//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////
//import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'
import {queryGen} from '@/classes/queryGen/queryGen'
import {bt_print} from './bt_print'

export class reportForm extends FORM {
 public queryGen = new queryGen()
 public bt_print = new bt_print()

//  constructor(){
//    super()
//  }

}