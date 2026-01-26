//////////////////////////////////////////////
// Clase : Details
// @author: Fernando Cuadras Angulo
// Creacion : 26/Ags/2024
// Description : Mustra el detalle para el departamento de ventas
// Update Date  :26/Ags/2024
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'
//import { modal_vta } from './detail_vta/modal_vta'

export class detail_vta extends COLUMN {
    //public modal_vta = new modal_vta()
    modal_vta: {} | undefined
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Detalle ventas'
        this.prop.BaseClass = 'imgButton'
        this.prop.Image = "/Iconos/svg/accept.svg"
        this.prop.Position = 'main'
        this.style.width = '24px'
        this.style.height = '24px'
        this.prop.Capture = false
    }

    override async init() {
        await super.init()
        this.modal_vta = this.Form.modal_vta
    }

    override async click() {
        this.prop.Valid = true
        this.prop.ReadOnly = ! await this.Parent.whenVta()
        if (this.prop.ReadOnly)
            return


        console.log('detail_vta.click', this.Recno, this.modal_vta)

        this.modal_vta.prop.Visible = true
        this.modal_vta.Recno = this.Recno

        //        const tap_tap = this.Form.ctz_tap.trim() // actividades de cotizacion del proyecto
        //        const tpy_tpy = this.Form.tpy_tpy.prop.Value.trim()

        const equ_equ = this.Form.equ_equ // equipo 
        const eqa_tap = this.Form.eqa_tap // equipo que autoriza

        //        const esu_tpy = this.Form.esu_tpy // equipo que supervisa

        let sw_com = 0
        let sw_aut = 0


        // equipo que autoriza
        const data = await localAlaSql(`select equ_equ as equ_com from equipos where equ_equ='${eqa_tap}'`)

        if (data.length > 0)
            sw_aut = 1
        // Leemos campos actualiza de la vista vi_cap_comecpy        
        const fields = ['isi_cpy']
        const m = await scatter(fields, 'vi_cap_comecpy')


        if (m.isi_cpy == 'S') {// Insumo en el siavcom
            this.modal_vta.block[1].prop.Visible = true // Insumo siavcom
            this.modal_vta.block[2].prop.Visible = true // Claves alternas del siavcom
            this.modal_vta.block[3].prop.Visible = false
            this.modal_vta.block[4].prop.Visible = false

            // await this.modal_vta.med_mov.when(this.Recno)
        }
        if (m.isi_cpy == 'N') {
            this.modal_vta.block[1].prop.Visible = false // Insumo siavcom
            this.modal_vta.block[2].prop.Visible = true
            this.modal_vta.block[3].prop.Visible = true
            this.modal_vta.block[4].prop.Visible = false
        }
        if (m.isi_cpy == 'E') {
            this.modal_vta.block[1].prop.Visible = false // Insumo siavcom
            this.modal_vta.block[2].prop.Visible = true
            this.modal_vta.block[3].prop.Visible = false
            this.modal_vta.block[4].prop.Visible = true
            this.modal_vta.pec_cpy.prop.Disabled = false
            this.modal_vta.moc_cpy.prop.Disabled = false
            this.modal_vta.pga_cpy.prop.Disabled = false
        } else {
            this.modal_vta.pec_cpy.prop.Disabled = true
            this.modal_vta.moc_cpy.prop.Disabled = true
            this.modal_vta.pga_cpy.prop.Disabled = true
        }

        this.modal_vta.block[5].prop.Visible = true // footer

        // se tiene que validar los campos de la modal hasta que se muestre


        await this.modal_vta.med_mov.when() // = new_data.mon_mov
        await this.modal_vta.pve_mov.valid()
        return true

    }
}
