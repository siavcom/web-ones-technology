//////////////////////////////////////////////
// Clase : Grid
// Author : Fernando Cuadras Angulo
// Creacion : Febrero/2022
// Ult.Mod  :  28/Marzo/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
//import { nextTick} from "vue"
export class GRID extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  // Tenemos que utilizar renglon o data
  data = [{}]    // arreglo donde esta el data 
  Row = -1
 // declare variable:string='Hola'
  
  //elements = [{}]
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
    this.prop.addButton=true
    this.prop.deleteButton=true
    this.prop.saveData=true
    this.prop.updated=false

    this.prop.messageUpdate='Grabamos la tabla'

    
  }
/*
  public async Init_ant(Form:any) {
    super.Init(Form)
    console.log('Grid Init ======',this.prop.Name)
    //let elements=[]
    for (const columna in this) {
      if (this[columna] != null &&
        this[columna] !=undefined && 
        this[columna].prop &&
        this[columna].prop.Order){
       // elements.push({ 
       // Name :this[columna].prop.Name,
       // Id : this[columna].prop.Order})
       
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
    //this.elements=elements
    console.log('Grid base main',this.elements)
  }
 */
  async validKey(){
    if (this.prop.Valid)
       return true

    const db=this.Form.db 
    const View= db.View[this.Parent.prop.RecordSource]
    const Recno =View.Recno
    const valid=false
    let where =' where '
    for (let i=0;i<this.elements.length;i++){
      const column=this.elements[i].Name
      if (this[column].prop.updateKey) {
        if (!this[column].Valid) return true
         
        const comillas = this[column].prop.Type=='numeric' ?'':"'"
        where=where+this[column].prop.ControlSource.trim()+'='+comillas+this[column].prop.Value+comillas+' and '
        
          }
        } 
        where=where+` recno<>${Recno} `
        const select=`select exists(select recno from ${this.Parent.prop.RecordSource} ${where})`        
        console.log('Grid select exists=',select)

        const data=await db.localSql(select)
        console.log('Grid ',data)
        if (data[0].exists)
          this.prop.Valid=false
        else
           this.prop.Valid=true

        return this.prop.Valid
  }

  ///////////////////////////////////////////////////// 
  // asignaRenglon 
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon(row: number,colName:string) {
 //   console.log('asignaRenglon row ',row,this.Form.db.View[this.prop.RecordSource].recnoVal)
//    if (row>this.Form.db.View[this.prop.RecordSource].recnoVal.length-1) 
//      row=this.Form.db.View[this.prop.RecordSource].recnoVal.length-1

    this.Row=row
    console.log('Grid asignaRenglon ',this)
    this[colName].prop.First=true 
    
    //nextTick(() => 
    //    this.Row=row
   // )
  }

  ///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(m?: {}) { 
    if (!m) m = {}
    this.Row=-1 // Quitamos donde esta el renglon
    //this.Form.db.select(this.prop.RecordSource) 
    const values= await this.Form.db.appendBlank(this.prop.RecordSource, m) //Incertamos un renglon en blanco
    this.prop.Valid=false
    console.log('======grid Incertamos renglon========>',this.prop.Name,values)
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

  //////////////////////////////////
  // Graba Tabla
  // vis_cap: Vista de captura
  /////////////////////////////////
  async grabaTabla() {
    let resultado = true
    
    //resultado =
    if (await MessageBox(this.prop.messageUpdate, 4, '')!=6)
       return false
 
    this.Form.prop.Visible = false
   
    resultado=await this.Form.db.tableUpdate(1, false, this.prop.RecordSource) 
    if (resultado) {  // Actualiza todos los registros
        MessageBox('Datos grabados')
        
      }
      else {
        MessageBox('No se grabaron los datos', 16, 'ERROR')
        
      }
    return resultado 
    }

  //////////////////////////////////
  // Graba Renglon
  // 
  /////////////////////////////////
  async grabaRenglon() {
    let resultado = 0
    resultado = await MessageBox(this.prop.messageUpdate, 4, '')
    console.log('bt_aceptar Messagebox resultado', resultado)

    this.Form.prop.Visible = false


    if (await this.Form.db.tableUpdate(1, false, this.prop.RecordSource) == true) {  // Actualiza todos los registros
        MessageBox('Datos grabados')
        return true
      }
      else {
        MessageBox('No se grabaron los datos', 16, 'ERROR')
        return false
      }

    }

}


