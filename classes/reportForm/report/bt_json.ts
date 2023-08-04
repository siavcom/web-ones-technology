//////////////////////////////////////////////
// Clase : bt_json
// Author : Fernando Cuadras Angulo
// Creacion : 25/Mayo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
import { saveAs } from 'file-saver'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_json extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = 'File'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/json.svg"
    this.prop.TabIndex = 2
    this.prop.Visible = true
    this.style.width = '40px'

  } // Fin constructor

  async click() {

    //const result = await this.Form.db.localAlaSql(`select * from result`)
    const result=this.Parent.browseResult.table.value.rows // obtenemos los rows
    if (result.length == 0)
      return

    const ins_sql = 'select * from ' + this.Form.dataView
    const comepge = await this.Form.db.execute(ins_sql, 'MEMVAR')



    for (let key in comepge[0]) {
      result[0][key] = comepge[0][key]

    }

    console.log('bt_json Object res Json=', result[0]);


    /*
       Object.values(comepge[0]).forEach((value, index,name) => {
        console.log('bt_json Object res Json=',index,name);
    
       //     console.log('bt_json Object res Json=',name,value,index);
      })
    */

    
    /*
       let objJson ='['+JSON.stringify(comepge[0])
       objJson=objJson.slice(0,objJson.length-1)+','
    
       //console.log('bt_json comepge Json=',objJson)
       let jsonResult= JSON.stringify(result)
    
       objJson=objJson+jsonResult.slice(-(jsonResult.length-2))
       */


    const objJson = JSON.stringify(result)
    const blobJson = new Blob([objJson], { type: 'text/plain' })
    /*
    const canvas = document.getElementById("my-canvas");
    canvas.toBlob(blob=> {
        // saveAs(blob, "pretty image.png")
        saveAs(blobJson, `${this.Form.for_imp.prop.Value.trim()}.json`)
    });
    */
    await saveAs(blobJson, `${this.Form.for_imp.prop.Value.trim()}.json`)

  }


}
