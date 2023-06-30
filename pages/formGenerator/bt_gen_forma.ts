//////////////////////////////////////////////
// Clase : bt_gen_forma
// Author : Fernando Cuadras Angulo
// Creacion : 22/Noviembre/2022
// Ult.Modificacion : 15/Febrero/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
//import { MessageBox } from '@/classes/Functions'

// importa archivos de texto
//import Main from '@/static/templates/Main.txt?raw'
import Main from '@/static/templates/Main.txt?raw'

import Form from '@/static/templates/ThisForm.txt?raw'
import Component from '@/static/templates/Component.txt?raw'
import Grid from '@/static/templates/Grid.txt?raw'
import Column from '@/static/templates/Column.txt?raw'



//import { readFileSync } from 'fs'

//https://github.com/gildas-lormeau/zip.js
import {
  BlobWriter,
  // HttpReader,
  TextReader,
  ZipWriter,
} from "@zip.js/zip.js"  //"https://unpkg.com/@zip.js/zip.js/index.js";

import { saveAs } from 'file-saver'

export class bt_gen_forma extends COMPONENT {

  constructor() {
    super()
    this.Index = 2
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.Value = "Genera Forma";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"
    this.prop.Visible = false
    this.style.maxWidth = 'min-content'
    this.prop.TabIndex = 2
  } // Fin constructor

  async click() {
    this.prop.Disabled = true
    this.prop.Visible = false
    if (await MessageBox('Generamos Forma (VUE view)  ', 4, '') == 6) {
      const zipFileWriter = new BlobWriter();
      const zipWriter = new ZipWriter(zipFileWriter);
      await this.generaForma(zipWriter)
      this.Form.grid_components.prop.Visible = false


      await zipWriter.close()
      const zipFileBlob = await zipFileWriter.getData()

      await saveAs(zipFileBlob, `${this.Form.nom_for.prop.Value.trim()}.zip`)
      this.Form.nom_tab.setFocus()

      //    if (error.length)
      //      console.error('Error al generar Forma')
    } else {
      this.prop.Visible = true

    }
    this.Form.bt_aceptar.prop.Visible = true
    this.prop.Disabled = false

    return
  }

