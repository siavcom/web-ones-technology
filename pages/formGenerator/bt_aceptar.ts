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
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.Value = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"
    this.prop.TabIndex = 1


  } // Fin constructor

  async click() {


    if (this.prop.Disabled) return
    this.prop.Disabled = true
    /*
    if (this.Form.nom_ind.prop.Value.trim() == '') {
      await this.Form.nom_tab.valid()
      this.prop.Disabled = false

      return
    }
    */
    if (!this.Form.vis_cap.prop.Visible || this.Form.vis_cap.prop.Value.trim() == '') {
      this.prop.Disabled = false
      return
    }

    if (this.Form.nom_for.prop.Value.trim() == '') {
      this.Form.nom_for.prop.Valid = false
      this.Form.nom_for.prop.ErrorMessage = 'Dato en blanco'
      this.prop.Disabled = false
      return
    }
    this.Form.grid_components.prop.RecordSource = ''
    this.Form.grid_captura.prop.RecordSource = ''

    const concatena = this.Form.db.dialect == 'postgres' ? '||' : '+'
    const m = {}
    const espacios = ' '.repeat(64)
    const nom_tab = this.Form.nom_tab.prop.Value.trim()
    const vis_cap = this.Form.vis_cap.prop.Value.trim()
    const controlSource = `'${vis_cap.trim()}.'${concatena}ltrim(lower(cam_dat))`


    // En el area de trabajo reservada , generamos un select a SQL server a una vista de captura
    // y le asignamos el nombre 'vi_cap_tab' a a tabla en el SQL local
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
    and nom_vis='${vis_cap}' order by con_dat`

    if (this.Form.tip_for.prop.Value == 'F' || this.Form.tip_for.prop.Value == 'C') {
      await this.Form.db.execute(ins_sql, 'vi_cap_form')
      await this.Form.db.localSql(
        " update vi_cap_form set cam_act=1,updatekey=1,max_len=2000000,min=1 where upper(trim(cam_dat))= 'KEY_PRI' ")

      const nom_ind = this.Form.nom_ind.prop.Value.trim()

      //console.log('Expresion vi_cap_ind',await this.Form.db.localSql('select * from vi_cap_ind'))

      // const data = await this.Form.db.localSql(`select exp_ind from vi_cap_ind where trim(nom_ind)='${nom_ind}'`)
      const data = await this.Form.db.execute(`select exp_ind,vac_vis from vi_cap_vis \
                          join vi_cap_ind on vi_cap_vis.vac_vis=vi_cap_ind.nom_ind where rtrim(nom_vis)='${vis_cap}'    `)

      if (data.length > 0 || data[0].exp_ind) {

        const exp_ind = data[0].exp_ind
//        console.log('Expresion campo indice ==', nom_ind, exp_ind)

        await this.Form.db.localSql(
          `update vi_cap_form set cam_act=1,updatekey=1 where '${exp_ind}' like '%'+trim(cam_dat)+'%' `)
      }
      // CHARINDEX(cam_dat,'${exp_ind}')>0    ${exp_ind} like trim(cam_dat)
      for (let i = 0; i < this.Form.grid_components.elements.length; i++) {
        const comp = this.Form.grid_components.elements[i].Name
        this.Form.grid_components[comp].prop.ControlSource = 'vi_cap_form.' + comp.toLowerCase()
      }

      this.Form.grid_components.prop.RecordSource = 'vi_cap_form'
      this.Form.grid_components.prop.Visible = true

    }
    // Si es captura de Grid o Compuesta
    if (this.Form.tip_for.prop.Value == 'C' || this.Form.tip_for.prop.Value == 'G') {

      await this.Form.db.execute(ins_sql, 'vi_cap_grid')

      const data = await this.Form.db.execute(`select exp_ind,vac_vis from vi_cap_vis \
                          join vi_cap_ind on vi_cap_vis.vac_vis=vi_cap_ind.nom_ind where rtrim(nom_vis)='${vis_cap}'    `)

      if (data.length > 0 || data[0].exp_ind) {
        const exp_ind = data[0].exp_ind

        await this.Form.db.localSql(
          `update vi_cap_grid set cam_act=1,updatekey=1 where '${exp_ind}' like '%'+trim(cam_dat)+'%' `)
      }

      for (let i = 0; i < this.Form.grid_captura.elements.length; i++) {
        const comp = this.Form.grid_captura.elements[i].Name
        this.Form.grid_captura[comp].prop.ControlSource = 'vi_cap_grid.' + comp.toLowerCase()
        console.log('bt_aceptar elements', comp, this.Form.grid_captura[comp].prop.ControlSource)
      }

      this.Form.grid_captura.prop.RecordSource = 'vi_cap_grid'
      this.Form.grid_captura.prop.Visible = true


    }

    this.prop.Disabled = false
    this.Form.bt_gen_forma.prop.Visible = true
    this.prop.Visible = false
    return

  }


}
