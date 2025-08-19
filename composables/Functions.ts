//////////////////////////////////////////////
// Clase : Funciones Generales
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  :
/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// Nuxt 4 :
//  -. Se debe de cambiar los componentes al directorio components/global
//  -. Se debe de aumentar el Lazy al nombre de cada componente
//  -. En el htnl en :is=":is="ThisForm[compFooter].prop.BaseClass" pasar directamente el nombre del componente en el que se va a trabajar
//
// Con el puro nombe y en el directorio /components/global
// const impComp= computed ((name:string) =>'Lazy'+name)
///////////////////////////////////////////////////////////////////////

// Vue components
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
import image from '@/components/image.vue'
import form from '@/components/form.vue'
import modalContainer from '@/components/modalContainer.vue'

// Sweetalert 2
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from "sweetalert2";
import fs from 'fs'
//import fs from 'fs/promises'; // Use fs.promises for async/await

const ThisForm = ref(null)
export const openForm = (This: any) => {
  ThisForm.value = This
}

//import modal from '@/components/modal.vue'
//////////////////////////////////////
// Funciones Varias
//////////////////////////////////////

/**
 * Appends two objects
 * @param {Object} valueA - The first object to merge
 * @param {Object} valueB - The second object to merge
 * @returns {Object} A new object with all properties of both objects
 */
export const appendM = (valueA: {}, valueB: {}): object => {
  return { ...valueA, ...valueB }
}

//////////////////////////////////////
// Funciones String
//////////////////////////////////////

/**
 * Checks if a string is null.
 * @param {string} data - The string to check
 * @returns {boolean} true if the string is null, false otherwise
 */
export const isNull = (data: string): boolean => {
  return data == null ? true : false;
}

export const nvl = (data: string | number, resultado: string | number) => {
  if (data == null)
    return resultado
  return data
}

/**
 * Converts a string to lower case.
 * @param {string} data - The string to convert
 * @returns {string} The converted string in lower case
 */
export const lower = (data: string): string => {
  return data.toLowerCase();
}
/**
 * Converts a string to upper case.
 * @param {string} data - The string to convert
 * @returns {string} The converted string in upper case
 */
export const upper = (data: string): string => {
  return data.toUpperCase();
}

/**
 * Generates a string with a specified number of spaces
 * @param {number} numero - The number of spaces to generate
 * @returns {string} A string with the specified number of spaces
 */
export const space = (numero: number): string => {
  return ' '.repeat(numero);
}

/**
 * Removes trailing carriage return and newline characters from the end of a string.
 * 
 * @param {string} input - The input string to be trimmed.
 * @returns {string} - The trimmed string with trailing \r\n removed.
 */

export const rTrim = (input: string): string => {
  const rTrimRegex = new RegExp('\r\n$');
  return input.replace(rTrimRegex, '');
}


/**
 * Removes leading carriage return and newline characters from the start of a string.
 * 
 * @param {string} input - The input string to be trimmed.
 * @returns {string} - The trimmed string with leading \r\n removed.
 */
export const lTrim = (input: string): string => {
  const lTrimRegex = new RegExp('^\r\n');
  return input.replace(lTrimRegex, '');
}

/**
 * Removes leading and trailing whitespace from the input string.
 * 
 * @param {string} input - The input string to be trimmed.
 * @returns {string} - The trimmed string with leading and trailing whitespace removed.
 */
export const allTrim = (input: string): string => {
  return input.trim();
}

/**
 * Converts a file to a string by reading its contents.
 * 
 * @param {string} file - The file whose contents are to be read.
 * @returns {Promise<string>} - A promise that resolves to the file contents as a string.
 */

function fileToStr(input: string): string {
  // const fs = require('fs');
  const contents = fs.readFileSync(input).toString()
  return contents
}

/**
 * Converts a string from a file to a Blob and creates a File object.
 * 
 * @param {string} input - The path to the file to be read and converted.
 * @returns {File} - A File object created from the string content of the file.

 */
function strToFile(input: string) {
  // const fs = require('fs');
  const blob = new Blob([input], { type: 'text/plain' });
  var file = new File([blob], input, { type: "text/plain" });
  return

}

/**
 * Returns the length of a string.
 * 
 * @param {string} strVariable - The string whose length is to be determined.
 * @returns {number} - The length of the string.
 */
