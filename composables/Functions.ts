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
  return texto.substring(-len);
};

export const dateToString = async (texto: Date) => {
  let date =
    texto != undefined && texto != null && texto != "" ? texto : "1900-01-01";

  if (texto == null || texto == undefined) {
    texto = new Date("1900-01-01 00:00:00");
  }
  return texto.toString();
};

export const stringToDate = async (texto?: string) => {
  if (!texto || texto==null || texto=='') texto = "1900-01-01";
  let date =texto
  //  texto != undefined && texto != null && texto != "" ? texto : "1900-01-01";

  if (date.length == 10) date = date + " 00:00:00";
  console.log(
    "stringToDate texto=",
    date,
    "date=",
    new Date(date).toISOString().substring(0, 10)
  );
  date = date.slice(0, 19);
  date = date.replace("T", " ");
  return new Date(date).toISOString().substring(0, 10);
};

export const char = async (ascci: number) => {
  return String.fromCharCode(ascci);
};

export const multiFilter = (array, filters) => {
  return array.filter((o) =>
    Object.keys(filters).every((k) =>
      [].concat(filters[k]).some((v) => o[k].includes(v))
    )
  );
};

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
  console.log("1 numberFormat number=", val, num);
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
  if (currency == "MNX" || currency == "EUR" || currency == "USD") type = "$";

  result = type + result;
  console.log("2 numberFormat result=", result);

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

  if (!tipo) return $MessageBox(texto);

  if (!title) return $MessageBox(texto, tipo);
  if (!timer) return $MessageBox(texto, tipo, title);

  return $MessageBox(texto, tipo, title, timer);
}
