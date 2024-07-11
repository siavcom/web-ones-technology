//////////////////////////////////////////////
// Clase : Funciones Generales
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 
/////////////////////////////////////////////

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