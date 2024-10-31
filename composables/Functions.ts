//////////////////////////////////////////////
// Clase : Funciones Generales
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  :
/////////////////////////////////////////////

import imgButton from '@/components/imgButton.vue'
import comboBox from '@/components/comboBox.vue'
import editText from '@/components/editText.vue'
import textLabel from '@/components/textLabel.vue'
import grid from '@/components/grid.vue'
import browse from '@/components/browse.vue'
import details from '@/components/details.vue'
import embedPdf from '@/components/embedPdf.vue'
import container from '@/components/container.vue'
import base64 from '@/components/base64.vue'
import form from '@/components/form.vue'
import modalContainer from '@/components/modalContainer.vue'
import modal from '@/components/modal.vue'

//////////////////////////////////////
// Funciones String
//////////////////////////////////////

/**
 * Devuelve el código ASCII de un caracter
 * @param {string} char - Char.
 * @returns {number} - Código ASCII.
 */
export const asc = (letra: string) => {
  return letra.charCodeAt(0)
}

/**
 * Left function
 * @param {string} texto - Texto a extraer a la izquierda
 * @param {number} lon - Longitud de la cadena a extraer
 * @returns {string} Cadena extraida a la izquierda
 */
export const left = async (texto: string, lon: number) => {
  return texto.substring(0, lon);
};

/**
 * Right function
 * @param {string} texto - Texto a extraer a la derecha
 * @param {number} len - Longitud de la cadena a extraer
 * @returns {string} Cadena extraida a la derecha
 */
export const right = async (texto: string, len: number) => {
  return texto.slice(-len);
};

/**
 * Char function
 * @param {number} ascci - ASCCI number
 * @returns {string} Character corresponding to the number
 */
export const char = async (ascci: number) => {
  return String.fromCharCode(ascci);
};

/////////////////////////////////////
// Funciones Fecha
////////////////////////////////////

/**
 * Convierte una fecha tipo string en formato AAAA-MM-DD a tipo string en formato AAAAMMDD para SQL Server.
 * @param {string} fecha - Texto a convertir. Si no se pasa parametro, se devuelve la fecha actual.
 * @returns {string} - La fecha convertida a AAAAMMDD.
 */
export const dateToSql = async (fecha: string) => {
  return fecha.replaceAll("-", "").slice(0, 8);
};

/*
export const dateTimeToSql = async (time: string) => {
  time = time.replaceAll("T", " ");

  const formato = " 00:00:00";
  const long = 19 - time.length;
  if (long > 0) time = time + formato.slice(-long);
  else time = time.slice(0, 19);

  time = new Date(time);
  let cDate =
    time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
  let cTime =
    time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

  return (dateTime = cDate + " " + cTime);
};
*/

/**
 * Convierte una fecha tipo Date en una cadena tipo string.
 * @param {Date} texto - Fecha a convertir. Si no se pasa parametro, se devuelve la fecha "1900-01-01".
 * @returns {string} - La fecha convertida en una cadena tipo string.
 */
export const dateToString = async (texto: Date) => {
  let date =
    texto != undefined && texto != null && texto != "" ? texto : "1900-01-01";

  if (texto == null || texto == undefined) {
    texto = new Date("1900-01-01 00:00:00");
  }
  return texto.toString();
};

/**
 * Returns the current time as a string in format 'AAAA-MM-DD HH24:MI:SS'
 * @returns {string} - The current time as a string in format 'AAAA-MM-DD HH24:MI:SS'
 */
export const currentTime = async () => {
  return await dateTimeToSql();
};

/**
 * Converts a date object to a string in the ISO format 'AAAA-MM-DDTHH24:MI:SS'
 * @param {string} stringDate - The date string to convert. If not passed, the current date is used.
 * @returns {string} - The date string in the ISO format 'AAAA-MM-DDTHH24:MI:SS'
 */
