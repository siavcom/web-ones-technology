
///////////////////////////////////////
// base class
///////////////////////////////////////

export class bt_aceptar extends IMGBUTTON {
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
      Image: "/Iconos/svg/accept.svg",
    });

    Object.assign(this.style, {
      float: "left",
      width: "52px"
    })
  }

  /**
   * Hace visible el componente browse y carga los datos de la tabla
   * que se especifica en el RecordSource del componente help.
   * El Where se construye en base a los valores de los campos tip_con, des_dat y has_dat
   * y se aplica al RecordSource.
   * Si no hay datos en el RecordSource, se oculta el componente browse.
   * Luego llama al metodo when() del componente tip_con.
   */
  override async click() {

    this.Parent.browse.prop.RowSource = ''

    // if (!await this.Parent.des_dat.valid())
    //   return

    this.prop.Visible = false

    this.Parent.tip_con.prop.Visible = false
    this.Parent.cam_dat.prop.Visible = false
    this.Parent.des_dat.prop.Visible = false
    this.Parent.has_dat.prop.Visible = false

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


    //    const data = await this.Sql.localAlaSql(`select cam_dat,ref_dat from now.diccionario `)
    //    console.log('bt_aceptar data=', data)
    this.Parent.browse.table.columns = []
    const columns = []
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
    //    console.log("help aceptar select=", `select ${fields}  from ${this.Parent.prop.RecordSource}  ${where}`)
    /*
        if (this.Sql.View.browse) {
          delete this.Sql.View.browse
          localAlaSql(`drop table IF EXISTS now.browse`)
        }
    */
    const res = await SQLExec(`select ${fields}  from ${this.Parent.prop.RecordSource}  ${where}`, 'browse')

    //const res = await this.Sql.localAlaSql(`select * from browse limit 1`)

    if (!res || !this.Sql.View.browse || this.Sql.View.browse.recCount == 0) {
      if (!res)
        MessageBox("No hay datos")

      return this.Parent.bt_close.click()
    }
    this.Parent.browse.prop.RowSource = "browse";
    this.Parent.browse.prop.Visible = true;

  }


}
