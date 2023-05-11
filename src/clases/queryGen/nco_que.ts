//////////////////////////////////////////////
// BaseClass : component
// Class : nco_que
// Description : Numero de Condicion
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class nco_que extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

  
    this.prop.Type = 'spinner'
    this.prop.BaseClass = 'editText'
    this.prop.textLabel='Número'
    this.prop.Value=0
    this.prop.Position = 'main'
    this.prop.Min = "0"
    this.prop.Max = "999"
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.prop.componentStyle.width='40px'
    this.prop.usu_que=''
    this.prop.Visible=false
    //this.style.width='30px'
  }

  public async valid(){
    this.interactiveChange()
    return true
  }
  ////////////////////////////////// 
  // Interactive Change 
  ///////////////////////////////////

  async interactiveChange() {
   
    const tabla=this.Parent.tabla
    this.Parent.query.prop.Value = ''
    this.Parent.bt_edit.prop.Visible=false
    this.Parent.bt_delete.prop.Visible=false
    this.Parent.table.prop.Visible=false
    this.Parent.query.prop.Visible = false
    var query=''
    if (this.prop.Value<=0){
      this.prop.Value=1
    }
 
    const q = {
      usu_que: this.Parent.prop.usu_que,
      nco_que: this.Parent.nco_que.prop.Value,
      prg_prg: this.Form.prop.Name,
    }

    const RecordSource=this.Parent.table.prop.RecordSource
    
    const ins_sql = `select * From vi_cap_query_db  \
          where nco_que=${q.nco_que} and trim(usu_que)='${q.usu_que}' order by ren_que`

    console.log('nco_que localSql resultado',ins_sql,await this.Form.db.localSql(ins_sql))

    const data = await this.Form.db.localSql(ins_sql)

   // console.log('nco_que interactiveChange data',data)

    if (data.length == 0) {
      if (this.prop.Value==1)
         return 

      this.prop.Value=this.prop.Value-1
      this.interactiveChange()
      return
    } // Endif (
    this.prop.ReadOnly= false
    
    let sig_uni = ' '
    
 

    for (let i = 0; i < data.length; i++) {

      const m = data[i] //Scatter Memvar

      sig_uni = 'Y'

      switch (m.uni_que.trim()) {
        case "AND":
          sig_uni = ' "Y" '
          break

        case 'OR ':
          sig_uni = ' "O" '
          break

      }

      let con_uni = ' '
      
      switch (m.con_que.trim()) {
        case '>':
          con_uni = ' MAYOR QUE '
          break

        case '<':
          con_uni = ' MENOR QUE '
          break

        case '>=':
          con_uni = ' MAYOR O IGUAL QUE '
          break

        case '<=':
          con_uni = ' MENOR O IGUAL QUE '
          break

        case '=':
          con_uni = ' IGUAL A '
          break

        case 'BETWEEN':
          con_uni = ' ENTRE '
          break

        case 'IN':
          con_uni = ' ESTE EN '
          break

        case ' NOT IN':
          con_uni = ' NO ESTE EN '
          break

        case 'CHARINDEX':
          con_uni = ' CONTIENE '
          break

        case '<>':
          ' DIFERENTE QUE '
          break

        case 'NOCHAR':
          con_uni = ' NO CONTIENE '
          break

      }
      query = query + m.pai_que + m.ref_dat.trim() + con_uni + m.val_que.trim() + m.pad_que + sig_uni
    } // EndFor (

    if (sig_uni.length > 0) {
      query = await left(query, query.length - sig_uni.length)
    } // Endif (
    

    this.Parent.query.prop.Value=query
    this.Parent.query.prop.Visible = true
    this.Parent.bt_edit.prop.Visible=true

    return true
  }

  ////////////////////////////////// 
  // event when 
  ///////////////////////////////////

  async when() {
//    this.prop.Parent.browseResult.prop.RowSource = ''
    //this.Parent.table.RecordSource=''

    return true
  }



  ////////////////////////////////// 
  // event click 
  ///////////////////////////////////
  /*
  async click() {

  }
  */

  
}
