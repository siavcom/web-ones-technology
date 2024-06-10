
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class bt_aceptar extends COMPONENT {
  /** 
  * Author : Fernando Cuadras Angulo
  *  @CreationDate : 16/Abr/2024
   * @UpdateDate  : 22/Abr/2024
   * @export bt_aceptar
   * @class imgButton
   * @extends {COMPONENT}
  **/

  constructor() {
    super();
    Object.assign(this.prop, {
      textLabel: "OK",
      Capture: false,
      BaseClass: "imgButton",

      Image: "/Iconos/svg/ok-accept.svg",

    });
    Object.assign(this.style, { width: "35px" });
    Object.assign(this.style, { float: "left" })
  }

  async click() {
    this.prop.Visible = false

    this.Parent.tip_con.prop.Visible = false
    this.Parent.cam_dat.prop.Visible = false
    this.Parent.des_dat.prop.Visible = false
    this.Parent.has_dat.prop.Visible = false

    if (await !this.Parent.des_dat.valid())
      return

    await this.Parent.has_dat.valid()

    let where = ''

    let Type = this.Parent.cam_dat.Type
    if (this.Parent.tip_con.prop.Value == 'C') {  // contenga
      where = ` ${this.Parent.cam_dat.prop.Value} like '%${this.Parent.des_dat.prop.Value.trim()}%'`
    } else {
      where = ` ${this.Parent.cam_dat.prop.Value} >= ${this.Parent.des_dat.prop.Value} and \
        ${this.Parent.cam_dat.prop.Value} <= ${this.Parent.has_dat.prop.Value}`


      if (Type == 'string') {
        where = ` ${this.Parent.cam_dat.prop.Value} >= '${this.Parent.des_dat.prop.Value}' and \
               ${this.Parent.cam_dat.prop.Value} <= '${this.Parent.has_dat.prop.Value}'`
      }

      if (Type == 'date' || Type == 'dateTime') {
        const des_dat = dateToSring(this.Parent.des_dat.prop.Value)
        const has_dat = dateToSring(this.Parent.has_dat.prop.Value)
        where = ` ${this.Parent.cam_dat.prop.Value} >= 'des_dat' and \
               ${this.Parent.cam_dat.prop.Value} <= 'has_dat'`
      }
    }
    const and = this.Parent.prop.Where ? 'and' : ' '

    where = ` where ${this.Parent.prop.Where} ${and} ${where} `


    //    const data = await this.Sql.localAlaSql(`select cam_dat,ref_dat from Now.diccionario `)
    //    console.log('bt_aceptar data=', data)
    this.Parent.browse.table.columns = []
    const columns = []
    console.log("open fields=", this.Parent.fields)
    let fields = ''
    let coma = ''
    for (let i = 0; i < this.Parent.fields.length; i++) {
      fields = fields + coma + this.Parent.fields[i][0]
      coma = ', '
      columns[i] = {
        field: this.Parent.fields[i][0],
        label: this.Parent.fields[i][1],
        sortable: true,
        width: this.Parent.fields[i][2]
      }
      this.Parent.browse.table.columns.push(columns[i])

    }


    await this.Sql.execute(`select ${fields}  from ${this.Parent.prop.RecordSource}  ${where}`, 'browse')

    // const res = await this.Sql.localAlaSql(`select * from browse limit 1`)
    //    if (res.length == 0)

    if (this.Sql.View.browse.recCount == 0)
      return this.Parent.bt_close.click()

    this.Parent.browse.prop.RowSource = "browse";

    // this.Parent.browse.table.columns = columns
    // console.log('3)bt_aceptar browse=', this.Parent.browse.table.columns)

    /*
    for (let col = 0; col < this.Parent.browse.table.columns.length; col++) {

      console.log('bt_aceptar col=', col, 'Columna=>', this.Parent.browse.table.columns[col])
      const cam_dat = this.Parent.browse.table.columns[col].field
      const res = await this.Sql.localAlaSql(`select ref_dat from Now.diccionario where cam_dat='${cam_dat}'`)
      this.Parent.browse.table.columns[col].label = res[0].ref_dat
    }
    */


    this.Parent.browse.prop.Visible = true;


    console.log('bt_aceptar browse=', this.Parent.browse.table)


    /*
    
        const rows =  await multiFilter(this.Parent.browse.table.oriRows, this.Parent.browse.table.filters) 
        
        const workSheet = utils.json_to_sheet(rows);
    
    
    */


  }


}
