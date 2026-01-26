//////////////////////////////////////////////
// Clase : Details
// @author: Fernando Cuadras Angulo
// Creacion : 02/Mayo/2024
// Description : Mustra el detalle para el departamento de compras
// Update Date  :12/Ags/2024
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'
//import { modal_com } from './detail_com/modal_com'

export class detail_com extends COLUMN {
    //  public modal_com = new modal_com()

    modal_com: {} | undefined
    inFocus = false
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Detalle compras'
        this.prop.BaseClass = 'imgButton'
        this.prop.Image = "/Iconos/svg/accept.svg"
        this.style.width = '24px'
        this.style.height = '24px'
        this.prop.Capture = false
        this.asignaRecno()
    }

    override async init() {
        await super.init()
        this.modal_com = this.Form.modal_com
        //  this.modal_com.prop.Visible = false
    }


    override async when() {

        if (await this.Parent.whenCompra())
            return false

        //  if (!this.inFocus) {
        //      this.click()
        //      return true
        //  }

        //   this.inFocus = false
        return true
    }

    override async click() {

        const eco_tpy = this.Form.eco_tpy.trim() // equipo de compras
        const eqa_tap = this.Form.eqa_tap.trim() // equipo que autoriza
        console.log('detail_com.click This.Recno', this.Recno, this.modal_com)

        this.modal_com.prop.Visible = true
        this.modal_com.Recno = this.Recno

        //        const esu_tpy = this.Form.esu_tpy // equipo que supervisa

        let sw_com = 0
        let sw_aut = 0

        let data = await this.Sql.localAlaSql(`select equ_equ as equ_com from equipos where rtrim(equ_equ)='${eco_tpy}'`)
        if (data.length > 0)
            sw_com = 1

        data = [...await this.Sql.localAlaSql(`select equ_equ as equ_com from equipos where rtrim(equ_equ)='${eqa_tap}'`)]


        if (data.length > 0)
            sw_aut = 1

        if (sw_aut == 0 && sw_com == 0) {
            this.prop.Visible = false
            return false;
        }
        // Leemos campos actualiza de la vista vi_cap_comecpy        
        const fields = ['isi_cpy', 'psi_cpy']
        const m = await this.Sql.scatter(fields, 'vi_cap_comecpy')


        if (m.isi_cpy == 'S') {// Insumo en el siavcom
            this.modal_com.block[1].prop.Visible = true
            // await this.modal_com.med_mov.when(this.Recno)
        }
        else
            this.modal_com.block[1].prop.Visible = false

        if (m.psi_cpy == 1) {// Bloque 2 Compra a proveedor de Siavcom
            this.modal_com.block[2].prop.Visible = true
            this.modal_com.block[3].prop.Visible = false
            this.modal_com.dea_prv.prop.Disabled = true
        }
        else {                                     // Bloque 3 Compra a proveedor externo 
            this.modal_com.block[2].prop.Visible = false

            if (m.isi_cpy != 'E')
                this.modal_com.block[3].prop.Visible = true

            this.modal_com.dea_prv.prop.Disabled = false
        }
        // El equipo que autoriza es el equipo que esta capturando
        if (sw_aut = 1) {
            this.modal_com.block[4].prop.Visible = true // Autorizacion
        }

        return true
    }
}
