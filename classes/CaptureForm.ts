/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// Author : Fernando Cuadras Angulo
// Creacion : 16/Noviembre/2022
// Ult.Mod  : 26/Diciembre/2022
/// //////////////////////////////////////////

import { truncate } from "fs/promises";
import { COMPONENT } from "./Component";
import { FORM } from "@/classes/Form";

export class captureForm extends FORM {
  public gridCaptura: [] = [];
  public noData = false;

  // se debe de poner siempre el contructor
  constructor() {
    super();
    // asignamos a los metodos la clase padre
  }

  /// //////////////////////////////////////////////////
  // Metodo init
  // Aqui se deben de asignar las areas de trabajo de los archivos
  /// //////////////////////////////////////////////////

  async init() {
    // (Form)
    // super.init() // corre el init de la clase para asignar los valores this a todos los componentes

    try {
      if (this.prop.RecordSource.length > 1) {
        console.log(
          "Capture Form init this.prop.RecordSource=",
          this.prop.RecordSource
        );
        await this.refreshComponent();
      }
    } catch (error) {
      console.error("======Error Init=====" + this.Name, error);
    }
    this.bt_graba.Grid = this.gridCaptura; // asignamos el arreglo de grid
  }
  /// /////////////////////////////////////
  // Metodos : graba y borra
  // Descripcion : funciones que se ejectutara despues de ejecutar
  // botton de graba y borra.
  // Obs: estos metodos se heredan y se mofican desde el ThisForm
  ////////////////////////////////////////

  public async graba() {}

  public async borra() {}

  /// /////////////////////////////////////
  // Metodo : valid
  // Descripcion : Valida los componentes de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  async validComponent(compName?: string) {
    if (!compName) return false;

    this.prop.RecordSource = this.prop.RecordSource.toLowerCase();
    const thisComp = this[compName];

    if (thisComp.prop.updateKey) {
      // si es llave de captura
      if (
        (typeof thisComp.prop.Value == "string" &&
          thisComp.prop.Value.trim().length == 0) ||
        (typeof thisComp.prop.Value == "number" && thisComp.prop.Value == 0)
      ) {
        thisComp.prop.ErrorMessage = "No permite datos en blanco";
        thisComp.prop.ShowError = true;
        thisComp.prop.Valid = false;
        return thisComp.prop.Valid;
      }
    } else {
      for (const comp of this.main) // Busca si estan validados todos los componentes de captura
        if (
          thisComp.prop.Visible &&
          thisComp.prop.Capture &&
          !this[comp].prop.Valid
        )
          return true;
      if (!this.bt_graba.prop.Disabled) this.bt_graba.prop.Visible = true;
      return true;
    }

    thisComp.prop.Valid = true;
    /* const m={}
    // variables publicas
    
    for (const Var in this.publicVar) {
      m[Var] = this.publicVar[Var];
    }
    */

    const { ...m } = this.publicVar; // Tomamos las variables publicas de la forma
    // Generamos variables de memoria de componentes locales y solo updateKey
    // for (const main in this.main) {
    //  const comp = this.main[main];
    for (const comp of this.main) {
      this[comp].Recno = 0; // ponemos en cero para ejecutar un refresh
      if (this[comp].prop.updateKey) {
        if (!this[comp].prop.Valid) {
          return true;
          /* 
          if (!this[comp].prop.Valid) {
          for (const i in this.main) {
            const comp = this.main[i];
            this[comp].Recno = 0; // ponemos en cero para ejecutar un refresh
          }
          return true;
        */
        } else {
          // asignamos variables de memoria que se utilizaran en el use
          if (this[comp].prop.Type == "numeric")
            m[comp] = +this[comp].prop.Value;
          else m[comp] = this[comp].prop.Value;
        }
      }
    }

    // Leemos datos de la tabla de actualizacion
    const data = await this.Form.db.use(this.prop.RecordSource, m);

    // console.log("captureForm Valid m=", m, "data=", data);

    //  if (!data || data == '400') { return false } // Hubo error al leer los datos
    this.noData = false;
    let Recno = 0;
    let key_pri = 0;

    if (data.length == 0) {
      // No hay datos
      console.log(
        "CaptureForm appendBlank this.prop.RecordSource=",
        this.prop.RecordSource
      );
      const result = await this.Form.db.appendBlank(this.prop.RecordSource, m);
      //      console.log('CaptureForm appendBlank alaSql=',await this.Form.db.localAlaSql(`select * from ${this.prop.RecordSource}`))

      if (result == false) {
        // hubo error al leer datos
        this.noData = false;
        return false;
      }

      Recno = result.recno;
      key_pri = 0;
      this.bt_borra.prop.Visible = false;
    } else {
      Recno = data[0].recno;
      key_pri = data[0].key_pri;

      this.bt_borra.prop.Visible = true;
    }

    //await this.refreshComponent(true, Recno,key_pri);
    await this.refreshComponent(Recno, key_pri);