export const dateTimeToSql = async (stringDate?: string) => {
  let current: Date;
  if (!stringDate)
    current = new Date() //.toISOString();
  else
    current = new Date(stringDate) // .toISOString();

  const cero = "0";
  const year = current.getFullYear() + "-";
  let month = current.getMonth() + 1 + "-";
  if (month.length == 2) month = cero + month;

  let day = current.getDate().toString();

  if (day.length == 1) day = cero + day;
  let cDate = year + month + day;

  let hours = current.getHours() + ":";
  if (hours.length == 2) hours = cero + hours;

  let minutes = current.getMinutes() + ":";
  if (minutes.length == 2) minutes = cero + minutes;

  let seconds = current.getSeconds().toString().trim();

  if (seconds.length == 1) seconds = cero + seconds;

  let cTime = "T" + hours + minutes + seconds;

  let dateTime = cDate + cTime;
  return dateTime;
};

/**
 * Convert a string to a date.
 * @param {string} [texto] A string in the format 'AAAA-MM-DD'
 * or 'AAAA-MM-DDTHH:MM:SSZ'. If not provided, the function
 * will return the date '1900-01-01'.
 * @returns {string} The date in the format 'AAAA-MM-DD'
 */
export const stringToDate = async (texto?: string) => {
  if (!texto || texto == null || texto == "" || texto == null)
    texto = "1900-01-01";
  let date = texto
  if (date.length >= 10)
    date = date.slice(0, 10) + 'Z';
  console.log('stringToDate date=', date)
  return new Date(date).toISOString().substring(0, 10); // ISOString es formato 'AAAA-MM-DD'
};

/**
 * Convierte una cadena de texto en una fecha tipo ISOString.
 * Si no se pasa parametro, se devuelve la fecha actual.
 * El formato de entrada debe ser "AAAA-MM-DDTHH:MM" o "AAAA-MM-DD".
 * El formato de salida es "AAAA-MM-DDTHH:MM"
 * @param {string} texto - Texto a convertir. Si no se pasa parametro, se devuelve la fecha actual.
 * @returns {Promise<string>} - La fecha convertida a ISOString.
 */
export const stringToTime = async (texto?: string) => {
  if (!texto || texto == null || texto == "" || texto == undefined) texto = "1900-01-01T00:00";

  let date = texto.slice(0, 16) + 'Z'; //Se necesita la Z para que no le sume la hota de UTC
  return new Date(date).toISOString().substring(0, 16); // ISOString es formato 'AAAA-MM-DD'
};


/**
 * Convierte dias o semanas en milisegundos.
 * Si Type es nulo o 'D', se convierten dias a milisegundos.
 * Si Type es 'W' o 'S', se convierten semanas a milisegundos.
 * @param {number} day - Numero de dias o semanas a convertir.
 * @param {string} [Type] - Tipo de conversion. 'D' para dias, 'W' para semanas, 'S' para semanas.
 * @returns {Promise<number>} - El numero de milisegundos correspondiente.
 */
export const dayToMilliseconds = async (day: number, Type?: string) => {
  if (!Type || Type.slice(0, 0).toUpperCase() == "D")
    // Dias
    return day * 1000 * 60 * 60 * 24; //Como se puede ver, multiplicamos 1000 milisegundos por sesenta segundos, por sesenta minutos, por 24 horas
  if (Type.slice(0, 0).toUpperCase() == "W" || Type.slice(0, 0).toUpperCase() == "S")    // Semanas
    return day * 1000 * 60 * 60 * 24 * 7; // Por 7 dias de la semana
};

////////////////////////////////////////////////////
// Suma fecha
// date : date
// data : data to sum
// tipo : type ( 'D'=days,'W'=weeks, 'M'=months, Null=date)

/**
 * Suma una fecha.
 * @param {Date} date - Fecha a sumar.
 * @param {number} data - Numero de dias o semanas a sumar.
 * @param {string} [tipo] - Tipo de suma. 'D' para dias, 'W' para semanas, 'M' para meses, 'Y' para a os.
 * @returns {Promise<string>} - La fecha resultante en formato 'AAAA-MM-DD'.
 */
