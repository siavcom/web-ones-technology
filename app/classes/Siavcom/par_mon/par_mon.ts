
//////////////////////////////////////////////
//////////////////////////////////////////////
// @baseClass  : Container
// @class : par_mon
// Description : Paridad de monedas
// @author: El Fer Blocks
// Creation : 2025-10-30
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { CONTAINER } from "@/classes/Container";
import { bt_close } from "./bt_close"

/////////////////////////////////////////
// Component import
//////////////////////////////////////

export class PAR_MON extends CONTAINER {

  public fpo_pge = new TEXTLABEL()

  public vm1_pge = new TEXTLABEL()
  public pr1_pge = new COMPONENT()
  public dm1_pge = new COMPONENT()

  public vm2_pge = new COMPONENT()
  public pr2_pge = new COMPONENT()
  public dm2_pge = new COMPONENT()

  public vm3_pge = new COMPONENT()
  public pr3_pge = new COMPONENT()
  public dm3_pge = new COMPONENT()

  public vm4_pge = new COMPONENT()
  public pr4_pge = new COMPONENT()
  public dm4_pge = new COMPONENT()

  public vm5_pge = new COMPONENT()
  public pr5_pge = new COMPONENT()
  public dm5_pge = new COMPONENT()

  public bt_close = new bt_close()

  //  public bt_save = new bt_save()
  // public bt_accept = new bt_accept()

