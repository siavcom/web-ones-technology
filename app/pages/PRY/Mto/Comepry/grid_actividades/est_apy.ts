//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : eau_tap
// Description : Estatus
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class est_apy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Estatus"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comeapy.est_apy";
    this.prop.RowSource = [
      [
        "Inicio",
        "Bloqueada",
        "Autorizada",
        "Cancelada",
        "Reprogramada",
        "Finalizada",
      ],
      ["I", "B", "A", "C", "R", "F"],
    ];
    this.prop.RowSourceType = 5;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.inputStyle.width = "100px";
    // this.style.zIndex = 1;
    this.style.width = "110px";

    this.key_pri = 0
    this.tap_tap = '' // Tipo de actividad
    this.oldValue = '' // Anterior valor
    this.eqa_tap = '' // Equipo que puede autorizar
    this.amu_tap = 0   // Actividad multiple
  }

  async when() {
    this.prop.Valid = true
    // leemos regstro actual
    const res = await this.Sql.localAlaSql(`select key_pri,tap_tap from now.vi_cap_comeapy where recno=${this.Recno}`)
    // si es un registro nuevo, no debe ser modificado
    console.log('est_apy res=', res, 'Recno=', this.Recno);

    if (res.length > 0 && res[0].key_pri && res[0].key_pri > 0) {
      this.key_pri = res[0].key_pri
      this.tap_tap = res[0].tap_tap.trim()

      // Leemos el valor original
      const res2 = await this.Sql.localAlaSql(`select est_apy from Last.vi_cap_comeapy where recno=${this.Recno}`)
      this.oldValue = res2[0].est_apy.trim()

      const data = await this.Sql.localAlaSql(`select eqa_tap,amu_tap from now.vi_cap_cometap where rtrim(tap_tap)='${this.tap_tap}' `)
      this.eqa_tap = data[0].eqa_tap.trim() // Equipo que puede autorizar
      this.amu_tap = data[0].amu_tap // Actividad multiple

      if (this.oldValue == 'C' || this.oldValue == 'F') {
        this.prop.Value = this.oldValue
        this.prop.Readonly = false
        return true
      }

      this.prop.Readonly = false
      return true
    }
    this.prop.Readonly = true

    return false
  }


  async interactiveChange() {

    if (this.oldValue == this.prop.Value) {
      return true
    }

    if (this.prop.Value == 'A' || this.prop.Value == 'C' || this.prop.Value == 'B') { // Si esta inicio y hay equipo de autorización
      // Cosultamos si necesita autorizacion
      if (this.eqa_tap > '   ') { // si hay equipo de autorizacion, el usuario debe estar autorizado
        const res2 = await this.Sql.localAlaSql(`select log_usu from equusu where eqa_tap='${this.eqa_tap}'`)

        if (res2 && res2[0].log_usu && res2[0].log_usu > '     ') {
          return true // Usuario autorizado
        }
        MessageBox("El usuario no puede AUTORIZAR, CANCELAR o BLOQUEAR esta actividad")
        this.prop.Value = this.oldValue
        return true
      }
    }
    if (this.prop.Value == 'F') { // Si es final
      if (this.eqa_tap > '   ' && this.oldValue != 'A') {
        this.prop.Value = this.oldValue
        MessageBox("La actividad necesita autorización")
        return true
      }
      return true
    }

    // Hay una reprogramacion y es una actividad multiple
    if (this.prop.Value.trim() == 'R' && +this.amu_tap == 1 && this.oldValue == 'I') {
      return true
    }

    MessageBox("No se puede cambiar el estatus de la actividad")
    this.prop.Value = this.oldValue
    return true

  }

  async valid_old() {
    if (this.prop.Value == 'F' && this.Parent.tdo_tdo.prop.Value > '   ') { // Si es final y tiene documento 
      this.Parent.ndo_doc.prop.Valid = false

      return true

    }
  }


}