    return true;
  } // fin metodo valid

  /////////////////////////////////////////
  // Metodo : refreshComponent
  // Descripcion : refresca los componentes
  /// /////////////////////////////////////

  async refreshComponent(Recno?: number, key_pri?: number) {
    let activate = true;
    if (!Recno) {
      Recno = -1;
      activate: false;
      key_pri = 0;
    }

    if (this.noData && !activate) {
      // Ya se hizo el useNodata y refresh sin datos
      return;
    }

    if (Recno == -1) {
      if (this.prop.RecordSource.length > 2) {
        await this.Form.db.useNodata(this.prop.RecordSource);
      } else return;

      console.log("======== useNodata ===========", this.prop.RecordSource);
      this.noData = true;
      this.bt_graba.prop.Visible = false;
      this.bt_borra.prop.Visible = false;
      // this.bt_calendario.prop.Visible = false;
    } // else this.noData = false;

    //this.Recno = Recno;

    // console.log('CaptureForm refresh commponent',activate)

    // this.bt_borra.prop.Visible = activate
    // Recorremos la forma y si es un componente de captura e quita el ReadOnly

    //  for (const i in this.main) {
    //  const comp = this.main[i];

    for (const comp of this.main) {
      if (this[comp].prop.Capture) {
        if (!this[comp].prop.updateKey) {
          // No es llave de actualizacion
          if (!this[comp].prop.Visible) this[comp].prop.Visible = true;

          if (Recno >= 0) {
            // Cuando ya se validaron las llaves de actualizacion
            this[comp].prop.ReadOnly = false;
          } else {
            this[comp].prop.ReadOnly = true; // cuando la forma esta limpia
          }
          if (key_pri == 0) this[comp].prop.Valid = false;
          else this[comp].prop.Valid = false;

          if (Recno >= 0) {
            const RecordSource = this[comp].prop.RecordSource;
            this[comp].prop.RecordSource = "";

            this[comp].Recno = Recno; // Actualiza el registro del componente
            this[comp].prop.RecordSource = RecordSource; // Hace el refresh del componente
          }
        } else {
          this[comp].prop.ReadOnly = false; // Si es llave de captura
          /*
          if (!activate) {
            this[comp].prop.Valid = false;
          }

          if (
            this[comp].prop.BaseClass == "comboBox" &&
            !this[comp].prop.MultiSelect
          )
            this[comp].prop.Valid = true;
          */
        }
      }
    }
  } // fin metodo

  /// //////////////////////////////
  // Metodo : bt_graba
  // Descripcion : Graba los datos de la forma
  /// //////////////////////////////
  public bt_graba = new (class extends COMPONENT {
    public Grid = [];
    constructor() {
      super();
      this.prop.Name = "bt_graba";
      this.prop.Value = "Graba datos";
      this.prop.Capture = false;
      // this.prop.Sw_val = false;
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;
      // this.prop.Image = "/Iconos/Accept.png";
      this.prop.Image = "/Iconos/svg/ok-accept.svg";
      //this.prop.TabIndex= 20
      this.style.width = "20px";
    } // Fin constructor

    async click() {
      this.prop.Visible = false;
      this.prop.Valid = false;

      this.Parent.bt_borra.prop.Disabled = true;

      // Recorremos toda la forma y revisamos si estan validados
      for (const comp of this.Parent.main) {
        //  for (const i in this.Parent.main) {
        //    const comp: string = this.Parent.main[i];

        // Checa si todos esta validados
        if (this.Parent[comp].prop.Capture && !this.Parent[comp].prop.Valid) {
          if (!(await this.Parent[comp].valid())) {
            if (!this.prop.Disabled) this.prop.Visible = true;
            return;
          }
        }
      }

      console.log(
        "CaptureForm bt_graba click() ====> alaSql=",
        await this.Form.db.localAlaSql(
          "select * from " + this.Parent.prop.RecordSource
        )
      );
      console.log("CaptureForm bt_graba");
      const result = await this.Form.db.tableUpdate(
        0,
        false,
        this.Parent.prop.RecordSource
      );

      if (result) {
        MessageBox("Datos actualizados");
      } else {
        MessageBox("Error al actualizar Datos", 16);
        return;
      }
      this.prop.Valid = true;
      this.prop.Disabled = false;
      this.prop.Visible = true;
      this.Parent.bt_borra.prop.Disabled = false;
      this.Parent.bt_borra.prop.Visible = true;
      // hay grid de captura
      //await this.lee_grid()

      await this.Parent.graba();
      if (!this.prop.Disabled) this.prop.Visible = true;
      return;
    }

    public async lee_grid() {
      for (let i = 0; i < this.Grid.length; i++) {
        if (this.Form[this.Grid[i]].prop.RecordSource.trim() > "  ")
          await this.Form.db.use(this.Form[this.Grid[i]].prop.RecordSource, m);
        this.Form[this.Grid[i]].prop.Visible = true;
      }
    }
  })();

  public bt_borra = new (class extends COMPONENT {
    constructor() {
      super();
      this.prop.Name = "bt_borra";
      this.prop.Value = "Borra registro";
      this.prop.Capture = false;
      // this.prop.Sw_val = false;
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;
      // this.prop.Image = "/Iconos/Accept.png";
      this.prop.Image = "/Iconos/svg/delete-color.svg"; // bx-eraser.svg";
      // this.prop.TabIndex= 21
      this.style.width = "20px";
    } // Fin constructor

    async click() {
      if (!this.prop.Visible || this.prop.Disabled) return;
      this.prop.Disabled = true;
      this.Parent.bt_graba.prop.Visible = false;

      if ((await MessageBox("Quieres borrar el registro", 4, "")) === 6) {
        if (this.Form.Recno > 0) {
          console.log(
            "borra registro",
            this.Form.prop.RecordSource,
            this.Form.Recno
          );
          const result = await this.Form.db.delete(
            this.Form.Recno,
            this.prop.RecordSource,
            true
          );

          if (result) {
            await this.Form.refreshComponent();
            MessageBox("Datos borrados");
          } else {
            const data = await this.Form.db.requery(
              this.Form.prop.RecordSource
            );

            MessageBox("No se pudo borrar", 16);

            if (data.lenght === 0) {
              this.Form.refreshComponent();
            }
          }
        }

        this.prop.Disabled = false;
      }
      await this.Parent.borra();
    }
  })();
}
