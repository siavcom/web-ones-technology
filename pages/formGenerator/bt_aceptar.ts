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

    const concatena=this.Form.db.dialect=='postgres' ?'||':'+'
    const m = {}
    const espacios=' '.repeat(64)

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

    // En el area de trabajo reservada , generamos un select a SQL server a una vista de captura
    // y le asignamos el nombre 'vi_cap_tab' a a tabla en el SQL local
    if (this.Form.tip_for.prop.Value == 'F' || this.Form.tip_for.prop.Value == 'C') {

      const nom_tab = this.Form.nom_tab.prop.Value.trim()
      // console.log('bt_aceptar controlSource this.Form.nom_ind.prop',this.Form.nom_ind.prop) 
      
      const controlSource = `'${this.Form.nom_ind.prop.Value.trim()}.'${concatena}trim(lower(cam_dat))`

      //console.log('bt_aceptar controlSource',controlSource)  
      const campos = `con_dat,lower(cam_dat) as cam_dat,ref_dat, tip_dat,lon_dat,dec_dat,'${espacios}' as nom_ind, 0 as updatekey, \
            1 as cam_act,${controlSource} as controlsource,0 as min,999 as max_len,1 as dat_cap,0 as lla_cap, \
            1 as nullvalue,'${espacios}' as length,'${espacios}' as textlabel, \
            '${espacios}' as placeholder,'${espacios}' as tooltiptext `

      await this.Form.db.execute(`select ${campos} from vi_cap_dat where \
            upper(cam_dat)<>'TIE_UAC' \
            and upper(cam_dat)<>'TIMESTAMP' \
            and upper(cam_dat)<>'USU_USU' \
            and upper(cam_dat)<>'TIE_CRE' \
            and upper(cam_dat)<>'USU_CRE' \
            and upper(cam_dat)<>'KEY_PRI' \
            and nom_tab='${nom_tab}' order by con_dat`, 'vi_cap_for')


      await this.Form.db.localSql(
        " update vi_cap_for set cam_act=1,updatekey=1,max_len=2000000,min=1 where upper(trim(cam_dat))= 'KEY_PRI' ")

      const nom_ind = this.Form.nom_ind.prop.Value.trim()

      //console.log('Expresion vi_cap_ind',await this.Form.db.localSql('select * from vi_cap_ind'))

      const data = await this.Form.db.localSql(`select exp_ind from vi_cap_ind where trim(nom_ind)='${nom_ind}'`)
      const exp_ind = data[0].exp_ind
      console.log('Expresion campo indice ==', nom_ind, exp_ind)

      await this.Form.db.localSql(
        `update vi_cap_for set cam_act=1,updatekey=1 where '${exp_ind}' like '%'+trim(cam_dat)+'%' `)

      // CHARINDEX(cam_dat,'${exp_ind}')>0    ${exp_ind} like trim(cam_dat)
      this.Form.grid_components.prop.Visible = true
    }
    // Si es captura de Grid o Compuesta
    if (this.Form.tip_for.prop.Value == 'C' || this.Form.tip_for.prop.Value == 'G') {
      const vis_cap = this.Form.vis_cap.prop.Value.trim()
      const controlSource = `'${vis_cap.trim()}.'${concatena}ltrim(lower(cam_dat))`

      //console.log('bt_aceptar controlSource',controlSource)  
      const campos = `con_dat,lower(cam_dat) as cam_dat,ref_dat, tip_dat,lon_dat,dec_dat,'${espacios}' as nom_ind, 0 as updatekey, \
              1 as cam_act,${controlSource} as controlsource,0 as min,999 as max_len,1 as dat_cap,0 as lla_cap, \
              1 as nullvalue,'${espacios}' as length,'${espacios}' as textlabel, \
              '${espacios}' as placeholder,'${espacios}' as tooltiptext `

      await this.Form.db.execute(`select ${campos} from vi_cap_vis \
            join vi_cap_dat on vi_cap_dat.nom_tab=vi_cap_vis.nom_tab\
            where \
            upper(vi_cap_dat.cam_dat)<>'TIE_UAC' \
            and upper(vi_cap_dat.cam_dat)<>'TIMESTAMP' \
            and upper(vi_cap_dat.cam_dat)<>'USU_USU' \
            and upper(vi_cap_dat.cam_dat)<>'TIE_CRE' \
            and upper(vi_cap_dat.cam_dat)<>'USU_CRE' \
            and upper(vi_cap_dat.cam_dat)<>'KEY_PRI' \
            and nom_vis='${vis_cap}' order by con_dat`, 'vi_cap_grd')

      this.Form.grid_captura.prop.Visible = true
    }

    this.prop.Disabled = false
    this.Form.bt_gen_forma.prop.Visible = true

    return

  }


}