export const addDate = async (date: Date, data: any, tipo?: string) => {
  const thisDate = new Date(date);
  if (!tipo)
    tipo = 'D'
  /*
    if (tipo == "W" || tipo == "S" || tipo == "D") {
      return new Date(thisDate.getTime() + (await dayToMilliseconds(data, tipo)))
        .toISOString()
        .substring(0, 10); // ISOString es formato 'AAAA-MM-DD'
    }
  */


  let day = +thisDate.toISOString().slice(8, 10)
  let year = thisDate.getFullYear();
  let month = thisDate.getMonth();

  if (tipo == "W") day = day + data * 7;

  if (tipo == "D") day = day + data;

  if (tipo == "Y") year = year + data;

  if (tipo == "M") month = month + data;

  return new Date(year, month, day).toISOString().substring(0, 10); // ISOString es formato 'AAAA-MM-DD'
};

///////////////////////////////////////////////
// Funciones para arreglos de objetos
///////////////////////////////////////////////

// Filtra un array segun el valor del filter= { Position: "header" }

/**
 * Filtra un array segun el valor del filter= { Position: "header" }
 * @param {Array} array - Arreglo de objetos.
 * @param {Object} filters - Objeto con las claves y valores a filtrar, ejemplo. { Position: "header" }
 * @returns {Array} - Un nuevo array con los elementos filtrados.
 */
export const multiFilter = (array: [], filters: {}) => {
  return array.filter((o) =>
    Object.keys(filters).every((k) =>
      [].concat(filters[k]).some((v) => o[k].includes(v))
    )
  );
};



///////////////////////////////////////////////
// Funciones de números
///////////////////////////////////////////////

/**
 * Convierte un número en una cadena con separadores de miles, decimales y signo.
 * @param {number} val - Número a convertir.
 * @param {string} [currency] - Moneda a utilizar ('MXN', 'EUR', 'USD'). Default: ""
 * @param {number} [integers] - Número de enteros a mostrar. Default: 0
 * @param {number} [decimals] - Número de decimales a mostrar. Default: 0
 * @returns {string} - Cadena formateada.
 */
export const numberFormat = async (
  val: number,
  currency?: string,
  integers?: number,
  decimals?: number
) => {
  if (!currency) currency = "";
  if (!integers) integers = 0;
  if (!decimals) decimals = 0;

  // remove sign if negative
  var sign = 1;
  if (val < 0) {
    sign = -1;
    val = -val;
  }

  // trim the number decimal point if it exists
  let num = val.toString().includes(".")
    ? val.toString().split(".")[0]
    : val.toString();

  while (/(\d+)(\d{3})/.test(num.toString())) {
    // insert comma to 4th last position to the match number
    num = num.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }

  // add number after decimal point
  // si la funcion nos da un verdadero significa que tiene punto decimal
  if (val.toString().includes(".")) {
    // aumentamos los decimales
    num = num + "." + val.toString().split(".")[1] + '0000000000'; // Obtiene los decimales y los agrega
  } else
    num = num + ".000000000000"

  // console.log("1 numberFormat number=", val, num);
  // return result with - sign if negative
  const point = num.indexOf(".");
  let result = "";
  let intNumber = "";
  let decNumber = "";
  let type = "";
  if (point > 0) {
    intNumber = num.slice(0, point);
    if (integers > 0) intNumber = await right(intNumber, integers);

    decNumber = num.slice(point, num.length);
    if (decimals > 0)
      decNumber = decNumber.slice(0, decimals + 1);
    else
      decNumber = decNumber.slice(0, decimals);

    num = intNumber + decNumber;
  } else result = num;

  result = sign < 0 ? "-" + num : num;
  if (result == "") result = "0";

  if (currency == "MXN" || currency == "EUR" || currency == "USD")
    result = "$" + result;
  else result = result + " " + currency.trim();
  // console.log("2 numberFormat result=", result);

  return result.trim();
};

//////////////////////////////////////////////
// Fucniones varias
//////////////////////////////////////////////

//////////////////////////////////////////////
// Clase : MessageBox
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 15/Enero/2023
/////////////////////////////////////////////

export async function MessageBox(
  texto: string,
  tipo?: number,
  title?: string,
  timer?: number
) {
  const { $MessageBox } = useNuxtApp();

  if (!tipo) return await $MessageBox(texto);

  if (!title) return await $MessageBox(texto, tipo);
  if (!timer) return await $MessageBox(texto, tipo, title);

  return await $MessageBox(texto, tipo, title, timer);
}

