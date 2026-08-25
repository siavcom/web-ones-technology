/// ///////////////////////////////////////////
// Clase : Forma de captura tabla sencilla
// @author: Fernando Cuadras Angulo
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
  sw_update = false; // bandera de nuevo registro
  nom_obj = {}// objetos de validacion
  blockCapturaXml: any = null
  aut_cap = false // autorizacion de captura

  // se debe de poner siempre el contructor
  constructor() {
    super();
    this.prop.BaseClass = "CaptureForm"
    this.style.width = "-moz-available";
    this.prop.autoUpdate = false; // Si es verdadero actualiza automaticamente
    this.prop.showDelete = true

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
    await super.init()
    const session = Session()
    const { id_con } = storeToRefs(session)  //pasa los elementos por referencia al Global

    if (!(id_con.value > " ")) {
      console.error('Session not active')
      window.history.back()
      return false
    }

    if (this.prop.RecordSource.length > 2)
      await useNodata(this.prop.RecordSource)
    else
      console.warn('.prop.RecordSource empty', this.prop.Name)

    this.bt_save.Grid = this.gridCaptura; // asignamos el arreglo de grid
    return true
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
   * Obs: this method is inherited and can be modified from the .
   */
  // public async afterSave() { }

  /**
   * AfterDelete Method
   * Description: function that is executed after the delete button is executed.
   * Obs: this method is inherited and can be modified from the .
   */
  // public async afterDelete() { }

  /**
   * inDelete Method
   * Description: function that is executed when you enter the delete method.
   *              It will continue with the deletion if it returns true.
   * Obs: this method is inherited and can be modified from the .
   */
  //  public async inDelete() { return true }

  /**
   * inSave Method
   * Description: function that is executed when you enter the save method.
   *              It will continue with the save if it returns true.
   * Obs: this method is inherited and can be modified from the ThisForm.
   */
  //public async inSave_old() { return true }
  /*
    async showBt(button: string, valor: boolean) {
  
      if (this[button].prop.Visible != valor) {
        // await [button].show.value(valor)
  
        console.log('shwoBt ', `ThisForm.${button}.prop.Visible=${valor}`)
  
        //      this.eventos.push(`ThisForm.${button}.prop.Visible=${valor}`)
  
        const Id = this.Form[button].prop.htmlId + '_main'
        this.Form[button].prop.Visible = !valor
        await nextTick()
        this.Form[button].prop.Visible = valor
        // this.eventos.push(`ThisForm.${button}.prop.Visible=${valor};` + `NextTick('ThisForm.${button}.prop.Visible=${valor}')`)
  
        // console.log('shwoBt ', this[button].prop.Visible)
  
        //await nextTick()
  
        //this.eventos.push(`nextTick(function () {ThisForm.${button}.prop.Visible=${valor}});`)
  
        //  this.eventos.push('ThisForm.bt_save.prop.Visible=true')
  
  
      }
    }
  */
  /// /////////////////////////////////////
  // Metodo : before when component
  // Descripcion :Si es un campo llave, inicializa todos los componentes
  /// /////////////////////////////////////

  async beforeWhenComponent(Comp: undefined) {
    const thisComp = Comp.value
    if (this.Recno != 0)
      this.Recno = 0

    for (const comp of this.main) {

      const Comp = this[comp]
      if (Comp.prop.First)
        this.First = Comp

      if (Comp.prop.Capture && !Comp.prop.updateKey) {
        // console.log('Componente>>>>>>>>>=', Comp.prop.Name, Comp.prop.Capture, 'Key=', Comp.prop.updateKey)
        Comp.prop.ReadOnly = true

        if (typeof Comp.prop.Value == 'string')
          if (Comp.prop.Value != '')
            Comp.prop.Value = ''
          else
            if (Comp.prop.Value != 0)
              Comp.prop.Value = 0

      }

    }
    //  thisComp.prop.Valid = false
    if (this.First == null)
      this.First = this.main.length > 0 ? this[this.main[0]] : null
    if (this.prop.showDelete)
      this.Form.bt_delete.prop.Visible = false;

    //this.Form.bt_modify.prop.Visible = false;
    if (this.blockCapturaXml !== null) {
      this.Bt_campos_xml.prop.Visible = false;
    }

    this.bt_save.prop.Visible = false;
    //  this.bt_save.prop.Visible = false;

  }

  /**
   * @Method : validKeyComponent
   * @Description : Valida el componete pasado por referecia de la forma. Si es un dato nuevo
   *              manda refrescar la forma para permitir su captura
   *              Si no es un dato nuevo: Muestra los datos para permitir su
   *              modificacion
   */
  async validKeyComponent(Comp: undefined, mem?: {}) {
    // console.log('validKey meme=', mem)

    if (this.sw_update && this.Form.bt_save.prop.Visible)
      await this.Form.bt_save.click()

    if (this.prop.RecordSource.trim().length < 2) {
      MessageBox('No hay vista de actualizacion en el Form')
      return false
    }
    this.sw_update = false
    const thisComp = Comp.value
    //console.log('validKeyComponent Este=', thisComp.prop.Name)
    //if (!compName) return false;

    this.prop.RecordSource = this.prop.RecordSource.toLowerCase();

    thisComp.prop.Valid = true;
    //const { ...m } = Public.value;


    const m = mem ? { ...Public.value, ...mem } : { ...Public.value };
    // console.log('validKey m=', mem)
    let sw_act = true
    for (const comp of this.main) {// Busca si estan validados todos los componentes de captura

      //  console.log("validKeyComponent comp=", comp, "this[comp]=", this[comp])
      if (this[comp].prop.Capture) {
        //this[comp].prop.Disabled = false
        //          if (this[comp].prop.First)
        //            this.First = this[comp]
        if (this[comp].prop.Type == "number")
          m[comp] = +this[comp].prop.Value;
        else
          m[comp] = this[comp].prop.Value;
      }
      if (this[comp].prop.updateKey && !this[comp].prop.Valid) {
        sw_act = false;
      }

    }
    if (!sw_act) {
      return true;
    }

    console.log('validKey m=', m)

    //  thisComp.prop.Valid = true;
    // Leemos datos de la tabla de actualizacion
    // console.log('1) validComponent use this.prop.RecordSource', this.prop.RecordSource, 'm=', m)
    const data = await use(this.prop.RecordSource, m);
    // console.log('2) validComponent data=', data)

    //  if (!data || data == '400') { return false } // Hubo error al leer los datos
    this.noData = false;

    // 29 Ags 2024     let Recno = 0;
    if (this.Recno != 0)
      this.Recno = 0

    // console.log('Valid RecordSource=', this.prop.RecordSource, 'Recno', this.Recno, 'This=', this)

    let key_pri = 0;

    if (data === null) {       // No hay datos
      for (const comp of this.main) {
        if (this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey && this.Form[comp].prop.BaseClass.toLowerCase() !== 'textlabel') {
          this.Form[comp].prop.Valid = false // Apaga validaciones 
          this.Form[comp].prop.ReadOnly = false // Permite captura
        }
        // *) this.Form[comp].prop.Valid = this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey ? false : this.Form[comp].prop.Valid
      }

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
      /* 04/Mayo/2026 se comento todo el siguiente bloque porque ya estaba comentado *)
            // se utiliza nextTixc para q ue los componentes no prendan la validacion
            nextTick(() => {
              for (const comp of this.main) {
                if (this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey) {
                  this.Form[comp].prop.Valid = false // Apaga validaciones 
                  this.Form[comp].prop.ReadOnly = false // Permite captura
                }
      
                // *) this.Form[comp].prop.Valid = this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey ? false : this.Form[comp].prop.Valid
              }
            });
      
            */
      // console.log('ValidComponent appendBlank Return')
      return true

    }   // Hay datos

    //this.sw_update = false
    console.log('validKeyComponent data=', data)
    this.Recno = data.recno;
    this.prop.Status = 'P'
    for (const comp of this.main) {
      const CompCap = this[comp]

      CompCap.prop.ShowError = false
      CompCap.prop.Valid = true
      if (!CompCap.prop.updateKey)
        CompCap.prop.ReadOnly = true

    }
    this.prop.Status = 'A'

    await nextTick(() => {

      this.bt_modify.prop.Visible = true;

      if (this.prop.showDelete)
        this.bt_delete.prop.Visible = true;
      //this.bt_modify.prop.Focus = true;
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

  /*
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
  */


  /**********************************  Delete Record **********************/
  /**
   * @Method : bt_delete
   * @Description : Boton para borrar los datos de la forma
   */

  public bt_delete = new (class extends IMGBUTTON {
    constructor() {
      super();
      this.prop.Name = "bt_delete";
      this.prop.ToolTipText = "Borra datos";

      this.prop.Position = "footer";
      this.prop.Visible = false;

      this.prop.Image = "/Iconos/svg/delete-color.svg"; // bx-eraser.svg";
      // this.prop.TabIndex= 21

      this.style.width = "82px";
    } // Fin constructor

    override async click() {
      return this.Parent.bt_deleteClick()
    }

  });

  /**
   * @Method : bt_deleteClick
   * @Description : Click del boton para borrar los datos de la forma
   */
  public async bt_deleteClick() {
    if (this.prop.Disabled)
      return;

    // if (!await this.inDelete())
    //   return

    // this.Form.bt_modify.prop.Visible = false;
    if (this.blockCapturaXml !== null)
      this.Bt_campos_xml.prop.Visible = false;

    this.bt_save.prop.Visible = false;
    this.bt_delete.prop.Visible = false;

    if ((await MessageBox(this.bt_delete.prop.ToolTipText, 4, "")) === 6) {
      console.log("borra registro", this.Form.prop.RecordSource, this.Recno);
      const result = await deleteSql(this.Recno, this.prop.RecordSource, true);

      if (result) {
        this.Recno = 0  // Ponemos en 0 el recno para borrar los datos
        //            await this.refreshComponent();
        MessageBox("Datos borrados");
        this.First.setFocus()  // hacemos focon en el primer elemento
        return true
      }
      const m = await currentValue('*', this.prop.RecordSource)
      await this.requery(this.prop.RecordSource, m.key_pri, true)

    }
    // this.Form.bt_modify.prop.Visible = true;
    if (this.blockCapturaXml !== null)
      this.Form.Bt_campos_xml.prop.Visible = true;
    this.bt_save.prop.Visible = true;
    this.bt_delete.prop.Visible = true;
    return false
  }


  /**********************************  modify Record **********************/

  /**
   * @Method : bt_modify
   * @Description : Modifca los datos de la forma
   */

  public bt_modify = new (class extends IMGBUTTON {
    constructor() {
      super();
      //this.prop.Name = "bt_modify";
      this.prop.ToolTipText = "Modifica datos";
      this.prop.BaseClass = "imgButton";
      this.prop.Position = "footer";
      this.prop.Visible = false;

      this.prop.Image = "/Iconos/svg/update-content.svg";
      // this.prop.TabIndex= 21

      this.style.width = "76px";
    } // Fin constructor

    override async click() {
      return this.Parent.bt_modifyClick()
    }
  })

  public async bt_modifyClick() {

    this.bt_modify.prop.Visible = false

    for (const comp of this.Form.main) {
      if (this[comp].prop.Capture && !this[comp].prop.updateKey) {
        this[comp].prop.ReadOnly = false
      }
    }
    await nextTick()
    if (this.prop.showDelete)
      this.bt_delete.prop.Visible = true;
    this.Form.bt_save.prop.Visible = true
    if (this.blockCapturaXml !== null)
      this.Bt_campos_xml.prop.Visible = true
    return
  }

  /**********************************  Save Record **********************/
  /**
   * @description : Boton para grabar los datos de la forma
   * @note : 
   */

  public bt_save = new (class extends IMGBUTTON {
    public Grid = [];
    constructor() {
      super();
      // this.prop.Name = "bt_save";
      this.prop.Position = "footer";
      this.prop.ToolTipText = 'Graba datos '
      this.prop.Image = "/Iconos/svg/save-color1.svg";

      this.style.width = "82px";
      this.prop.Visible = false;
    } // Fin constructor

    override async click() {
      return await this.Form.bt_saveClick()
    }

    public async lee_grid() {
      for (let i = 0; i < this.Grid.length; i++) {
        if (this.Form[this.Grid[i]].prop.RecordSource.trim() > "  ")
          await use(this.Form[this.Grid[i]].prop.RecordSource, m);
        this.Form[this.Grid[i]].prop.Visible = true;
      }
    }

  });

  /**
   * @method bt_saveClick
   * @description :Graba los datos de la forma 
   * @note : Checa que todos los campos de captura esten validados antes de grabar. 
   *         No toma en cuenta campo ReadOnly o Disabled
   * @returns :Verdadeo si se grabo correctamente, falso si no
   *
   */

  public async bt_saveClick(mensaje?: string) {
    if (this.prop.RecordSource.length < 2)
      return false

    this.bt_save.prop.Visible = false;

    let resultado = false

    // Recorremos toda la forma y revisamos si estan validados
    for (const comp of this.main) {
      if (this[comp].prop.Capture && !this[comp].prop.Disabled && !this[comp].prop.ReadOnly && this[comp].prop.Visible && !this[comp].prop.Valid) {
        // tratamos de validar 
        if (!(await this[comp].valid())) {
          console.warn('CaptureForm bt_save click() Invalid comp=', comp)
          this.Form.bt_save.prop.Visible = true;
          await this[comp].setFocus()
          return false;
        }
      }
    }
    await nextTick()
    //const Registro = await goto(0, this.prop.RecordSource)

    this.bt_delete.prop.Visible = false;

    if (this.prop.autoUpdate || await MessageBox(this.bt_save.prop.ToolTipText, 4, "") == 6) {

      const result = await tableUpdate(
        0,
        false,
        this.prop.RecordSource
      );


      //    console.log('bt_save result', result)
      if (result) {
        MessageBox(mensaje ? mensaje : "Data updated");
        resultado = true
        this.sw_update = false
      } else {
        // actualiza datos porque hubo error de grabacion
        console.error('Save error bt_saveClick',)
        const m = await scatter(['key_pri', 'recno'], this.prop.RecordSource)
        if (m.key_pri > 0) { // si es un registro existente 
          await requery(this.prop.RecordSource, m.key_pri)

          this.Recno = 0
          this.Recno = m.recno
        }
      }
    }
    this.Form.bt_save.prop.Visible = true;

    const key_pri = await scatter(['key_pri'], this.prop.RecordSource)
    if (key_pri > 0)
      this.Form.bt_delete.prop.Visible = true
    return resultado;
  }

  //////////////////////////
  override async requery() {

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

}
