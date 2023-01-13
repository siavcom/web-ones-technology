//////////////////////////////////////////////
// Clase : Gridd
// Author : Fernando Cuadras Angulo
// Creacion : Febrero/2022
// Ult.Mod  :  23/Agosto/2022
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from '@/classes/Component'
//import { nextTick} from "vue"
export class GRID extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  // Tenemos que utilizar renglon o data
  data = [{}]    // arreglo donde esta el data 
  Row = -1
  elements = [{}]
  constructor() {
    super()
    this.prop.Name = 'Grid'
    this.prop.ColumnCount = 1
    this.prop.BaseClass = 'grid'
    this.prop.Capture = false
    this.prop.RecordSource = ''
    this.prop.Row = 0
    this.prop.textLabel ='Grid de datos'
    this.prop.SqlUpdate= false  //Si es verdadero actualiza automaticamente
  }
   

  public async Init() {
    console.log('Grid Init ======',this.prop.Name)
    let elements=[]
    for (const columna in this) {
      if (this[columna] != null &&
        this[columna] !=undefined && 
        this[columna].prop &&
        this[columna].prop.Order){
        elements.push({ 
        Name :this[columna].prop.Name,
        Id : this[columna].prop.Order})
       
        this[columna].prop.Grid = true  // indicamos que la columna pertenece a un grid de datos 
        switch (this[columna].prop.BaseClass) {
          case 'editText': {
            this.renglon[columna] = ''
            break;
          }
          case 'editNumber': {
            this.renglon[columna] = 0.0
            break;
          }
          case 'editDate': {
            this.renglon[columna] = '01-01-1900'
            break;
          }
          default: {

            this.renglon[columna] = ''
            break;
          }
        }


      }
    }
    this.elements=elements
    console.log('Grid base main',this.elements)
  }


  ///////////////////////////////////////////////////// 
  // asignaRenglon 
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon(row: number) {
 //   console.log('asignaRenglon row ',row,this.Form.db.View[this.prop.RecordSource].recnoVal)
//    if (row>this.Form.db.View[this.prop.RecordSource].recnoVal.length-1) 
//      row=this.Form.db.View[this.prop.RecordSource].recnoVal.length-1


    this.Row=row
    
    //nextTick(() => 
    //    this.Row=row
   // )
  }

  ///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(m?: {}) { 
    console.log('appendRow m',m)
    if (!m) m = {}
    this.Row=-1 // Quitamos donde esta el renglon
    this.Form.db.select(this.prop.RecordSource) 
    const values= await this.Form.db.appendBlank(this.prop.RecordSource, m) //Incertamos un renglon en blanco
    //console.log('bt_aceptar vi_cap_vis', await this.Form.db.localSql('select * from vi_cap_vis'))

  }

/*
  ////////////////////////////////////////////////////
  // Recorrera todos los componentes columna donde esta el foco y
  // asigna todos los Value a los componentes del grid que sean columnas
  // recno : el regsitro actual que tiene el foco
  ///////////////////////////////////////////////////
  async asignaValue_2old(recno: number,Values?:{})  {

    const RecordSource = this.prop.RecordSource
    // Lee los valores del registro en la  tabla local
    if (recno!=0 ) {
      const data = await this.Form.db.nowValue(RecordSource, ' * ', recno)
      Values=data[0]
    } else   console.log('Asigna Valores Values =====>>', Values)
  }

*/

  //////////////////////////
// Borra renglon
// row: renglon a borrar
/////////////////////////
  async deleteRow(recno : number) {
    await this.Form.db.delete(recno,this.prop.RecordSource,this.prop.SqlUpdate)
    this.Row=-1
    //await this.asignaRenglon(recno)
  }
}