  //////////////////////////////////
  // Genera forma de captura 
  /////////////////////////////////
  async generaForma(zipWriter: any) {
    var imp_com = ''   // Importa componentes
    var com_imp = ''   // Componentes importados
    var init = ''

    await zipWriter.add(`${this.Form.nom_for.prop.Value.trim()}/index.vue`, new TextReader(Main))
    var ThisForm: string = Form
    var ThisGrid: string = Grid
    ThisForm = ThisForm.replaceAll('<<nom_for>>', this.Form.nom_for.prop.Value.trim())
    ThisForm = ThisForm.replaceAll('<<fec_cre>>', new Date().toISOString().substring(0, 10))
    //    ThisForm = ThisForm.replaceAll('<<nom_ind>>', this.Form.nom_ind.prop.Value.trim())
    ThisForm = ThisForm.replaceAll('<<vis_cap>>', this.Form.vis_cap.prop.Value.trim())

    ThisForm = ThisForm.replaceAll('<<nom_tab>>', this.Form.nom_tab.prop.Value.trim())
    let grid_import
    let grid_captura = ''

    if (this.Form.tip_for.prop.Value == 'G') {
      imp_com = `import {Grid} from "./grid/grid" ` + String.fromCharCode(10)
      com_imp = `   public Grid = new Grid() ` + String.fromCharCode(10)
      //init = 'this.Form.bt_graba.lee_grid()'
      ThisForm = ThisForm.replace('<<init>>', init)
      ThisForm = ThisForm.replace('<<com_imp>>', com_imp)
      ThisForm = ThisForm.replace('<<imp_com>>', imp_com)
      await zipWriter.add(`${this.Form.nom_for.prop.Value.trim()}/ThisForm.ts`, new TextReader(ThisForm))
      //        if (this.Form.tip_for.prop.Value == 'G') {
      //          init = 'this.Form.bt_graba.lee_grid()'
      //        }
      imp_com = ''
      com_imp = ''

    }

    //    ThisForm = ThisForm.replaceAll('<<grid_cap>>', this.Form.nom_tab.prop.Value.trim())

    let vis_cap = 'vi_cap_form'

    if (this.Form.tip_for.prop.Value == 'G')
      vis_cap = 'vi_cap_grid'

    // recorremos todos los renglones
    while (vis_cap.length > 0) {
      const renglon = await this.Form.db.localSql(`select * from ${vis_cap} order by con_dat`)
      for (let i = 0; i < renglon.length; i++) {
        const cam_dat = renglon[i]['cam_dat']
        imp_com = imp_com + `import {${cam_dat.trim()} } from "./${cam_dat.trim()}" ` + String.fromCharCode(10)
        com_imp = com_imp + `   public ${cam_dat.trim()} = new ${cam_dat.trim()}() ` + String.fromCharCode(10)

        const cam_act = renglon[i]['cam_act']
        const controlSource = renglon[i]['controlsource']
        const dec_dat = renglon[i]['dec_dat']
        const lla_cap = renglon[i]['lla_cap']
        let lon_dat = renglon[i]['lon_dat']
        let MaxLength = renglon[i]['maxlen']
        const Min = renglon[i]['min']
        let MaxVal='2147483647'
        // const nom_ind=renglon[i]['nom_ind']
        const nullvalue = renglon[i]['nullvalue']
        const PlaceHolder = renglon[i]['placeholder']
        const textLabel = renglon[i]['ref_dat']
        //const textLabel=renglon[i]['textlabel']
        let Type = 'text'

        let BaseClass = 'editText'

        switch (renglon[i]['baseclass'].trim()) {
          case 'C':
            BaseClass = 'comboBox'
            break
          case 'B':
            BaseClass = 'checkBox'
            break
          case 'L':
            BaseClass = 'label'
            break
          case 'I':
            BaseClass = 'image'
            break
        }

        const tip_dat = renglon[i]['tip_dat'].toLowerCase().slice(0,3)
        


        if (tip_dat == 'int' || tip_dat == 'num' || tip_dat == 'dou' || tip_dat == 'flo'){
          Type = 'number'
          MaxLength='16'

        }
        if (tip_dat == 'dat'){
          Type = 'date'
          MaxLength='20'
        }
        if (tip_dat == 'int' && lon_dat == '1')
          Type = 'checkBox'
        if ( tip_dat == 'var' || ((tip_dat == 'cha' || tip_dat == 'var') && lon_dat > 256)){
          Type = 'textArea'
          MaxLength=lon_dat
        }
        const ToolTipText = renglon[i]['tooltiptext']
        const updateKey = renglon[i]['updatekey'] == 1 ? 'true' : 'false'
        // const MaxLength = renglon[i]['MaxLength']

        const Capture = !updateKey


        var row_com = Component
        if (vis_cap == 'vi_cap_grid')
          row_com = Column

        row_com = row_com.replaceAll('<<cam_dat>>', cam_dat.trim())
        row_com = row_com.replaceAll('<<textLabel>>', textLabel.trim())
        row_com = row_com.replaceAll('<<ref_dat>>', textLabel.trim())
        row_com = row_com.replaceAll('<<Type>>', Type)
        row_com = row_com.replaceAll('<<BaseClass>>', BaseClass)
        row_com = row_com.replaceAll('<<ControlSource>>', controlSource.trim())
        row_com = row_com.replaceAll('<<PlaceHolder>>', PlaceHolder.trim())
        row_com = row_com.replaceAll('<<ToolTipText>>', ToolTipText.trim())
        row_com = row_com.replaceAll("<<MaxLength>>", MaxLength)
        row_com = row_com.replaceAll("<<Min>>", Min)
        row_com = row_com.replaceAll("<<Max>>", MaxVal)
        row_com = row_com.replaceAll('<<Decimals>>', dec_dat)
        row_com = row_com.replaceAll('<<updateKey>>', updateKey)
        row_com = row_com.replaceAll('<<fec_cre>>', new Date().toISOString().substring(0, 10))


        if (cam_act == 1 && updateKey)
          row_com = row_com.replaceAll('<<Capture>>', 'true')
        else
          row_com = row_com.replaceAll('<<Capture>>', 'false')

        //genera cada clase de c componente
        let grid = ''
        if (vis_cap == 'vi_cap_grid')
          grid = 'grid/'

        await zipWriter.add(`${this.Form.nom_for.prop.Value.trim()}/${grid}${cam_dat.trim()}.ts`, new TextReader(row_com))
      }
      let init = ''
      let grid = ''

      if (vis_cap == 'vi_cap_form') {
        //ThisForm = ThisForm.replace('<<grid>>', "'" + grid + "'")
        ThisForm = ThisForm.replace('<<init>>', init)
        ThisForm = ThisForm.replace('<<com_imp>>', com_imp)
        ThisForm = ThisForm.replace('<<imp_com>>', imp_com)
        await zipWriter.add(`${this.Form.nom_for.prop.Value.trim()}/ThisForm.ts`, new TextReader(ThisForm))
      }
      if (vis_cap == 'vi_cap_grid') {
        ThisGrid = ThisGrid.replace('<<init>>', init)
        ThisGrid = ThisGrid.replace('<<com_imp>>', com_imp)
        ThisGrid = ThisGrid.replace('<<imp_com>>', imp_com)

        ThisGrid = ThisGrid.replaceAll('<<nom_for>>', this.Form.vis_cap.prop.Value)
        ThisGrid = ThisGrid.replaceAll('<<fec_cre>>', new Date().toISOString().substring(0, 10))
        //    ThisGrid = ThisGrid.replaceAll('<<nom_ind>>', this.Form.vis_cap.prop.Value.trim())
        ThisGrid = ThisGrid.replaceAll('<<nom_vis>>', this.Form.vis_cap.prop.Value.trim())


        await zipWriter.add(`${this.Form.nom_for.prop.Value.trim()}/grid/grid.ts`, new TextReader(ThisGrid))
      }
      com_imp = ''
      imp_com = ''

      //    const zipFileBlob = await zipFileWriter.getData()
      //    await saveAs(zipFileBlob, `${this.Form.nom_for.prop.Value.trim()}.zip`)

      vis_cap = ''
      if (this.Form.tip_for.prop.Value == 'C' && vis_cap == 'vi_cap_form')
        vis_cap = 'vi_cap_grid'

    }


    return
    //this.downloadFile(zipFileBlob)


  }

}
/*  Leer un archivo

vue-upload-component

https://stackoverflow.com/questions/33643107/read-and-write-a-text-file-in-typescript


import * as fs from 'fs';
import * as path from 'path';

fs.readFile(path.join(__dirname, "filename.txt"), (err, data) => {
    if (err) throw err;
    console.log(data);
})



*/



// vue3-file-selector https://github.com/cyon/vue3-file-selector#vue3-file-selector

// filesaver https://github.com/eligrey/FileSaver.js

// file-saver. npm i file-saver
//  https://www.tutsmake.com/vue-js-how-to-download-file-using-axios-tutorial/

/*
       function writeToFile(data){
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var fh = fso.OpenTextFile("D:\\data.txt", 8);
            fh.WriteLine(data.id + ',' + data.content);
            fh.Close(); 
        } 
*/




/*
saveFile: function() {
    const data = JSON.stringify(this.arr)
    const fs = require('fs');
    try { fs.writeFileSync('myfile.txt', data, 'utf-8'); }
    catch(e) { alert('Failed to save the file !'); }
}




*/

/*  
 writeToFile(d1, d2){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("data.txt", 8, false, 0);
    fh.WriteLine(d1 + ',' + d2);
    fh.Close();
}
var submit = document.getElementById("submit");
submit.onclick = function () {
    var id      = document.getElementById("id").value;
    var content = document.getElementById("content").value;
    writeToFile(id, content);
}
*/






