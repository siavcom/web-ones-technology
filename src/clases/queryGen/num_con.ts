//////////////////////////////////////////////
// BaseClass : component
// Class : num_con
// Description : Numero de Condicion
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class num_con extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = 'Número de condición'
    this.prop.Type = 'spinner'
    this.prop.BaseClass = 'editText'
    this.prop.textLabel='Número de condición'
    this.prop.Value=0
    this.prop.ControlSource = ''
    this.prop.Placeholder = ''
    this.prop.ToolTipText = ''
    this.prop.Position = 'main'
    this.prop.Min = "0"
    this.prop.Max = "999"
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.prop.componentStyle.width='40px'
    this.prop.usu_que=''
    //this.style.width='30px'



  }

  async valid(){
    this.interactiveChange()
  }
  ////////////////////////////////// 
  // Interactive Change 
  ///////////////////////////////////

  async interactiveChange() {
    console.log('num_con interactiveChange this',this)
    const ThisForm = this.Form
    const vfp = ThisForm.db
    const tabla=this.Parent.tabla
    this.Parent.query.prop.Value = ''
    this.Parent.query.prop.Visible = false

    if (this.prop.Value==0)
       return
       
    const RecordSource=this.Parent.prop.RecordSource
    const ins_sql = `select * From 'vi_cap_query_db'  \
          where num_con=${this.prop.Value} `

    const data = await vfp.localSql(ins_sql,RecordSource)

    if (data.length == 0) {
      this.Form.query = ''
      return
    } // Endif (

    let sig_uni = ' '
    this.Parent.query.prop.Value=''
    for (let i = 0; i < data.length; i++) {

      const m = data[i] //Scatter Memvar

      sig_uni = 'Y'

      switch (m.uni_que) {
        case "AND":
          sig_uni = ' "Y" '
          break

        case 'OR ':
          sig_uni = ' "O" '
          break

      }

      let con_uni = ' '
      switch (m.con_que) {
        case '> ':
          con_uni = ' MAYOR QUE '
          break

        case '< ':
          con_uni = ' MENOR QUE '
          break

        case '>=':
          con_uni = ' MAYOR O IGUAL QUE '
          break

        case '<=':
          con_uni = ' MENOR O IGUAL QUE '
          break

        case '= ':
          con_uni = ' IGUAL A '
          break

        case 'BETWEEN ':
          con_uni = ' ENTRE '
          break

        case 'IN ':
          con_uni = ' ESTE EN '
          break

        case ' NOT IN ':
          con_uni = ' NO ESTE EN '
          break

        case 'CHARINDEX':
          con_uni = ' CONTIENE '
          break

        case '<>':
          ' Dif (ERENTE QUE '
          break

        case 'NOCHAR':
          con_uni = ' NO CONTIENE '
          break

      }
      this.Parent.query.prop.Value = this.Form.query.prop.Value + m.pai_que + m.des_dat.trim() + con_uni + m.val_que.trim() + m.pad_que + sig_uni
    } // Endif (

    if (sig_uni.length > 2) {
      this.Form.query.prop.Value = left(this.Form.query.prop.Value, this.Form.prop.tex_con.prop.Value.length - 5)
    } // Endif (


    
    return true
  }





  ////////////////////////////////// 
  // event when 
  ///////////////////////////////////

  async when() {
//    this.prop.Parent.browseResult.prop.RowSource = ''
    this.Parent.table.RecordSource=''

    return true
  }



  ////////////////////////////////// 
  // event click 
  ///////////////////////////////////
  /*
  async click() {

  }
  */

  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////
  /*
    public keyPress = async ($event) => {
    const key=super.keyPress($event)

   }
  */
}
