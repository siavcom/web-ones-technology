/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// Author : Fernando Cuadras Angulo
// Creacion : 16/Noviembre/2022
// Ult.Mod  : 28/Agosto/2025
/////////////////////////////////////////////

import { IMGBUTTON } from "@/classes/imgButton";
import { FORM } from "@/classes/Form";

import { provide, watch } from 'vue';


export class captureForm extends FORM {
  public gridCaptura: [] = [];
  public noData = false;
  public First = null
  sw_nue = false; // bandera de nuevo registro



  // se debe de poner siempre el contructor
  constructor() {
    super();
    this.prop.BaseClass = "CaptureForm"
    this.style.width = "-moz-available";
    //this.prop.Messages[100] = 'Grabamos datos'
    //this.prop.Messages[101] = 'Borramos los datos'
    // asignamos los Recno de los componentes de main 
    /*
      watch(this.Valid.value, async (Valid) => {
        console.log('Checando valid ', Valid, Valid.length)
  
      },
        { deep: true, flush: 'post' });
  */

  }

  /// //////////////////////////////////////////////////
  // Metodo init
  // Aqui se deben de asignar las areas de trabajo de los archivos
  /// //////////////////////////////////////////////////

  override async init() {

    if (this.prop.RecordSource.length > 2)
      await useNodata(this.prop.RecordSource)
    else
      console.warn('this.Form.prop.RecordSource empty', this.prop.Name)

    this.bt_save.Grid = this.gridCaptura; // asignamos el arreglo de grid
  }

  /// /////////////////////////////////////
  // Metodos : afterSave y afterDelete 
  // Descripcion : funciones que se ejectutara despues de ejecutar
  // button de graba y borra.
  // Obs: estos metodos se heredan y se mofican desde el ThisForm
  ////////////////////////////////////////

  /**
   * AfterSave Method
   * Description: function that is executed after the save button is executed.
   * Obs: this method is inherited and can be modified from the this.Form.
   */
  // public async afterSave() { }

  /**
   * AfterDelete Method
   * Description: function that is executed after the delete button is executed.
   * Obs: this method is inherited and can be modified from the this.Form.
   */
  // public async afterDelete() { }


  /**
   * inDelete Method
   * Description: function that is executed when you enter the delete method.
   *              It will continue with the deletion if it returns true.
   * Obs: this method is inherited and can be modified from the this.Form.
   */
  //  public async inDelete() { return true }

