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
    this.prop.Value ='File'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/json.svg"  
    this.prop.TabIndex = 2
    this.prop.Visible=true
    this.style.width='40px'

  } // Fin constructor

  async click() {
    const result=await this.Form.db.localAlaSql(`select * from result`) 
    if (result.length==0)
       return

    const ins_sql = 'select * from vcomepge'

    const comepge=await this.Form.db.execute(ins_sql, 'MEMVAR')
    let json =JSON.stringify(comepge[0])
     
    json =json+','+JSON.stringify(result)
    
    const blobJson = new Blob([json], {type: 'text/plain'})
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
