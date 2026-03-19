/**
 * @description : Combo para mostrar datos de sat  
 */

export class COMBO_SAT extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.Capture = true;
        this.prop.updateKey = false;
        this.prop.ColumnWidths = "200,30";
        this.inputStyle.width = "200px";
    }

    override async init(cam_sat: string, par_sat: string) {
        const m = {
            cam_sat: cam_sat,
            par_sat: par_sat
        }
        this.prop.RowSource = `select des_sat,cla_sat from vi_comesat where cam_sat='${m.cam_sat}' and par_sat='${m.par_sat}'` // use vi_comesat vi_comesat

    }

    // Evento   :When
    // Objeto  :mpa_doc
    // Tipo   :Cuadro de texto
    // Comentarios :
    override async when() {

        this.prop.Valid = true

        if (this.Form.prop.Name == 'COME5101') {
            const vi_cap_comedoc = await currentValue('sta_doc', "vi_cap_comedoc")
            const cometdo = await currentValue('tip_cfd', 'cometdo')
            if (this.Form.vi_cap_comedoc.sta_doc == 'X')
                return false

            if (cometdo.tip_cfd == 'NA' || vi_cap_comedoc.sta_doc == 'T' || vi_cap_comedoc.sta_doc == 'X' || this.prop.ReadOnly)
                return false
            return await this.Form.rev_per(this.prop.Name)
        }
        return true
    }   // Fin Procedure


    //metodo
}