//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : num_pry
// Description : Componente num_pry
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class num_pry extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();

        this.prop.Type = 'number';
        this.prop.Decimals = 0
        //this.prop.ControlSource = "vi_cap_comedoc.num_pry";
        this.prop.Capture = false
        this.style.width = '87px';
        this.asignaRecno()

        //propiedades
    }

    // Evento   :Valid
    // Objeto  :num_pry
    // Tipo   :Cuadro de texto
    // Comentarios :
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        this.prop.Valid = false
        if (vi_cap_comedoc.num_pry == 0) {
            this.prop.Valid = true
            return true

        } // End If 

        const vi_cap_comepry = await goto(0, 'vi_cap_comepry')
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

        m.num_pry = iif(vi_cap_comedoc.key_pri, this.prop.Value, vi_cap_comedoc.num_pry)


        if (vi_cap_comedoc.key_pri || vi_cap_comedoc.num_pry != vi_cap_comepry.num_pry) {
            await select('vi_cap_comepry')

            await requery()

            if (await recCount() == 0) {
                MessageBox('No existe el proyecto', 16, 'Error', 5000)
                return false

            } // End If 

            //this.Form.d_tit_pry.refresh
            // thisform.d_des_pry.value=vi_cap_comepry.des_pry
        } // End If 

        this.prop.Valid = true
        return true

    }   // Fin Procedure


    override async when() {
        let m = {}   // inicializamos m

        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 

        // End If 

        if (nvl(vi_cap_cometcd.pry_pry, 'N') == 'S') {
            // Solamente si hay control de proyectos
            return true

        } // End If 

        return false

    }   // Fin Procedure






    //metodo
}