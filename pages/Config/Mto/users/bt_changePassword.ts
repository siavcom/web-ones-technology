
/**
 * //////////////////////////////////////////////
 *  @Clase : bt_changePassword
 *  @Author : Fernando Cuadras Angulo
 *  @Descripcion : Muestra el grid de captura de la cotizacion
 *  @Creacion : 24 Marzo 2025
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_changePassword extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Cambia SQL password";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/Password.svg"; //bx-calendar.svg"
    this.prop.Visible = false;
    this.style.width = "70px";
    this.inputStyle.width = "50px";
    this.prop.Messages = [
      ["No existe la sesión en SQL-Server"], // 0
      ["Cambio de contraseña en SQL-Server con existo "], // 1
    ];
  } // Fin constructor

  override async click() {
    this.prop.Visible = false
    if (this.Form.pw1_usr.prop.Value.trim() == '')
      return

    if (this.Form.pw1_usr.prop.Value.trim() != this.Form.pw2_usr.prop.Value.trim()) {
      this.Form.pw2_usr.prop.Valid = false
      return
    }



    if (this.Form.dialect == 'mssql') {
      const data = await SQLExec("select 1 as existe from master.dbo.syslogins where name ='" + this.Form.log_usr.prop.Value.trim() + "'")

      if (data.length == 0 || data[0].existe == 0) { // No existe la sesión
        MessageBox(this.prop.Messages[0][0], 16)
        return
      }
      //        ins_sql="EXEC sp_password NULL,"+pas_nue+",'"+Rtrim(Thisform.log_usu.Value)+"'" 
      await SQLExec("EXEC sp_password NULL," + this.Form.pw1_usr.prop.Value + ",'" + this.Form.log_usr.prop.Value.trim() + "'")
    }
    else {
      const data = await SQLExec("SELECT 1 as existe FROM pg_roles WHERE rolname='" + this.Form.log_usr.prop.Value.trim().toLowerCase()) + "'"

      if (data.length == 0 || data[0].existe == 0) {  // No existe la sesión
        MessageBox(this.prop.Messages[0][0], 16)
        return
      }


      //ins_sql="alter user "+LOWER(Rtrim(Thisform.log_usu.Value))+" with password "+this.pa1_usr.prop.Value+" ;"
      await SQLExec("alter user " + this.Form.prop.log_usr.Value.trim().toLowerCase() + " with password " + this.Form.pw1_usr.prop.Value.trim() + " ;")
      MessageBox(this.prop.Messages[1][0])
      return






    }
    this.Form.log_usr.setFocus()
  }
}
