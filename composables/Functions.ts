//////////////////////////////////////////////
// Clase : Funciones Generales
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 
/////////////////////////////////////////////

//////////////////////////////////////
// Funciones String
//////////////////////////////////////
export const left = async (texto: string, lon: number) => {
  return texto.substring(0, lon)
}

export const right = async (texto: string, len: number) => {
  return texto.substring(-len)
}

export const dateToString = async (texto: Date) => {
  let date= texto != undefined && texto != null && texto != '' ? texto : '1900-01-01'


  if (texto==null || texto == undefined){
     texto=new Date('1900-01-01 00:00:00')
  }   
  return texto.toString()
}

export const stringToDate = async (texto: string) => {
  let date= texto != undefined && texto != null && texto != '' ? texto : '1900-01-01'
  if (date.length==10)
     date=date+' 00:00:00' 
  date=date.slice(0,19)  
  date=date.replace('T',' ')
  console.log('stringToDate texto=',texto,'date=',new Date(date).toISOString().substring(0,10))   
  return new Date(date).toISOString().substring(0,10)
}


export const char = async (ascci: number) => {
 return String.fromCharCode(ascci)
}

export const  multiFilter=(array, filters) =>{
  return array.filter(o =>
    Object.keys(filters).every(k =>
      [].concat(filters[k]).some(v => o[k].includes(v))));
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
    return $MessageBox(texto, tipo)
  if (!timer)
    return $MessageBox(texto, tipo, title)

  return $MessageBox(texto, tipo, title, timer)

}