  /**
   * inSave Method
   * Description: function that is executed when you enter the save method.
   *              It will continue with the save if it returns true.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  //public async inSave_old() { return true }

  async showBt(button: string, valor: boolean) {

    if (this[button].prop.Visible != valor) {
      // await this.Form[button].show.value(valor)

      console.log('shwoBt ', `ThisForm.${button}.prop.Visible=${valor}`)

      //      this.eventos.push(`ThisForm.${button}.prop.Visible=${valor}`)

      const Id = this.Form[button].prop.htmlId + '_main'
      this.Form[button].prop.Visible = !valor
      await nextTick()
      this.Form[button].prop.Visible = valor
      // this.eventos.push(`ThisForm.${button}.prop.Visible=${valor};` + `NextTick('ThisForm.${button}.prop.Visible=${valor}')`)

      console.log('shwoBt ', this[button].prop.Visible)

      //await nextTick()

      //this.eventos.push(`nextTick(function () {ThisForm.${button}.prop.Visible=${valor}});`)

      //  this.eventos.push('ThisForm.bt_save.prop.Visible=true')


    }
  }

  /// /////////////////////////////////////
  // Metodo : before when component
  // Descripcion :Si es un campo llave, inicializa todos los componentes
  /// /////////////////////////////////////

  async beforeWhenComponent(Comp: undefined) {
    const thisComp = Comp.value
    if (this.Recno != 0)
      this.Recno = 0

    //console.clear()
    for (const comp of this.Form.main) {


      if (this.Form[comp].prop.Capture) {
        if (!this.Form[comp].prop.updateKey) {
          // this.prop.Status = 'A'
          this.Form[comp].prop.ReadOnly = true

          if (typeof this.Form[comp].prop.Value == 'string')
            if (this.Form[comp].prop.Value != '')
              this.Form[comp].prop.Value = ''
            else
              if (this.Form[comp].prop.Value != 0)
                this.Form[comp].prop.Value = 0

          //    console.log('When Capture Form comp=', comp, this.Form[comp].prop.ReadOnly, this.Form[comp].prop.ShowError)
        }

        //     this.Form[comp].prop.Valid = false
      }

    }
    //  thisComp.prop.Valid = false
    // this.Form.bt_save.prop.Visible = false;

    console.log('beforeWhen  apagamos botones')
    this.bt_delete.prop.Visible = false;
    this.bt_modify.prop.Visible = false;
    this.bt_save.prop.Visible = false;

  }

  /// /////////////////////////////////////
  // Metodo : valid
  // Descripcion : Valida los componentes de la forma. Si es un dato nuevo
  //              manda refrescar la forma para permitir su captura
  //              Si no es un dato nuevo: Muestra los datos para permitir su
  //              modificacion
  /// /////////////////////////////////////

  async validKeyComponent(Comp: undefined) {
    const thisComp = Comp.value

    console.log('validKeyComponent Este=', thisComp.prop.Name)
    //if (!compName) return false;

    this.prop.RecordSource = this.prop.RecordSource.toLowerCase();

    thisComp.prop.Valid = true;
    //const { ...m } = Public.value;
    const m = this.Form.mPublic


    if (this.First == null)
      this.First = this.main.length > 0 ? this[this.main[0]] : null

    const sw_val = true
    for (const comp of this.main) {// Busca si estan validados todos los componentes de captura

      if (this[comp].prop.Capture && this[comp].prop.UpdateKey) {

        if ((this[comp].prop.name != ThisComp.prop.Name && !this[comp].prop.Valid) ||
          (typeof this[comp].prop.Value == "string" && this[comp].prop.Value.trim().length == 0) ||
          (typeof this[comp].prop.Value == "number" && this[comp].prop.Value == 0)
        ) {

          this[comp].prop.ErrorMessage = "Dato no permitido";
          this[comp].prop.Valid = false;
          this[comp].prop.Focus = true
          console.log('1) validKeyComponent No permite datos en blanco UpdateKey component= ', thisComp.prop.Name)
          return this[comp].prop.Valid
        }

      }
      if (this[comp].prop.Capture) {
        if (this[comp].prop.First)
          this.First = this[comp]
        if (this[comp].prop.Type == "number")
          m[comp] = +this[comp].prop.Value;
        else
          m[comp] = this[comp].prop.Value;
      }
    }

    // Termino la validacion de llaves principales
    thisComp.prop.Valid = true;

    // Leemos datos de la tabla de actualizacion
    if (this.prop.RecordSource.length < 2) {
      MessageBox('No hay vista de actualizacion en el Form')
      return false
    }

    //console.log('1) validComponent use this.prop.RecordSource', this.prop.RecordSource, 'm=', m)
    const data = await use(this.prop.RecordSource, m);
    console.log('2) validComponent data=', data)

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

    }   // Hay datos

    this.sw_nue = false
    this.Recno = data[0].recno;
    this.prop.Status = 'P'
    for (const comp of this.main) {
      const Comp = this[comp]
      Comp.prop.ShowError = false
      Comp.prop.Valid = true
    }
    this.prop.Status = 'A'
    console.log('validComponent Con datos ')
    await nextTick(() => {

      this.bt_modify.prop.Visible = true;
      this.bt_delete.prop.Visible = true;
      this.bt_modify.prop.Focus = true;
    })
    return true
  } // Fin Metodo Valid


  /////////////////////////////////////////
  // Metodo : refreshComponent
  // Descripcion : refresca los componentes
  /// /////////////////////////////////////

  async refreshComponent(Recno?: number, key_pri?: number) {
    return
  }


  async refreshComponent_old(Recno?: number, key_pri?: number) {
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
      this.bt_modify.prop.Visible = false;
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
        Comp.prop.Valid = false;
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
      // this.prop.Name = "bt_save";
      this.prop.Caption = "Grabar";
      this.prop.Position = "footer";
      this.prop.ToolTipText = 'Graba los datos del documento '
      this.prop.Image = "/Iconos/svg/accept.svg";

      this.style.width = "72px";
      this.prop.Visible = false;
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
    if (this.prop.RecordSource.length < 2)
      return

    this.bt_save.prop.Visible = false;

    let resultado = false

    // Recorremos toda la forma y revisamos si estan validados
    for (const comp of this.main) {
      if (this[comp].prop.Capture && !this[comp].prop.ReadOnly && this[comp].prop.Visible && !this[comp].prop.Valid) {
        // tratamos de validar 
        if (!(await this[comp].valid())) {
          console.warn('CaptureForm bt_save click() Invalid comp=', comp)
          this.bt_save.prop.Visible = true;
          await this[comp].setFocus()
          return;
        }
      }
    }
    await nextTick()
    //const Registro = await goto(0, this.prop.RecordSource)

    const bt_delete = this.bt_delete.prop.Visible
    this.bt_delete.prop.Visible = false;

    if (await MessageBox(this.bt_save.prop.Caption, 4, "") == 6) {

      const result = await tableUpdate(
        0,
        false,
        this.prop.RecordSource
      );

      if (result) {
        MessageBox("Datos actualizados");
        resultado = true
      } else {
        // actualiza datos porque hubo error de grabacion
        console.error('Save error bt_saveClick',)
        const m = await scatter(['key_pri', 'recno'], this.prop.RecordSource)
        if (m.key_pri > 0) { // si es un registro existente 
          await requery(this.prop.RecordSource)

          this.Recno = 0
          this.Recno = m.recno
        }
      }
    }
    this.bt_save.prop.Visible = true;
    const key_pri = await scatter(['key_pri'], this.prop.RecordSource)
    if (key_pri > 0)
      this.bt_delete.prop.Visible = bt_delete
    return resultado;
  }

  /// //////////////////////////////
  // Metodo : bt_modify
  // Descripcion : Modifca los datos de la forma
  /// //////////////////////////////

  public bt_modify = new (class extends IMGBUTTON {
    constructor() {
      super();
      //this.prop.Name = "bt_modify";
      this.prop.Caption = "Modifica datos";
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;

      this.prop.Image = "/Iconos/svg/update-content.svg";
      // this.prop.TabIndex= 21

      this.style.width = "72px";
    } // Fin constructor

    override async click() {

      return this.Parent.bt_modifyClick()

      //  console.log('Click bt_modify ')
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

  public async bt_modifyClick() {
    console.log('2) bt_modify click')
    this.bt_modify.prop.Visible = false
    this.Form.prop.Status = 'P'
    for (const comp of this.Form.main) {
      if (this[comp].prop.Capture && !this[comp].prop.updateKey) {
        this[comp].prop.ReadOnly = false
      }
    }
    this.Form.prop.Status = 'A'
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

      this.style.width = "72px";
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

    this.bt_modify.prop.Visible = false;
    this.bt_save.prop.Visible = false;
    this.bt_delete.prop.Visible = false;

    if ((await MessageBox(this.bt_delete.prop.Caption, 4, "")) === 6) {
      console.log("borra registro", this.Form.prop.RecordSource, this.Recno);
      const result = await deleteSql(this.Recno, this.prop.RecordSource, true);

      if (result) {
        this.Recno = 0  // Ponemos en 0 el recno para borrar los datos
        //            await this.refreshComponent();
        MessageBox("Datos borrados");
      } else {
        return await this.requery()
      }


      this.First.setFocus()  // hacemos focon en el primer elemento
      return
    }
    this.bt_modify.prop.Visible = true;
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

  // Metodo		:rev_per
  // Comentarios	: Reviza prmisos de seguridad de la tabla comedoc 

  async rev_per(nom_cam: string, sw_mov?: boolean) {

    const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

    if (!sw_mov)
      sw_mov = false

    // si es el adminstrador o se dio password de autorización
    if (Public.value.log_usu == 'ADMIN')
      return true

    // busca el nombre del objeto en el arreglo nom_cam
    const pos = ascan(this.Form.nom_obj, upper(left(nom_cam, 3)))
    if (pos > 0) {									// si encuentra el campo
      if (this.Form.nom_obj[pos + 1] == '1' || this.Form.nom_obj[pos + 1] == '3')	// permite Modifica o Captura y modifica
        return true
      // reviza si se permite la captura
      if (this.Form.nom_obj[pos + 1] >= '2' && ((!sw_mov && this.Form.sw_nue) || (sw_mov && this.Form.num_mov == 0)))
        return true

      // si permite la captura es impresión pero no se a impreso ni timbrado
      if (this.Form.nom_obj[pos + 1] == '2' && nom_cam == 'IPR' && vi_cap_comedoc.sta_doc! > 'I' && vi_cap_comedoc.sta_doc! > 'T')
        return true
    }
    return false

  }
}
