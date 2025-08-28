//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : CONTAINER
// Class : dat_xml
// Description : Datos de la actividad
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
//import { TAB_XML } from "@/classes/tab_xml"; 

import { CONTAINER } from '@/classes/Container'
import { var_dxm } from './var_dxm'
import { bt_saver } from './bt_saver'
import { xml2js, xml2json } from 'xml-js'

export class TAB_XML extends CONTAINER {
  public var_dxm = new var_dxm()  // Variable de datos xml/json
  public bt_saver = new bt_saver() // Boton de grabar xml/json
  nom_tab: string = '' // Nombre de la tabla
  key_xmd: number = 0 // Clave del registro
  par_dxm: string = '' // Parametros de datos xml,
  constructor() {
    super()
    this.prop.Caption = 'Datos XML/JSON' // Column Header
  }
  override async init() {
    this.Form.sw_xml = true
    useNodata('lla1_xmd') // use lla1_xmd Nodata
    useNodata('lla1_dxm') // use lla1_dxm Nodata
  }

  override async click(nom_tab: string, par_dxm: string, key_xmd: number): Promise<void> {
    this.nom_tab = nom_tab
    this.key_xmd = key_xmd
    this.par_dxm = par_dxm
    return await this.lee_xml()
  }

  async lee_xml() {

    const m = {
      nom_tab: this.nom_tab,  // nombre de la tabla
      par_dxm: this.par_dxm,  // parametros de datos xml
      key_xmd: this.key_xmd,  // clave primaria del registro
    }   // inicializamos m
    //  const convert = require('xml-js'); // For xml-js
    // const xml2js = require('xml2js'); // For xml2js

    const ord_dxm = 0
    this.prop.RecordSource = ' ' 			// Se indica cual el la tabla de donde tomara los datos
    this.prop.RecordSource = 'tab_xml' 			// Se indica cual el la tabla de donde tomara los datos

    await use('vi_cap_dxm', m) // definicion de campos xml

    requery('lla1_xmd', m)  // obtiene los campos xml de la tabla 

    let jsonResult = {}
    let var_dxm = {}

    /*
    {
    "contacto":{
        "type": "edit", 
        "label": "Contacto", 
        "value": "",
        "readOnly":false ,
        "style":{"width":"auto"}},
    "telefono":  { 
        "type": "edit", 
        "label": "Teléfono", 
        "value": "(   ) ",
        "readOnly":false, 
        "style":{"width":"auto"} },
    "acuerdo": { 
        "type": "edit", 
        "label": "Acuerdo", 
        "value": "",
        "readOnly":false, 
        "style":{"width":"auto"} }
    }
    
    
    
    */

    if (await recCount('lla1_xmd') > 0) { // si hay campos xml
      const comexmd = goto(0, 'lla1_xmd')  // nos posicionamos en la tabla de campos xml


      if (key_xmd > 0 && comexmd.xml_xmd.trim() > '') {   // si hay campos xml guardados en la base de datos
        const jsonString = await xml2json(xml_xmd, { compact: true, spaces: 2 });
        console.log(jsonString);
        jsonResult = JSON.parse(jsonString);

        for (const dato of jsonResult.VFPData.data) {  // busca en todas los campos si son campos libres
          var_dxm[dato]['type'] = 'text'
          var_dxm[dato]['label'] = dato
          var_dxm[dato]['readOnly'] = false
          var_dxm[dato]['style'] = { width: "fit-content" }
          var_dxm[dato]['value'] = jsonResult.VFPData.data[dato] // obtiene el valor

          let dxm = await localAlaSql(`SELECT * FROM vi_cap_dxm where upper(var_dxm=${dato.toUpperCase()} )`) // leemos la definicion de campos
          if (dxm.length > 0) {  // si lo encontro en la tabla de campos xml
            if (dxm[0].tip_dxm == 'D')   // si es fecha
              var_dxm[dato]['type'] = 'date'

            if (dxm[0].tip_dxm == 'N')   // si es numerico
              var_dxm[dato]['type'] = 'number'

            if (dxm[0].tip_dxm == 'L')   // si es logico
              var_dxm[dato]['type'] = 'checkbox'

            if (dxm[0].tip_dxm == 'C')   // si es caracter
              var_dxm[dato]['type'] = 'text'

            if (dxm[0].tam_dxm && dxm[0].tip_dxm == 'C')  // si tiene tamaño y es caracter
              var_dxm[dato]['style']['max-length'] = dxm[0].tam_dxm

            if (dxm[0].tam_dxm && dxm[0].tip_dxm == 'N') {// si tiene tamaño y es numerico
              const enteros = dxm[0].tam_dxm.split(',')[0] // obtiene la parte entera
              const decimales = dxm[0].tam_dxm.split(',')[1]
              var_dxm[dato]['PATTERN'] = `[0-9]{1,${enteros}}(\\.[0-9]{0,${decimales}})?` // define el patron de captura

            }

            var_dxm[dato]['label'] = dxm[0].des_dxm // descripcion del campo

          }
        }
      }
    }

    if (recCount('vi_cap_dxm') > 0) { // si hay campos xml definidos
      const datos_dxm = await localAlaSql(`SELECT * FROM vi_cap_dxm order by ord_dxm`); // leemos la definicion de campos
      for (let i = 0; i < datos_dxm.length; i++) {
        if (!(datos_dxm[i].var_dxm in var_dxm)) { // si no existe el campo lo aumenta
          var_dxm[dato] = {}
          var_dxm[dato]['value'] = datos_dxm[i].val_dxm
          var_dxm[dato]['label'] = datos_dxm[i].des_dxm // descripcion del campo
          var_dxm[dato]['readOnly'] = false
          var_dxm[dato]['style'] = { width: "fit-content" }

          if (datos_dxm[i].tip_dxm == 'D')   // si es fecha
            var_dxm[dato]['type'] = 'date'

          if (datos_dxm[i].tip_dxm == 'N')   // si es numerico
            var_dxm[dato]['type'] = 'number'

          if (datos_dxm[i].tip_dxm == 'L')   // si es logico
            var_dxm[dato]['type'] = 'checkbox'

          if (datos_dxm[i].tip_dxm == 'C')   // si es caracter
            var_dxm[dato]['type'] = 'text'

          if (datos_dxm[i].tam_dxm && datos_dxm[i].tip_dxm == 'C')  // si tiene tamaño y es caracter
            var_dxm[dato]['style']['max-length'] = dxm[0].tam_dxm

          if (datos_dxm[i].tam_dxm && datos_dxm[i].tip_dxm == 'N') {// si tiene tamaño y es numerico
            const enteros = datos_dxm[i].tam_dxm.split(',')[0] // obtiene la parte entera
            const decimales = datos_dxm[i].tam_dxm.split(',')[1]
            var_dxm[dato]['PATTERN'] = `[0-9]{1,${enteros}}(\\.[0-9]{0,${decimales}})?` // define el patron de captura

          }

        }

      }

    } // fin campos xml definidos

    this.var_dxm.prop.Value = JSON.stringify(var_dxm) // convierte el objeto a string

    /*
    <VFPData>
      <data RECIBE="HUGO MAURIN" RECEPCION="PAQMEX" GUIA="TU-26811" ENTREGA="T" />
    </VFPData>
    */

  }

  async graba_xml(nom_tab: string, key_pri: number) {
    // const convert = require('xml-js'); // For xml-js
    // const xml2js = require('xml2js'); // For xml2js

    const m = {
      nom_tab: nom_tab,  // nombre de la tabla
      key_pri: key_pri,  // clave primaria del registro
    }
    await use('vi_cap_dxm', m) // use vi_cap_dxm 

    let var_dxm = JSON.parse(this.var_dxm.prop.Value) // convierte el string a objeto

    let xml_xmd = '<VFPData><data '
    for (const dato in var_dxm) {  // busca en todas los campos si son campos libres
      xml_xmd += `${dato}= ${var_dxm[dato].value} `

    }
    xml_xmd += '></VFPData>'

    //  const jsonResult = convert.xml2json(xml_xmd, { compact: true, spaces: 2 });

    if (recCount('lla1_xmd') > 0) { // si registro
      m.xml_xmd = xml_xmd
      await appendBlank('lla1_dxm', m)
    }
    await tableUpdate(0, false, 'lla1_dxm')

    this.Form.sw_xml = false
    this.Form.sw_nue = false
    return true // devuelve true si grabo correctamente
  }

}