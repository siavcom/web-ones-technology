//////////////////////////////////////////////
// Clase : Forma para generar reportes
// @author: Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"
import { alm_rep } from "./alm_rep";
import { tip_imp } from "./tip_imp";
import { op_des_fam } from "./op_des_fam";
import { op_has_fam } from "./op_has_fam";
import { sep_fam } from "./sep_fam";
import { num_fam } from "./num_fam";
import { op_des_isu } from "./op_des_isu";
import { op_has_isu } from "./op_has_isu";

// Generamos la clase en memoria 
export class reportInv extends reportForm {

  public alm_rep = new alm_rep()
  public tip_imp = new tip_imp()
  public op_des_isu = new op_des_isu()
  public op_has_isu = new op_has_isu()
  public sep_fam = new sep_fam()
  public num_fam = new num_fam()
  public op_des_fam = new op_des_fam()
  public op_has_fam = new op_has_fam()

  constructor(num_blocks: number) {
    super(num_blocks)
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.des_fec.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2
    this.alm_rep.prop.TabIndex = 3
    this.tip_imp.prop.TabIndex = 4
    this.op_des_isu.prop.TabIndex = 5
    this.op_has_isu.prop.TabIndex = 6
    this.op_has_isu.prop.Value = "ZZZZZZZZZZ"
    this.op_des_isu.prop.Value = " "
    this.sep_fam.prop.TabIndex = 7
    this.num_fam.prop.TabIndex = 90
    this.num_fam.prop.Value = 1
    this.op_des_fam.prop.TabIndex = 91
    this.op_has_fam.prop.TabIndex = 92
    this.des_dat.prop.InputMask = Public.value.ima_pge.trim()
    this.has_dat.prop.InputMask = Public.value.ima_pge.trim()
    this.op_des_isu.prop.InputMask = Public.value.ima_pge.trim()
    this.op_has_isu.prop.InputMask = Public.value.ima_pge.trim()


    this.prop.cam_pri = 'cla_isu' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cla_isu", "Clave", "''", "'ZZZZZZZZZZ'"],
      ["des_isu", "Descripción", , "''", "'ZZZZZZZZZZ'"],
      ["sku_isu", "SKU", , "''", "'ZZZZZZZZZZ'"]

    ]
    /*
       this.block[0].component = {
          [0]: this.sep_fam,
          [1]: this.num_fam,
          [2]: this.op_des_fam,
          [3]: this.op_has_fam
        }
        this.block[0].prop.Visible = false
        this.block[0].prop.Disabled = true
        this.block[0].title = 'Familias'
    */
  }

  async init_ant(sw_detallado?: boolean) {
    await super.init()
    if (!sw_detallado) {
      this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
      this.des_fec.prop.Value = await addDay(this.Form.mPublic.fpo_pge, -1); // resta un mes
    }
  }

  //  console.log("ThisForm des_fec=",this.des_fec.prop.Value,' has_fec', this.has_fec.prop.Value);

}