  constructor() {
    super()
    this.prop.BaseClass = 'modalContainer'   //'modalContainer'
    this.prop.Visible = false
    this.prop.Messages[0] = ' Paridad'
    this.prop.Messages[1] = 'Protección '
    this.prop.Messages[3] = 'Paridad de monedas al '

    this.vm1_pge.prop.Name = 'vm1_pge'
    this.pr1_pge.prop.Name = 'pr1_pge'
    this.dm1_pge.prop.Name = 'dm1_pge'

    this.vm2_pge.prop.Name = 'vm2_pge'
    this.pr2_pge.prop.Name = 'pr2_pge'
    this.dm2_pge.prop.Name = 'dm2_pge'

    this.vm3_pge.prop.Name = 'vm3_pge'
    this.pr3_pge.prop.Name = 'pr3_pge'
    this.dm3_pge.prop.Name = 'dm3_pge'

    this.vm4_pge.prop.Name = 'vm4_pge'
    this.pr4_pge.prop.Name = 'pr4_pge'
    this.dm4_pge.prop.Name = 'dm4_pge'

    this.vm5_pge.prop.Name = 'vm5_pge'
    this.pr5_pge.prop.Name = 'pr5_pge'
    this.dm5_pge.prop.Name = 'dm5_pge'


    // this.style.width = '400px'
    // this.style.maxHeight = '400px'

    //    this.style.display = 'flex'
    //    this.style.flexWrap = 'wrap'

    //    this.containerStyle.display = 'flex'
    //    this.containerStyle.flexWrap = 'wrap'

    const container = this.container

    this.block[0] = structuredClone(container)
    this.block[0].component = {

      [0]: this.vm1_pge,
      [1]: this.pr1_pge,
      [2]: this.dm1_pge,
      [3]: this.vm2_pge,
      [4]: this.pr2_pge,
      [5]: this.dm2_pge,
      [6]: this.vm3_pge,
      [7]: this.pr3_pge,
      [8]: this.dm3_pge,
      [9]: this.vm4_pge,
      [10]: this.pr4_pge,
      [11]: this.dm4_pge,
      [12]: this.vm5_pge,
      [13]: this.pr5_pge,
      [14]: this.dm5_pge,
      [15]: this.bt_close
    }

    this.block[0].title = this.prop.Messages[0] + new Date(Public.value.fpo_pge).toLocaleDateString()
    this.block[0].style.maxWidth = '400px'
    this.block[0].style = {
      border: '1px solid rgb(0, 0, 0)',
      background: 'bisque',
      borderRadius: '10px',
      boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)',
      padding: '10px',
      // display: 'inline-flex',
      width: '270px',
      display: 'flex',
      flexWrap: 'wrap'
    }
    /*
        this.block[1] = structuredClone(container)
        this.block[1].component = {
          [0]: this.bt_close
        }
        this.block[1].style = {
    */
  }



  override  async init() {
    this.vm1_pge.prop.Caption = Public.value.de1_pge //+ this.prop.Messages[0]
    this.vm1_pge.prop.Type = 'number'
    this.vm1_pge.prop.Value = 1
    this.vm1_pge.prop.Decimals = 5
    this.vm1_pge.inputStyle.width = '92px'
    this.vm1_pge.style.width = 'auto'

    if (this.pr1_pge) {
      this.pr1_pge.prop.Caption = this.prop.Messages[1] + Public.value.pr1_pge
      this.pr1_pge.prop.Value = this.Form.mPublic.pr1_pge // Public.value.pr1_pge
      this.pr1_pge.inputStyle.width = '260px'
      this.pr1_pge.style.width = 'auto'
    }


    this.vm2_pge.prop.Caption = Public.value.de2_pge //+ this.prop.Messages[0]
    this.vm2_pge.prop.Type = 'number'
    this.vm2_pge.prop.Value = this.Form.mPublic.va2_pge // Public.value.va2_pge
    this.vm2_pge.prop.Decimals = 5
    this.vm2_pge.inputStyle.width = '92px'
    this.vm2_pge.style.width = 'suto'

    if (this.pr2_pge) {
      this.pr2_pge.prop.Caption = this.prop.Messages[1] // + Public.value.pr2_pge
      this.pr2_pge.prop.Value = this.Form.mPublic.pr2_pge // Public.value.pr2_pge
      this.pr2_pge.inputStyle.width = '260px'
      this.pr2_pge.style.width = 'auto'
    }

    this.vm3_pge.prop.Caption = Public.value.de3_pge //+ this.prop.Messages[0]
    this.vm3_pge.prop.Type = 'number'
    this.vm3_pge.prop.Value = this.Form.mPublic.va3_pge // Public.value.va3_pge
    this.vm3_pge.prop.Decimals = 5
    this.vm3_pge.inputStyle.width = '92px'
    this.vm3_pge.style.width = 'auto'

    if (this.pr3_pge) {
      this.pr3_pge.prop.Caption = this.prop.Messages[1] + Public.value.pr3_pge
      this.pr3_pge.prop.Value = this.Form.mPublic.pr3_pge // Public.value.pr3_pge
      this.pr3_pge.inputStyle.width = '260px'
      this.pr3_pge.style.width = 'auto'
    }

    this.vm4_pge.prop.Caption = Public.value.de4_pge //+ this.prop.Messages[0]
    this.vm4_pge.prop.Type = 'number'
    this.vm4_pge.prop.Value = this.Form.mPublic.va4_pge // Public.value.va4_pge
    this.vm4_pge.prop.Decimals = 5
    this.vm4_pge.inputStyle.width = '92px'
    this.vm4_pge.style.width = 'auto'

    if (this.pr4_pge) {
      this.pr4_pge.prop.Caption = this.prop.Messages[1] + Public.value.pr4_pge
      this.pr4_pge.prop.Value = this.Form.mPublic.pr4_pge // Public.value.pr4_pge
      this.pr4_pge.inputStyle.width = '260px'
      this.pr4_pge.style.width = 'auto'
    }

    this.vm5_pge.prop.Caption = Public.value.de5_pge //+ this.prop.Messages[0]
    this.vm5_pge.prop.Type = 'number'
    this.vm5_pge.prop.Value = this.Form.mPublic.va5_pge // Public.value.va5_pge
    this.vm5_pge.prop.Decimals = 5
    this.vm5_pge.inputStyle.width = '92px'
    this.vm5_pge.style.width = 'auto'

    if (this.pr5_pge) {
      this.pr5_pge.prop.Caption = this.prop.Messages[1] + Public.value.pr5_pge
      this.pr5_pge.prop.Value = this.Form.mPublic.pr5_pge // Public.value.pr5_pge
      this.pr5_pge.inputStyle.width = '260px'
      this.pr5_pge.style.width = 'auto'
    }

    if (this.dm1_pge) {
      this.dm1_pge.prop.Type = 'number'
      this.dm1_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm1_pge.inputStyle.width = '14px'
      this.dm1_pge.prop.Decimals = 0
      this.dm1_pge.prop.Value = this.Form.mPublic.dm1_pge // Public.value.dm1_pge
    }


    if (this.dm2_pge) {
      this.dm2_pge.prop.Type = 'number'
      this.dm2_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm2_pge.inputStyle.width = '14px'
      this.dm2_pge.prop.Decimals = 0
      this.dm2_pge.prop.Value = this.Form.mPublic.dm2_pge // Public.value.dm2_pge
    }

    if (this.dm3_pge) {
      this.dm3_pge.prop.Type = 'number'
      this.dm3_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm3_pge.inputStyle.width = '14px'
      this.dm3_pge.prop.Decimals = 0
      this.dm3_pge.prop.Value = this.Form.mPublic.dm3_pge // Public.value.dm3_pge
    }

    if (this.dm4_pge) {
      this.dm4_pge.prop.Type = 'number'
      this.dm4_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm4_pge.inputStyle.width = '14px'
      this.dm4_pge.prop.Decimals = 0
      this.dm4_pge.prop.Value = this.Form.mPublic.dm4_pge // Public.value.dm4_pge
    }

    if (this.dm5_pge) {
      this.dm5_pge.prop.Type = 'number'
      this.dm5_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm5_pge.inputStyle.width = '14px'
      this.dm5_pge.prop.Decimals = 0
      this.dm5_pge.prop.Value = this.Form.mPublic.dm5_pge // Public.value.dm5_pge
    }

    if (this.dm3_pge) {
      this.dm3_pge.prop.Type = 'number'
      this.dm3_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm3_pge.inputStyle.width = '14px'
      this.dm3_pge.prop.Decimals = 0
      this.dm3_pge.prop.Value = this.Form.mPublic.dm3_pge // Public.value.dm3_pge
    }

    if (this.dm4_pge) {
      this.dm4_pge.prop.Type = 'number'
      this.dm4_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm4_pge.inputStyle.width = '14px'
      this.dm4_pge.prop.Decimals = 0
      this.dm4_pge.prop.Value = this.Form.mPublic.dm4_pge // Public.value.dm4_pge
    }

    if (this.dm5_pge) {
      this.dm5_pge.prop.Type = 'number'
      this.dm5_pge.prop.Caption = 'Decimales calculo CFDI'
      this.dm5_pge.inputStyle.width = '14px'
      this.dm5_pge.prop.Decimals = 0
      this.dm5_pge.prop.Value = this.Form.mPublic.dm5_pge // Public.value.dm5_pge
    }

  }

  async open() {
    this.prop.Visible = true
  }
  async close() {
    this.prop.Visible = false
  }


}
