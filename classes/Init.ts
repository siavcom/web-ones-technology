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
  public async Init(Form?: any, est?: any){
    try {
      /*
      if (Form) {
        const ThisForm=Form.value
        const estatus=est.value

        await ThisForm.Init() // Corremos el init de la forma
        for (const componente in ThisForm) {

          if (
            ThisForm[componente].prop &&       // Si tiene propiedades
            ThisForm[componente].prop.Capture &&  // Si es componete de captura
            ThisForm[componente].prop.Capture == true
          ) {
            // if (ThisForm[componente].Ref)
            // console.log('RefHtml===>', componente, ThisForm[componente].Ref.$el)
            console.log('Iniciando componentes de captura',componente)
            estatus[componente] = toRef(ThisForm[componente].prop, "Status"); // stack de estatus de componentes
          }
        }
        console.log("Inicio exitoso Init principal", ThisForm.Name)  //ThisForm,

      }
      */
    }
    catch (error) {
      console.log('Error al inicializa la forma ', Form.value.Name, error)
    }

    return
  };
}
