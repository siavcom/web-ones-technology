/**
 * Calcula saldo de una cuenta de contabilidad
 * 
 * @param {string} cta_cta - Cuenta de contabilidad
 * @param {string} fec_con - Fecha de consulta
 * @param {number} mon_con - Moneda de consulta
 * @returns {number} - Saldo de la cuenta
 */
export async function cal_sal_cta(cta_con: string, fec_con: string, mon_con: number) {
  let m = {};  // Inicializamos m
  let Alias = '';   //Inicializamos Alias
  let Recno = 0;   //Inicializamos Recno
  let Result = [];   //Inicializamos Result
  let are_tra = await select()
  // obtiene la area de trabajo actual

  m.sal_con = 0
  let fec_con1 = "'" + dateToString(fec_con) + "'"
  // convertimos la fecha a string
  let ins_sql
  switch (true) {
    case Public.value.ndb_emp == 1:
      // Si es MSSQL7
      ins_sql = " select dbo.F_con_sal_cta ( '" + cta_con + "'," + fec_con1 + "," + str(mon_con, 1) + ") as sal_con"
      break
    case Public.value.ndb_emp == 4:
      // Si es PostgreSQL
      ins_sql = " select F_con_sal_cta ( '" + cta_con + "'," + fec_con1 + "," + str(mon_con, 1) + ") as sal_con"
  } // End case 

  let a = ins_sql
  if (await SQLExec(ins_sql, 'Resultado') > 0) {
    if (await recCount() > 0) {
      m = appendM(m, await scatter())// scatter 
    } // End If 

    releaseUse('Resultado') // use 
    await select(are_tra)
    return m.sal_con
  } // End If 

  return null
  // ejecutamos rutina de error

}   // Fin Procedure
// ------------------------< Consulta saldo de una cuenta a una fecha >------------------
