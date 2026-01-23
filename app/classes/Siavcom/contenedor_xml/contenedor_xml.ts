//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : CONTAINER
// @class : dat_xml
// Description : Datos de la actividad
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
//import { TAB_XML } from "@/classes/tab_xml"; 

import { CONTAINER } from '@/classes/Container'
import { var_dxm } from './var_dxm'
import { bt_save } from './bt_save'
import { xml2js, xml2json } from 'xml-js'

export class CONTENEDOR_XML extends CONTAINER {
  public var_dxm = new var_dxm()  // Variable de datos xml/json
  public bt_save = new bt_save() // Boton de grabar xml/json
  nom_tab: string = '' // Nombre de la tabla
  key_xmd: number = 0 // Clave del registro
  par_dxm: string = '' // Parametros de datos xml,
  constructor() {
    super()
    this.prop.Caption = 'Datos XML/JSON' // Column Header
    this.prop.Disabled = false
    this.style.display = 'flex'
    this.style.flexDirection = 'column'
    this.style.alignItems = 'flex-start'
    this.style.gap = '10px'

  }
  /*
  override async init() {
    this.Form.sw_xml = true
    useNodata('vi_cap_comexmd') // use vi_cap_comexmd Nodata
   
  }
*/
  async open(nom_tab: string, par_dxm: string, key_xmd: number): Promise<void> {
    this.nom_tab = nom_tab
    this.key_xmd = key_xmd
    this.par_dxm = par_dxm

    const result = await this.lee_xml(nom_tab, par_dxm, key_xmd)
    return result
  }

  async lee_xml(nom_tab: string, par_dxm: string, key_xmd: number) {

    this.nom_tab = nom_tab
    this.key_xmd = key_xmd
    this.par_dxm = par_dxm

    const m = {
      nom_tab: nom_tab,  // nombre de la tabla
      par_dxm: par_dxm,  // parametros de datos xml
      key_xmd: key_xmd,  // clave primaria del registro
    }
    await use('vi_cap_comexmd', m) // Leemos campos xml de la tabla

    // inicializamos m
    //  const convert = require('xml-js'); // For xml-js
    // const xml2js = require('xml2js'); // For xml2js

    const ord_dxm = 0
    this.prop.RecordSource = ' ' 			// Se indica cual el la tabla de donde tomara los datos


    await use('vi_cap_comedxm', m)  // obtiene los campos xml de la tabla 
    //   const vi_cap_comedxm = await goto(0, 'vi_cap_comedxm')  // nos posicionamos en la tabla de campos xml

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

    const vi_cap_comexmd = await goto(0, 'vi_cap_comexmd')  // nos posicionamos en la tabla de campos xml
    console.log('vi_cap_comexmd', vi_cap_comexmd)

    if (vi_cap_comexmd.key_xmd > 0 && vi_cap_comexmd.xml_xmd.trim() > '') {   // si hay campos xml guardados en la base de datos
      const jsonString = await xml2json(vi_cap_comexmd.xml_xmd, { compact: true, spaces: 2 });
      console.log(jsonString);
      jsonResult = JSON.parse(jsonString);

      const var_json = jsonResult.VFPData.data._attributes
      console.log('var_dxm', var_dxm)
      for (const dato in var_json) {  // busca en todas los campos si son campos libres
        var_dxm[dato] = {}
        var_dxm[dato]['type'] = 'text'
        var_dxm[dato]['label'] = dato
        var_dxm[dato]['readOnly'] = false
        var_dxm[dato]['style'] = { width: "fit-content" }
        var_dxm[dato]['value'] = var_json[dato] // obtiene el valor
        /*
                let dxm = await localAlaSql(`SELECT * FROM vi_cap_comedxm where upper(var_dxm)='${dato.toUpperCase()}' `) // leemos la definicion de campos
                console.log('dxm', dxm)
                if (dxm.length > 0) {  // si lo encontro en la tabla de campos xml
        
                  const tip_dxm = dxm[0].tip_dxm.trim()
                  switch (tip_dxm) {
                    case 'D':
                      var_dxm[dato]['type'] = 'date'
                      break;
                    case 'N':
                      var_dxm[dato]['type'] = 'number'
                      var_dxm[dato]['value'] = +var_json[dato]['value']
                      break;
                    case 'L':
                      var_dxm[dato]['type'] = 'checkbox'
                      break;
                    case 'C':
                      var_dxm[dato]['type'] = 'text'
                      break;
                    default:
                      var_dxm[dato]['type'] = 'text'
                      break;
                  }
                  if (dxm[0].tam_dxm && tip_dxm == 'C')  // si tiene tamaño y es caracter
                    var_dxm[dato]['style']['max-length'] = dxm[0].tam_dxm
        
                  if (dxm[0].tam_dxm && tip_dxm == 'N') {// si tiene tamaño y es numerico
                    const enteros = dxm[0].tam_dxm.split(',')[0] // obtiene la parte entera
                    const decimales = dxm[0].tam_dxm.split(',')[1]
                    var_dxm[dato]['PATTERN'] = `[0-9]{1,${enteros}}(\\.[0-9]{0,${decimales}})?` // define el patron de captura
        
                  }
                  var_dxm[dato]['label'] = dxm[0].des_dxm // descripcion del campo
        
                }
        */

      }
    }

    if (recCount('vi_cap_comedxm') > 0) { // si hay campos xml definidos
      const datos_dxm = await localAlaSql(`SELECT * FROM vi_cap_comedxm order by ord_dxm`); // leemos la definicion de campos
      for (let i = 0; i < datos_dxm.length; i++) {
        const dato = datos_dxm[i].var_dxm.trim()
        if (!(dato in var_dxm)) { // si no existe el campo lo aumenta
          var_dxm[dato] = {}
          var_dxm[dato]['value'] = '' // datos_dxm[i].val_dxm.trim()
        }
        var_dxm[dato]['label'] = datos_dxm[i].des_dxm.trim()// descripcion del campo
        var_dxm[dato]['readOnly'] = false
        var_dxm[dato]['style'] = { width: "fit-content" }
        var_dxm[dato]['type'] = 'text'

        const tip_dxm = datos_dxm[i].tip_dxm.trim()
        switch (tip_dxm) {
          case 'D':
            var_dxm[dato]['type'] = 'date'
            break;
          case 'N':
            var_dxm[dato]['type'] = 'number'
            var_dxm[dato]['value'] = + var_dxm[dato]['value']
            var_dxm[dato]['style']['MozAppearance'] = 'textfield';
            const enteros = datos_dxm[i].tam_dxm.split(',')[0] // obtiene la parte entera
            const decimales = datos_dxm[i].tam_dxm.split(',')[1]
            var_dxm[dato]['pattern'] = `[0-9]{1,${enteros}}(\\.[0-9]{0,${decimales}})?` // define el patron de captura
            break;
          case 'L':
            var_dxm[dato]['type'] = 'checkbox'
            var_dxm[dato]['value'] = +var_dxm[dato]['value']
            break;
          case 'C':
            var_dxm[dato]['type'] = 'text'
            var_dxm[dato]['style']['max-length'] = datos_dxm[i].tam_dxm
            break;
        }
      }
    }

    if (var_dxm == {}) return false
    // fin campos xml definidos

    this.var_dxm.prop.Value = JSON.stringify(var_dxm) // convierte el objeto a string
    console.log('string JSON var_dxm', this.var_dxm.prop.Value)

    /*
    <VFPData>
      <data RECIBE="HUGO MAURIN" RECEPCION="PAQMEX" GUIA="TU-26811" ENTREGA="T" />
    </VFPData>
    */
    return true
  }

