//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
/////////////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
/**
*
*
* @export
* @class BT_ACEPTAR
* @extends {COMPONENT}
*/
export class bt_aceptar extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Caption = "Aceptar";
    this.prop.Capture = false;
    this.prop.Visible = false;
    this.prop.Image = "/Iconos/svg/accept.svg";
    this.style.width = "64px";
    this.prop.Messages = [
      ["Actualizar en SQL-Server la tabla:"], // 0
      ["Error en SQL-Server al generar la tabla :", "SQL-Server ERROR"], // 1
      ["Error en SQL-Server al generar la vista :", "SQL-Server ERROR"], // 2
      ["Quieres grabar la definición de la tabla SQL-Server "], // 3
      ["Quieres grabar la definición de indices SQL-Server "], // 4
      ["Quieres grabar la definición de las tablas SQL-Server"], // 5
      ["Quieres grabar la definición de las vistas SQL-Server"], // 6
      ["Quieres grabar el MENU del sistema"], // 7
      ["Diccionario actualizado"], // 8
      ["No se grabaron los datos"], // 9
      ["Definicion de campos SQL-Server de la tabla "], // 10
      ["Definicion de indices SQL-Server de la tabla "], // 11
      ["Definicion de vistas SQL-Server de la tabla "], // 12
      ["Menú Principal"], // 13
      ["Menú de Mantenimiento"], // 14
      ["Menú de Reportes"], // 15
      ["Menú de Procesos"] // 16
    ];

    console.log('bt_aceptar constructor Messages', this.prop.Messages)


  } // Fin constructor

  override async click() {
    const m = { nom_tab: this.Form.nom_tab.prop.Value };

    if (!this.prop.Visible) {
      console.log('============>  bt_aceptar disabled')
      return;
    }

    //  ["Tablas del SQL Server", "Definicion de Tabla", "Menú de programas"],
    //  ["T",                     "D",                   "M"],
    const dic_dat = this.Form.dic_dat.prop.Value
    this.prop.Visible = false;

    // No es un Menu del sistema y tablas
    if (
      dic_dat != "M" &&
      dic_dat != "T"
    ) {
      // No hay grid de captura
      if (
        this.Form.grid_datos.prop.Visible == false &&
        this.Form.grid_indices.prop.Visible == false &&
        this.Form.grid_menu.prop.Visible == false &&
        this.Form.grid_tablas.prop.Visible == false &&
        this.Form.grid_vistas.prop.Visible == false &&
        this.Form.nom_tab.prop.Visible == false
      ) {
        this.Form.bt_gen_model.prop.Visible = false;
        this.Form.bt_gen_indices.prop.Visible = false;
        this.Form.bt_gen_vistas.prop.Visible = false;

        if (dic_dat == "D" && this.Sql.View.vi_cap_cometab && this.Sql.View.vi_cap_cometab.recnoVal.length > 0) { // Definicion de Tabla
          //this.Form.nom_tab.prop.RowSourceType = 0;
          this.Form.bt_gen_all_models.Visible = false;
          //this.Form.nom_tab.prop.RowSourceType = 4;
          this.Form.sis_sis.prop.Visible = true;
          this.Form.nom_tab.prop.Visible = true;

          await this.Form.sis_sis.valid()

          this.Form.sis_sis.setFocus();
        }


        //this.Form.dic_dat.valid()
        this.prop.Visible = true;
        return;
      }

      // Hay datos capturados em definicion de tablas. Grabara informacion
      let dataUpdate = false;
      let data = false;
      if (
        this.Form.grid_datos.prop.Visible &&
        (await this.Form.db.recCount("vi_cap_comedat")) > 4
      ) {
        data = true;
        this.Form.grid_datos.prop.Disabled = true;
        this.Form.grid_indices.prop.Disabled = true;
        this.Form.grid_vistas.prop.Disabled = true;
        this.Form.bt_gen_model.prop.Visible = false;
        this.Form.bt_gen_indices.prop.Visible = false;
        this.Form.bt_gen_vistas.prop.Visible = false;

        dataUpdate = await this.grabaDatos("vi_cap_comedat");
      }

      // Indices
      // Hay datos capturados, grabara informacion
      if (this.Form.grid_indices.prop.Visible) {
        //    data = true

        if (data && (await this.Form.db.recCount("vi_cap_comeind")) > 0) {
          if (!(await this.grabaDatos("vi_cap_comeind"))) dataUpdate = false;
        } else dataUpdate = false;


      }

      // Vistas
      // Hay datos capturados, grabara informacion
      if (
        data && (await this.Form.db.recCount("vi_cap_comevis")) > 0 &&
        this.Form.grid_vistas.prop.Visible

      ) {
        // data = true
        if (!(await this.grabaDatos("vi_cap_comevis"))) dataUpdate = false;

      }

      if (data) {

        if (
          //dataUpdate &&
          (await MessageBox(
            //  "Actualizar en Servidor SQL-Server la tabla:" +this.Form.nom_tab.prop.Value,4,""
            this.prop.Messages[0][0] + this.Form.nom_tab.prop.Value, 4,
          )) == 6
        ) {
          if (!(await this.Form.db.genTabla(this.Form.nom_tab.prop.Value))) {
            MessageBox(
              //"Error al generar la tabla :" + this.Form.nom_tab.prop.Value + " en el Servidor SQL", 16, "SQL ERROR"
              this.prop.Messages[1][0] + this.Form.nom_tab.prop.Value, 16, this.prop.Messages[1][1]
            );

            console.error(
              //"Error al generar/regenerar en Sql Server la tabla:" +this.Form.nom_tab.prop.Value
              this.prop.Messages[2][0] + this.Form.nom_tab.prop.Value
            );
            this.prop.Visible = true;
            return;
          }
        }

        this.Form.prop.Status = "A";
        await this.Form.db.useNodata("vi_cap_comedat");
        await this.Form.db.useNodata("vi_cap_comeind");
        await this.Form.db.useNodata("vi_cap_comevis");
        this.Form.grid_datos.prop.Visible = false;
        this.Form.grid_indices.prop.Visible = false;
        this.Form.grid_vistas.prop.Visible = false;
        this.Form.grid_datos.prop.Disabled = false;
        this.Form.grid_indices.prop.Disabled = false;
        this.Form.grid_vistas.prop.Disabled = false;

        this.Form.grid_datos.prop.RecordSource =
          this.Form.grid_datos.prop.RecordSource;
        this.Form.grid_indices.prop.RecordSource =
          this.Form.grid_indices.prop.RecordSource;
        this.Form.grid_vistas.prop.RecordSource =
          this.Form.grid_vistas.prop.RecordSource;

        this.prop.Visible = true;
        return;
      }

      // Definicion de tablas 

      if (this.Form.nom_tab.prop.Visible) {
        // Campos de las Tablas del servidor SQL
        m.sis_sis = this.Form.sis_sis.prop.Value
        if (this.Form.dic_dat.prop.Value == "D") {
          this.Form.grid_datos.prop.Status = "A";
          this.Form.grid_datos.RecordSource = '';
          await this.Form.db.use("vi_cap_comedat ", m, "vi_cap_comedat", [
            "con_dat",
          ]);
          this.Form.grid_datos.RecordSource = 'vi_cap_comedat';

          if ((await this.Form.db.recCount("vi_cap_comedat")) == 0) {
            await this.Form.grid_datos.appendDatos();
          }

          this.Form.grid_datos.prop.Visible = true;
          this.prop.Caption = "Table update";
          this.Form.grid_datos.prop.Caption =
            this.prop.Messages[10][0] + this.Form.nom_tab.prop.Value;
          // "Definicion de campos SQL-Server de la tabla " + this.Form.nom_tab.prop.Value;
          this.Form.bt_gen_model.prop.Visible = true;

          // Indices SQL
          this.Form.grid_indices.RecordSource = ''
          await this.Form.db.use("vi_cap_comeind", m);
          this.Form.grid_indices.RecordSource = 'vi_cap_comeind';
          this.Form.grid_indices.prop.Caption =
            this.prop.Messages[11][0] + this.Form.nom_tab.prop.Value;
          // "Definicion de indices SQL-Server de la tabla " + this.Form.nom_tab.prop.Value;

          if ((await this.Form.db.recCount("vi_cap_comeind")) == 0) {
            await this.Form.grid_indices.appendRow();
          }

          this.Form.grid_indices.prop.Visible = true;
          this.Form.bt_gen_indices.prop.Visible = true;

          // Vistas remota de captura SQL

          this.Form.grid_vistas.RecordSource = '';
          await this.Form.db.use("vi_cap_comevis", m);
          this.Form.grid_vistas.RecordSource = 'vi_cap_comevis';
          this.Form.grid_vistas.prop.Caption =
            this.prop.Messages[12][0] + this.Form.nom_tab.prop.Value;
          // "Definicion de vistas SQL-Server de la tabla " + this.Form.nom_tab.prop.Value;

          if ((await this.Form.db.recCount("vi_cap_comevis")) == 0) {
            const m = {
              nom_tab: this.Form.nom_tab.prop.Value,
            };
            await this.Form.grid_vistas.appendRow(m);
          }
          this.Form.grid_vistas.prop.Visible = true;
          this.Form.bt_gen_vistas.prop.Visible = true;


        }


      }

      this.prop.Visible = true;
      return;
    }
    // Tablas del servidor SQL
    if (this.Form.dic_dat.prop.Value == "T") {
      // Tablas

      // Hay datos capturados, grabara informacion
      if (
        this.Form.grid_tablas.prop.Visible &&
        (await this.Form.db.recCount("vi_cap_cometab")) > 0
      ) {
        await this.grabaDatos("vi_cap_cometab");
        await this.Form.db.useNodata("vi_cap_cometab");
        this.Form.prop.Status = "A";
        this.Form.grid_tablas.prop.Visible = false;

        this.prop.Visible = true;
        return;
      }

      m.sis_sis = this.Form.sis_sis.prop.Value;

      this.Form.grid_tablas.prop.RecordSource = '';

      await use("vi_cap_cometab", m);

      console.log('1) bt_aceptar vi_cap_cometab recCount =', await recCount("vi_cap_cometab"))


      if (await recCount("vi_cap_cometab") == 0) {
        await appendBlank("vi_cap_cometab", m);
      }
      console.log('2) bt_aceptar vi_cap_cometab recCount =', await localAlaSql("select * from vi_cap_cometab"))



      this.Form.grid_tablas.prop.RecordSource = 'vi_cap_cometab';
      this.Form.grid_tablas.prop.Visible = true;

      this.Form.bt_gen_all_models.prop.Visible = true;
      //  this.Form.btGenTablas.prop.Visible = true
    }

    // Selecciono Menu de programas
    if (this.Form.dic_dat.prop.Value == "M") {
      // Hay datos capturados, grabara informacion

      if (
        this.Form.grid_menu.prop.Visible &&
        (await this.Form.db.recCount("vi_cap_prg")) > 0
      ) {
        await this.grabaDatos("vi_cap_prg");
        await this.Form.db.useNodata("vi_cap_prg");
        this.Form.prop.Status = "A";

        this.prop.Visible = true;
        return;
      }
      /*
      if (!this.Form.tip_men.prop.Visible) { // Tipo de menu
        this.Form.tip_men.prop.Visible = true
        this.prop.Visible = true
        console.log('menu tipo Programa Principal', this.Form.tip_men.prop.Visible)
        return
      }
      */
      if (!this.Form.tpr_prg.prop.Visible) {
        // Tipo de menu Mantenimientos,Procesos,Reportes
        this.Form.tpr_prg.prop.Visible = true;

        this.prop.Visible = true;
        return;
      }

      if (
        this.Form.tpr_prg.prop.Value != "S" &&
        !this.Form.sis_sis.prop.Visible
      ) {
        // Tipo de menu Mantenimientos,Procesos,Reportes
        this.Form.sis_sis.prop.Visible = true;
        this.prop.Visible = true;
        return;
      }

      m.sis_sis = "    ";
      m.tpr_prg = this.Form.tpr_prg.prop.Value;
      this.Form.grid_menu.prop.Caption = this.prop.Messages[13][0]; // "Menú Principal";
      // se escogio programas, debe de leer los sistemas
      if (m.tpr_prg != "S") {
        m.sis_sis = this.Form.sis_sis.prop.Value;
        if (m.tpr_prg == "M")
          this.Form.grid_menu.prop.Caption = this.prop.Messages[14][0]; // "Menú de Mantenimiento";
        if (m.tpr_prg == "R")
          this.Form.grid_menu.prop.Caption = this.prop.Messages[15][0]; // "Menú de Reportes";
        if (m.tpr_prg == "P")
          this.Form.grid_menu.prop.Caption = this.prop.Messages[16][0]; // "Menú de Procesos";
      }
      // Leemos menu de programas
      //  console.log("grid_menu m=", m);

      this.Form.grid_menu.RecordSource = ''
      await this.Form.db.use("vi_cap_prg", m);
      this.Form.grid_menu.RecordSource = 'vi_cap_prg'

      if ((await this.Form.db.recCount("vi_cap_prg")) == 0) {
        await this.Form.grid_menu.appendRow(m);
      }
      this.Form.grid_menu.prop.Visible = true;
      this.prop.Visible = false
      return
    } // Fin de menu de programas
    this.prop.Visible = true;
    return;
  } // Fin si es menu de programas

  //////////////////////////////////
  // Obten definicion de la tabla y asigna el consecutivo
  // que quedara en la base de datos
  /////////////////////////////////
  async ObtDefTabla() {
    const data = await this.Form.db.localSql(
      "select * from vi_cap_comedat order by con_dat "
    );

    // asignara consecutivo
    for (let i = 0; i < data.length; i++) {
      data[i].con_dat = i + 1;
      let cam_dat = data[i].cam_dat.trim();
      cam_dat = cam_dat.toUpperCase();
      if (
        cam_dat == "USU_USU" ||
        cam_dat == "USU_CRE" ||
        cam_dat == "TIE_UAC" ||
        cam_dat == "TIE_CRE" ||
        cam_dat == "TIMESTAMP" ||
        cam_dat == "KEY_PRI"
      )
        data[i].con_dat = i + 100;
    }
    // borramos la tabla original y la reinsertamos en Cursor temporal
    await this.Sql.localAlaSql(
      "Use Now ; \
              delete from vi_cap_comedat ;\
              SELECT * INTO vi_cap_comedat  FROM ?",
      [data]
    );

    //    return await this.grabaDatos('vi_cap_comedat')
    //  Mandamos actualizar en la base de datos toda la vista
  }

  //////////////////////////////////
  // Graba los datos
  // vis_cap: Vista de captura
  /////////////////////////////////
  async grabaDatos(vis_cap: string) {
    let men_txt = ""; // Mensaje de texto
    let vis_act = ""; // vista de actualizacion
    let grid_form = ""; // grid de captura
    if (vis_cap == "vi_cap_comedat") {
      men_txt = this.prop.Messages[3][0] //+ "Quieres grabar la definición de la tabla SQL-Server ";
      vis_act = "lla1_dat";
      grid_form = "grid_datos";
    }

    if (vis_cap == "vi_cap_comeind") {
      men_txt = this.prop.Messages[4][0]//"Quieres grabar la definición de indices SQL-Server ";
      vis_act = "lla1_ind";
      grid_form = "grid_indices";
    }

    if (vis_cap == "vi_cap_cometab") {
      men_txt = this.prop.Messages[5][0]// "Quieres grabar la definición de las tablas SQL-Server";
      vis_act = "lla1_tab";
      grid_form = "grid_tablas";
    }

    if (vis_cap == "vi_cap_comevis") {
      men_txt = this.prop.Messages[6][0]// "Quieres grabar la definición de las vistas SQL-Server";
      vis_act = "lla1_vis";
      grid_form = "grid_vistas";
    }

    if (vis_cap == "vi_cap_prg") {
      men_txt = this.prop.Messages[7][0]//"Quieres grabar el MENU del sistema";
      vis_act = "lla1_prg";
      grid_form = "grid_menu";
    }

    let resultado = 0;
    resultado = await MessageBox(men_txt, 4, "");
    console.log("bt_aceptar Messagebox resultado", resultado);

    if (resultado == 6) {
      if (vis_cap == "vi_cap_comedat") {
        // para obtener el con_dat definitivo
        await this.ObtDefTabla();
      }
      console.log("bt_aceptar grabaDatos vis_cap,vis_act", vis_cap, vis_act);

      if ((await this.Form.db.tableUpdate(1, false, vis_cap)) == true) {
        // Actualiza todos los registros
        MessageBox(this.prop.Messages[8][0])    //"Diccionario actualizado");
        return true;
      } else {
        MessageBox(this.prop.Messages[9][0], 16, "ERROR");  //   "No se grabaron los datos"
        return false;
      }
    }
    return false
  }

}