//////////////////////////////////////////////
// Clase : delay
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 15/Enero/2023
/////////////////////////////////////////////

/**
 * Delay the execution of the next line of code by a given number of milliseconds.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} - A promise that resolves after the given number of milliseconds has passed.
 */
export async function Delay(
  ms: number
) {
  await new Promise(f => setTimeout(f, ms));


}

//////////////////////////////////////////////
// Clase : Dime2DArray
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2024
// Ult.Mod  : 24/Julio/2024
// Descripcion: Crea un array de dos dimensiones
/////////////////////////////////////////////


/**
 * Crea un array de dos dimensiones con la cantidad de filas especificadas
 * @param {number} rows - La cantidad de filas que se desean en el array
 * @returns {array} - Un array de dos dimensiones con la cantidad de filas especificadas
 */
export async function Dime2D(rows) {
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}
////////////////////////////////////////////

//////////////////////////////////////////////
// Clase : objetToLowercase
// Author : Fernando Cuadras Angulo
// Creacion :Septiembre /2024
// Descripcion: recorre un objeto y pasa sus nombres a lowercase Crea un array de dos dimensiones
/////////////////////////////////////////////

/**
 * objToLowerCase
 * 
 * Recorre un objeto y pasa sus nombres a lowercase
 * 
 * @param {object} data - objeto a recorrer
 * @returns {object} objeto con nombres de propiedades en lowercase
 */
export async function objToLowerCase(data: {}) {

  const objeto = {}
  for (const ele in data) {
    objeto[ele.toLowerCase()] = data[ele]
  }

  console.log('objToLowerCase res=', objeto)
  return objeto

}

/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} n The number to round.
 * @param {number} [digits=0] The number of decimal places to round to.
 * @returns {number} The rounded number.
 */
export function roundTo(n: number, digits?: number) {
  if (!digits) {
    digits = 0;
  }

  let multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = (Math.round(n) / multiplicator);
  return +(test.toFixed(digits));
}

export function sleep(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}




/**
 * Importa un componente de manera asíncrona
 * @param {string} name nombre del coponente a importar
 * @returns {object} componente importado.
 * Nota : No se pude definir defineAsyncComponent(()
 *   proboca multiples reloads
 */
export function impComponent(name: string) {

  name = name.toLowerCase()
  switch (name) {
    case 'edittext': {
      return editText
    }
    case 'combobox': {
      return comboBox
    }
    case 'imgbutton': {
      return imgButton
    }
    case 'details': {
      return details
    }
    case 'container': {
      return container
    }
    case 'modalcontainer': {
      return modalContainer
    }
    case 'base64': {

      return base64
    }
    case 'textlabel': {
      return textLabel
    }
    case 'embedpdf': {
      return embedPdf
    }
    case 'grid': {
      return grid
    }
    case 'modal': {
      return modal
    }

    case 'browse': {
      return browse
    }
    default: {
      return editText
    }
  }
}
//////////////////////////////////////////////
// Clase : consoleLog
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 15/Enero/2023
/////////////////////////////////////////////

export async function consoleLog(
  men1: any,
  men2?: any,
  men3?: any,
  men4?: any,
  men5?: any,
  men6?: any,
  men7?: any,
  men8?: any,
  men9?: any,
  men10?: any
) {
  if (!men2) {
    console.log(men1);
    return;
  }

  if (!men3) {
    console.log(men1, men2);
    return;
  }

  if (!men4) {
    console.log(men1, men2, men3);
    return;
  }

  if (!men5) {
    console.log(men1, men2, men3, men4);
    return;
  }

  if (!men6) {
    console.log(men1, men2, men3, men4, men5);
    return;
  }

  if (!men7) {
    console.log(men1, men2, men3, men4, men5, men6);
    return;
  }

  if (!men8) {
    console.log(men1, men2, men3, men4, men5, men6, men7);
    return;
  }

  if (!men9) {
    console.log(men1, men2, men3, men4, men5, men6, men7, men8);
    return;
  }

  if (!men10) {
    console.log(men1, men2, men3, men4, men5, men6, men7, men8, men9);
    return;
  }
  console.log(men1, men2, men3, men4, men5, men6, men7, men8, men9, men10);
  return;
}