  async graba_xml() {

    // const convert = require('xml-js'); // For xml-js
    // const xml2js = require('xml2js'); // For xml2js

    const m = {
      nom_tab: this.nom_tab,
      key_xmd: this.key_xmd,
      par_dxm: this.par_dxm
    }

    //    await use('vi_cap_comedxm', m) // use vi_cap_comedxm 

    let var_dxm = JSON.parse(this.var_dxm.prop.Value) // convierte el string a objeto

    let xml_xmd = '<VFPData><data'
    for (const dato in var_dxm) {  // busca en todas los campos si son campos libres
      xml_xmd += ` ${dato}= "${var_dxm[dato].value}"`
    }
    xml_xmd += '/></VFPData>'
    console.log('xml_xmd=', xml_xmd)

    //  const jsonResult = convert.xml2json(xml_xmd, { compact: true, spaces: 2 });

    if (await recCount('vi_cap_comexmd') == 0) {
      await appendBlank('vi_cap_comexmd', m)
    }
    const vi_cap_comexmd = await goto(0, 'vi_cap_comexmd')
    await updateCampo(xml_xmd, 'vi_cap_comexmd.xml_xmd', vi_cap_comexmd.recno)
    await tableUpdate(0, false, 'vi_cap_comexmd') // devuelve true si grabo correctamente
  }

  async borra_xml() {
    const xmd = await goto(0, this.nom_tab)
    if (xmd.key_pri > 0) {
      await SQLExec(`delete from man_comexmd where nom_tab='${this.nom_tab}' and key_xmd=${xmd.key_pri}`)

    }

  }
}