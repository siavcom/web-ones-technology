export const dialect = computed(() => {
  const { Public } = toRefs(publico)
  return Public.value.session.dialect
})


/**
* @definicion Busca el valor de una variables en un XML
* @var_xml : variable donde se va a hacer la busqueda de los elementos
* @dat_etq : etiqueta a buscar
* @dat_atr : atributo a buscar
* @numero de etiquetas a buscar
 */
export function obt_cam_xml(var_xml: string, dat_etq?: string, dat_atr?: string, num_ele?: number) {
  let m = {}   // inicializamos m
  switch (true) {
    case !num_ele:
      let num_ele = 1
      break
    case !dat_atr:
      num_ele = 1
      let dat_atr = ' '
      break
    case !dat_etq:
      return ' '

  } // End case 

  dat_etq = dat_etq?.trim() || ''
  dat_atr = dat_atr?.trim() || ''

  if (num_ele == 0) {
    num_ele = 1
  } // End If 

  m.par_sel = var_xml
  //m.par_sel=STRTRAN(var_xml,'  ',' ')     && elimina dobles espacios,
  //m.par_sel=STRTRAN(m.par_sel,' =','=')    && elimina espacios entre el =,
  //m.par_sel=STRTRAN(m.par_sel,'= ','=')    && elimina espacios entre el =,
  //m.par_sel=STRTRAN(m.par_sel,'< / ','</')   && elimina espacios entre el </,
  //m.par_sel=STRTRAN(m.par_sel,'<  ','< ')    && elimina espacios entre el <
  //m.par_sel=STRTRAN(m.par_sel,' >','>')    && elimina espacios entre el <
  let dat_sal = ' '
  let pet_ini = 1
  let pet_fin = m.par_sel.length
  let pet_fin1 = 0
  let lon_etq = 0
  let lon_etq1 = 0


  if (dat_etq.length > 0) {
    let var_bus = '<' + dat_etq.trim()
    // buasca la etiqueta con teminacion etiqueta
    pet_ini = atc(var_bus, m.par_sel, num_ele)
    pet_ini = dat_etq.length == 0 ? 1 : pet_ini
    if (pet_ini > 0 && substr(m.par_sel, pet_ini + var_bus.length, 1) == '>') {
      let lon_etq = var_bus.length + 1
      m.par_sel = allTrim(substr(m.par_sel, pet_ini + lon_etq, len(allTrim(m.par_sel)) - lon_etq - pet_ini + 1))
      var_bus = '</' + allTrim(dat_etq) + '>'
      // buasca la etiqueta con teminacion etiqueta
      pet_fin = atc(var_bus, m.par_sel, 1)
      lon_etq = len(allTrim(var_bus))
      pet_fin1 = 0
    } else {

      lon_etq = len(allTrim(var_bus))
      m.par_sel = allTrim(substr(m.par_sel, pet_ini + lon_etq, len(allTrim(m.par_sel)) - lon_etq - pet_ini + 1))
      let dat_bus = '</' + allTrim(dat_etq) + '>'
      pet_fin = atc(dat_bus, m.par_sel, 1)
      pet_fin1 = atc('/>', m.par_sel, 1)
      lon_etq = len(allTrim(dat_etq))
      lon_etq1 = 2
    } // End If 

  } // End If 
  if (pet_ini > 0) {
    pet_ini = 1
    // if 1    si encuentra la etiqueta, obtiene los datos
    if (pet_fin == 0) {
      pet_fin = pet_fin1
      lon_etq = 2
    } // End If 

    if ((pet_fin != 0 && pet_fin1 != 0) && (pet_fin > pet_fin1)) {
      pet_fin = pet_fin1
      lon_etq = 2
    } // End If 

    if (pet_fin > 0) {
      // if 2
      m.par_sel = ' ' + allTrim(substr(m.par_sel, pet_ini, pet_fin - 1))
      // obtiene etiqueta
      if (len(allTrim(dat_atr)) > 0) {
        // if 3        si hay atributo a buscar,
        let atr_bus = ' ' + allTrim(dat_atr) + '='
        //         atributo a buscar.
        let lon_tot = len(M.par_sel)
        let pos_ini = atc(atr_bus, m.par_sel, 1)
        let pos_fin = 0
        if (pos_ini > 0) {
          // if 4          si se encuentra el atributo,
          pos_ini = pos_ini + len(atr_bus) + 1
          //   obtiene la ubicacion inicial
          m.par_sel = substr(m.par_sel, pos_ini, lon_tot - pos_ini + 1)
          // corta la variable donde se busca a partir de donde s encontro el atr
          pos_fin = atc('"', m.par_sel, 1) - 1
          // obtiene la posicion final del atributo
        } // End If 

        // end 4
        dat_sal = iif(pos_fin > 0, substr(m.par_sel, 1, pos_fin), ' ')
        // obtiene el atributo buscado, en caso de no encontrarlo envia un blanco
      } else {

        // en caso de encontrar la etiqueta y no hay atributo
        if (left(m.par_sel, 1) == '>') {
          //            si en la pos. inicial de la etiqueta aparece '>', se elimina
          m.par_sel = substr(m.par_sel, 2, len(m.par_sel) - 1)
        } // End If 

        if (right(m.par_sel, 1) == '<') {
          //            si en la pos. final de la etiqueta aparece '<', se elimina
          m.par_sel = substr(m.par_sel, 1, len(m.par_sel) - 1)
        } // End If 

        dat_sal = m.par_sel
        //     se asigna a la variable de return el valor de la etiqueta
      } // End If 

      // end 3
    } else {

      dat_sal = ' '
      //   se envia un blanco en caso de no encontrar la etiqueta
    } // End If 

    // end 2
  } // End If 

  // end 1
  dat_sal = dat_sal.replaceAll("&lt;", "<")
  // remplaza token
  dat_sal = dat_sal.replaceAll("&gt;", ">")
  // remplaza token
  dat_sal = dat_sal.replaceAll("&quot;", '"')
  // remplaza token
  dat_sal = dat_sal.replaceAll("&amp;", '&')
  // remplaza token
  return allTrim(dat_sal)
  //    regresa el resultado

}   // Fin Procedure


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
