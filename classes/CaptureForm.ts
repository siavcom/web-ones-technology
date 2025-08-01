/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// Author : Fernando Cuadras Angulo
// Creacion : 16/Noviembre/2022
// Ult.Mod  : 26/Diciembre/2022
/////////////////////////////////////////////

//import { truncate } from "fs/promises";
import { COMPONENT } from "./Component";
import { FORM } from "@/classes/Form";

export class captureForm extends FORM {
  public gridCaptura: [] = [];
  public noData = false;
  public First = null
  sw_nue = false; // bandera de nuevo registro

  // se debe de poner siempre el contructor
  constructor() {
    super();
    this.style.width = "-moz-available";

    // asignamos los Recno de los componentes de main 

  }


  /*
    async asignaRecno() {
      for (const comp in this) {
        const Comp = this[comp]
        // ControlSource contiene el RecordSource de la forma
        if (Comp && Comp.prop && Comp.prop.Capture && Comp.prop.ControlSource.indexOf(this.prop.RecordSource) == 0) {
          Comp.Recno = ref(this.Recno)  // asignamos el recno de c/componente de la forma
        }
      }
    }
  */
  /// //////////////////////////////////////////////////
  // Metodo init
  // Aqui se deben de asignar las areas de trabajo de los archivos
  /// //////////////////////////////////////////////////

  override async init() {
    // (Form)
    // super.init() // corre el init de la clase para asignar los valores this a todos los componentes

    try {
      if (this.prop.RecordSource.length > 1) {

        await this.refreshComponent();
      }
    } catch (error) {
      console.error("======Error Init=====" + this.Name, error);
    }
    // aqui me quede . Hay que poner en ThisForm de de la pagina en el constructor
    // cada componente.prop.Recno=ref(this.Recno)
    this.bt_graba.Grid = this.gridCaptura; // asignamos el arreglo de grid
  }

  /// /////////////////////////////////////
  // Metodos : afterSave y afterDelete 
  // Descripcion : funciones que se ejectutara despues de ejecutar
  // botton de graba y borra.
  // Obs: estos metodos se heredan y se mofican desde el ThisForm
  ////////////////////////////////////////

