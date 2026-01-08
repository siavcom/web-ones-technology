//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : bt_add_activity
// Description : boton para agregar actividad
// Author : El Fer Blocks
// Creation : 2024-03-8
// Update Date  : 
/////////////////////////////////////////////


export class bt_add_activity extends IMGBUTTON {

  constructor() {
    super()
    this.prop.BaseClass = 'imgButton'
    this.prop.Caption = 'Actividad'
    this.prop.Image = "/Iconos/svg/add-color.svg"
    this.prop.Capture = false
    this.style.width = "30px"
    this.prop.ToolTipText = 'Agregar actividad de este proyecto a la agenda'

  }
  async when() {
    if (this.prop.Focus)
      this.click()

    return true
  }
  override async click() {
    /*
        const tpy_tpy = this.Parent.tpy_tpy.prop.Value
        const num_pry = this.Parent.num_pry.prop.Value
        
            const res = await  localAlaSql(`select * from vi_con_actividades where tpy_tpy='${tpy_tpy}' and ord_tap=0 \
            and not exists(select tpy_tpy from now.vi_cap_agenda where tpy_tpy=vi_con_actividades.tpy_tpy and \
              num_pry=${num_pry} and \
              vi_con_actividades.tap_tap=vi_cap_agenda.tap_tap) `);
        
      
    
        if (res.length == 0) {
          await MessageBox('Hay actividades sin orden activas', 16, 'Warning');
          return
        }
        // obtnemos el periodo de la actividad
        const per = await  localAlaSql(`select * from now.vi_cap_agenda where recno=${this.Recno} `)
        const per_apy = per[0].per_apy
        return await this.Parent.appendRow(tpy_tpy, num_pry, per_apy)
        */
    // obtnemos el periodo de la actividad
    const per = await localAlaSql(`select con_apy+1 as con_apy from now.vi_cap_agenda where recno=${this.Recno} `)
    const per_apy = this.Parent.per_apy.prop.Value
    const tpy_tpy = this.Parent.tpy_tpy.prop.Value
    const num_pry = this.Parent.num_pry.prop.Value


    return await this.Parent.appendRow(tpy_tpy, num_pry, per_apy)
  }
}