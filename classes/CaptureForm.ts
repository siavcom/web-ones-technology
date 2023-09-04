/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// Author : Fernando Cuadras Angulo
// Creacion : 16/Noviembre/2022
// Ult.Mod  : 26/Diciembre/2022
/// //////////////////////////////////////////

import { COMPONENT } from './Component'
import { FORM } from '@/classes/Form'

export class captureForm extends FORM {
  public gridCaptura: [] = []
  public sw_ini = false

  // se debe de poner siempre el contructor
  constructor() {
    super()

  }

  /// //////////////////////////////////////////////////
  // Metodo init
  // Aqui se deben de asignar las areas de trabajo de los archivos
  /// //////////////////////////////////////////////////

  async init() { // (Form)
    // super.init() // corre el init de la clase para asignar los valores this a todos los componentes


    try {
      if (this.prop.RecordSource.length > 1) {
        console.log('Capture Form init this.prop.RecordSource=', this.prop.RecordSource)
        await this.refreshComponent(false)
      }
    } catch (error) {
      console.error('======Error Init=====' + this.Name, error)
    }
    this.bt_graba.Grid = this.gridCaptura // asignamos el arreglo de grid
  }

  /// /////////////////////////////////////
  // Metodo : valid
  // Descripcion : Valida los componentes de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  async validComponent(compName?: string) {
    if (!compName)
      return false
    this.prop.RecordSource = this.prop.RecordSource.toLowerCase()
    const thisComp = this[compName]


    if (thisComp.prop.updateKey) {

      if (this.Form.db.View[this.Form.prop.RecordSource].recCount > 0)
        this.Form.sw_ini = false
      if ((typeof thisComp.prop.Value == 'string' && thisComp.prop.Value.trim().length == 0) ||
        (typeof thisComp.prop.Value == 'number' && thisComp.prop.Value == 0)) {
        thisComp.prop.ErrorMessage = 'No permite datos en blanco'
        thisComp.prop.ShowError = true
        thisComp.prop.Valid = false
        return thisComp.prop.Valid
      }
    }
    thisComp.prop.Valid = true

    const m = this.Var  // Tomamos las variables publicas de la forma
    // Generamos variables de memoria
    for (const main in this.main) {
      const comp = this.main[main]

      if (this[comp].prop.updateKey) { //Obtiene solo los de llaves de actualizacion

        if (!this[comp].prop.Valid) { return true } // Si es un dato no esta  validado

      }
      // asignamos variables de memoria
      if (this[comp].prop.Capture) {
        if (this[comp].prop.Type == 'numeric')
          m[comp] = +this[comp].prop.Value
        else
          m[comp] = this[comp].prop.Value

      }



    }

    // variables publicas
    for (const Var in this.Var) {
      m[Var] = this.Var[Var]
    }

    // Leemos datos de la tabla de actualizacion
    //const tablaSql=this.db.View[this.prop.RecordSource].tablaSql .trim() 

    const data = await this.Form.db.use(this.prop.RecordSource, m)

    //console.log('capture form valid data', data)
    console.log('captureForm Valid m=', m, 'data=', data)

    //  if (!data || data == '400') { return false } // Hubo error al leer los datos

    let Recno = 0
    let sw_bor = false
    if (data.length == 0) { // No existe el registro
      const result = await this.Form.db.appendBlank(this.prop.RecordSource, m)
      Recno = result.recno
      console.log('Valid appendBlank ', result)

    } else {
      Recno = data[0].recno

      sw_bor = true
    }
    this.sw_ini = false
    await this.refreshComponent(true, Recno)
    this.bt_borra.prop.Visible = sw_bor
    this.bt_borra.prop.Disabled = !sw_bor


