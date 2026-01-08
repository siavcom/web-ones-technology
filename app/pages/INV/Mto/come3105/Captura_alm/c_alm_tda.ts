//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_alm_tda
// Description : Componente c_alm_tda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {header} from "@/classes/header";

import { COLUMN } from "@/classes/Column";
//import { c_des_tda } from "./c_des_tda";
//imports

export class c_alm_tda extends COLUMN {
  //public
  //public c_des_tda = new c_des_tda();
  constructor() {
    super();
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_alm.alm_tda";
    this.prop.RowSource = "SELECT des_tda,alm_tda from vi_cap_tda ORDER BY des_tda";
    this.prop.BoundColumn = 2;
    this.prop.ColumnCount = 2;
    this.prop.RowSourceType = 4; // 4-localAlaSQL
    this.prop.ColumnWidths = "254px,30px";
    this.prop.ColumnTextLabel = "Almacen";
    this.prop.updateKey = true
    this.prop.Capture = true
    this.style.width = "264px"
    this.prop.First = true

    //propiedades
  }

  public override async interactiveChange() {

    const data = await localAlaSql(`SELECT alm_tda from vi_cap_alm  where '${this.prop.Value.trim()}'=trim(alm_tda)`)

    if (data.length > 1) {  // ya existe el almacen
      this.prop.Value = this.old_value

      return false
    }
    return await super.valid()

  }

  override async when() {
    await super.when()

    this.prop.Valid = true
    this.prop.ReadOnly = !this.prop.Valid

    let Valor = this.prop.Value.trim()
    console.log("1.0) c_alm_tda when this.Recno=", this.Recno, ',Valor=', Valor)

    let data = await localAlaSql(`SELECT alm_tda,recno from vi_cap_alm  where  recno<>${this.Recno} and trim(alm_tda)='${Valor}' `)

    console.log("1.1) c_alm_tda when this.Recno=", this.Recno, ',Valor=', Valor, 'data=', data)

    if (data.length > 0) {  // ya existe el almacen

      const des_tda = data[0].des_tda
      data = await localAlaSql(`SELECT alm_tda,des_tda from  vi_cap_tda where trim(alm_tda)<>'${Valor}' and not exists(select recno from vi_cap_alm where trim(vi_cap_alm.alm_tda)=trim(vi_cap_tda.alm_tda)) order by des_tda LIMIT 1`)

      if (data.length == 0) {
        this.prop.Valid = false
        return false
      }
      this.prop.Value = data[0].alm_tda
      /*
  
  
        let found = false
  
  
        console.log("1.2) c_alm_tda when this.Recno=", this.Recno, 'data=', data)
  
        for (let i = 0; i < data.length; i++) {
          Valor = data[i].alm_tda.trim()
          data = await localAlaSql(`SELECT alm_tda from vi_cap_alm where trim(alm_tda)='${Valor}'  limit 1 `)
          if (data.length == 0) {   // no hay mas registros
            this.prop.Value = Valor
            found = true // Encontro uno libre
            console.log("2) c_alm_tda when found", this.prop.Value)
  
            break
          }
        }
        */
      //      if (!found) {
      //        this.Parent.deleteRow(this.Recno, true)
      //      }
    }


    return !this.prop.Valid
  }   // 
  //metodo
}