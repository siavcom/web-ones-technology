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
  return texto.substring(0, lon);
};

export const right = async (texto: string, len: number) => {
  return texto.slice(-len);
};

export const char = async (ascci: number) => {
  return String.fromCharCode(ascci);
};

/////////////////////////////////////
// Funciones Fecha
////////////////////////////////////

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

export const dateToString = async (texto: Date) => {
  let date =
    texto != undefined && texto != null && texto != "" ? texto : "1900-01-01";

  if (texto == null || texto == undefined) {
    texto = new Date("1900-01-01 00:00:00");
  }
  return texto.toString();
};

export const currentTime = async () => {
  return await dateTimeToSql();
};

export const dateTimeToSql = async (stringDate?: string) => {
  let current: Date;
  if (!stringDate)
    current = new Date().toISOString();
  else
    current = new Date(stringDate).toISOString();

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

export const stringToDate = async (texto?: string) => {
  if (!texto || texto == null || texto == "") texto = "1900-01-01";

  let date = texto.slice(0, 10) + 'Z';

  return new Date(date).toISOString().substring(0, 10); // ISOString es formato 'AAAA-MM-DD'
};

export const stringToTime = async (texto?: string) => {
  if (!texto || texto == null || texto == "") texto = "1900-01-01T00:00";

  let date = texto.slice(0, 16) + 'Z'; //Se necesita la Z para que no le sume la hota de UTC
  return new Date(date).toISOString().substring(0, 16); // ISOString es formato 'AAAA-MM-DD'
};



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
  if (val.toString().includes(".")) {
    num = num + "." + val.toString().split(".")[1];
  }
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
    if (decimals > 0) decNumber = decNumber.slice(0, decimals + 1);

    num = intNumber + decNumber;
  } else result = num;

  result = sign < 0 ? "-" + num : num;
  if (result == "") result = "0";

  if (currency == "MXN" || currency == "EUR" || currency == "USD")
    result = "$" + result;
  else result = result + " " + currency.trim();
  // console.log("2 numberFormat result=", result);

  return result;
};

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
