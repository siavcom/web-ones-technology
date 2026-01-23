//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : tpy_tpy
// Description : Tipo
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class tpy_tpy extends CAPTURECOMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Tipo";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.tpy_tpy";
    this.prop.RowSourceType = 2;
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.inputStyle.width = "300px";
    this.style.width = "500px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
  }
  async init() {
    const data = await SQLExec(
      "select des_tpy,tpy_tpy,cop_nom,esu_tpy from vi_cap_cometpy order by cop_nom,tpy_tpy",
      "cometpy"
    );
    if (data.length == 0) {
      MessageBox("No hay tabla de definición de proyectos");
      const router = useRouter();
      //window.close()
      router.push("/");
      return
    }
    //this.Form.mPublic.cop_nom = data[0].cop_nom; // Se pone en el objeto Var para que cuando hage el appendBlank este en el objeto m.cop_nom
    this.Form.cop_nom.prop.Value = data[0].cop_nom;

    this.prop.RowSource = "cometpy.des_tpy,tpy_tpy,cop_nom";

    /*
    if (data[0].cop_nom == "C") 
          this.Form.des_cop.prop.Value = "Clientes";
    else 
      this.Form.des_cop.prop.Value = "Proveedores";

    */
    this.prop.ReadOnly = false;

    //  await this.interactiveChange()
  }

  async when() {
    await super.when()

    this.Form.grid_actividades.prop.RecordSource = "";

    this.Form.cod_nom.nom_nom.prop.Value = "";
    await this.Form.cod_nom.cliente_nuevo.close()
    this.Form.ven_ven.nom_ven.prop.Value = "";
    this.Form.con_con.noc_con.prop.Value = "";

    this.Form.num_pry.prop.Valid = false;
    this.Form.per_apy.prop.Visible = false;
    this.Form.bt_actividades.prop.Visible = false;
    //this.Form.equ_equ.prop.RowSourceType = 0;
    this.Form.log_usu.prop.RowSourceType = 0;

    this.Form.showComponents(true);
    return true;
  }

  async valid() {
    const data = await localAlaSql(
      `select cop_nom from now.cometpy where tpy_tpy='${this.prop.Value}'`
    );

    // this.Form.mPublic.cop_nom = data[0].cop_nom; // Se pone en el objeto Var para que cuando hage el appendBlank este en el objeto m.cop_nom

    this.Form.cop_nom.prop.Value = data[0].cop_nom;
    await super.valid();
    return true;
  }
}
