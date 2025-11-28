//////////////////////////////////////////////
// Clase : Init
// Descripcion : inicializa solo async
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2021
// Ult.Mod  : 30/May/2022
/////////////////////////////////////////////

import {
  toRef,
} from "vue";

export class INIT {
  //Init = async (Form?: any, est?: any) => {
  public async Init(Form?: any, est?: any) {
    try {

    }
    catch (error) {
      console.log('Error al inicializa la forma ', Form.value.Name, error)
    }

    return
  };
}
