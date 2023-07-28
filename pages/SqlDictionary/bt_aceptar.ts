//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
////import { MessageBox } from '@/classes/Functions';
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

    this.prop.Value = "Aceptar"
    this.prop.Capture = false
    // this.prop.Image = "/Iconos/Accept.png";
    this.prop.Image = "/Iconos/svg/ok-accept.svg"
    this.style.width='30px'

  } // Fin constructor

  async click() {
    const m = { nom_tab: this.Form.nom_tab.prop.Value }
    console.log('bt_click this.prop.Disabled',this.prop.Disabled)
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
          this.Form.bt_gen_model.prop.Visible = false
          this.Form.bt_gen_indices.prop.Visible = false
          this.Form.bt_gen_vistas.prop.Visible = false

        const valor = this.Form.dic_dat.prop.Value
        // Si es Datos , Vistas o Indices
        if (valor == 'D' || valor == 'V' || valor == 'I') {
          this.Form.nom_tab.prop.Visible = true
          this.Form.bt_gen_all_models.Visible=false
          this.Form.nom_tab.setFocus()
        }

        //this.Form.dic_dat.valid()
        this.prop.Disabled = false
        return
      }

      // Hay datos capturados, grabara informacion 
      let dataUpdate = false
      let data = false
      if (this.Form.grid_datos.prop.Visible &&
        await this.Form.db.recCount('vi_cap_dat') > 4) {
        data = true
        this.Form.grid_datos.prop.Disabled=true
        this.Form.grid_indices.prop.Disabled=true
        this.Form.grid_vistas.prop.Disabled=true
        this.Form.bt_gen_model.prop.Visible = false
        this.Form.bt_gen_indices.prop.Visible = false
        this.Form.bt_gen_vistas.prop.Visible = false


        dataUpdate = await this.grabaDatos('vi_cap_dat')
       

        // return
      }

      // Indices
      // Hay datos capturados, grabara informacion 
      if (this.Form.grid_indices.prop.Visible) {
    //    data = true

        if (data && await this.Form.db.recCount('vi_cap_ind') > 0) {
          if (!await this.grabaDatos('vi_cap_ind'))
            dataUpdate = false

        } else
          dataUpdate = false

       // await this.Form.db.useNodata('vi_cap_ind')

      }

      // Vistas
      // Hay datos capturados, grabara informacion
      if (data && this.Form.grid_vistas.prop.Visible &&
        await this.Form.db.recCount('vi_cap_vis') > 0) {
       // data = true
        if (!await this.grabaDatos('vi_cap_vis'))
          dataUpdate = false

      //  await this.Form.db.useNodata('vi_cap_vis')
      }

      if (data) {
        if (//dataUpdate &&
          await MessageBox('Generamos en Servidor SQL Server la tabla:' + this.Form.nom_tab.prop.Value, 4, '') == 6) {
          if (! await this.Form.db.genTabla(this.Form.nom_tab.prop.Value)) {
            MessageBox('Error al generar la tabla :' + this.Form.nom_tab.prop.Value + ' en el Servidor SQL', 16, 'SQL ERROR')

            console.error('Error al generar/regenerar en Sql Server la tabla:' + this.Form.nom_tab.prop.Value)
          }
        }

      
        this.Form.prop.Status = 'A'
        await this.Form.db.useNodata('vi_cap_dat')
        await this.Form.db.useNodata('vi_cap_ind')
        await this.Form.db.useNodata('vi_cap_vis')
        this.Form.grid_datos.prop.Visible=false
        this.Form.grid_indices.prop.Visible=false
        this.Form.grid_vistas.prop.Visible=false
        this.Form.grid_datos.prop.Disabled=false
        this.Form.grid_indices.prop.Disabled=false
        this.Form.grid_vistas.prop.Disabled=false

        this.Form.grid_datos.prop.RecordSource=this.Form.grid_datos.prop.RecordSource
        this.Form.grid_indices.prop.RecordSource=this.Form.grid_indices.prop.RecordSource
        this.Form.grid_vistas.prop.RecordSource=this.Form.grid_vistas.prop.RecordSource
        this.prop.Disabled = false

        return
      }


      // Si hay nombre de tabla

      if (this.Form.nom_tab.prop.Visible) {
        // Campos de las Tablas del servidor SQL

        if (this.Form.dic_dat.prop.Value == 'D') {
          this.Form.grid_datos.prop.Status = 'A'
          await this.Form.db.use("vi_cap_dat ", m, "vi_cap_dat", ["con_dat"])
          if (await this.Form.db.recCount("vi_cap_dat") == 0) {
            await this.Form.grid_datos.appendDatos()
          }

          this.Form.grid_datos.prop.Visible = true
          this.Form.grid_datos.prop.textLabel ='Definicion de campos de la tabla '+this.Form.nom_tab.prop.Value
          this.Form.bt_gen_model.prop.Visible = true



          // Indices SQL
          await this.Form.db.use("vi_cap_ind", m)

          if (await this.Form.db.recCount("vi_cap_ind") == 0) {

            await this.Form.grid_indices.appendRow()

          }
          this.Form.grid_indices.prop.Visible = true
          this.Form.bt_gen_indices.prop.Visible = true


          // Vistas remota de captura SQL 
          await this.Form.db.use("vi_cap_vis", m)
          if (await this.Form.db.recCount("vi_cap_vis") == 0) {
            const m = {
              nom_tab: this.Form.nom_tab.prop.Value
            }
            await this.Form.grid_vistas.appendRow(m)

          }
          this.Form.grid_vistas.prop.Visible = true
          this.Form.bt_gen_vistas.prop.Visible = true

          // this.Form.btGenVistas.prop.Visible = true
        }

        // Tablas del servidor de SQL 
 //       if (this.Form.dic_dat.prop.Value == 'T') { // Tablas
 //         await this.Form.db.use("vi_cap_tab", m)
//          this.Form.grid_tablas.prop.Visible = true
//        }

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
        this.Form.grid_tablas.prop.Visible = false

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


    // Selecciono Menu de programas
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
      /*
      if (!this.Form.tip_men.prop.Visible) { // Tipo de menu
        this.Form.tip_men.prop.Visible = true
        this.prop.Disabled = false
        console.log('menu tipo Programa Principal', this.Form.tip_men.prop.Visible)
        return
      }
      */
      if (!this.Form.tpr_prg.prop.Visible) { // Tipo de menu Mantenimientos,Procesos,Reportes
        this.Form.tpr_prg.prop.Visible = true
        this.prop.Disabled = false
        return
      }

      if (this.Form.tpr_prg.prop.Value != 'S' && !this.Form.sis_sis.prop.Visible) { // Tipo de menu Mantenimientos,Procesos,Reportes
        this.Form.sis_sis.prop.Visible = true
        this.prop.Disabled = false
        return
      }


      m.sis_sis = '    '
      m.tpr_prg = this.Form.tpr_prg.prop.Value
      this.Form.grid_menu.prop.textLabel = 'Menú Principal'
      // se escogio programas, debe de leer los sistemas  
      if (m.tpr_prg != 'S') {
        m.sis_sis = this.Form.sis_sis.prop.Value
        if (m.tpr_prg == 'M')
          this.Form.grid_menu.prop.textLabel = 'Menú de Mantenimiento'
        if (m.tpr_prg == 'R')
          this.Form.grid_menu.prop.textLabel = 'Menú de Reportes'
        if (m.tpr_prg == 'P')
          this.Form.grid_menu.prop.textLabel = 'Menú de Procesos'
      }
      // Leemos menu de programas
      console.log('grid_menu m=',m)

      await this.Form.db.use("vi_cap_prg", m)
      console.log('grid_menu recno=',await this.Form.db.recCount("vi_cap_prg"))

      if (await this.Form.db.recCount("vi_cap_prg") == 0) {
        await this.Form.grid_menu.appendRow(m)
      } 
      this.Form.grid_menu.prop.Visible = true


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
    let grid_form = '' // grid de captura
    if (vis_cap == 'vi_cap_dat') {
      men_txt = 'Quieres grabar la definicion de la tabla '
      vis_act = 'lla1_dat'
      grid_form = 'grid_datos'
    }


    if (vis_cap == 'vi_cap_ind') {
      men_txt = 'Quieres grabar la definicion de indices '
      vis_act = 'lla1_ind'
      grid_form = 'grid_indices'

    }


    if (vis_cap == 'vi_cap_tab') {
      men_txt = 'Quieres grabar la definicion de las tablas SQL'
      vis_act = 'lla1_tab'
      grid_form = 'grid_tablas'

    }

    if (vis_cap == 'vi_cap_vis') {
      men_txt = 'Quieres grabar la definicion de las vistas remotas SQL'
      vis_act = 'lla1_vis'
      grid_form = 'grid_vistas'

    }

    if (vis_cap == 'vi_cap_prg') {
      men_txt = 'Quieres grabar el MENU del sistema'
      vis_act = 'lla1_prg'
      grid_form = 'grid_menu'

    }

    let resultado = 0
    resultado = await MessageBox(men_txt, 4, '')
    console.log('bt_aceptar Messagebox resultado', resultado)

    if (resultado == 6) {
      if (vis_cap == 'vi_cap_dat') { // para obtener el con_dat definitivo
        await this.ObtDefTabla()

      }
      console.log('bt_aceptar grabaDatos vis_cap,vis_act', vis_cap, vis_act)

      if (await this.Form.db.tableUpdate(1, false, vis_cap) == true) {  // Actualiza todos los registros
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