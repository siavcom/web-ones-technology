//////////////////////////////////////////////
// Clase : Funciones Generales
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 
/////////////////////////////////////////////
/*
export class Functions {
  static Messagebox: any
*/

export const left = (texto: string, lon: number) => 
{  return texto.slice(0, lon)}



export async function left2(texto: string, lon: number) {
  return texto.slice(0, lon)

}

//////////////////////////////////////////////
// Clase : MessageBox
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 15/Enero/2023
/////////////////////////////////////////////

export async function MessageBox(texto: string, tipo?: number, title?: string, timer?: number) {
 
  const { $MessageBox } = useNuxtApp()

  if (!tipo) 
     return $MessageBox(texto)

  if (!title) 
     return $MessageBox(texto,tipo)
  if (!timer) 
    return  $MessageBox(texto,tipo,title)

  return  $MessageBox(texto,tipo,title, timer)

}



//}