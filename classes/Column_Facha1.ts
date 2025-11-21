import { COLUMN } from "@/classes/Column";

//imports

export class Column_Facha1 extends COLUMN {
    //public
    typoStyle: any[] = []
    tipoCampo = 1

    constructor() {
        super();
       
        this.typoStyle[0] = { ...this.inputStyle }
        this.typoStyle[1] = { ...this.inputStyle }
        this.typoStyle[2] = { ...this.inputStyle }
        this.typoStyle[3] = { ...this.inputStyle }

        // Amarillo Fuerte
        this.typoStyle[0].background = 'rgba(235, 229, 141, 0.91)'
        this.typoStyle[0].color = 'rgba(9, 9, 8, 1)'
        // Amarillo Claro
        this.typoStyle[1].background = 'rgba(245, 240, 198, 1)'
        this.typoStyle[1].color = 'rgba(9, 9, 8, 1)'
        // Gris
        this.typoStyle[2].background = 'rgba(25, 25, 24, 0.74)'
        this.typoStyle[2].color = 'rgba(227, 223, 171, 1)'
        // Test
        this.typoStyle[3].background = 'rgba(25, 25, 24, 0.74)'
        this.typoStyle[3].color = 'rgba(50, 16, 220, 1)'
    }
    override async init() {
        if (this.tipoCampo == 0) this.inputStyle = this.typoStyle[0]
        // Si es Llave, va con Upper
        if (this.prop.updateKey)
            this.inputStyle.textTransform = "uppercase";

    }

    override async valid() {
        console.log('Facha1 this.prop.Value=', this.prop.Value)
        if (this.prop.updateKey && this.prop.Value == '')
            return false

        if (this.prop.updateKey)
            this.prop.Value = this.prop.Value.toUpperCase()
        return super.valid()
    }

}
