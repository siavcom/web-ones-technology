
/**
 * //////////////////////////////////////////////
 *  @Clase : bt_newSession
 *  @Author : Fernando Cuadras Angulo
 *  @Descripcion : Muestra el grid de captura de la cotizacion
 *  @Creacion : 24 Marzo 2025
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_newSession extends IMGBUTTON {
  constructor() {
    super();

    this.prop.Caption = "Genera Sesion SQL";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/Session.svg"; //bx-calendar.svg"
    this.prop.Visible = false;
    this.style.width = "70px";
    this.inputStyle.width = "50px";
    this.prop.Messages = [
      ["Ya existe la sesión en SQL-Server"], // 0
      ["Creación de inicio de sesión con exito "], // 1
    ];


  } // Fin constructor

  override async click() {

    let newSession = true
    let newUser = true
    if (this.Form.dialect == 'mssql') { // MSSQL
      await SQLExec(`USE [${this.Form.mPublic.dbname}]`)
      const data = await SQLExec(`select 1 as existe from master.dbo.syslogins where name ='${this.Form.log_usr.prop.Value.trim()}'`)

      if (data.length > 0 && data[0].existe == 1) {  // Ya existe la sesión
        MessageBox(this.prop.Messages[0][0], 16)
        newSession = false
        //const data = await SQLExec(`select 1 as existe from master.dbo.sysusers where name ='${this.Form.log_usr.prop.Value.trim()}'`)
        const data = await SQLExec(`SELECT 1 AS existe  FROM sys.database_principals  WHERE name = '${this.Form.log_usr.prop.Value.trim()}'`)
        if (data.length > 0 && data[0].existe == 1) {  // Ya existe el usuario
          MessageBox(this.prop.Messages[0][0], 16)
          newUser = false
        }

      }

      if (newSession)
        //await SQLExec(`execute sp_addlogin '${this.Form.log_usr.prop.Value}', '${this.Form.pw1_usr.prop.Value}','${this.Form.mPublic.dbname}' `)
        await SQLExec(`CREATE LOGIN[${this.Form.log_usr.prop.Value}] WITH PASSWORD = N'${this.Form.pw1_usr.prop.Value}', DEFAULT_DATABASE = [${this.Form.mPublic.dbname}], CHECK_EXPIRATION = OFF, CHECK_POLICY = OFF`)
      if (newUser)
        await SQLExec(`CREATE USER[${this.Form.log_usr.prop.Value}] FOR LOGIN[${this.Form.log_usr.prop.Value.trim()}]; `)


      // Dueño de la base de datos
      if (this.Form.log_usr.prop.Value.trim() === 'sa@' + this.Form.mPublic.dbname) {
        const user = 'sa@' + this.Form.mPublic.dbname
        await SQLExec(`ALTER ROLE [db_owner] ADD MEMBER [${user}]`)
        //await SQLExec(`ALTER SERVER ROLE [##MS_DatabaseManager##] ADD MEMBER [${user}]`)
        //await SQLExec(`ALTER SERVER ROLE [##MS_LognManager##] ADD MEMBER [${user}]`)
      } else // Solo el role default de la base de datos
        await SQLExec(`ALTER ROLE [${this.Form.mPublic.defaultrole}] ADD MEMBER [${this.Form.log_usr.prop.Value}]`)

    }
    else {  // Postgres 
      const data = await SQLExec("SELECT 1 as existe FROM pg_roles WHERE rolname='" + this.Form.log_usr.prop.Value.trim().toLowerCase()) + "'"

      if (data.length > 0 && data[0].existe == 1) { // Ya existe la sesión
        MessageBox(this.prop.Messages[0][0], 16)
        newSession = false
      }
      if (newSession)
        await SQLExec(`CREATE USER ${this.Form.log_usr.prop.Value} WITH PASSWORD '${this.Form.pw1_usr.prop.Value}'; `)

      // Dueño de la base de datos
      if (this.Form.nam_usr.prop.Value.trim() == 'sa@' + this.Form.mPublic.dbname) {
        console.log('bt_newsession', this.Form.nam_usr.prop.Value)
        const user = 'sa@' + this.Form.mPublic.dbname
        await SQLExec(`ALTER DATABASE "${this.Form.mPublic.dbname}" OWNER TO [{user}]`)
      } else
        await SQLExec(`GRANT 'web-ones' TO ${this.Form.log_usr.prop.Value};`)

    }
    MessageBox(this.prop.Messages[1][0])
    this.Form.log_usr.setFocus()

  }
}
