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
      this.Form.grid_form.prop.Visible.false
      this.Form.grid_columns.prop.Visible.false

      const zipFileWriter = new BlobWriter();
      const zipWriter = new ZipWriter(zipFileWriter);
      await this.generaForma(zipWriter)

      await zipWriter.close()
      const zipFileBlob = await zipFileWriter.getData()

      await saveAs(zipFileBlob, `${this.Form.nom_for.prop.Value.trim()}.zip`)

      this.Form.tip_for.click()

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
    const nom_for=this.Form.nom_for.prop.Value.trim()
  //  await zipWriter.add(`${this.Form.nom_for.prop.Value.trim()}/index.vue`, new TextReader(Main))
  await zipWriter.add(`${nom_for}/index.vue`, new TextReader(Main))

    var ThisForm: string = Form
    var ThisGrid: string = Grid
    ThisForm = ThisForm.replaceAll('<<nom_for>>', nom_for)
    ThisForm = ThisForm.replaceAll('<<fec_cre>>', new Date().toISOString().substring(0, 10))
    //    ThisForm = ThisForm.replaceAll('<<nom_ind>>', this.Form.nom_ind.prop.Value.trim())

    if (this.Form.tip_for.prop.Value == 'F' || this.Form.tip_for.prop.Value == 'C')
      ThisForm = ThisForm.replaceAll('<<vis_cap>>', this.Form.vis_form.prop.Value.trim())
    else
      ThisForm = ThisForm.replaceAll('<<vis_cap>>', '')


    // this.prop.textLabel = "Mantenimiento a la tabla <<nom_tab>>"
    ThisForm = ThisForm.replaceAll('<<nom_tab>>', this.Form.tab_form.prop.Value.trim())

    let vis_grid = 'vi_cap_grid'
    let grid = 'grid/' // path  del grid

    let sw_Grid = this.Form.tip_for.prop.Value == 'F' ? false : true

    if (this.Form.tip_for.prop.Value == 'F') { // si es un form solamente
      vis_grid = 'vi_cap_form'
      grid = ''
    }

    // recorremos todos los componentes de captura
    while (this.Form.tip_for.prop.Value.length > 0) {
      const renglon = await this.Form.db.localSql(`select * from ${vis_grid} order by con_dat`)
      //console.log('bt_gen_for ', renglon)

      // recorre renglon por renglon
     // renglon.forEach(async function (component: {}, index: number) {
       // const cam_dat = component.cam_dat
       // console.log('renglon component', component.cam_dat, index)

       for (let i = 0; i < renglon.length; i++) {
        const component=renglon[i]
        const cam_dat = renglon[i]['cam_dat']
        imp_com = imp_com + `import {${cam_dat.trim()} } from "./${grid}${cam_dat.trim()}" ` + String.fromCharCode(10)
        com_imp = com_imp + `   public ${cam_dat.trim()} = new ${cam_dat.trim()}() ` + String.fromCharCode(10)

        const cam_act = component.cam_act
        const controlSource = component.controlsource
        const dec_dat = component.dec_dat
        const lla_cap = component.lla_cap
        let lon_dat = component.lon_dat
        let MaxLength = component.maxlen
        const Min = component.min
        let MaxVal = '2147483647'
        // const nom_ind=component.nom_ind 
        const nullvalue = component.nullvalue
        const PlaceHolder = component.placeholder
        const textLabel = component.ref_dat
        //const textLabel=component.textlabel 
        let Type = 'text'

        let BaseClass = 'editText'

        switch (component.baseclass.trim()) {
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

        const tip_dat = component.tip_dat.toLowerCase().slice(0, 3)



        if (tip_dat == 'int' || tip_dat == 'num' || tip_dat == 'dou' || tip_dat == 'flo') {
          Type = 'number'
          MaxLength = '16'

        }
        if (tip_dat == 'dat') {
          Type = 'date'
          MaxLength = '20'
        }
        if (tip_dat == 'int' && lon_dat == '1')
          Type = 'checkBox'
        if (tip_dat == 'var' || ((tip_dat == 'cha' || tip_dat == 'var') && lon_dat > 256)) {
          Type = 'textArea'
          MaxLength = lon_dat
        }
        const ToolTipText = component.tooltiptext
        const updateKey = component.updatekey == 1 ? 'true' : 'false'
        // const MaxLength = component.MaxLength 

        const Capture = !updateKey


        var row_com = Component
        if (vis_grid == 'vi_cap_grid')
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

        // Generamos archivo de clases 
        console.log('bt_gen_forma renglon', `${nom_for}/${grid}${cam_dat.trim()}.ts`)
        await zipWriter.add(`${nom_for}/${grid}${cam_dat.trim()}.ts`, new TextReader(row_com))
      }
      // ) // Final for each
      let init = ''

      if (vis_grid == 'vi_cap_grid') { // Grabamos los componentes del grid

        ThisGrid = ThisGrid.replace('<<init>>', init)
        ThisGrid = ThisGrid.replace('<<com_imp>>', com_imp)
        ThisGrid = ThisGrid.replace('<<imp_com>>', imp_com)

        ThisGrid = ThisGrid.replaceAll('<<nom_for>>', this.Form.vis_grid.prop.Value.trim())
        ThisGrid = ThisGrid.replaceAll('<<fec_cre>>', new Date().toISOString().substring(0, 10))
        //    ThisGrid = ThisGrid.replaceAll('<<nom_ind>>', this.Form.vis_grid.prop.Value.trim())
        ThisGrid = ThisGrid.replaceAll('<<nom_vis>>', this.Form.vis_grid.prop.Value.trim())

        // Genera el archivo Grid
        await zipWriter.add(`${nom_for}/grid/grid.ts`, new TextReader(ThisGrid))
        com_imp = ''
        imp_com = ''

        if (this.Form.tip_for.prop.Value == 'C') {
          vis_grid = 'vi_cap_form '
          this.Form.tip_for.prop.Value = 'F'
          grid=''
        } else
          this.Form.tip_for.prop.Value = ''

      }
      else
        this.Form.tip_for.prop.Value = ''


      //    const zipFileBlob = await zipFileWriter.getData()
      //    await saveAs(zipFileBlob, `${this.Form.nom_for.prop.Value.trim()}.zip`)

      // vis_cap = ''

    }

    // Genera el ThisForm.ts

    if (sw_Grid) {
      imp_com = imp_com + `import {Grid} from "./grid/grid" ` + String.fromCharCode(10)
      com_imp = com_imp + `     public grid = new Grid()` + String.fromCharCode(10)
    }

    ThisForm = ThisForm.replace('<<init>>', init)
    ThisForm = ThisForm.replace('<<com_imp>>', com_imp)
    ThisForm = ThisForm.replace('<<imp_com>>', imp_com)
    //Genera el archivo ThisForm
    await zipWriter.add(`${nom_for}/ThisForm.ts`, new TextReader(ThisForm))
    if (this.Form.tip_for.prop.Value == 'C') {
      this.Form.tip_for.prop.Value = 'G'
      vis_grid = 'vi_cap_grid '
      grid = 'grid/'
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






