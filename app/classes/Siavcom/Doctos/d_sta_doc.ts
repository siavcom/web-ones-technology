//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_sta_doc
// Description : Componente d_sta_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class d_sta_doc extends COMPONENT {
    //public
    constructor() {
        super();

        this.prop.BaseClass = 'textLabel'
        this.prop.ControlSource = "vi_cap_comedoc.sta_doc";
        this.prop.ToolTipText = "Estatus del documento";
        this.prop.RowSource = [
            ["Proceso", "Cancelado", "Timbrado", "Impreso", "Proceso de Timbrado"],
            ["P", "C", "T", "I", "X"]
        ];

        this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths = "250px,25px";
        this.inputStyle.width = '124px';

        this.prop.Disabled = true;
        this.inputStyle.color = 'black';


        this.prop.Messages[0][0] = 'El documento se convirtió al documento :'
        this.prop.Messages[0][1] = 'Advertencia'
        this.prop.Messages[1] = 'El documento quedo en proceso de timbrado, pero no hubo respuesta del timbrador '


        //propiedades
    }
    // poner la llamada del metodo en el textLabel.vue
    override async onChangeValue(styles?: any) {

        const Styles = !styles ?
            {
                inputStyle: this.inputStyle,
                style: this.style,
                captionStyle: this.captionStyle
            } : styles.value


        switch (this.prop.Value) {
            case 'C': {
                const vi_lla1_doc = goto(0, 'vi_lla1_doc')
                if (vi_lla1_doc.nde_doc > 0)
                    MessageBox(this.prop.Messages[0][0] + vi_lla1_doc.tde_doc + Str(vi_lla1_doc.nde_doc), 16, this.prop.Messages[0][1])  // "El documento se convirtirá al documento :"

                Styles.inputStyle.background = 'rgb(255,0,0)'
                break
            }
            case 'I': {
                Styles.nputStyle.background = 'rgb(0,255,255)'
                break
            }
            case 'T': {
                Styles.inputStyle.background = 'rgb(255,255,0)'
                break
            }
            case 'X': {
                MessageBox(this.prop.Messages[1], 16, this.prop.Messages[0][1])  // "El documento se trató de timbrar, pero no hubo respuesta del timbrador "
                Styles.inputStyle.background = 'rgba(255, 174, 0, 1)'
                break
            }
            default: {
                Styles.inputStyle.background = 'rgba(12, 241, 89, 1)'
            }
        }

    }

    //metodo
}