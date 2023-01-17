//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
import { MessageBox } from '@/classes/Functions';
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_aceptar extends COMPONENT {

  constructor() {
    super()
   
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'

    this.prop.Value = "Aceptar";
    this.prop.Capture = false;
    // this.prop.Image = "/Iconos/Accept.png";
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"

  } // Fin constructor

  async click() {
    const m = {nom_tab : this.Form.nom_tab.prop.Value }

    if (this.prop.Disabled) return
    this.prop.Disabled = true

    // No es un Menu del sistema y tablas
    if (this.Form.dic_dat.prop.Value != 'M' &&
      this.Form.dic_dat.prop.Value != 'T') {

      // No hay grid de captura
      if (this.Form.grid_datos.prop.Visible == false
        && this.Form.grid_indices.prop.Visible == false
        && this.Form.grid_menu.prop.Visible == false
        && this.Form.grid_tablas.prop.Visible == false
        && this.Form.grid_vistas.prop.Visible == false
        && this.Form.nom_tab.prop.Visible == false) {

        this.Form.dic_dat.valid()
        this.prop.Disabled = false
        return
      }

      // Hay datos capturados, grabara informacion 
      if (this.Form.grid_datos.prop.Visible &&
        await this.Form.db.recCount('vi_cap_dat') > 0) {
        if (await this.grabaDatos('vi_cap_dat') &&
          await MessageBox('Generamos en Servidor SQL Server la tabla:' + this.Form.nom_tab.prop.Value, 4, '') == 6) {
          const error = await this.Form.db.genTabla(this.Form.nom_tab.prop.Value)
          if (error==false)
            console.error('Error al generar/regenerar en Sql Server la tabla:' + this.Form.nom_tab.prop.Value)
        }
        await this.Form.db.useNodata('vi_cap_dat')
        this.prop.Disabled = false
        this.Form.prop.Status = 'A'
        
        return
      }

      // Indices
      // Hay datos capturados, grabara informacion 
      if (this.Form.grid_indices.prop.Visible &&
        await this.Form.db.recCount('vi_cap_ind') > 0) {

        if (await this.grabaDatos('vi_cap_ind') &&
          await MessageBox('Generamos en el Servidor SQL los indices de la tabla:' + this.Form.nom_tab.prop.Value, 4, '') == 6) {
          const error = await this.Form.db.genIndices(this.Form.nom_tab.prop.Value)
          if (error==false)
            console.error('Error al generar/regenerar en Sql Server los indices de la tabla:' + this.Form.nom_tab.prop.Value)
        }
        await this.Form.db.useNodata('vi_cap_ind')
        this.prop.Disabled = false
        this.Form.prop.Status = 'A'
        return
      }

      // Vistas
      // Hay datos capturados, grabara informacion
      if (this.Form.grid_vistas.prop.Visible &&
        await this.Form.db.recCount('vi_cap_vis') > 0) {

        if (await this.grabaDatos('vi_cap_vis') &&
          await MessageBox('Generamos en el backEnd las vistas Remotas  SQL de la tabla :' + this.Form.nom_tab.prop.Value, 4, '') == 6) {
          const error = await this.Form.db.genVistasSql(this.Form.nom_tab.prop.Value)
          if (error==false)
            console.error('Error al generar/regenerar en el backEnd las vistas remotas de la tabla:' + this.Form.nom_tab.prop.Value)
        }
        await this.Form.db.useNodata('vi_cap_vis')
        this.Form.prop.Status = 'A'
        this.prop.Disabled = false

        return
      }


      await this.Form.db.select(0)
      // Si hay nombre de tabla

      if (this.Form.nom_tab.prop.Visible) {
        // Campos de las Tablas del servidor SQL

        if (this.Form.dic_dat.prop.Value == 'D') {
          this.Form.grid_datos.prop.Status = 'A'
          await this.Form.db.use("vi_cap_dat ", m, "vi_cap_dat", ["con_dat"])
          if (await this.Form.db.recCount("vi_cap_dat")===0 ){
            await this.Form.grid_datos.appendDatos()
            console.log('Termine de incertar datos ')
          }
          this.Form.grid_datos.prop.Visible = true
          //this.Form.btGenTabla.prop.Visible = true
        }

        // Indices de las tablas del servidor de SQL 
        if (this.Form.dic_dat.prop.Value == 'I') { // Indices

          if (await this.Form.db.select('vi_cap_ind') == 0) await this.Form.db.select(0)
          await this.Form.db.use("vi_cap_ind", m)

          if (await this.Form.db.recCount("vi_cap_ind") == 0) {
            const m = {
              nom_tab: this.Form.nom_tab.prop.Value
            }
            await this.Form.grid_indices.appendRow(m)

          }
          this.Form.grid_indices.prop.Visible = true
          //this.Form.btGenModel.prop.Visible = true
        }

        // Vistas remotas SQL
        if (this.Form.dic_dat.prop.Value == 'V') // Vistas
        {
          console.log('bt_aceptar dic_dat=V  m',m)
          //      if (await this.Form.db.select('lla1_vis') == 0) await this.Form.db.select(0)
          //      await this.Form.db.useNodata("lla1_vis")

          await this.Form.db.use("vi_cap_vis", m)


          if (await this.Form.db.recCount("vi_cap_vis") == 0) {
            const m = {
              nom_tab: this.Form.nom_tab.prop.Value
            }
            await this.Form.grid_vistas.appendRow(m)

          }
          this.Form.grid_vistas.prop.Visible = true
          // this.Form.btGenVistas.prop.Visible = true
        }

        // Tablas del servidor de SQL 
        if (this.Form.dic_dat.prop.Value == 'T') { // Tablas

          if (await this.Form.db.select('vi_cap_tab') == 0) await this.Form.db.select(0)
          await this.Form.db.use("vi_cap_tab", m)
          this.Form.grid_tablas.prop.Visible = true
          //this.Form.btGenModel.prop.Visible = true
        }
      }

      this.prop.Disabled = false
      return
    }
    // Tablas del servidor SQL
    if (this.Form.dic_dat.prop.Value == 'T') // Tablas
    {

      // Hay datos capturados, grabara informacion 
      if (this.Form.grid_tablas.prop.Visible &&
        await this.Form.db.recCount('vi_cap_tab') > 0) {
        await this.grabaDatos('vi_cap_tab')
        await this.Form.db.useNodata('vi_cap_tab')
        this.prop.Disabled = false
        this.Form.prop.Status = 'A'

        return
      }

      // if (await this.Form.db.select('lla1_tab') == 0) await this.Form.db.select(0)
      // await this.Form.db.useNodata("lla1_tab")

      //if (await this.Form.db.select('vi_cap_tab') == 0) await this.Form.db.select(0)
      await this.Form.db.use("vi_cap_tab", m)
      console.log('bt_aceptar vi_cap_tab')
      this.Form.grid_tablas.prop.Visible = true
      //  this.Form.btGenTablas.prop.Visible = true
    }


    // Menu de programas
    if (this.Form.dic_dat.prop.Value == 'M') {

      // Hay datos capturados, grabara informacion 

      if (this.Form.grid_menu.prop.Visible &&
        await this.Form.db.recCount('vi_cap_prg') > 0) {
        await this.grabaDatos('vi_cap_prg')
        await this.Form.db.useNodata('vi_cap_prg')
        this.Form.prop.Status = 'A'
        this.prop.Disabled = false
        return

      }

      if (!this.Form.tip_men.prop.Visible) { // Tipo de menu
        this.Form.tip_men.prop.Visible = true
        this.prop.Disabled = false
        console.log('menu tipo ', this.Form.tip_men.prop.Visible)

        return
      }

      m.sis_sis = ''

      // se escogio programas, debe de leer los sistemas  
      if (this.Form.tip_men.prop.Value == 'P') {
        m.tpr_prg = ''
        m.sis_sis = this.Form.sis_sis.prop.Value
      } else {
        m.tpr_prg = 'S'
      }

      // Leemos menu de programas
      // if (await this.Form.db.select('lla1_prg') == 0) await this.Form.db.select(0)
      // await this.Form.db.useNodata("lla1_prg")

      ///if (await this.Form.db.select('vi_cap_prg') == 0) await this.Form.db.select(0)
      await this.Form.db.use("vi_cap_prg", m)
      // es un programa 

      // si ya se escogio el sistema , muestra el grid de captura
      if (this.Form.sis_sis.prop.Visible) {

        console.log('Muestra menu de programas', this.Form.grid_menu)
        this.Form.grid_menu.prop.Visible = true


      }
      if (this.Form.tip_men.prop.Value == 'P') {
        if (!this.Form.sis_sis.prop.Visible) {
          this.Form.sis_sis.prop.RowSourceType = 2
          this.Form.sis_sis.prop.Visible = true
        }
        else {
          //this.Form.grid_menu.prg_prg.prop.Visible = true
          this.Form.grid_menu.par_prg.prop.Visible = true
          this.Form.grid_menu.tpr_prg.prop.Visible = true
          this.Form.grid_menu.sis_sis.prop.Visible = false

          this.Form.grid_menu.prop.Visible = true
        }
      }

      if (this.Form.tip_men.prop.Value == 'S') {
        // Dentro del grid desaparece campos
        console.log('bt_aceptar Menu de Sistemas ',m,await this.Form.db.localSql('select * from vi_cap_prg'))
        this.Form.grid_menu.par_prg.prop.Visible = false
        this.Form.grid_menu.tpr_prg.prop.Visible = false
        this.Form.grid_menu.sis_sis.prop.Visible = true
        this.Form.grid_menu.prop.Visible = true
      }


    } // Fin de menu de programas
    this.prop.Disabled = false
    return

  } // Fin si es menu de programas

  //////////////////////////////////
  // Obten definicion de la tabla y asigna el consecutivo 
  // que quedara en la base de datos
  /////////////////////////////////
  async ObtDefTabla() {
    const data = await this.Form.db.localSql('select * from vi_cap_dat order by con_dat ')

    // asignara consecutivo
    for (let i = 0; i < data.length; i++) {
      data[i].con_dat = i + 1
      let cam_dat = data[i].cam_dat.trim()
      cam_dat = cam_dat.toUpperCase()
      if (cam_dat == 'USU_USU' ||
        cam_dat == 'USU_CRE' ||
        cam_dat == 'TIE_UAC' ||
        cam_dat == 'TIE_CRE' ||
        cam_dat == 'TIMESTAMP' ||
        cam_dat == 'KEY_PRI') data[i].con_dat = i + 10

    }
    // borramos la tabla original y la reinsertamos en Cursor temporal
    await this.Form.db.Sql('Use Now ; \
              delete from vi_cap_dat ;\
              SELECT * INTO vi_cap_dat  FROM ?', [data])

    //    return await this.grabaDatos('vi_cap_dat')
    //  Mandamos actualizar en la base de datos toda la vista   
  }

  //////////////////////////////////
  // Graba los datos 
  // vis_cap: Vista de captura
  /////////////////////////////////
  async grabaDatos(vis_cap: string) {
    let men_txt = '' // Mensaje de texto
    let vis_act = '' // vista de actualizacion
    let grid_captura = '' // grid de captura
    if (vis_cap == 'vi_cap_dat') {
      men_txt = 'Quieres grabar la definicion de la tabla '
      vis_act = 'lla1_dat'
      grid_captura = 'grid_datos'
    }


    if (vis_cap == 'vi_cap_ind') {
      men_txt = 'Quieres grabar la definicion de indices '
      vis_act = 'lla1_ind'
      grid_captura = 'grid_indices'

    }


    if (vis_cap == 'vi_cap_tab') {
      men_txt = 'Quieres grabar la definicion de las tablas SQL'
      vis_act = 'lla1_tab'
      grid_captura = 'grid_tablas'

    }

    if (vis_cap == 'vi_cap_vis') {
      men_txt = 'Quieres grabar la definicion de las vistas remotas SQL'
      vis_act = 'lla1_vis'
      grid_captura = 'grid_vistas'

    }


    if (vis_cap == 'vi_cap_prg') {
      men_txt = 'Quieres grabar el MENU del sistema'
      vis_act = 'lla1_prg'
      grid_captura = 'grid_menu'

    }
    
    let resultado=0
    resultado= await MessageBox(men_txt, 4, '')
    console.log('bt_aceptar Messagebox resultado',resultado)
//    if (await MessageBox(men_txt, 4, '') == 6) {
    if ( resultado == 6 ) {

      if (vis_cap == 'vi_cap_dat') { // para obtener el con_dat definitivo
        await this.ObtDefTabla()

      }

      this.Form[grid_captura].prop.Visible = false
      this.Form.db.select(vis_cap)

      if (await this.Form.db.tableUpdate(1, false, vis_cap, vis_act) == true) {  // Actualiza todos los registros
        MessageBox('Diccionario actualizado')
        return true
      }
      else {
        MessageBox('No se grabaron los datos', 16, 'ERROR')
        return false
      }

    }
  }








  async setFocus() {
  }
}