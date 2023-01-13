/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// Author : Fernando Cuadras Angulo
// Creacion : 16/Noviembre/2022
// Ult.Mod  : 26/Diciembre/2022
/// //////////////////////////////////////////

import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'

export class captureForm extends FORM {
  /// //////////////////////////////////////////////////
  // Metodo init
  // Aqui se deben de asignar las areas de trabajo de los archivos
  /// //////////////////////////////////////////////////

  async init () { // (Form)
    // super.init() // corre el init de la clase para asignar los valores this a todos los componentes
    try {
      // this.Form.db.Form = this
      // if (this.prop.RecordSource.length > 1) {
      await this.refreshComponent(false)

      //  }
    } catch (error) {
      console.log('======Error Init=====' + this.prop.Name, error)
    }
  }

  /// /////////////////////////////////////
  // Metodo : Valid
  // Descripcion : Valida los datos de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  async valid () {
    let m = {}
    // Generamos variables de memoria
    for (const i in this.main) {
      const comp = this.main[i]
      if (this[comp].prop.updateKey) {
        console.log('CaptureForm comp', comp, this[comp].prop.Valid)
        if (!this[comp].prop.Valid) { return }

        // asignamos variables de memoria
        if (this[comp].prop.Type ==='numeric') { m[comp] = +this[comp].prop.Value } else { m[comp] = this[comp].prop.Value }
      }
    }
    // Leemos datos
    console.log('Leemos datos use ', m)
    const data = await this.db.use(this.prop.RecordSource, m)

    console.log('capture form valid data', data)
    if (!data) { return false } // Hubo error al leer los datos

    let Recno = 0
    if (data.length ===0) { // No existe el registro
      m = await this.db.appendBlank(this.prop.RecordSource, m)
      console.log('Valid appendBlank ', m)
      Recno = m.recno
      this.bt_borra.prop.Visible = false
    } else {
      Recno = data[0].recno
      this.bt_borra.prop.Visible = true
      console.log('capture form valid Recno', Recno)
    }
    this.sw_ini = false
    await this.refreshComponent(true, Recno)
    this.bt_graba.prop.Visible = true
    return true
  } // fin metodo valid

  /// /////////////////////////////////////
  // Metodo : refreshComponent
  // Descripcion : refresca los componentes
  /// /////////////////////////////////////
  async refreshComponent (activate: boolean, Recno?: numeric) {
    console.log('refresh component ', this.sw_ini)
    if (!Recno) { Recno = 0 }

    this.Recno = Recno

    if (this.sw_ini) { return }

    if (!activate) {
      await this.db.useNodata(this.prop.RecordSource)
    }
    this.bt_graba.prop.Visible = activate
    // this.bt_borra.prop.Visible = activate
    // Recorremos la forma y si es un componente de captura e quita el ReadOnly
    for (const i in this.main) {
      const comp = this.main[i]

      //      console.log('refresh componente 1', componente)
      if (this[comp].prop.Capture) {
        if (this[comp].prop.updateKey ===false) { // No es llave de actualizacion
          if (Recno > 0) { this[comp].prop.ReadOnly = false } else { this[comp].prop.ReadOnly = !activate }

          this[comp].prop.Valid = activate
          this[comp].Recno = Recno // Actualiza el registro del componente
          console.log('CaptureForm refreshcomp', comp, this[comp].Recno, this[comp].prop.ReadOnly)
        } else {
          this[comp].prop.ReadOnly = false // Si es llave de captura
          if (!activate) {
            this[comp].prop.Valid = false
          }
        }
      }
    }
    this.sw_ini = true
  }; // fin metodo

  /// //////////////////////////////
  // Metodo : bt_graba
  // Descripcion : Graba los datos de la forma
  /// //////////////////////////////
  public bt_graba = new class extends COMPONENT {
    constructor () {
      super()
      this.prop.Name = 'bt_graba'
      this.prop.Value = 'Graba datos'
      this.prop.Capture = false
      // this.prop.Sw_val = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Visible = false
      // this.prop.Image = "/Iconos/Accept.png";
      this.prop.Image = '/Iconos/svg/bx-check-circle.svg'
      this.style.width = '20px'
    } // Fin constructor

    async click () {
      this.prop.Visible = false
      this.Parent.bt_borra.prop.Visible = false

      // Recorremos toda la forma y revisamos si estan validados
      for (const i in this.Parent.main) {
        const comp = this.Parent.main[i]

        console.log('bt_graba ', comp, this.Parent[comp].prop.Valid)

        if ((this.Parent[comp].prop.Capture) &&
          !this.Parent[comp].prop.Valid) {
          if (!await this.Parent[comp].valid()) { return }
        }
      }
      // console.log('captureForm tableUpdate')
      this.prop.Disabled = true
      const result = await this.Parent.db.tableUpdate(this.prop.RecordSource)

      if (result) {
        this.Form.messageBox('Datos actualizados')
      } else {
        this.Form.messageBox('Error al actualizar Datos', 16)

        return
      }
      this.prop.Disabled = false
      this.Parent.bt_borra.prop.Visible = true
      this.prop.Visible = true
      this.Parent.sw_ini = false
    }
  }()

  public bt_borra = new class extends COMPONENT {
    constructor () {
      super()
      this.prop.Name = 'bt_borra'
      this.prop.Value = 'Borra registro'
      this.prop.Capture = false
      // this.prop.Sw_val = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Visible = false
      // this.prop.Image = "/Iconos/Accept.png";
      this.prop.Image = '/Iconos/svg/bx-eraser.svg'
      this.style.width = '20px'
    } // Fin constructor

    async click () {
      this.Parent.bt_graba.prop.Visible = false
      if (await this.Form.messageBox('Quieres borrar el registro', 4, '') ===6) {
        if (this.Form.Recno > 0) {
          console.log('borra registro', this.Form.prop.RecordSource, this.Form.Recno)
          const result = await this.Form.db.delete(this.Form.Recno, this.prop.RecordSource, true)

          if (result) {
            this.Form.sw_ini = false
            await this.Form.db.useNodata(this.Form.prop.RecordSource)
            await this.Form.refreshComponent(false)
            this.Form.messageBox('Datos borrados')
          } else {
            const data = await this.Form.db.requery(this.Form.prop.RecordSource)

            this.Form.messageBox('No se pudo borrar', 16)

            if (data.lenght ===0) { this.Form.refreshComponent(false) }
          }
        }
        this.prop.Visible = false
      }
    }
  }()
}