  /**
   * AfterSave Method
   * Description: function that is executed after the save button is executed.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  public async afterSave() { }

  /**
   * AfterDelete Method
   * Description: function that is executed after the delete button is executed.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  public async afterDelete() { }


  /**
   * inDelete Method
   * Description: function that is executed when you enter the delete method.
   *              It will continue with the deletion if it returns true.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  public async inDelete() { return true }

  /**
   * inSave Method
   * Description: function that is executed when you enter the save method.
   *              It will continue with the save if it returns true.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  public async inSave() { return true }

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
      if (!this.bt_graba.prop.Disabled)
        this.bt_graba.prop.Visible = true;
      return true;
    }

    thisComp.prop.Valid = true;

    const { ...m } = this.mPublic; // Tomamos las variables publicas de la forma
    // Generamos variables de memoria de componentes locales y solo updateKey
    // for (const main in this.main) {
    //  const comp = this.main[main];
    for (const comp of this.main) {
      // 29 Ags 2024  this[comp].Recno = 0; // ponemos en cero para ejecutar un refresh

      // Asigna cual es el componente First de la forma
      if (!this.First && this[comp].prop.First)
        this.First = this[comp]


      if (this[comp].prop.updateKey) {
        if (!this[comp].prop.Valid) {  // si el componente no es valido
          return true;

        } else {
          // asignamos variables de memoria que se utilizaran en el use
          if (this[comp].prop.Type == "number")
            m[comp] = +this[comp].prop.Value;
          else m[comp] = this[comp].prop.Value;

          // console.log("m[comp]=", m[comp])
        }
      }
    }

    // Leemos datos de la tabla de actualizacion
    if (this.prop.RecordSource.length < 2) {
      console.warn('No hay vista de actualizacion en el Form')
      return
    }

    const data = await use(this.prop.RecordSource, m);

    //  if (!data || data == '400') { return false } // Hubo error al leer los datos
    this.noData = false;

    // 29 Ags 2024     let Recno = 0;
    if (this.Recno != 0)
      this.Recno = 0

    let key_pri = 0;

    if (data.length == 0) {
      // No hay datos
      const result = await appendBlank(this.prop.RecordSource, m);
      //      console.log('CaptureForm appendBlank alaSql=',await  localAlaSql(`select * from ${this.prop.RecordSource}`))

      if (result == false) {
        // hubo error al leer datos
        this.noData = false;
        return false;
      }
      // 29 Ags 2024
      //Recno = result.recno;
      this.Recno = result.recno   // asignamos el thisrecno de la vista leida

      key_pri = 0;
      this.bt_borra.prop.Visible = false;
      //  console.log('valid Component m=', m, 'result=', result, 'Recno=', this.Recno, 'key_pri=', key_pri)


    } else {
      // 29 Ags 2024
      // Recno = data[0].recno;
      this.Recno = data[0].recno;

      key_pri = data[0].key_pri;
      if (!this.bt_borra.prop.Disabled)
        this.bt_borra.prop.Visible = true;
    }
    await this.refreshComponent(this.Recno, key_pri);
    if (!this.bt_graba.prop.Disabled)
      this.bt_graba.prop.Visible = true;
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
      key_pri = 0;
    }

    for (const comp of this.main) {
      const Comp = this[comp]

      if (Comp.prop.ShowError) {// Si hay alguna bandera de error prendida , la apaga
        Comp.prop.ShowError = false
      }
    }


    if (this.noData && !activate) {
      // Ya se hizo el useNodata y refresh sin datos
      return;
    }

    if (Recno == -1) { // Inicializamos la forma
      this.noData = true;
      this.bt_graba.prop.Visible = false;
      this.bt_borra.prop.Visible = false;
      if (this.Recno != 0)
        this.Recno = 0 // por referencia se pasa el valor component.Recno=0

      if (this.prop.RecordSource.length > 2) { // Si hay vista
        if (!this.Sql.View[this.prop.RecordSource] || this.Sql.View[this.prop.RecordSource].recno > 0) {
          await useNodata(this.prop.RecordSource);
        }
      } else
        return;

      // this.bt_calendario.prop.Visible = false;
    } // else this.noData = false;


    //console.log('0) displayError refreshComponent main=', this.main)

    for (const comp of this.main) {
      const Comp = this[comp]

      if (Comp.prop.Capture) {
        if (!Comp.prop.updateKey) {
          // No es llave de actualizacion
          if (!Comp.prop.Visible)
            Comp.prop.Visible = true;

          if (Recno >= 0) {  // Solo si ya es una captura
            // Cuando ya se validaron las llaves de actualizacion
            Comp.prop.ReadOnly = false;
          } else {  // Inicializacion de la captura
            Comp.prop.ReadOnly = true; // cuando la forma esta limpia
          }

          if (key_pri == 0) // Si es captura y no hay llave de actualizacion, es valido  
            Comp.prop.Valid = false // true (false);
          else
            Comp.prop.Valid = false;


          //Se quita el 4 Septiembre 2024 
          /*
          if (Recno >= 0) {
            const RecordSource = Comp.prop.RecordSource;
            Comp.prop.RecordSource = "";

            // 29 Ags 2024  
            //  Comp.Recno = Recno; // Actualiza el registro del componente

            Comp.prop.RecordSource = RecordSource; // Hace el refresh del componente
          }
          */



        } else {
          Comp.prop.ReadOnly = false; // Si es llave de captura

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
      this.prop.Caption = "Graba datos";
      this.prop.Capture = false;
      // this.prop.Sw_val = false;
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;
      this.prop.Image = "/Iconos/svg/accept.svg";
      //this.prop.TabIndex= 20
      this.style.width = "64px";
    } // Fin constructor

    override async click() {
      if (!await this.Parent.inSave())
        return

      /*
            console.log(
              "CaptureForm bt_graba click() Disabled=", this.prop.Disabled, ' ====> alaSql=',
              await  localAlaSql(
                "select * from " + this.Parent.prop.RecordSource,
                this.prop.Disabled
              )
            );
      */
      if (this.prop.Disabled)
        return;

      this.prop.Visible = false;
      this.prop.Valid = false;
      this.Parent.bt_borra.prop.Visible = false

      // Recorremos toda la forma y revisamos si estan validados
      for (const comp of this.Parent.main) {
        //  for (const i in this.Parent.main) {
        //    const comp: string = this.Parent.main[i];

        // Checa si todos esta validados

        if (this.Parent[comp].prop.Capture && !this.Parent[comp].prop.ReadOnly && this.Parent[comp].prop.Visible && !this.Parent[comp].prop.Valid) {

          if (!(await this.Parent[comp].valid())) {
            //console.log('2) CaptureForm bt_graba click() Invalid comp=', comp)
            if (!this.prop.Disabled)
              this.prop.Visible = true;

            await this.Parent[comp].setFocus()

            return;

          }
        }
      }

      //console.log("CaptureForm bt_graba");
      const result = await tableUpdate(
        0,
        false,
        this.Parent.prop.RecordSource
      );

      if (result) {
        MessageBox("Datos actualizados");
      } else {
        await this.Sql.requery(this.Parent.prop.RecordSource)
      }

      this.prop.Valid = true;
      if (!this.Form.bt_borra.prop.Disabled)
        this.Parent.bt_borra.prop.Visible = true;
      this.prop.Visible = true;

      await this.Parent.afterSave();

      return;
    }

    public async lee_grid() {
      for (let i = 0; i < this.Grid.length; i++) {
        if (this.Form[this.Grid[i]].prop.RecordSource.trim() > "  ")
          await use(this.Form[this.Grid[i]].prop.RecordSource, m);
        this.Form[this.Grid[i]].prop.Visible = true;
      }
    }
  })();

  public bt_borra = new (class extends COMPONENT {
    constructor() {
      super();
      this.prop.Name = "bt_borra";
      this.prop.Caption = "Borra datos";
      this.prop.Capture = false;
      // this.prop.Sw_val = false;
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;

      this.prop.Image = "/Iconos/svg/delete-color.svg"; // bx-eraser.svg";
      // this.prop.TabIndex= 21
      this.style.width = "64px";
    } // Fin constructor

    override async click() {
      if (this.prop.Disabled)
        return;

      if (!await this.Parent.inDelete())
        return

      this.prop.Visible = false;
      this.Parent.bt_graba.prop.Visible = false;

      if ((await MessageBox("Borramos los datos", 4, "")) === 6) {
        if (this.Recno > 0) {
          console.log(
            "borra registro",
            this.Form.prop.RecordSource,
            this.Recno
          );
          const result = await deleteSql(
            this.Recno,
            this.prop.RecordSource,
            true
          );


          console.log("borra registro", result, 'this=', this);
          this.Recno = 0  // Ponemos en 0 el recno para borrar los datos
          if (result) {
            //            await this.refreshComponent();
            MessageBox("Datos borrados");
          } else {
            return await this.requery()
          }
        }
        if (!this.Form.bt_graba.prop.Disabled && this.Recno > 0) {
          this.Parent.bt_graba.prop.Visible = true;
          this.prop.Visible = true;
          return
        }
        this.First.Focus()  // asemos focon en el primer elemento


        return;

      }
      await this.Parent.afterDelete();
    }
  })();


  async requery() {

    this.Recno = 0
    MessageBox("Error al actualizar/borrar Datos", 16);

    const data = await requery(this.Form.prop.RecordSource);
    if (data.length > 0)
      this.Recno = data[0].Recno
    else {
      MessageBox("Registro borrado por otro usuario", 16);
      this.First.Focus()
    }

    return;
  }


  // Metodo		: grabar
  // Comentarios	: Este metodo es general para todas las rutinas de actualización de datos
  async grabar(com_gra?: string) {

    if (recCount() == 0) {		// si no hay registro activo
      return true							// regresa
    }
    if (!com_gra) {						// si no se pasan parametros
      com_gra = 'El registro '	// el comentario de grabación sera "El registro"
    }

    if (await tableUpdate(0)) {							// graba el registro
      this.sw_nue = false
      return true
    }
    else {
      return false
    }
  }




}
