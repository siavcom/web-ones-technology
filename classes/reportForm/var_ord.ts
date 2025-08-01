//////////////////////////////////////////////
// BaseClass : component
// Class : nom_ind
// Description : Nobre del indice
// Author : El Fer Blocks
// Creation : 2024-04-15
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

export class var_ord extends COMPONENT {
  Type: string = 'text'
  constructor() {
    super();
    this.prop.Caption = "Orden ";
    this.prop.BaseClass = "comboBox";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = false;
    this.prop.updateKey = true;
    this.prop.ColumnWidths = "200px,56px";
    this.style.width = "fit-content";
    // this.style.marginLeft = "10px";


  }
  /*
  override async when() {
    await this.interactiveChange()
  }
  override async interactiveChange() {
*/
  override async onChangeValue(styles?: any) {

    if (this.prop.Value == 'cla_isu') {
      this.Form.des_dat.prop.InputMask = Public.value.ima_pge.trim()
      this.Form.has_dat.prop.InputMask = Public.value.ima_pge.trim()
      if (this.Form.des_isu)
        this.Form.des_isu.prop.InputMask = Public.value.ima_pge.trim()
      if (this.Form.has_isu)
        this.Form.has_isu.prop.InputMask = Public.value.ima_pge.trim()

    }
    else {
      this.Form.des_dat.prop.InputMask = ''
      this.Form.has_dat.prop.InputMask = ''
      if (this.Form.des_isu)
        this.Form.des_isu.prop.InputMask = ''
      if (this.Form.has_isu)
        this.Form.has_isu.prop.InputMask = ''

    }

    console.log('var_ord=', this.prop.Value)

    if (this.prop.RowSource == '') return
    if (this.prop.RowSourceType == 0) return


    const m = await this.Form.obtData(); // Variable de memoria los propiedades de la forma

    let num_dat = 0

    for (let i = 0; i < this.Form.fields.length; i++) {
      if (this.Form.fields[i][0] == this.prop.Value) {
        num_dat = i
        break
      }
    }

    const data = await this.Sql.localAlaSql(`select tip_dat,lon_dat,dec_dat from Now.diccionario where trim(cam_dat)='${this.prop.Value.trim()}'`)
    console.log('interactiveChange var_ord', `select tip_dat,lon_dat,dec_dat from Now.diccionario where cam_dat='${this.prop.Value.trim()}'`, data)
    const tip_dat = data[0].tip_dat
    const lon_dat = data[0].lon_dat > 30 ? 30 : data[0].lon_dat

    let Type = 'text'
    let des_Value = this.Form.fields[num_dat][2] ? eval(this.Form.fields[num_dat][2]) : ''
    let has_Value = this.Form.fields[num_dat][3] ? eval(this.Form.fields[num_dat][3]) : ''


    if (tip_dat == 'smallint' ||
      tip_dat.slice(0, 3) == 'int' ||
      tip_dat.slice(0, 5) == 'float' ||
      tip_dat.slice(0, 6) == 'double' ||
      tip_dat.slice(0, 3) == 'num'
    ) {

      Type = 'number'
      this.Form.des_dat.prop.Value = +des_Value
      this.Form.has_dat.prop.Value = +has_Value

    }
    if (tip_dat == 'date'
    ) {
      Type = 'date'

      this.Form.des_dat.prop.Value = await dateToSql(des_Value)
      this.Form.has_dat.prop.Value = await dateToSql(has_Value)
    }

    if (tip_dat == 'datetime'
    ) {

      Type = 'datetime'

      this.Form.des_dat.prop.Value = await dateTimeToSql(des_Value)
      this.Form.has_dat.prop.Value = await dateTimeToSql(has_Value)
    }

    if (tip_dat == 'char' ||
      tip_dat == 'varchar' ||
      tip_dat == 'text' ||
      tip_dat == 'string'
    ) {
      Type = 'text'
      this.Form.des_dat.prop.Value = des_Value.length > lon_dat ? des_Value.slice(0, lon_dat) : des_Value
      this.Form.has_dat.prop.Value = has_Value.slice(0, lon_dat)
    }


    this.Type = Type

    this.Form.des_dat.prop.MaxLength = lon_dat
    this.Form.des_dat.prop.Decimals = data[0].dec_dat
    this.Form.des_dat.prop.Type = Type

    this.Form.has_dat.prop.MaxLength = lon_dat
    this.Form.has_dat.prop.Decimals = data[0].dec_dat
    this.Form.has_dat.prop.Type = Type


    this.Form.tip_con.when()


  }

}
