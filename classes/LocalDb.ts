
//////////////////////////////////////////////
// Clase : LocalDb
// Descripcion : Maneja el indexedDb, Abre, lee y graba
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
// Ult.Mod  : 21/Ags/2021.- Se implementa jsStore para el manejo indexedDb donde quedara guardara los datos
//                           recuperados de la base de datos
/////////////////////////////////////////////

//import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);
import { newLocalDb } from "@/services/jsstore_con_new";
import { oldLocalDb } from "@/services/jsstore_con_old";
import alasql from "alasql"

export class localDb {
  // propiedades de las clases
  ControlSource: string;
  sw_open: boolean;
  name='localDb'
  Form={}

  constructor() {
    this.sw_open = false;
    this.ControlSource = '';
  }

  ///////////////////////////////////////////////////////////
  /// manejo de localDb (indexedDb)
  //////////////////////////////////////////////////////////
  open = async () => {
    if (this.sw_open) return true;
    const newDb = {
      name: "New",
      tables: []
    };
    const oldDb = {
      name: "Old",
      tables: []
    };


    try {
      await newLocalDb.initDb(newDb);
      await oldLocalDb.initDb(oldDb);
      this.sw_open = true; // marcamos como abierta la localDb
      alasql('ATTACH INDEXEDDB DATABASE new;\
              ATTACH INDEXEDDB DATABASE old')
      return true;
      //  console.log('EditBox abre localDb=======>')
    }
    catch (error) {
      console.log("Error localDb ",error)
      /*VueSimpleAlert.alert(
        error,
        "Error localDb ",
        "error"
      );*/
      return false;
    }
  }


  ////////////////////////////////////////////////////
  // Lee Value de la tabla local
  /////////////////////////////////////////
  select = async (tabla:string,where : Record<string, never>) => {
    /*
    const ControlSource = this.ControlSource;
    if (ControlSource == "") return;
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) return; // si no hay definida vista
    const nom_cam = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    */
 
    await this.open().then(async (resultado) => { // abre LocalDb
      const select = await newLocalDb.select({
        from: tabla,
        where : where 
        
      });
      return select
      /*
      // Asigna valor 
      if (select.lenght > 0) {
        console.log("Lee LocalDb======>>>>>>>>" + ControlSource, select, select.lenght);

        return select[0][nom_cam];
      } */
    })
  };

  ////////////////////////////////////////////////////
  // Graba Value de la tabla local
  /////////////////////////////////////////
  update = async (Value: any) => {
  //async update(Value: any) {
    const ControlSource = this.ControlSource;
    if (ControlSource == "") return; // No  hay ControlSource
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) return; // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

    console.log('Actualizara localDb componente =>', ControlSource, Value);
      if (!this.sw_open) await this.open(); // abre LocalDb
    console.log('LocaDB Abierta');
   
    const rec_sel: any = await newLocalDb.select({
      from: 'recno',
    });
    console.log('Lectura de recno LocaDB ',rec_sel);

    if (!rec_sel[0][tabla]) {
      alert('LocalDB : No existe la tabla de recnos ' + tabla);
      console.log('LocalDB : No existe la tabla ' + tabla + ' Campo ' + campo, rec_sel);
      return;
    }
    if (rec_sel[0][tabla] == null) return // tabla vacia
    console.log(' localDb Lectura de recno =>', rec_sel[0][tabla]);


    const recno = rec_sel[0][tabla]
    const updated = await newLocalDb.update({
      in: tabla,
      set: {
        [campo]: Value
      },
      where: {
        recno: recno,
      },
    });
    console.log("LocalDB  Update ======>>>>>>>>", updated);
    return true;
  }

  ////////////////////////////////////////////////////
  // Instruccion sql base de datos local
  /////////////////////////////////////////
  sqlexec = async (db_name : string,ins_sql: string) => {
    ins_sql=' USE '+db_name+';'+ins_sql
    return alasql(ins_sql)
  }
}