    return true
  } // fin metodo valid

  /// /////////////////////////////////////
  // Metodo : refreshComponent
  // Descripcion : refresca los componentes
  /// /////////////////////////////////////
  async refreshComponent(activate: boolean, Recno?: numeric) {
    // console.log('refresh component ', this.sw_ini)
    if (!Recno) { Recno = 0 }

    this.Recno = Recno

    if (this.sw_ini && !activate) { return }

    if (!activate) {
      if (this.prop.RecordSource.length > 2)
        await this.Form.db.useNodata(this.prop.RecordSource)
      Recno = 0
      console.log('========CaptureForm useNodata ===========',this.prop.RecordSource)
      this.sw_ini = true
      this.bt_graba.prop.Visible = false
      this.bt_borra.prop.Visible = false
    }
    else
      this.sw_ini = false

    // console.log('CaptureForm refresh commponent',activate)

    // this.bt_borra.prop.Visible = activate
    // Recorremos la forma y si es un componente de captura e quita el ReadOnly
    for (const i in this.main) {
      const comp = this.main[i]

      //      console.log('refresh componente 1', componente)
      if (this[comp].prop.Capture) {
        if (this[comp].prop.updateKey === false) { // No es llave de actualizacion
          this[comp].Recno = 0  // ponemos en cero para ejecutar un refresh

          if (Recno > 0) {
            this[comp].prop.ReadOnly = false
          }
          else {
            this[comp].prop.ReadOnly = !activate
          }

          this[comp].prop.Valid = activate
          console.log('CaptureForm refreshcomp ', comp, this[comp].Recno, this[comp].prop.ReadOnly)
        } else {
          this[comp].prop.ReadOnly = false // Si es llave de captura
          if (!activate) {
            this[comp].prop.Valid = false
          }

          if (this[comp].prop.BaseClass == 'comboBox' && !this[comp].prop.MultiSelect)
            this[comp].prop.Valid = true
        }

        if (Recno>0 && this[comp].Recno != Recno) this[comp].Recno = Recno  // Actualiza el registro del componente
        console.log('refresh CaptureForm comp=', comp, 'Recno=', this[comp].Recno)
      }
    }
    if (Recno > 0) {
      this.bt_graba.prop.Visible = true
    }

    console.log('=============<Fin CaptureForm refreshcomp>================= ')

  } // fin metodo

  /// //////////////////////////////
  // Metodo : bt_graba
  // Descripcion : Graba los datos de la forma
  /// //////////////////////////////
  public bt_graba = new class extends COMPONENT {
    public Grid = []
    constructor() {
      super()
      this.prop.Value = 'Graba datos'
      this.prop.Capture = false
      // this.prop.Sw_val = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Visible = false
      // this.prop.Image = "/Iconos/Accept.png";
      this.prop.Image = '/Iconos/svg/bx-check-circle.svg'
      //this.prop.TabIndex= 20
      this.style.width = '20px'


    } // Fin constructor

    async click() {

      if (!this.prop.Visible) return
      this.prop.Disabled = true
      this.prop.Valid = false

      this.Parent.bt_borra.prop.Disabled = true

      // Recorremos toda la forma y revisamos si estan validados

      for (const i in this.Parent.main) {
        const comp: string = this.Parent.main[i]
        // Checa si todos esta validados
        if ((this.Parent[comp].prop.Capture) &&
          !this.Parent[comp].prop.Valid) {
          if (!await this.Parent[comp].valid()) { return }
        }
      }

      console.log('CaptureForm bt_graba click() ====> alaSql=', await this.Form.db.localAlaSql('select * from ' + this.Parent.prop.RecordSource))
      console.log('CaptureForm bt_graba')
      const result = await this.Form.db.tableUpdate(0, false, this.Parent.prop.RecordSource)

      if (result) {
        MessageBox('Datos actualizados')

      } else {
        MessageBox('Error al actualizar Datos', 16)
        return
      }
      this.prop.Valid = true
      this.prop.Disabled = false
      this.prop.Visible = true
      this.Parent.sw_ini = false
      this.Parent.bt_borra.prop.Disabled = false
      this.Parent.bt_borra.prop.Visible = true
      // hay grid de captura
      //await this.lee_grid()


      return
    }

    public async lee_grid() {

      for (let i = 0; i < this.Grid.length; i++) {
        if (this.Form[this.Grid[i]].prop.RecordSource.trim() > '  ')
          await this.Form.db.use(this.Form[this.Grid[i]].prop.RecordSource, m)
        this.Form[this.Grid[i]].prop.Visible = true
      }
    }



  }

  public bt_borra = new class extends COMPONENT {
    constructor() {
      super()
      this.prop.Value = 'Borra registro'
      this.prop.Capture = false
      // this.prop.Sw_val = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Visible = false
      // this.prop.Image = "/Iconos/Accept.png";
      this.prop.Image = '/Iconos/svg/bx-eraser.svg'
      // this.prop.TabIndex= 21
      this.style.width = '20px'
    } // Fin constructor

    async click() {
      if (!this.prop.Visible || this.prop.Disabled) return
      this.prop.Disabled = true
      this.Parent.bt_graba.prop.Visible = false

      if (await MessageBox('Quieres borrar el registro', 4, '') === 6) {
        if (this.Form.Recno > 0) {
          console.log('borra registro', this.Form.prop.RecordSource, this.Form.Recno)
          const result = await this.Form.db.delete(this.Form.Recno, this.prop.RecordSource, true)

          if (result) {
            this.Form.sw_ini = false
            await this.Form.db.useNodata(this.Form.prop.RecordSource)
            await this.Form.refreshComponent(false)
            MessageBox('Datos borrados')
          } else {
            const data = await this.Form.db.requery(this.Form.prop.RecordSource)

            MessageBox('No se pudo borrar', 16)

            if (data.lenght === 0) { this.Form.refreshComponent(false) }
          }
        }

        this.prop.Disabled = false

      }
    }
  }
}

