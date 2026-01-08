export const dialect = computed(() => {
  const { Public } = toRefs(publico)
  return Public.value.session.dialect
})

// ---------------< Obtención de número de consecutivo del documento >---------------------
// llamando al procedimiento almacenado del sql

/**
 * Obtiene el siuiente documento disponible a dar de alta
 * @param {Object} tdo_tdo - Tipo de documento
 * @returns {Object} Siguiente documento disponible
 */

export async function get_con_doc(tdo_tdo: string) {

  let m = { tdo_tdo: tdo_tdo }   // inicializamos m
  // Private num_doc 
  let ndo_doc = 0
  let ins_sql = ''
  // obtiene la area de trabajo actual
  switch (true) {
    case Public.value.ndb_emp == 1 || Public.value.ndb_emp == 3:
      // Si es MSSQL7
      ins_sql = upper("declare @ndo_doc numeric(6,0)  exec p_get_con_doc '" + tdo_tdo + "',@ndo_doc  OUTPUT " + " select @ndo_doc as ndo_doc")
      break
    case Public.value.ndb_emp == 4:
      // Si es PostgreSQL
      ins_sql = upper("select p_get_con_doc as ndo_doc from P_get_con_doc('" + tdo_tdo + "')")
  } // End case 
  const data = await SQLExec(ins_sql)
  if (data.length > 0) {
    const res = objToLowerCase(data[0])
    ndo_doc = res.ndo_doc
  }

  return ndo_doc
} // End If 

// ---------------< Obtención de número consecutivo de clientes y proveedores >---------------------

export async function get_con_cod(cop_nom: number) {
  let m = {}   // inicializamos m
  let ins_sql = ''
  let cod_nom = ''
  // llama al procedimiento almacenado del sql
  switch (true) {
    case Public.value.ndb_emp == 1 || Public.value.ndb_emp == 3:
      // Si es MSSQL o Sybase
      ins_sql = upper("declare @cod_nom char(12)  exec P_get_con_cod '" + cop_nom + "',@cod_nom  OUTPUT " + " select @cod_nom as cod_nom")
      break

    case Public.value.ndb_emp == 4:
      // Si es PostgreSQL
      ins_sql = upper("select  CAST(m_cod_nom as char(12)) as cod_nom from P_get_con_cod ('" + cop_nom + "')")
  } // End case 

  const data = await SQLExec(ins_sql)
  if (data.length > 0) {
    const res = objToLowerCase(data[0])
    cod_nom = res[0].cod_nom
  }
  return cod_nom

} // End If 

// ---------------< Obtención de número de consecutivo del consignatario >---------------------
// esta rutina se cambiara al un proceso almacenado
export async function get_con_con(cop_nom: string, cod_nom: string) {
  let m = {}   // inicializamos m
  let sw_sal = false

  let ins_sql = `select con_con+1 as con_con from vi_cap_comenom where cop_nom='${cop_nom}' and cod_nom='${cod_nom}'`
  let res = await SQLExec(ins_sql)
  let con_con = 0
  if (res.length > 0)
    con_con = res[0].con_con
  while (!sw_sal) {

    ins_sql = `select con_con from vi_cap_where cop_nom='${cop_nom}' and cod_nom='${cod_nom}' and con_con=${con_con} `
    res = await SQLExec(ins_sql)
    if (res.length > 0 && res[0].con_con > 0)
      con_con++
    else
      sw_sal = true

  } // End case 

  return con_con

}   // Fin Procedure


/**
 * ---------- < Rellena a ceros las codigos de clientes o proveedores >-----------
 * @param {string} cod_nom - Codigo
 * @param {string} cop_nom - C=Cliente P=Proveedor
 * @returns {string} - Codigo justificado con ceros
 */
export function jus_cer(cod_nom: string, cop_nom: string) {
  // Private lon_cta 

  const niv_cap = []
  let ima_cap = Public.value.icl_pge.trim()
  switch (true) {
    case cop_nom == 'C':
      //let ima_cap = Public.value.icl_pge
      break
    case cop_nom == 'P':
      ima_cap = Public.value.ipr_pge.trim()
      break
    case cop_nom == 'E':
      // presupuesto
      ima_cap = Public.value.ipg_pge.trim()
  } // End case 

  for (let i = 1; i < 5; i++) {
    niv_cap[i] = 0
    let pos = at('-', ima_cap)
    // busca primera posición
    if (pos <= 0) {
      pos = ima_cap.length + 1
    } // End If 

    if (pos > 1) {
      niv_cap[i] = pos - 1
      ima_cap = right(ima_cap, ima_cap.length - pos)
    } // End If 

  } // End For; 

  //cod_nom = strtran(cod_nom, ' ', '')
  cod_nom = cod_nom.replaceAll(' ', '');

  // Quita los espacios
  let lon_cta = cod_nom.length
  let i = 1
  // checa cta. y si necesario rellena el ultimo nivel a ceros
  // contador de niveles
  let posIni = 1
  // posicion inicial
  let cod_pas = ''
  // subniveles antes de rellenarse a ceros
  let subCta = ''
  // subcta. analizandose
  let sw_sal = true

  while (sw_sal) {
    if (niv_cap[i] > 0) {
      subCta = rTrim(substr(cod_nom, posIni, niv_cap[i]))

      //niv_cta
      if (subCta.length < niv_cap[i]) {
        subCta = '000000000' + subCta
        subCta = right(subCta, niv_cap[i])
      } // End If 

      cod_pas = cod_pas + subCta
      if (cod_pas.length >= lon_cta) {
        // salida de rutina
        sw_sal = false
      } // End If 

      posIni = cod_pas.length + 1
      i = i + 1
    } else {

      sw_sal = false
    } // End If 
  } // End while 
  return cod_pas
}   // Fin Procedure

// ----------------< Procedimiento para desencriptar una palabra >-----------

export async function des_pal(pal_enc: string) {
  let m = {}   // inicializamos m
  if (isNull(pal_enc)) {
    return ''
  } // End If 

  let clave = ''
  let lon_pal = len(pal_enc)
  let pos = 1
  for (let j = 1; j < lon_pal; j++) {
    if (asc(substr(pal_enc, j, 1)) < 41) {
      clave = clave + ' '
    } else {

      switch (true) {
        case pos == 1:
          clave = clave + char(asc(substr(pal_enc, j, 1)) - 1)
          break
        case pos == 2:
          clave = clave + char(asc(substr(pal_enc, j, 1)) + 2)
          break
        case pos == 3:
          clave = clave + char(asc(substr(pal_enc, j, 1)) - 3)
          break
        case pos == 4:
          clave = clave + char(asc(substr(pal_enc, j, 1)) + 4)
      } // End case 

    } // End If 

    pos = iif(pos < 4, pos + 1, 1)
  } // End For; 

  return clave

}   // Fin Procedure