export const len = (strVariable: string): number => {
  return strVariable.length()
}

/**
 * Searches for a value in an array, similar to the VFP ASscan() function.
 *
 * @param {T[]} array - The array to search.
 * @param {T} searchValue - The value to search for.
 * @param {number} [startElement=1] - The starting element to search from.
 * @param {number} [numElements=array.length] - The number of elements to search.
 * @param {number} [searchColumn] - The column to search in if the array contains arrays.
 * @returns {number} - The position of the found element, or 0 if not found.
 */
export function ascan<T>(array: T[], searchValue: T, startElement: number = 1, numElements: number = array.length, searchColumn?: number): number {
  if (startElement < 1 || startElement > array.length) {
    return 0;
  }

  let startIndex = startElement - 1;
  let endIndex = Math.min(startIndex + numElements, array.length);

  if (searchColumn !== undefined) {
    for (let i = startIndex; i < endIndex; i++) {
      if (Array.isArray(array[i]) && searchColumn > 0 && searchColumn <= (array[i] as any[]).length) {
        if ((array[i] as any[])[searchColumn - 1] === searchValue) {
          return i + 1;
        }
      }
    }
  } else {
    for (let i = startIndex; i < endIndex; i++) {
      if (array[i] === searchValue) {
        return i + 1;
      }
    }
  }
  return 0;
}

/**
 * Replicates a given string the specified number of times.
 *
 * @param {string} str - The string to replicate.
 * @param {number} lon - The number of times to replicate the string.
 * @returns {string} - The replicated string.
 */
export const replicateString = (str: string, lon: number): string => {
  const replicatedString: string = str.repeat(lon);
  return replicatedString

}

/**
 * Finds the position of a given substring in a string.
 *
 * @param {string} subStr - The substring to search for. Case sensitive
 * @param {string} str - The string to search in.
 * @returns {number} - The position of the found substring, or -1 if not found.
 */
export const at = (subStr: string, str: string): number => {
  return str.indexOf(subStr);
}


/**
 * Finds the position of a given substring in a string. 
 *
 * @param {string} subStr - The substring to search for.
 * @param {string} str - The string to search in.
 * @returns {number} - The position of the found substring, or -1 if not found.
 */
export const atc = (subStr: string, str: string): number => {
  subStr = subStr.toUpperCase()
  str = str.toUpperCase()
  return str.indexOf(subStr);
}

/**
 * Finds the last position of a given substring in a string.
 *
 * @param {string} searchString - The substring to search for. Case sensitive.
 * @param {string} text - The string to search in.
 * @returns {number} - The position of the found substring, or -1 if not found.
 */
export function rat(searchString: string, text: string): number {
  return text.lastIndexOf(searchString);
}

/**
 * Devuelve el código ASCII de un caracter
 * @param {string} char - Char.
 * @returns {number} - Código ASCII.
 */
export const asc = (letra: string): number => {
  return letra.charCodeAt(0)
}

/**
 * Left function
 * @param {string} texto - Texto a extraer a la izquierda
 * @param {number} lon - Longitud de la cadena a extraer
 * @returns {string} Cadena extraida a la izquierda
 */
export const left = (texto: string, lon: number): string => {
  return texto.substring(0, lon);
};


/**
 * Extracts a substring from a given string starting at a specified position.
 * 
 * @param {string} texto - The source string from which to extract the substring.
 * @param {number} first - The starting position (1-based index) from which to begin extraction.
 * @param {number} [lon] - The number of characters to extract. Defaults to the remainder of the string if not provided.
 * @returns {string} - The extracted substring.
 */

export const substr = (texto: string, first: number, lon?: number): string => {
  first = first - 1;
  if (!lon)
    lon = texto.length - first;

  return texto.substring(first, lon);
};


/**
 * Right function
 * @param {string} texto - Texto a extraer a la derecha
 * @param {number} len - Longitud de la cadena a extraer
 * @returns {string} Cadena extraida a la derecha
 */
export const right = (texto: string, len: number): string => {
  return texto.slice(-len);
};

/**
 * Char function
 * @param {number} ascci - ASCCI number
 * @returns {string} Character corresponding to the number
 */
