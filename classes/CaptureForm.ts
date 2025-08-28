/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// Author : Fernando Cuadras Angulo
// Creacion : 16/Noviembre/2022
// Ult.Mod  : 28/Agosto/2025
/////////////////////////////////////////////


import { IMGBUTTON } from "@/classes/imgButton";
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
    this.bt_save.Grid = this.gridCaptura; // asignamos el arreglo de grid
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
  // public async afterSave() { }

  /**
   * AfterDelete Method
   * Description: function that is executed after the delete button is executed.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  // public async afterDelete() { }


  /**
   * inDelete Method
   * Description: function that is executed when you enter the delete method.
   *              It will continue with the deletion if it returns true.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  //  public async inDelete() { return true }

  /**
   * inSave Method
   * Description: function that is executed when you enter the save method.
   *              It will continue with the save if it returns true.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  //public async inSave_old() { return true }

  /// /////////////////////////////////////
  // Metodo : before when component
  // Descripcion :Si es un campo llave, inicializa todos los componentes
  /// /////////////////////////////////////

  async beforeWhenComponent(Comp: undefined) {
    const thisComp = Comp.value
    console.clear()
    //console.log('before When Component=', thisComp.prop.Name)
    for (const comp of this.Form.main) {

      if (!this.Form[comp].prop.updateKey && this.Form[comp].prop.Capture) {

        // this.prop.Status = 'A'
        this.Form[comp].prop.ReadOnly = true

        if (typeof this.Form[comp].prop.Value == 'string')
          if (this.Form[comp].prop.Value != '')
            this.Form[comp].prop.Value = ''
          else
            if (this.Form[comp].prop.Value != 0)
              this.Form[comp].prop.Value = 0

        this.Form[comp].prop.ShowError = false
        this.Form[comp].prop.Valid = true
        console.log('Capture Form comp=', comp, this.Form[comp].prop.ReadOnly, this.Form[comp].prop.ShowError)


      }

    }

    this.Form.bt_save.prop.Visible = false;
    this.Form.bt_delete.prop.Visible = false;
    this.Form.bt_update.prop.Visible = false;

    //this.Form.refreshComponent();


  }

  /// /////////////////////////////////////
  // Metodo : valid
  // Descripcion : Valida los componentes de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  async validComponent(Comp: undefined) {
    const thisComp = Comp.value

    console.log('Valid validaciones Este=', thisComp)
    //if (!compName) return false;

    this.prop.RecordSource = this.prop.RecordSource.toLowerCase();
    //const thisComp = this[compName];

    if (thisComp.prop.updateKey == false) {
      let sw_val = true
      //  console.log('1) Valid No updateKey Capture component= ', thisComp.prop.Name)

      for (const comp of this.main) {// Busca si estan validados todos los componentes de captura
        if (sw_val && !this[comp].prop.Valid)
          sw_val = false
        //        console.log('Valid Capture component Name= ', this[comp].prop.Name, 'Valid=', this[comp].prop.Valid)

        if (thisComp.prop.Visible && thisComp.prop.Capture && !this[comp].prop.Valid) {
          return true;
        }
      }

      if (!this.bt_save.prop.Disabled && sw_val)  // Si se validaron todos los componentes
        this.bt_save.prop.Visible = true;    // 8/Gas/2025
      //this.bt_save.prop.Visible = false;
      return true;
    }

    // si es llave de captura

    console.log('1) Valid UpdateKey component= ', thisComp.prop.Name)

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

    thisComp.prop.Valid = true;

    const { ...m } = this.mPublic; // Tomamos las variables publicas de la forma
    // Generamos variables de memoria de componentes locales y solo updateKey
    // for (const main in this.main) {
    //  const comp = this.main[main];
    if (this.First == null)
      this.First = this.main.length > 0 ? this[this.main[0]] : null

    for (const comp of this.main) {
      // Asigna cual es el componente First de la forma
      if (this[comp].prop.First)
        this.First = this[comp]

      if (this[comp].prop.updateKey) {
        //   console.log('2) Valid comp=', comp, 'prop.Valid=', this[comp].prop.Valid)
        if (!this[comp].prop.Valid) {  // si el componente no es valido
          return true;
          // asignamos variables de memoria que se utilizaran en el use
          // console.log("m[comp]=", m[comp])
        }
      }
      if (this[comp].prop.Type == "number")
        m[comp] = +this[comp].prop.Value;
      else m[comp] = this[comp].prop.Value;
    }



    // Leemos datos de la tabla de actualizacion
    if (this.prop.RecordSource.length < 2) {
      console.warn('No hay vista de actualizacion en el Form')
      return false
    }


    const data = await use(this.prop.RecordSource, m);

    //  if (!data || data == '400') { return false } // Hubo error al leer los datos
    this.noData = false;

    // 29 Ags 2024     let Recno = 0;
    if (this.Recno != 0)
      this.Recno = 0

    // console.log('Valid RecordSource=', this.prop.RecordSource, 'Recno', this.Recno, 'This=', this)

    let key_pri = 0;

    if (data.length == 0) {
      this.sw_nue = true

      // No hay datos

      console.log('appendBlank m=', m)
      const result = await appendBlank(this.prop.RecordSource, m);
      //      console.log('CaptureForm appendBlank alaSql=',await  localAlaSql(`select * from ${this.prop.RecordSource}`))

      if (result == false) {
        // hubo error al leer datos
        this.noData = false;
        return false;
      }

      this.Recno = result.recno   // asignamos el this recno de la vista leida

      key_pri = 0;
      this.bt_delete.prop.Visible = false;
      //  console.log('valid Component m=', m, 'result=', result, 'Recno=', this.Recno, 'key_pri=', key_pri)


      // se utiliza nextTixc para q ue los componentes no prendan la validacion
      nextTick(() => {
        for (const comp of this.main) {
          if (this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey) {
            this.Form[comp].prop.Valid = false // Apaga validaciones 
            this.Form[comp].prop.ReadOnly = false // Permite captura
          }

          //          this.Form[comp].prop.Valid = this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey ? false : this.Form[comp].prop.Valid
        }
      });


      // console.log('ValidComponent appendBlank Return')
      return true

    } else {
      // 29 Ags 2024
      // Recno = data[0].recno;
      this.sw_nue = false
      this.Recno = data[0].recno;

      console.log('Hay datos Valid RecordSource=', this.prop.RecordSource, 'Recno', this.Recno, 'This=', this)

      key_pri = data[0].key_pri;
      //if (!this.bt_delete.prop.Disabled)
      if (key_pri > 0) {
        this.bt_update.prop.Visible = true;

      }
    }

    // console.log('ValidComponent Refresh component', this.Recno, key_pri)
    await this.refreshComponent(this.Recno, key_pri);
    if (!this.bt_save.prop.Disabled)
      // this.bt_save.prop.Visible = true; // 8 / Ags / 2025
      this.bt_save.prop.Visible = false
    return true;
  } // fin metodo valid

  /////////////////////////////////////////
  // Metodo : refreshComponent
  // Descripcion : refresca los componentes
  /// /////////////////////////////////////

  async refreshComponent(Recno?: number, key_pri?: number) {

    // console.log('1) =====================Refresh Component')
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
    //    console.log('2) =====================Refresh Component')
    if (this.noData && !activate) {
      // Ya se hizo el useNodata y refresh sin datos
      return;
    }
    //  console.log('3) =====================Refresh Component')
    if (Recno == -1) { // Inicializamos la forma
      this.noData = true;
      this.bt_save.prop.Visible = false;
      this.bt_delete.prop.Visible = false;
      this.bt_update.prop.Visible = false;
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
          //  console.log('Refresh=', Comp.Name, Comp.Recno)
          //          const RecnoNu = Comp.Recno
          //          Comp.Recno = 0

          // No es llave de actualizacion
          if (!Comp.prop.Visible)
            Comp.prop.Visible = true;

          // console.log('Refresh key_pri=', key_pri, Recno)
          /*
                    if (Recno >= 0) {  // Solo si ya es una captura  // Cuando ya se validaron las llaves de actualizacion
                      Comp.prop.ReadOnly = false;
                    } else {  // Inicializacion de la captura
                      Comp.prop.ReadOnly = true; // cuando la forma esta limpia
                    }
          */
          if (Recno >= 0 && key_pri > 0) {  // Solo si ya es una captura  // Cuando ya se validaron las llaves de actualizacion
            //Comp.prop.ReadOnly = true; // 8/Ags/2025
            Comp.prop.ReadOnly = true;
          } else {  // Inicializacion de la captura
            Comp.prop.ReadOnly = false; // cuando la forma esta limpia
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

          //    Comp.Recno = RecnoNu

        } else {
          Comp.prop.ReadOnly = false; // Si es llave de captura

        }

      }
    }
  } // fin metodo

  /// //////////////////////////////
  // Metodo : bt_save
  // Descripcion : Graba los datos de la forma
  /// //////////////////////////////
  public bt_save = new (class extends IMGBUTTON {
    public Grid = [];
    constructor() {
      super();
      this.prop.Name = "bt_save";
      this.prop.Caption = "Graba datos";

      // this.prop.Sw_val = false;

      this.prop.Position = "footer";
      this.prop.Visible = false;
      this.prop.Image = "/Iconos/svg/accept.svg";
      //this.prop.TabIndex= 20
      this.style.width = "64px";
    } // Fin constructor

    override async click() {

      return this.Parent.bt_saveClick()
      /*   if (!await this.Parent.inSave())
           return
   
   
         if (this.prop.Disabled)
           return;
   
         this.prop.Visible = false;
         this.prop.Valid = false;
         this.Parent.bt_delete.prop.Visible = false
   
         // Recorremos toda la forma y revisamos si estan validados
         for (const comp of this.Parent.main) {
           //  for (const i in this.Parent.main) {
           //    const comp: string = this.Parent.main[i];
   
           // Checa si todos esta validados
   
           if (this.Parent[comp].prop.Capture && !this.Parent[comp].prop.ReadOnly && this.Parent[comp].prop.Visible && !this.Parent[comp].prop.Valid) {
   
             if (!(await this.Parent[comp].valid())) {
               //console.log('2) CaptureForm bt_save click() Invalid comp=', comp)
               if (!this.prop.Disabled)
                 this.prop.Visible = true;
   
               await this.Parent[comp].setFocus()
   
               return;
   
             }
           }
         }
   
         //console.log("CaptureForm bt_save");
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
         if (!this.Form.bt_delete.prop.Disabled)
           this.Parent.bt_delete.prop.Visible = true;
         this.prop.Visible = true;
   
         await this.Parent.afterSave();
   
         return;
         */
    }

    public async lee_grid() {
      for (let i = 0; i < this.Grid.length; i++) {
        if (this.Form[this.Grid[i]].prop.RecordSource.trim() > "  ")
          await use(this.Form[this.Grid[i]].prop.RecordSource, m);
        this.Form[this.Grid[i]].prop.Visible = true;
      }
    }

  });

  public async bt_saveClick() {

    //    if (!await this.inSave())
    //      return

    if (this.bt_save.prop.Disabled)
      return;

    this.bt_save.prop.Visible = false;
    this.bt_save.prop.Valid = false;
    this.bt_delete.prop.Visible = false




    // Recorremos toda la forma y revisamos si estan validados
    for (const comp of this.main) {
      //  for (const i in this.Parent.main) {
      //    const comp: string = this.Parent.main[i];

      // Checa si todos esta validados

      if (this[comp].prop.Capture && !this[comp].prop.ReadOnly && this[comp].prop.Visible && !this[comp].prop.Valid) {

        if (!(await this[comp].valid())) {
          //console.log('2) CaptureForm bt_save click() Invalid comp=', comp)
          if (!this.prop.Disabled)
            this.prop.Visible = true;

          await this[comp].setFocus()

          return;

        }
      }
    }

    //console.log("CaptureForm bt_save");
    const result = await tableUpdate(
      0,
      false,
      this.prop.RecordSource
    );

    if (result) {
      MessageBox("Datos actualizados");
    } else {
      await this.Sql.requery(this.prop.RecordSource)
    }

    this.bt_save.prop.Visible = true;
    this.bt_delete.prop.Visible = true

    return;
  }

  /// //////////////////////////////
  // Metodo : bt_update
  // Descripcion : Modifca los datos de la forma
  /// //////////////////////////////

  public bt_update = new (class extends IMGBUTTON {
    constructor() {
      super();
      this.prop.Name = "bt_modifca";
      this.prop.Caption = "Modifica datos";
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;

      this.prop.Image = "/Iconos/svg/update-content.svg";
      // this.prop.TabIndex= 21
      this.style.width = "64px";
    } // Fin constructor

    override async click() {
      return this.Parent.bt_updateClick()

      //  console.log('Click bt_update ')
      /*     this.prop.Visible = false
           for (const comp of this.Form.main) {
     
             if (this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey) {
     
               this.Form[comp].prop.ReadOnly = false
     
             }
           }
           this.Form.bt_save.prop.Visible = true
     */

    }

  })

  public async bt_updateClick() {
    this.bt_update.prop.Visible = false
    for (const comp of this.Form.main) {

      if (this[comp].prop.Capture && !this[comp].prop.updateKey) {

        this[comp].prop.ReadOnly = false

      }
    }
    this.bt_delete.prop.Visible = true;
    this.Form.bt_save.prop.Visible = true
    return
  }


  /// //////////////////////////////
  // Metodo : bt_delete
  // Descripcion : Borra los datos de la forma
  /// //////////////////////////////

  public bt_delete = new (class extends IMGBUTTON {
    constructor() {
      super();
      this.prop.Name = "bt_delete";
      this.prop.Caption = "Borra datos";

      this.prop.Position = "footer";
      this.prop.Visible = false;

      this.prop.Image = "/Iconos/svg/delete-color.svg"; // bx-eraser.svg";
      // this.prop.TabIndex= 21
      this.style.width = "64px";
    } // Fin constructor

    override async click() {
      return this.Parent.bt_deleteClick()
      /*    
          if (this.prop.Disabled)
            return;
    
          if (!await this.Parent.inDelete())
            return
    
          this.prop.Visible = false;
          this.Parent.bt_save.prop.Visible = false;
    
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
    
              //          console.log("borra registro", result, 'this=', this);
              this.Recno = 0  // Ponemos en 0 el recno para borrar los datos
              if (result) {
                //            await this.refreshComponent();
                MessageBox("Datos borrados");
              } else {
                return await this.requery()
              }
            }
            if (!this.Form.bt_save.prop.Disabled && this.Recno > 0) {
              this.Parent.bt_save.prop.Visible = true;
              this.prop.Visible = true;
              return
            }
            this.First.Focus()  // asemos focon en el primer elemento
            return;
          }
          await this.Parent.afterDelete();
    */
    }
  });

  public async bt_deleteClick() {
    if (this.prop.Disabled)
      return;

    // if (!await this.inDelete())
    //   return
    this.bt_update.prop.Visible = false
    this.bt_save.prop.Visible = false;
    this.bt_delete.prop.Visible = false;

    if ((await MessageBox("Borramos los datos", 4, "")) === 6) {
      console.log("borra registro", this.Form.prop.RecordSource, this.Recno);
      const result = await deleteSql(this.Recno, this.prop.RecordSource, true);

      if (result) {
        this.Recno = 0  // Ponemos en 0 el recno para borrar los datos
        //            await this.refreshComponent();
        MessageBox("Datos borrados");
      } else {
        return await this.requery()
      }


      this.First.setFocus()  // asemos focon en el primer elemento
      return
    }

    this.bt_save.prop.Visible = true;
    this.bt_delete.prop.Visible = true;
    return
  }


  //////////////////////////
  async requery() {

    this.Recno = 0
    MessageBox("Error al actualizar/borrar Datos", 16);

    const data = await requery(this.Form.prop.RecordSource);
    if (data.length > 0)
      this.Recno = data[0].Recno
    else {
      MessageBox("Registro borrado por otro usuario", 16);

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
