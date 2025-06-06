//////////////////////////////////////////////
// Clase : Forma para generar reportes de vendedores
// Author : MGSR
// Creacion : 14/mayo/2025
// Ult.Mod  : 
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";


// Generamos la clase en memoria 
export class reportVen extends reportForm {

  public des_fec = new des_fec()
  public has_fec = new has_fec()

  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.des_fec.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2

    // Campos de orden de la vista
    this.fields = [
      ["ven_ven", "Número de vendedor", "0", "9999"],
      ["nom_ven", "Nombre vendedor", "''", "'ZZZZZZZZZ'"],
      ["zon_ven", "Zona del vendedor", "''", "'ZZZZZZZZZ'"]

    ]
    this.prop.cam_pri = 'ven_ven' // campo de busqueda principal

  }

  async init_ant(sw_detallado?: boolean) {
    await super.init()

    // this.des_fec.prop.Value =new Date() // await stringToDate(this.Form.mPublic.fpo_pge);
    // this.has_fec.prop.Value =new Date() // await stringToDate(this.Form.mPublic.fpo_pge);
    console.log('=======>Reporte Vendedores ', sw_detallado)

    if (!sw_detallado) {
      this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
      this.des_fec.prop.Value = await addDate(this.Form.mPublic.fpo_pge, -1, 'M'); // resta un mes
    }
    //  console.log("ThisForm des_fec=",this.des_fec.prop.Value,' has_fec', this.has_fec.prop.Value);
  }



}