export const char = (ascci: number): string => {
  return String.fromCharCode(ascci);
};


/**
 * Replaces all occurrences of a substring within a string with a new substring.
 * @param {string} stringSource - The original string to perform replacements on.
 * @param {string} stringSearch - The substring to search for within the original string.
 * @param {string} stringReplace - The substring to replace each occurrence of the search string with.
 * @returns {string} - The modified string with all occurrences of the search string replaced.
 */

export const strtran = (stringSource: string, stringSearch: string, stringReplace: string): string => {
  return stringSource.replaceAll(stringSearch, stringReplace);

};


/////////////////////////////////////
// Funciones Fecha
////////////////////////////////////

/**
 * Convierte una fecha tipo string en formato AAAA-MM-DD a tipo string en formato AAAAMMDD para SQL Server.
 * @param {string} fecha - Texto a convertir. Si no se pasa parametro, se devuelve la fecha actual.
 * @returns {string} - La fecha convertida a AAAAMMDD.
 */
export const dateToSql = (fecha: string): string => {
  const new_date = new Date(fecha).toISOString().slice(0, 10)
  return new_date.replaceAll("-", "");
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
export const dateToString = (texto: Date): string => {
  let date =
    texto != undefined && texto != null && texto != "" ? texto : "1900-01-01";

  if (texto == null || texto == undefined) {
    texto = new Date("1900-01-01 00:00:00");
  }
  // return texto.toString();
  return new Date(texto).toISOString()
};

/**
 * Returns the current time as a string in format 'AAAA-MM-DD HH24:MI:SS'
 * @returns {string} - The current time as a string in format 'AAAA-MM-DD HH24:MI:SS'
 */
export const currentTime = (): string => {
  return dateTimeToSql();
};

/**
 * Converts a date object to a string in the ISO format 'AAAA-MM-DDTHH24:MI:SS'
 * @param {string} stringDate - The date string to convert. If not passed, the current date is used.
 * @returns {string} - The date string in the ISO format 'AAAA-MM-DDTHH24:MI:SS'
 */
export const dateTimeToSql = (stringDate?: string): string => {
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
export const stringToDate = (texto?: string): string => {
  if (!texto || texto == null || texto == "" || texto == null)
    texto = "1900-01-01";
  let date = texto
  if (date.length >= 10)
    date = date.slice(0, 10) + 'Z';
  console.log('1) stringToDate date=', date)
  console.log('2) stringToDate date=', new Date(date).toISOString())
  console.log('3) stringToDate date=', new Date(date).toISOString().substring(0, 10))
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
export const stringToTime = (texto?: string): string => {
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
export const dayToMilliseconds = (day: number, Type?: string): number => {
  if (!Type || Type.slice(0, 0).toUpperCase() == "D")
    // Dias
    return day * 1000 * 60 * 60 * 24; //Como se puede ver, multiplicamos 1000 milisegundos por sesenta segundos, por sesenta minutos, por 24 horas
  if (Type.slice(0, 0).toUpperCase() == "W" || Type.slice(0, 0).toUpperCase() == "S")    // Semanas
    return day * 1000 * 60 * 60 * 24 * 7; // Por 7 dias de la semana
};


/**
 * Adds a specified number of days to a given date.
 *
 * @param {string} dateString - The initial date to which the days will be added.
 * @param {number} dias - The amount of days to add.
 * @returns {string} - A new date string with the specified days added.
 */
export function addDay(dateString: string, dias: number): string {
  const fechaActual = new Date(dateString);
  const fechaMilisegundos = fechaActual.getTime() + (dias * 24 * 60 * 60 * 1000);
  return new Date(fechaMilisegundos).toISOString().slice(0, 10); // ISOString es formato 'AAAA-MM-DD'
}

/**
 * Adds a specified number of months to a given date.
 *
 * @param {string} dateString - The initial date to which the months will be added.
 * @param {number} months - The amount of months to add.
 * @returns {string} - A new date string with the specified months added.
 */
export function addMonth(dateString: string, months: number): string {
  const fecha = new Date(dateString);
  let mes = fecha.getMonth();
  let año = fecha.getFullYear();
  let dia = fecha.getDate() + 1;
  let sumaAno = Math.trunc(months / 12)
  año = año + sumaAno
  months = months - Math.trunc(months / 12) * 12
  mes = mes + months
  if (mes > 11) {
    mes = mes - 12
    año++
  }
  if (mes < 0) {
    mes = mes + 12
    año--
  }

  const diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (año % 4 == 0 && año % 100 != 0 || año % 400 == 0) {
    diasMes[1] = 29 //Febrero tiene 29 dias si es bisiesto
  }

  if (dia > diasMes[mes])
    dia = diasMes[mes] //Si el dia es mayor al ultimo dia

  console.log('1) ThisForm init dia', dia, mes, año)

  return new Date(año, mes, dia).toISOString().slice(0, 10);

}

/**
 * Adds a specified number of years to a given date.
 *
 * @param {string} dateString - The initial date to which the years will be added.
 * @param {number} years - The amount of years to add.
 * @returns {string} - A new date string with the specified years added.
 */
export function addYear(dateString: string, years: number): string {
  let months = years * 12
  return addMonth(dateString, months);

}

/**
 * Adds a specified amount of time to a given date.
 *
 * @param {string} dateString - The initial date to which the time will be added.
 * @param {number} data - The amount of time to add.
 * @param {string} [tipo='D'] - The type of time to add. Can be 'Y' for years, 'M' for months, 'D' for days, or 'W' for weeks.
 * @returns {string} - A new date string with the specified time added.
 */
export const addDate = (dateString: string, data: any, tipo?: string): string => {

  if (!tipo)
    tipo = 'D';

  switch (tipo.toUpperCase()) {
    case 'M':
      return addMonth(dateString, data)
    case 'D':
      return addDay(dateString, data)
    case 'Y':
      return addYear(dateString, data)
    case 'W':
      tipo = 'day';
      data = data * 7;
      return addDay(dateString, data)
  }

  return addDay(dateString, data)
};


/**
 * Returns the day of the month from a given date string.
 * 
 * @param {string} dateString - The date string in format 'AAAA-MM-DD'.
 * @returns {number} - The day of the month as a number.
 */
export const day = (dateString: string): number => {

  const currentDate = new Date(dateString); // Creates a Date object for the current date and time
  return currentDate.getDate(); // Retrieves the day of the month
}


/**
 * Returns the month from a given date string.
 * 
 * @param {string} dateString - The date string in format 'AAAA-MM-DD'.
 * @returns {number} - The month as a number (1-12).
 */

export const month = (dateString: string): number => {
  const currentDate = new Date(dateString); // Creates a Date object for the current date and time
  return currentDate.getMonth() + 1; // Retrieves the month (0-11) and adds 1 to get the month number (1-12)  

}

/**
 * Returns the year from a given date string.
 * 
 * @param {string} dateString - The date string in format 'AAAA-MM-DD'.
 * @returns {number} - The year as a number.
 */

export const year = (dateString: string): number => {
  const currentDate = new Date(dateString); // Creates a Date object for the current date and time
  return currentDate.getFullYear();

}


/**
 * Returns the day of the week from a given date string.
 * 
 * @param {string} dateString - The date string in format 'AAAA-MM-DD'.
 * @returns {number} - The day of the week as a number (0-6), where 0 is Sunday and 6 is Saturday.
 */
export const getDay = (dateString: string): number => {
  const currentDate = new Date(dateString); // Creates a Date object for the current date and time
  return currentDate.getDay();
}



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
export const multiFilter = (array: [], filters: {}): Array<any> => {
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
 * Returns the integer part of a given number.
 * @param {number} numero - Number to get the integer part of.
 * @returns {number} - The integer part of the number.
 */
export const int = (numero: number) => {
  return Math.trunc(numero);
}


/**
 * Convierte un número en una cadena con separadores de miles, decimales y signo.
 * @param {number} val - Número a convertir.
 * @param {string} [currency] - Moneda a utilizar ('MXN', 'EUR', 'USD'). Default: ""
 * @param {number} [integers] - Número de enteros a mostrar. Default: 0
 * @param {number} [decimals] - Número de decimales a mostrar. Default: 0
 * @returns {string} - Cadena formateada.
 */
export const numberFormat = (
  val: number,
  currency?: string,
  integers?: number,
  decimals?: number
): string => {
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
    if (integers > 0) intNumber = right(intNumber, integers);

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

/**
 * Funcion que devuelve un valor dependiendo de una condicion.
 * Si la condicion es verdadera devuelve el primer valor, si es falsa devuelve el segundo.
 * @param condicion - condicion a evaluar
 * @param verdadero - valor a devolver si la condicion es verdadera
 * @param falso - valor a devolver si la condicion es falsa
 * @returns el valor devuelto dependiendo de la condicion
 */
export const iif = (condicion: boolean, verdadero: any, falso: any): any => {
  if (condicion) return verdadero;
  else return falso;

};

//////////////////////////////////////////////
// Clase : MessageBox
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 15/Enero/2023
/////////////////////////////////////////////
// 


/**
 * Muestra un mensaje de alerta con una serie de botones y iconos segun el tipo y los parametros pasados.
 * @param texto - Texto a mostrar en la alerta.
 * @param tipo - Tipo de alerta, puede ser 0 (Ok), 1 (Ok+Cancel), 2 (Abort,Retry,Ignore), 3 (Yes,No,Cancel), 4 (Yes,No), 5 (Retry,Cancel).
 * @param title - Titulo de la alerta.
 * @param timer - Tiempo en milisegundos que se muestra el mensaje antes de que se cierre automaticamente.
 * @returns Retorna el valor del boton que se ha seleccionado. Ok=6, Cancel=2, Abort=3, Retry=4, Ignore=5, Yes=6, No=7.
*/
export async function MessageBox(
  texto: string,
  tipo?: number,
  title?: string,
  timer?: number
) {

  //function sweetAlert(texto: string, tipo?: number, title?: string, timer?: number) {
  /// ////////////////////////////
  if (!tipo)
    tipo = 0

  let tip_ale = 'promp' // tipo de alerta 'promp'  'alert' 'confirm' 'warning'
  let icon = 'error' // tipo de icono  warning, error, success, info, and question
  // let showDenyButton = true
  let showCancelButton = true
  let showConfirmButton = true
  let showDenyButton = true

  let cancelButtonText = 'Cancel'
  let confirmButtonText = 'Ok'
  let denyButtonText = 'No'
  let timerProgressBar = false

  if (timer && timer > 5000) { timerProgressBar = true }

  cancelButtonText = '<i class="fa fa-thumbs-down"></i>'
  const confirmButtonAriaLabel = 'Thumbs up, correcto!'

  const reverseButtons = true

  let valor = tipo
  let val_ini = 512
  //  const sw_16 = false

  while (valor > 5) {
    valor = val_ini - valor
    if (valor > 5) { val_ini = val_ini / 2 }
  }
  //console.warn('messageBox 2',valor,tipo)

  switch (valor) {
    case 0: // ok
      //console.log('messagebox 0')

      icon = 'success'
      tip_ale = 'alert'
      showCancelButton = false
      showConfirmButton = true
      // confirmButtonText = 'OK'
      confirmButtonText = '<i class="fa fa-thumbs-up"></i> Great!'
      showDenyButton = false
      break
    case 1: // ok + cancel
      tip_ale = 'confirm'
      icon = 'info'
      showCancelButton = true
      showConfirmButton = true
      showDenyButton = false
      break
    case 2: // abort,retry and Ignore
      denyButtonText = 'Abortar'
      confirmButtonText = 'Retry'
      cancelButtonText = 'Cancel'

      tip_ale = 'confirm'
      icon = 'question'
      break
    case 3: // yes,no and cancel
      showCancelButton = true
      showConfirmButton = true
      showDenyButton = true
      tip_ale = 'confirm'
      icon = 'question'

      break
    case 4: // yes and no
      showCancelButton = false
      showConfirmButton = true
      showDenyButton = true
      tip_ale = 'confirm'
      icon = 'question'
      break
    case 5: // retry and cancel
      confirmButtonText = 'Reintentar'
      cancelButtonText = 'Abortar'
      showDenyButton = false
      icon = 'question'
      tip_ale = 'confirm'

      break

    default:
      break
  }

  valor = valor > 0 ? tipo - valor : tipo // restamos el primer resultado

  val_ini = 512
  while (valor > 16) {
    valor = val_ini - valor
    if (valor > 16) { val_ini = val_ini / 2 }
  }
  //console.warn('messageBox 3',valor,tipo)


  switch (valor) {
    case 16: // stop sign
      //console.log('messagebox 16')
      tip_ale = 'alert'
      icon = 'error'
      showCancelButton = false
      showConfirmButton = true
      // confirmButtonText = 'OK'
      showDenyButton = false
      break
    case 32: // Question mark
      tip_ale = 'promp'
      icon = 'question'
      break
    case 48: // Exclamation point
      tip_ale = 'warning'
      icon = 'info'
      showCancelButton = false
      showConfirmButton = false
      showDenyButton = false

      break
    case 64: // Information icon l
      tip_ale = 'alert'
      icon = 'info'
      break
    default:
      break
  }


  valor = valor > 0 ? tipo - valor : tipo // restamos el primer resultado        


  val_ini = 512
  while (valor > 511) {
    valor = val_ini - valor
    if (valor > 511) { val_ini = val_ini / 2 }
  }
  //console.warn('messageBox 4',valor,tipo)
  switch (valor) {
    case 256: // 2 button default
      break
    case 512: // 3 button
      break
    default:
      break
  }

  valor = tipo - valor // restamos el primer resultado

  /// ////////////////////////////////////////
  // Opciones Swal https://sweetalert2.github.io/
  /// ///////////////////////
  /*
  showConfirmButton true 	If set to false, a "Confirm"-button will not be shown.
  showDenyButton false 	If set to true, a "Deny"-button will be shown. It can be useful when you want a popup with 3 buttons.
  showCancelButton false 	If set to true, a "Cancel"-button will be shown, which the user can click on to dismiss the modal.
  confirmButtonText 'OK' 	Use this to change the text on the "Confirm"-button.
  denyButtonText 'No' 	Use this to change the text on the "Deny"-button.
  cancelButtonText 'Cancel' 	Use this to change the text on the "Cancel"-button.
  confirmButtonColor undefined 	Use this to change the background color of the "Confirm"-button. The default color is #3085d6
  denyButtonColor undefined 	Use this to change the background color of the "Deny"-button. The default color is #dd6b55
  cancelButtonColor undefined 	Use this to change the background color of the "Cancel"-button. The default color is #aaa
  confirmButtonAriaLabel '' 	Use this to change the aria-label for the "Confirm"-button.
 
  confirmButtonAriaLabel: 'Thumbs up, correcto!',
 
  denyButtonAriaLabel '' 	Use this to change the aria-label for the "Deny"-button.
  cancelButtonAriaLabel
 
  isConfirmed: false
  â€
  isDenied: true
  â€
  isDismissed: false
 
  */
  // No se importa swetAlert Ya que se importo desde cuando se hace la app de Vue
  let resultado = 0
  //await app.$swal({
  //const { swal } = useNuxtApp()
  //nuxtApp.provide('swal', Swal)

  /*
    const Alert = Swal.mixin({
      allowOutsideClick: false,
      reverseButtons: true,
    });
  */
  //const sw = Swal(); //useSwal();
  //console.log('Alert', sw)

  // Using plugin
  //const { $swal } = useNuxtApp()
  //await $swal.fire({
  await Swal.fire({
    title,
    text: texto,
    timer,
    timerProgressBar,
    reverseButtons,

    showConfirmButton,
    showCancelButton,
    showDenyButton,

    confirmButtonText,
    cancelButtonText,
    denyButtonText,

    confirmButtonAriaLabel,
    icon
  }).then((result) => {
    if (tip_ale === 'alert') { resultado = 0 } else {
      /*
            Ok 1
            Cancel 2
            Abort 3
            Retry 4
            Ignore 5
            Yes 6
            No 7
 
            */
      //          console.log('MessageBox resultado===>',tip_ale,result,result.isConfirmed)

      if (result.isConfirmed) { resultado = 6 }
      if (result.isDenied) { resultado = 7 }
      if (result.isDismissed) { resultado = 2 }
    }
  })
  //     console.log('MessageBox por aqui salio')
  return resultado
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
): Promise<void> {
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
export async function Dime2D(rows: number): Array<any> {
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
export async function objToLowerCase(data: {}): object {

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
export function roundTo(n: number, digits?: number): number {
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
export function impComponent(name: string): object {

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
    case 'image': {

      return image
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
