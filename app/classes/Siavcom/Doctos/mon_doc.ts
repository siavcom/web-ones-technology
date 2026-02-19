//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : comboBox
// @class : mon_doc
// Description : Componente mon_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class mon_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.Caption = "Moneda";
        this.prop.ControlSource = "vi_cap_comedoc.mon_doc";
        this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ToolTipText = "Moneda del documento";
        this.prop.Capture = true;
        this.prop.updateKey = false;
        this.prop.ColumnWidths = "92px,0px";
        this.inputStyle.width = "92px";
    }

    public override  async init() {
        const Var = Public.value
        // proteccion de moneda
        const des_mon = [
            Var.pr1_pge,
            Var.pr2_pge,
            Var.pr3_pge,
            Var.pr4_pge,
            Var.pr5_pge
        ];
        const num_mon = [1, 2, 3, 4, 5];
        this.prop.RowSource = [des_mon, num_mon];
    }
    // Evento   :Valid
    // Objeto  :mon_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de la moneda del documento
    override async valid(sw_rel?: boolean) {
        const m = await currentValue(['vm2_doc', 'vm3_doc', 'vm4_doc', 'vm5_doc'], 'vi_cap_comedoc')
        // si cambio de moneda o es un documento nuevo
        const vmo_doc = [0, 1, m.vm2_doc, m.vm3_doc, m.vm4_doc, m.vm5_doc]
        this.Form.vmo_doc.prop.Value = vmo_doc[this.prop.Value]
        console.log('valid mon_doc vmo_doc=', this.Form.vmo_doc.prop.Value)
        return true
    }   // Fin Procedure

    // Evento   :When
    // Objeto  :mon_doc
    // Tipo   :ComboBox
    // Comentarios :
    override async when() {
        let m = {}   // inicializamos m

        const vi_cap_cometcd = await scatter(['cba_cba'], 'vi_cap_cometcd')
        const cometdo = await scatter(['tip_cfd'], 'cometdo')

        if ((cometdo.tip_cfd == 'P' && vi_cap_cometcd.cba_cba > 0) || await recCount('vi_cap_comepag') > 0)
            return false

        return await this.Form.rev_per(this.prop.Name)

    }   // Fin Procedure

    //metodo
}