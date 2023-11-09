//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
// Ult.Mod : 10/Julio/2023
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
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.Value = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"
    this.prop.TabIndex = 1
    this.prop.Visible=false


  } // Fin constructor

  async click() {

    if (this.prop.Disabled) return
    this.prop.Disabled = true

    if (this.Form.nom_for.prop.Value.trim() == '') {
      this.Form.nom_for.prop.Valid = false
      this.Form.nom_for.prop.ErrorMessage = 'Dato en blanco'
      this.prop.Disabled = false
      return
    }
     

    // Limpiamos el recordSource de los dos grid
    this.Form.grid_columns.prop.RecordSource = ''
    this.Form.grid_form.prop.RecordSource = ''

    const concatena = this.Form.db.dialect == 'postgres' ? '||' : '+'
    const m = {}
    const espacios = ' '.repeat(64)
    //   const nom_tab = this.Form.nom_tab.prop.Value.trim()
    const vis_grid = this.Form.vis_grid.prop.Value.trim()
    const vis_form = this.Form.vis_form.prop.Value.trim()
    let controlSource = ''
    // Es Forma o Compuesta. Asigna la forma de captura
    if (this.Form.tip_for.prop.Value == 'F' || this.Form.tip_for.prop.Value == 'C') {
      this.Form.grid_form.prop.Status='P'
      this.Form.grid_form.prop.Visible=true
  
      controlSource = `'${vis_form.trim()}.'${concatena}ltrim(lower(cam_dat))`
      // En el area de trabajo reservada , generamos un select a SQL server a una vista de captura
      // y le asignamos el nombre 'vi_cap_cometab' a a tabla en el SQL local
      const campos = `con_dat,lower(cam_dat) as cam_dat,ref_dat, tip_dat,lon_dat,dec_dat,'${espacios}' as nom_ind, 0 as updatekey, \
      1 as cam_act,${controlSource} as controlsource,0 as min,lon_dat as maxlen,1 as dat_cap,0 as lla_cap, \
      0 as nullvalue,'${espacios}' as length,'${espacios}' as textlabel, \
      ref_dat as placeholder,ref_dat as tooltiptext,'E' as baseclass `
      const ins_sql = `select ${campos} from vi_schema where \
      upper(cam_dat)<>'TIE_UAC' \
      and upper(cam_dat)<>'TIMESTAMP' \
      and upper(cam_dat)<>'USU_USU' \
      and upper(cam_dat)<>'TIE_CRE' \
      and upper(cam_dat)<>'USU_CRE' \
      and upper(cam_dat)<>'KEY_PRI' \
      and nom_vis='${vis_form}' order by con_dat`

      if (!await this.Form.db.execute(ins_sql, 'vi_cap_form')) {
        MessageBox('No hay vista de captura para la forma principal', 16)
        return
      }

      await this.Form.db.localSql(
        " update vi_cap_form set cam_act=1,updatekey=1,lon_dat=2147483647,min=1 where upper(trim(cam_dat))= 'KEY_PRI' or upper(trim(cam_dat))= 'ID' ")

      // Buscamos la expresion de indice de actualizacion
      const data = await this.Form.db.execute(`select exp_ind,vac_vis from vi_cap_comevis \
                          join vi_cap_comeind on vi_cap_comevis.vac_vis=vi_cap_comeind.nom_ind where rtrim(nom_vis)='${vis_form}' `, 'MEMVAR')

      if (data.length == 0 || data[0].exp_ind.trim() == '') {
        MessageBox('No hay expresión de indice el la vista de captura', 16)
        return
      }

      const exp_ind = data[0].exp_ind.trim()
      //        console.log('Expresion campo indice ==', nom_ind, exp_ind)

      await this.Form.db.localSql(
        `update vi_cap_form set cam_act=1,updatekey=1 where '${exp_ind}' like '%'+trim(cam_dat)+'%' `)
      // CHARINDEX(cam_dat,'${exp_ind}')>0    ${exp_ind} like trim(cam_dat)
      console.log('bt_aceptar this.Form.grid_form.elements',this.Form.grid_form.elements)
      for (let i = 0; i < this.Form.grid_form.elements.length; i++) {
        const comp = this.Form.grid_form.elements[i].Name
        this.Form.grid_form[comp].prop.ControlSource = 'vi_cap_form.' + comp.toLowerCase()
        console.log('bt_aceptar elements', comp, this.Form.grid_form[comp].prop.ControlSource)
      }


      this.Form.grid_form.prop.Status='A'
      this.Form.grid_form.prop.RecordSource = 'vi_cap_form'

    }

    //================ Si es captura de Grid o Compuesto =====================
    if (this.Form.tip_for.prop.Value == 'C' || this.Form.tip_for.prop.Value == 'G') {
      this.Form.grid_columns.prop.Status='P'
      this.Form.grid_columns.prop.Visible=true
 
      controlSource = `'${vis_grid.trim()}.'${concatena}ltrim(lower(cam_dat))`

      const campos = `con_dat,lower(cam_dat) as cam_dat,ref_dat, tip_dat,lon_dat,dec_dat,'${espacios}' as nom_ind, 0 as updatekey, \
      1 as cam_act,${controlSource} as controlsource,0 as min,lon_dat as maxlen,1 as dat_cap,0 as lla_cap, \
      0 as nullvalue,'${espacios}' as length,'${espacios}' as textlabel, \
      ref_dat as placeholder,ref_dat as tooltiptext,'E' as baseclass `
      const ins_sql = `select ${campos} from vi_schema where \
      upper(cam_dat)<>'TIE_UAC' \
      and upper(cam_dat)<>'TIMESTAMP' \
      and upper(cam_dat)<>'USU_USU' \
      and upper(cam_dat)<>'TIE_CRE' \
      and upper(cam_dat)<>'USU_CRE' \
      and upper(cam_dat)<>'KEY_PRI' \
      and nom_vis='${vis_grid}' order by con_dat`

      if (!await this.Form.db.execute(ins_sql, 'vi_cap_grid')) {
        MessageBox('No hay vista de captura para el grid de captura', 16)
        return
      }

      await this.Form.db.localSql(
        " update vi_cap_grid set cam_act=1,updatekey=1,lon_dat=2147483647,min=1 where upper(trim(cam_dat))= 'KEY_PRI' or upper(trim(cam_dat))= 'ID' ")

      // Buscamos la expresion de indice de actualizacion
      const data = await this.Form.db.execute(`select exp_ind,vac_vis from vi_cap_comevis \
                    join vi_cap_comeind on vi_cap_comevis.vac_vis=vi_cap_comeind.nom_ind where rtrim(nom_vis)='${vis_grid}' `, 'MEMVAR')

      //////////////////////
      /*      if (!this.Form.db.execute(ins_sql, 'vi_cap_grid')) {
              MessageBox('No hay vista de captura para el grid', 16)
              return
            }
            // Buscamos la expresion de indice de actualizacion
            const data = await this.Form.db.execute(`select exp_ind,vac_vis from vi_cap_comevis \
                                join vi_cap_comeind on vi_cap_comevis.vac_vis=vi_cap_comeind.nom_ind where rtrim(nom_vis)='${vis_grid}'    `, 'MEMVAR')
      
            if (data.length == 0 || data[0].exp_ind.trim() == '') {
              MessageBox('No hay expresión de indice para el grid captura')
              return
            }
            await this.Form.db.localSql(
              `update vi_cap_grid set cam_act=1,updatekey=1 where '${exp_ind}' like '%'+trim(cam_dat)+'%' `)
      
            */
      //////////////////////

      const exp_ind = data[0].exp_ind.trim()

      for (let i = 0; i < this.Form.grid_columns.elements.length; i++) {
        const comp = this.Form.grid_columns.elements[i].Name
        this.Form.grid_columns[comp].prop.ControlSource = 'vi_cap_grid.' + comp.toLowerCase()
        console.log('bt_aceptar elements', comp, this.Form.grid_form[comp].prop.ControlSource)
      }
      this.Form.grid_columns.prop.Status='A'
      this.Form.grid_columns.prop.RecordSource = 'vi_cap_grid'
 
    }

    this.prop.Disabled = false
    this.Form.bt_gen_forma.prop.Visible = true
    this.prop.Visible = false
    return

  }


}
