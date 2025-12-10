/// ///////////////////////////////////////////
// Clase : DataBase
// Descripcion : Conecta con un servidor backend que esta sirviendo los servicios de la base de datos
// Author : Fernando Cuadras Angulo
// Creacion : Enero/2021
// Ult.Mod  : 15/Jul/2021.- Se implementa jsStore para el manejo indexedDb donde quedara guardara los datos
//                           recuperados de la base de datos
//            23/Ags/2021 cambiamos a guardar en string los date
//            21/Marzo/2025 Se paso toda la clase de Sql a composables
/// //////////////////////////////////////////

//import { watch } from 'vue'

//import { io } from 'socket.io-client';
import { xml2js, xml2json } from 'xml-js'
import axios from "axios";
import alasql from "alasql";
import { storeToRefs } from "pinia";

//import { query } from "~/classes/queryGen/query";

/*
Se inicializa los valores de la base de datos a utilizar en el componente principal
*/
const state = reactive({
    This: {
        session: null,
        AlaSql: alasql,
        name: "VFPDB",
        are_tra: [""], // Las areas de trabajo donde cada vista tendra.
        // Inicilizamos el elemento 0 ya que el select 0 indica nueva area a utilzar
        num_are: 0, // numero de area de trabajo que se esta en este momento
        View: null, // aqui se guarda toda la informacion de las vistas SQL ( estructura, recno, recCount, exp_ind)
        Form: {}, // any = getCurrentInstance();
        //     Ctx: {}, // This.value.Form.ctx; // Contexto

        //event: any;
        newTables: [],
        oldTables: [],
        Estatus: false,
        Sql: alasql, // portea alasql a This.value.sql (no quitar)
        socket: null,
        res: [],

    }

})

// Hace publico los valores de la clase DataBase
export const thisForm = computed(() => {
    const { This } = toRefs(state) // Hace referencia al valor inicial de la clase. Esto nos permitio quitra la clase DataBase
    return This.value.Form
})

// Inicializa la conexion
export function initSql(Form: {}) {
    const { This } = toRefs(state) // Hace referencia al valor inicial de la clase. Esto nos permitio quitra la clase DataBase
    // console.log("1) initSql Views ", This.value.View);
    if (This.value.View != null) {
        for (const objeto in This.value.View) {
            // console.log("Borrando initSql Views Objeto=", objeto);
            delete This.value.View[objeto]
        }
    }
    // console.log("2) initSql Views ", This.value);

    This.value.are_tra = [""] // Las areas de trabajo donde cada vista tendra.
    This.value.num_are = 0// numero de area de trabajo que se esta en este momento
    This.value.View = [{}] // aqui se guarda toda la informacion de las vistas SQL ( estructura, recno, recCount, exp_ind)
    This.value.newTables = []
    This.value.oldTables = []
    This.value.Estatus = false
    // This.value.Sql = alasql // portea alasql a This.value.sql (no quitar)
    This.value.res = []

    This.value.Form = Form.value; // Forma principal de la aplicacion
    This.value.Estatus = true;
    This.value.session = Session(); // obtenemos la session

    // console.log("Session=", This.value.session);
    const { socketIo } = storeToRefs(This.value.session); //pasa los elementos por referencia al Global

    This.value.num_are = 0;

    /// //////////////////////////////////////
    // Revisa si ya se firmo el usuario
    /// //////////////////////////////////////

    // recupera datos de conexion

    //console.log('Db DataBase session.id ===>>>>', '', 'dilect=', dialect.value)

    // current
    // older

    alasql("DROP DATABASE IF EXISTS now ;DROP DATABASE IF EXISTS last ;");
    alasql("CREATE DATABASE last ;CREATE DATABASE now ;");
    /*   
       localAlaSql("DROP DATABASE IF EXISTS now ;");
       localAlaSql("CREATE DATABASE now ;");
       localAlaSql("DROP DATABASE IF EXISTS last ;");
       localAlaSql("CREATE DATABASE last ;");
   
   */

    This.value.Estatus = true;
    /*
    This.value.socketIo = io(This.value.session.url, {
      auth: { 
        id_con: This.value.session.id_con,
        tip_llamada: 'CHECK',
        broadcast: 'loginFail'
       },
    });
    */
    console.log("socketIo ==", socketIo.value);
    if (!socketIo.value)
        This.value.session.openSocket();

    This.value.socket = socketIo;

    This.value.Form.Sql = This.value  // portea alasql a This.value.sql
    // Porteamos todas las funciones de base datos a This.value.sql por versiones anteriores de desarrollo
    This.value.Form.Sql.useNodata = useNodata;
    This.value.Form.Sql.use = use;
    This.value.Form.Sql.requery = requery
    This.value.Form.obtRegistro = obtRegistro
    This.value.Form.Sql.tableUpdate = tableUpdate
    This.value.Form.Sql.appendBlank = appendBlank
    This.value.Form.Sql.deleteSqlRow = deleteSqlRow
    This.value.Form.Sql.deleteSql = deleteSql
    This.value.Form.Sql.insert = insert
    This.value.Form.Sql.SQLExec = SQLExec
    This.value.Form.Sql.select = select
    This.value.Form.Sql.recCount = recCount
    This.value.Form.Sql.recNo = recNo
    This.value.Form.Sql.axiosCall = axiosCall
    This.value.Form.Sql.localSql = localSql
    This.value.Form.Sql.localAlaSql = localAlaSql
    This.value.Form.Sql.readCampo = readCampo
    This.value.Form.Sql.updateCampo = updateCampo
    This.value.Form.Sql.goto = goto
    This.value.Form.Sql.bof = bof
    This.value.Form.Sql.eof = eof
    This.value.Form.Sql.skip = skip
    This.value.Form.Sql.scatter = scatter
    This.value.Form.Sql.localClone = localClone
    This.value.Form.Sql.jasperReport = jasperReport
    This.value.Form.Sql.View = View
    This.value.Form.Sql.genTabla = genTabla
    This.value.Form.db = This.value.Form.Sql  // Porteo viejo a db
    return
} // Fin constructor

export const View = async () => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    return This.value.View
}

/**
 * Release the specified SQL view alias, and delete the corresponding table
 * from both the "now" and "last" databases.
 * 
 * @param alias - (Optional) The alias name of the view to be released.
 *                If not provided, the current working area alias is used.
 * 
 * @returns true if the view was successfully released, otherwise false.
 * 
 * Note: This function does not delete the view definition, it only deletes the
 * table associated with the view from both the "now" and "last" databases.
 */
export const releaseUse = async (alias?: string) => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias)       // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo

    if (This.value.View[alias]) {
        // localAlaSql('USE last ; ')
        await localAlaSql("delete from last." + alias);
        await localAlaSql("delete from now." + alias);

        delete This.value.View[alias]
        return true;
    }

}

/**
 * Locates the first record in a local SQL table matching the specified condition.
 * 
 * @param where - The SQL condition to locate the record.
 * @param alias - (Optional) The alias name of the view to be used. If not provided, the current working area alias is used.
 * 
 * @returns The first record matching the condition if found, otherwise returns false.
 * 
 * Updates the `found` property of the view to indicate whether a record was found.
 */

export const locateFor = async (where: string, alias?: string) => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias)       // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo

    const records = await localAlaSql(`SELECT * FROM now.${alias} WHERE ${where} order by recno;`)


    if (records && records.length > 0) {
        This.value.View[alias].recno = records[0].recno
        This.value.View[alias].data = records[0];

        return records
    }
    This.value.View[alias].recno = 0

    return records

}

/// /////////////  Vfp Use nodata ///////////////////
// nom_vis : Nombre de la vista a utilizar
/// /////////////////////////////////////////////////

export const useNodata = async (nom_vis: string, alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    nom_vis = nom_vis.trim();
    while (!This.value.Estatus) {
        console.log("Db esperando cambio de estatus");
    }

    if (nom_vis == null) {
        errorAlert("No se permite nombre de vista en null");
        return false;
    }
    if (!alias) {
        // Si no hay alias asigna el mismo nombre de la vista
        alias = nom_vis;
    }

    alias = alias.trim();

    // console.log("1) Db useNodata nom_vis==> ", nom_vis, alias);

    if (This.value.View[alias]) {
        // si exite ya la vista, solo borra los datos locales
        // console.log('Db useNodata View ',alias,This.value.View)
        // localAlaSql('USE now ; ')

        // Inicializamos el alias
        while (This.value.View[alias].recnoVal.length > 0) {
            This.value.View[alias].recnoVal.pop();
        }

        try {

            await localAlaSql("delete from last." + alias);
            await localAlaSql("delete from now." + alias);
            // localAlaSql('USE last ; ')

        } catch (error) {
            // console.log("Db useNodata error", error);
        }

        if (nom_vis == alias) {

            This.value.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
            This.value.View[alias].data = {}; // asignamos el valor del ultimo registro
            This.value.View[alias].recCount = 0; // Total de registros de la vista
            This.value.View[alias].recno = 0; // Registro en cero
            This.value.View[alias].eof = false; // Fin de archivo
            This.value.View[alias].bof = false; // Principio de archivo
            This.value.View[alias].row = -1; // Renglon posicionado el registro
            This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek


            // console.log("Db useNodata alias", alias, This.value.View);

            return true;
        }
        delete This.value.View[alias] // borramos la vista
        try {

            await alasql("drop table IF EXISTS last." + alias + " ;");
            await alasql("drop table IF EXISTS now." + alias + " ;");

        } catch (error) {
            // console.log("Db useNodata error", error);
        }
    }

    // La vista esta definida en forma reactiva desde la forma principal y es donde estan los
    // valores de los componentes, por lo que aqui aparece en el contexto de la forma
    // Por el momento se quita y se graba en localDb
    // const vis_act = ThisForm.ctx[alias];



    const dat_vis = {
        id_con: "",
        tip_llamada: "USENODATA",
        // tok_aut: This.value.tok_aut,
        nom_vis: "",
    };
    dat_vis.nom_vis = nom_vis; // Nombre de la vista

    // console.log("2) Db useNodata nom_vis==> ", nom_vis, alias, dat_vis);

    //   console.log("Db useNodata VIEW==> ", nom_vis, alias, dat_vis);
    try {
        //     console.log("2).1 Db useNodata nom_vis==> ");
        const response: any = await axiosCall(dat_vis);
        //    console.log("2).2 Db useNodata nom_vis==> ");



        if (response == null) {
            console.error("==== . No existe la tabla===>", alias);
            return false;
        }

        if ((await genera_tabla(response, alias, true)) == null)
            // generamos la tabla segun la estructura regresada
            return false;
        //  console.log("2).3 Db useNodata nom_vis==> ");
        // abre  la tabla de mantenimiento
        //console.log( "Db useNodata VIEW despues de generar_tabla==> ", alias,"response=", response        );
        if (This.value.View[alias] && This.value.View[alias].tip_obj.trim() == "VIEW") {

            alias = This.value.View[alias].tablaSql.trim();
            //  console.log("3) Db useNodata alias==> ", alias);
            if (alias.trim() > '  ') { // si es de lectura no inicializa la tabla de actualizacion
                await useNodata(alias);

            }
        }
        //  This.value.View[alias] = response; // Generamos la vista, asignamos su estructura  y filtros de condiciones

        return true;


    } catch (error) {
        console.error(error);

        return false;
        //  This.value.errorSql(error)
    }
};

/// /////////////  Vfp USE /////////////////////
// nom_vis  : Nombre de la vista a utilizar
// m        :  Varibles de memoria a pasar
// alias    : Alias
/// ////////////////////////////////////////////
//  use = async (obj_vis:any, nom_vis:any , m: {}, alias?:any) => {
export const use = async (
    nom_vis: string,
    m?: {},
    alias?: string,
    order?: string) => {


    const { This } = toRefs(state) // Hace referencia al valor inicial

    while (!This.value.Estatus) {
        console.log("Db esperando cambio de estatus");
    }

    nom_vis = nom_vis.trim();
    if (!m) {
        m = {};
    }

    if (!alias) {
        alias = nom_vis; // asignamos el nombre de la vista
    }
    alias = alias.trim();
    //  if (alias == 'vi_cap_cometab')
    //      console.log("1 Db USE ", alias);



    if (This.value.View[alias]) {

        // si exite ya la vista, Borra los datos locales

        //  if (alias == nom_vis) {

        await alasql('use last')
        if (alasql.tables[alias])
            await localAlaSql("delete from last." + alias);

        await alasql('use now')
        if (alasql.tables[alias])
            await localAlaSql("delete from now." + alias);

        // Inicializamos el alias
        while (This.value.View[alias].recnoVal.length > 0)
            This.value.View[alias].recnoVal.pop();

        while (This.value.View[alias].data.length > 0)
            This.value.View[alias].data.pop();

        // This.value.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
        This.value.View[alias].data = {}; // asignamos el valor del ultimo registro
        This.value.View[alias].recCount = 0; // Total de registros de la vista
        This.value.View[alias].recno = 0; // Registro en cero
        This.value.View[alias].eof = false; // Fin de archivo
        This.value.View[alias].bof = false; // Principio de archivo
        This.value.View[alias].row = -1; // Renglon posicionado el registro
        This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek
        This.value.View[alias].m = m    // m 

    }

    if (!This.value.View[alias] || (await select(alias)) == 0) {

        console.log("use-> Db Use UseNodata", nom_vis, alias);

        await useNodata(nom_vis, alias);
    }

    const dat_vis = {
        id_con: "",
        tip_llamada: "USE",
        // tok_aut: This.value.tok_aut,
        nom_vis,
        where: "",
        query: "",
    };

    // la expresion del indice es generada desde el servidor de node y es formada
    // por un objeto json el cual utiliza los model del sequelize

    let exp_ind = "";
    let exp_whe = "";

    if (!This.value.View[alias].tip_obj) {
        console.error("DataBase class .-No existe el tip_obj para el alias " + alias, This.value.View[alias]);

        await MessageBox('DataBase class .-No existe el tip_obj para el alias ' + alias, 16, 'Front End Error')
        return false

    }

    if (This.value.View[alias].tip_obj.trim() == "VIEW") {
        // si es una VIEW
        // console.log('Db USE This.value.View VIEW', This.value.View[alias], dat_vis)
        // cambiar el * por los campos de la View en minusculas

        dat_vis.query = "select * from " + nom_vis;
        dat_vis.tip_llamada = "SQLEXEC";
        // Aqui voy

        if (This.value.View[alias].exp_indice.trim().length > 0) {
            try {
                exp_ind = eval(This.value.View[alias].exp_indice.trim());
            } catch (error) {
                console.error(
                    error,
                    "USE " + alias + " exp_ind=",
                    This.value.View[alias].exp_indice.trim()
                );

                return false;
            }
            //  console.log("2 Db USE " + alias + "m=", m, " View =", This.value.View[alias]);
            if (exp_ind == undefined) {
                errorAlert(
                    "No se pudo evaluar el indice de la tabla=" +
                    alias +
                    " indice=" +
                    This.value.View[alias].exp_indice
                );
                return false;
            }
        }
        if (This.value.View[alias].exp_where != 'null' && This.value.View[alias].exp_where.trim().length > 0) {
            // console.log("Db dataBase exp_where", This.value.View[alias].exp_where);

            const val_eval = "`" + This.value.View[alias].exp_where.trim() + "`";


            try {
                exp_whe = eval(val_eval);
                //console.log("Db use eval where ", val_eval, m, 'exp_whe=', exp_whe);
            } catch (error) {
                console.error("eval =", val_eval, error);
                return false;
            }

            if (exp_whe == undefined) {
                errorAlert(
                    "No se pudo evaluar el la expresion where de la tabla=" +
                    alias +
                    " indice=" +
                    This.value.View[alias].exp_where
                );
                return false;
            }

            // exp_whe = eval(This.value.View[alias].exp_where.trim())     //  `${a}`
        }
        if (exp_ind.length + exp_whe.length > 0) {
            dat_vis.query = dat_vis.query + " where ";

            if (exp_ind.length > 0 && exp_whe.length > 0) {
                dat_vis.query = dat_vis.query + exp_ind + " and " + exp_whe;
            }

            if (exp_ind.length > 0 && exp_whe.length == 0) {
                dat_vis.query = dat_vis.query + exp_ind;
            }

            if (exp_ind.length == 0 && exp_whe.length > 0) {
                dat_vis.query = dat_vis.query + exp_whe;
            }
        }
        // Si hay orden de la vista
        if (This.value.View[alias].order.trim().length > 0) {
            dat_vis.query = dat_vis.query + " order by " + This.value.View[alias].order;
        }
    } else {
        // es un MODEL{
        //      const val_eval = "`"+This.value.View[alias].exp_indice+"`"
        //console.log( "3 Db USE This.value.View MODEL eval exp_indice", This.value.View[alias],dat_vis );

        const val_eval = This.value.View[alias].exp_indice;

        try {
            eval("dat_vis.where=" + val_eval);
        } catch (error) {
            console.error(error);

            return false;
        }

        //c onsole.log( "Db USE eval dat_vis ===>",val_eval,"dat_vis.where=",dat_vis.where );

        // eval("dat_vis.where=`" + This.value.View[alias].exp_indice+"`") // obtenemos la expresion del indice
    }

    //console.log('Db  use dat_vis========>', dat_vis)

    try {
        console.log("1 Db Use Axios =====>", dat_vis); // .data
        // This.value.View[alias].m = m; // Variables m para hacer requery
        const data = await axiosCall(dat_vis);

        //console.log("5 Db Use Axios Ok response =====>", dat_vis, data); // .data

        if (data.length) {
            // No hubo error
            const response = await genera_tabla(data, alias)
            console.log("4 Db Use Axios data=", data, "=====>response=", response); // .data
            return response;
        }
        else return []; //   { return [] }
    } catch (error) {
        console.error("Axios error :", dat_vis, error);

        errorAlert(
            "SQL Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        return false;
    }
};


/////////////  Hace un requery de una vista /////////////////////
// nom_vis  : Nombre de la vista a utilizar
////////////////////////////////////////////
export const requery = async (alias?: string, currentRow?: boolean) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias)       // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo

    const m = await goto(0, alias)

    if (currentRow) {

        const resultado = await SQLExec(`select * from ${alias} where key_pri=${m.key_pri}`)
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                for (const field in resultado[i]) {
                    const alias_field = `${alias}.${field}`
                    await updateCampo(resultado[0][field], alias_field, m.recno, true)
                }
            }
        }
        return resultado
    }

    console.log('1) requery alias=', alias, 'm=', m)
    console.log('2) requery vcomesal', await localAlaSql(`select * from vcomesal`))



    const resultado = await use(alias, m)
    console.log('3) requery vcomesal, await localAlaSql(`select * from vcomesal`)', await localAlaSql(`select * from vcomesal`))

    return resultado
}
/////////////  Deshace los cambios no actualizados de la tabla /////////////////////
// alias  : Nombre de la vista a utilizar
////////////////////////////////////////////
export const tableRevert = async (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias)       // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo

    const recno = This.value.View[alias].recno
    await localAlaSql('delete from now.' + alias + ' where recno=' + recno + ' ;insert into now.' + alias + ' select * from last.' + alias + ' where recno=' + recno + ' ;')
    return
}


/////////////////////////////////////////////////
// alias  : Regrtesa el nombre del alias actual
////////////////////////////////////////////
export const alias = (): string => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    return This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
}

/// /////////////  Vfp obten un registro  /////////////////////
// nom_vis  : Nombre de la vista a utilizar
// key_pri  :  Key_pri
/// ////////////////////////////////////////////
// aqui me quede . revisar todo esto, puede que la tabla tenga varios alias

export const obtRegistro = async (nom_tab: "", key_pri: number) => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    const dat_vis = {
        id_con: "",
        tip_llamada: "USE",
        // tok_aut: This.value.tok_aut,
        nom_vis: nom_tab,
        where: { key_pri },
    };
    console.log('obtenRegistro', dat_vis)
    const response = await axiosCall(dat_vis);
    if (response == null) return;

    if (response.length > 0) {
        // console.log('Db Obten Registro===>', respuesta)
        return response[0]; // response.data;
    }
    return [];
};

/// /////////////  Vfp table update /////////////////////
// updateType : =0 Solo el registro actual
//              =1 Todos los registros de la vista hasta encontrar un error de actualizacion. Si TableUpdate encuentra un registro que no
//                 puede ser actualizado, fallará en ese punto y retornará un valor de .F., indicando que ha fallado. Ningún registro más allá del que tiene el problema será procesado.
//              =2 Todos los registros de la vista. Si encuentra un error de actualizacion,
//                  forzara la actualizacion con los datos propios.
// Force : True forzará nuestra actualización y sobrescribirá los cambios realizados por el otro usuario
//         False no realizará la actualización si otro usuario ha hecho modificaciones al mismo registro.
// alias  : Nombre de la vista a utilizar
// tab_man : Tabla de mantenimiento (model en sequelize en NodeServer)
/// ////////////////////////////////////////////
export const tableUpdate = async (
    updateType?: number,
    force?: boolean,
    alias?: string,
    tab_man?: string): Promise<boolean> => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!updateType) {
        updateType = 0;
    }

    if (!alias) {
        // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }
    if (alias == "") {
        return true;
    } // no hay alias a actualizar
    //console.log('Db tableUpdate View',alias, This.value.View[alias])

    if (!tab_man) {
        // asigna vista de mantenimiento de la vistas
        if (This.value.View[alias].tip_obj.trim() == "VIEW")
            tab_man = This.value.View[alias].tablaSql.trim();
        else tab_man = alias;
    }

    var sw_val = true;
    const nom_tab: string = This.value.View[alias].tablaSql.trim(); // obtenemos el nombre model (sequelize) de la vista de mantenimento

    if (nom_tab.length < 2) {
        console.warn(
            "No hay nombre de tabla de actualizacion para la vista",
            alias
        );
        errorAlert(
            "ERROR :No hay nombre de tabla de actualizacion para la vista " + alias
        );
        return false;
    }

    var recno = This.value.View[alias].recno; // obtenemos el recno a actualizar
    const recCount = This.value.View[alias].recCount; // obtenemos el recCount de la vista

    if (recCount == 0) {
        // la vista no tiene registros a actualizar
        console.warn("No hay registros en este alias", alias);
        return false;
    }
    // select para localDb
    const select = {
        from: alias,
        order: {
            by: "recno",
            type: "asc",
        },
        where: {}
    };
    let where = ""; // where alasql
    let where_del = " where Viejo.key_pri>0 ";
    let sw_delete = false;
    if (updateType == 0) {
        // solo un registro
        // Solo actualiza un registro
        if (!recno) {
            // No hay registro a actualizar
            errorAlert("ERROR :No hay recno en " + alias);
            return;
        }
        select.where = { recno };
        where = `WHERE recno=${recno}`;
        where_del = ` WHERE Viejo.recno=${recno} and Viejo.key_pri>0`;
    }

    // lee los datos originales haciendo un LEFT OUTER a los datos nuevos
    const data = await localAlaSql(` 
       Select Viejo.key_pri,Viejo.recno recnoOld, Nuevo.recno as recnoNew from last.${alias} Viejo \
       LEFT OUTER JOIN now.${alias} Nuevo using recno ${where_del}`);

    // recorre registro por registro para buscar renglones borrados
    for (let row = 0; row < data.length; row++) {
        // Si no existe el recno New borra de la base de datos
        if (
            data[row].recnoNew == null ||
            data[row].recnoNew != data[row].recnoOld
        ) {
            const key_pri = data[row].key_pri;
            // console.log('Db deleteSqlRow ===', key_pri, alias)
            await deleteSqlRow(key_pri, alias);
            sw_delete = true;
        }
    }


    // obtenemos los datos a actualizar
    const dat_act = await localAlaSql(
        `SELECT * FROM now.${alias} ${where}`
    );
    console.log('Datos a actualizar', dat_act)
    //console.log('Db DataBase definicion '+tab_man,This.value.View[tab_man].val_def)
    const val_def = This.value.View[tab_man].val_def; // estructura de campos

    // llamado AXIOS
    const dat_vis: any = {
        id_con: "",
        tip_llamada: "",
        nom_tab,
        dat_act: {},
    };

    // Recorremos todos los datos a actualizar
    let sw_insert = false;

    for (const row in dat_act) {
        dat_vis.dat_act = {};
        const m = {}; // valiables en memoria
        dat_vis.dat_act.key_pri = dat_act[row].key_pri;

        // si no es tabla de actualizacion del diccionario de datos
        if (tab_man != 'lla1_vis' && tab_man != 'lla1_dat' && tab_man != 'lla1_ind' && tab_man != 'lla1_tab')
            dat_vis.dat_act.timestamp = dat_act[row].timestamp;

        recno = dat_act[row].recno;

        dat_vis.tip_llamada = "INSERT";
        let sw_update = false;

        // recorre los registros de la vista a actualizar
        // asignamos key_pri y timestamp del registro
        let old_dat = [];
        // Es una actualizacion dedatos, asigna key_pri y timestamp
        //console.log('Db tableUpdate dat_act[row]', dat_act[row])

        if (dat_act[row].key_pri > 0) {
            // dat_vis.dat_act.key_pri = dat_act[row].key_pri;

            // dat_vis.dat_act.timestamp = dat_act[row].timestamp;

            dat_vis.tip_llamada = "UPDATE";

            // Leemos los datos viejos
            const ins_sql = `SELECT * FROM last.${alias}  WHERE recno=${recno} ;`;
            const datos = await localAlaSql(ins_sql);

            if (datos.length > 0) {
                old_dat = datos[0];
                //console.log('tableupdate old=',old_dat)
            } else {
                console.error(
                    "tableUpdate error recno ",
                    row,
                    recno,
                    await localAlaSql(` SELECT * FROM last.${alias}; 'USE now;'`)
                );
                alasql('USE now;')
                return false;
            }
        }

        /*
              console.log(
                "1 DataBase tableUpdate() vista de mantenimiento=",
                tab_man,
                This.value.View[tab_man],
                "Row=",
                row,
                "dat_act=",
                dat_act[row]
              );
        */
        // Recorremos todos los campos para ver cual cambio para mandarlo actualizar campo.old != campo.new

        //  console.log('Db tableUpdate View tab_man=', This.value.View[alias])


        for (const campo in This.value.View[tab_man].val_def) {
            // for (const campo in dat_act[row]) {
            /*
               if (campo.trim() == 'json_tap')
                   console.log('1) Db tableUpdate', typeof dat_act[row][campo], 'campo=', campo, 'Old=', old_dat[campo], 'New=', dat_act[row][campo])
                */

            if (dat_act[row][campo] == null)
                dat_act[row][campo] = "";

            if (typeof dat_act[row][campo] == "string") {
                dat_act[row][campo] = dat_act[row][campo].trim();
                if (old_dat[campo] == null || old_dat[campo] === '')
                    old_dat[campo] = "";
                else
                    old_dat[campo] = old_dat[campo]   //.trim();
            }

            //        console.log('Db tableUpdate campo=', campo,'Old=', old_dat[campo],'New=',dat_act[row][campo] )

            // Si el campo nuevo o es diferente al viejo, aumentamos en los datos a actualizar
            //    console.log('tab_man', tab_man, 'Campo=', campo, This.value.View[tab_man].est_tabla[campo])

            //       console.log("UPDATE campo=", campo, ' valor=', dat_act[row][campo]);


            const nom_campo = campo.toLowerCase();
            if (
                This.value.View[tab_man].est_tabla[campo] &&
                nom_campo != "recno" &&
                nom_campo != "tie_cre" &&
                nom_campo != "tie_uac" &&
                nom_campo != "usu_usu" &&
                nom_campo != "usu_cre" &&
                //          nom_campo != "key_pri" &&
                nom_campo != "timestamp" &&
                (dat_vis.tip_llamada == "INSERT" || old_dat[campo] == null ||
                    old_dat[campo] !== dat_act[row][campo] || (
                        typeof dat_act[row][campo] == "string" &&
                        dat_act[row][campo].trim().length != old_dat[campo].trim().length
                    ))
            ) {

                const tipo = This.value.View[tab_man].est_tabla[campo].tip_cam.toLowerCase();

                // console.log("UPDATE fecha campo=", campo, ' tipo=', tipo, ' valor=', dat_act[row][campo]);

                switch (true) {
                    // switch (typeof dat_act[row][campo]) {
                    case tipo == "number" ||
                        tipo == "interger" ||
                        tipo == "smallint" ||
                        tipo == "tinyint" ||
                        tipo == "bigint":
                        m[campo] = +dat_act[row][campo];
                        break;
                    case tipo == "boolean" || tipo == "logical":
                        m[campo] = +dat_act[row][campo];
                        break;

                    case tipo == "date" || tipo == "time":

                        let valor = dat_act[row][campo].trim();

                        const formato = "T00:00:00"; //.000Z"

                        const long = 19 - valor.length;
                        if (long > 0) valor = valor + formato.slice(-long);
                        else valor = valor.slice(0, 19);

                        valor = valor + ".000Z";

                        //              valor = valor.slice(0, 24);

                        m[campo] = valor;
                        //   console.log("UPDATE fecha=", m[campo]);

                        break;
                    //   2024-01-15T10:22:7

                    default:
                        //            m[campo] = "'" + dat_act[row][campo] + "'"

                        // se tiene que validar como string y null ya que asi viene desde alaSQL
                        try {
                            if (typeof dat_act[row][campo] == "object")
                                dat_act[row][campo] = '"' + dat_act[row][campo] + '"';

                            if (dat_act[row][campo] != null) {
                                m[campo] =
                                    typeof dat_act[row][campo] == "string"
                                        ? dat_act[row][campo].trim()
                                        : dat_act[row][campo];
                            } else m[campo] = "";
                        } catch (error) {
                            console.error(
                                error,
                                "campo=",
                                campo,
                                "Valor=",
                                dat_act[row][campo]
                            );
                            return false;
                        }
                    //console.log('Db tableUpdate campo=', campo, 'm=', m[campo], 'dat_act', dat_act[row][campo], 'typeof=', typeof dat_act[row][campo])
                }
                //console.log( "Db tableUpdate lee datos now", "val_def=",val_def);

                //  Busca en la estructura de la tabla de mantenimiento si es campo actualizable
                if (val_def[campo]) {
                    dat_vis.dat_act[campo] = m[campo]; // dat_act[row][campo];
                    /*
                    console.log(
                      "tableUpdate Actualiza CAMPO=",
                      campo,
                      "Valor=",
                      dat_vis.dat_act[campo],
                      " Old value=",
                      old_dat[campo]
                    );
                    */
                    //console.log('Db  tableUpdate campo  actual ==========>', nom_campo, dat_act[row][campo])
                    sw_update = true;
                }
            }
        } // fin For dat_act

        // generamos el where para obtener los datos despues de insertar
        dat_vis.where = "";
        if (sw_update && dat_vis.tip_llamada == "INSERT") {
            // const where = eval(This.value.View[nom_tab].exp_indice)
            // Aqui me quede  Ojo Junio 2023
            const where = This.value.View[nom_tab].exp_indice.toLowerCase();
            // console.log("Db tableUpdate exp_indice m", m, "where", where, "dat_vis.where", dat_vis.where );
            try {
                eval(`dat_vis.where=${where}`);
            } catch (error) {
                console.error(error);

                return false;
            }
            //console.log("Db tableUpdate dat_vis.where", dat_vis.where);

            // dat_vis.where =exp_ind    //eval(This.value.View[nom_tab].exp_indice)
        }

        // This.value.View[alias].recCount = +row; // actualiza el recCount de la vista
        // const recno = dat_act[row].recno;

        // Tratara 2 veces en caso de que haya un force
        for (let num_int = 0; num_int < 2 && sw_update; num_int++) {
            // tratara 3 veces de actualiar el dato
            console.log("Db TableUpdate dat_vis", dat_vis, 'Intentos =', num_int);
            // llama el backEnd a grabar los datos
            const response = await axiosCall(dat_vis);

            if (response && response.key_pri && response.key_pri > 0) {
                // No hay error
                /*          const ins_sql = ' UPDATE now.' + alias + ` SET timestamp=${response.timestamp}',key_pri=${response.key_pri} WHERE recno=${dat_act[0].recno}; ` +
                            ' USE last ; DELETE from last.' + alias + ` WHERE recno=${dat_act[0].recno}  ;` +
                            ' INSERT INTO last.' + alias + ' SELECT * FROM now.' + alias + ` WHERE recno=${dat_act[0].recno} ;`
                */
                const ins_sql =
                    " UPDATE now." +
                    alias +
                    ` SET timestamp=?,key_pri=? WHERE recno=${recno}; ` +
                    " USE last ; DELETE from last." +
                    alias +
                    ` WHERE recno=${recno}  ;` +
                    " INSERT INTO last." +
                    alias +
                    " SELECT * FROM now." +
                    alias +
                    ` WHERE recno=${recno} ;`;

                //            console.log('1 Db tableUpdate ala Ok INSERT UPDATE =>', await localAlaSql(`select timestamp from ${alias} where recno=${dat_act[0].recno} ` ))

                await localAlaSql(ins_sql, [
                    response.timestamp,
                    response.key_pri,
                ]);

                if (dat_vis.tip_llamada == "INSERT") {
                    sw_insert = true;
                }

                num_int = 2; // se sale del for
            } else {
                // hay error, obtiene los datos nuevos que tiene el registro y vuelve a grabar
                console.error(
                    "No se pudo actualizar el registro en tabla " + alias,
                    dat_vis, 'LocalSQL', await localAlaSql(`select * from now.${alias} `)
                );
                /*
                errorAlert(
                    "SQL Error: No se pudo actualizar el registro en tabla " +
                    alias +
                    dat_vis
                );
                */
                sw_val = false;
                if (dat_act[row].key_pri > 0) {
                    const key_pri = dat_act[row].key_pri
                    // si es un dato existennte
                    console.log('tableUpdate ', nom_tab, key_pri)
                    await requery(alias, true) // obtenemos los datos desde el sql server
                    const respuesta = await goto(0, alias) // se trae de nuevo los datos
                    /*
                                        const respuesta = await obtRegistro(
                                            nom_tab,
                                            dat_act[row].key_pri
                                        ); 
                    */
                    // borramos registro local
                    if (respuesta.length > 0 && force) {
                        // Actualiza el valor de timestamp para tratar de grabar de nuevo
                        dat_vis.dat_act[row].timestamp = respuesta.timestamp;
                    } else {
                        force = false
                        /*
                              await localAlaSql(`DELETE FROM now.${alias} WHERE recno=${dat_act[row].recno} `)
                              await localAlaSql(`DELETE FROM last.${alias} WHERE recno=${dat_act[row].recno} `)
                              if (respuesta.length > 0 && respuesta.key_pri) {
                                  respuesta.recno = dat_act[row].recno;
                                  await localAlaSql(`INSERT INTO now.${alias} VALUES ?`, [respuesta]);
                                  await localAlaSql(`INSERT INTO last.${alias} VALUES ?`, [respuesta]);
                              } // fin else
                        */
                    }


                } // Fin si es un dato existente
                if (updateType < 2) {
                    num_int = 2;
                    // no sigue la actualizacion
                }
            } // fin error
        } // fin for num_int
    } //  Fin del for de graba registro por registro

    // actualiza alasql en el caso de un tableupdate all
    /*
    if (sw_update && updateType > 0) {
      //console.log('Db tableUpdate genera_tabla', dat_act)
      await genera_tabla(dat_act, alias)
      //console.log('Db tableUpdate genera_tabla now,last', await localAlaSql('select * from now.' + alias)
      //  , await localAlaSql('select * from now.' + alias))
 
    }
    */
    // Regenera recnoVal en caso de insercion de datos y solo sea un registro
    alasql('USE now;')
    return sw_val;
}; //


/// /////////////  Vfp append blank /////////////////////
// nom_vis  : Nombre de la vista a utilizar
/// ////////////////////////////////////////////
export const appendBlank = async (alias?: string, m?: {}) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    const ThisForm = This.value.Form;

    //console.log("3) Db appendBlank alias=", alias, 'm', m);

    if (!alias) {
        // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
        errorAlert("SQL Error : No existe la vista SQL " + alias);
    }

    m = !m ? Public.value : m
    console.log('appendBlank m=', m)

    let recno = 0;
    // Obtenemos el valor del siguiente recno
    const res = await localAlaSql(
        "USE now; select max(recno)+1 as recno from " + alias
    );

    if (res[1] && res[1][0].recno > 0) {
        // si hay registro
        recno = res[1][0].recno;
    } else {
        recno = 1;
    } // Si es el primer registro
    // Obtiene valores default para insertar

    const valores = {
        recno,
        timestamp: null,
        tie_cre: "",
        tie_uac: "",
        usu_cre: "",
        usu_usu: "",
        key_pri: 0,
    };
    const vis_act = This.value.View[alias].tablaSql.trim();

    for (const campo in This.value.View[vis_act].val_def) {
        // const val_eval="`"+This.value.View[alias].val_def[valor]+"`"
        if (
            campo != "timestamp" &&
            campo != "tie_cre" &&
            campo != "tie_uac" &&
            campo != "usu_cre" &&
            campo != "usu_usu" &&
            campo != "key_pri"
        ) {
            let val_eval = This.value.View[vis_act].val_def[campo];

            let val_defa = null;
            try {
                val_eval = val_eval.replaceAll(String.fromCharCode(13), ' ')
                val_eval = val_eval.replaceAll(String.fromCharCode(10), ' ')
                val_eval = val_eval.replaceAll('this.Form', 'ThisForm')

                val_defa = eval(val_eval);
            } catch (error) {
                errorAlert(
                    " appendBlank can't eval(" +
                    val_eval +
                    ") campo=" +
                    campo +
                    " alias=" +
                    alias +
                    " Error=" +
                    error
                );

                console.error(
                    " appendBlank can't eval(" +
                    val_eval +
                    ") campo=" +
                    campo +
                    " alias=" +
                    alias +
                    " Error=" +
                    error
                );

                return false;
            }
            valores[campo] = val_defa;
        }
    }
    /*
    if (!valores.timestamp) {
      if (This.value.dialect == 'postgres')
        valores.timestamp = 0
      else
        valores.timestamp = null
    }
    */

    // const val_defa = eval(This.value.View[alias].val_def)
    console.log("Db DataBAse appendBlank alias ", alias, valores);
    try {
        await localAlaSql(
            "USE now; INSERT INTO now." + alias + " VALUES ?",
            [valores]
        );
        await localAlaSql(
            "USE last;INSERT INTO last." +
            alias +
            " SELECT * FROM now." +
            alias +
            " WHERE recno=?",
            recno
        );
    } catch (error) {

        console.warn("alasql error", error);
    }

    const ult_ele = This.value.View[alias].recnoVal.length - 1;

    let id = 0;
    if (ult_ele >= 0) {
        id = This.value.View[alias].recnoVal[ult_ele].id + 1;
    }

    This.value.View[alias].recno = recno;
    This.value.View[alias].recnoVal.push({ recno, id }); // insertamos en el arreglo para llenar el grid
    if (!This.value.View[alias].recCount)
        This.value.View[alias].recCount = 1;
    else
        This.value.View[alias].recCount = This.value.View[alias].recCount + 1;
    This.value.View[alias].row = This.value.View[alias].recnoVal.length - 1; // asignamos nuevo row
    valores.recno = recno;
    //console.log( "Db DataBAse Insert now  alaSql=====>",        alias,        await localAlaSql(`select * from  last.${alias} `)    );
    alasql('USE now;')
    return valores;

    /* locaDb
    await This.value.insertLocalDb(alias, valores); // Insertamos los valores blancos en LocalDb
    */
};

/// ///////////// delete Sql Sever /////////////////////
// alias  : Nombre de la vista a utilizar
// row : Renglon donde se encuentra el registro a borrar
/// ////////////////////////////////////////////
export const deleteSqlRow = async (recno?: number, alias?: any,) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias) {
        // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
        errorAlert("SQL Server Error :no SQL view exists " + alias);

        //      MessageBox("No existe la vista SQL " + alias, 16, "SQL Error");
        return false;
    }

    if (!recno) {
        const res = await goto(0, alias)
        recno = res.recno
    }

    console.log("Db deleteSqlRow ", recno, alias);

    if (recno <= 0) {  // no hay registro activo
        return;
    }

    //console.log('deleteSqlRow localAlasql=', await localAlaSql(`select * from now.${alias} `))

    const res = await localAlaSql(`select key_pri from now.${alias}  where recno=${recno}`)
    //console.log('deleteSqlRow res=', res)


    if (res && res[0].key_pri > 0) {

        const key_pri = res[0].key_pri;


        const dat_vis = {
            id_con: "",
            tip_llamada: "DELETE",
            // tok_aut: This.value.tok_aut,
            nom_vis: This.value.View[alias].tablaSql.trim(), // tabla en servidor SQL
            where: {},
        };

        const condicion = {}; // Generamos la condicion
        dat_vis.where = { key_pri }; // obtenemos el key_pri a borrar
        try {

            const response = await axiosCall(dat_vis);
            if (!response || response == null) {
                if (response == null)
                    MessageBox("", 16, "DELETE SQL Server Error");
                return false;
            }
            // console.log('Db deleteSqlRow SQLServer Rgistro borrado dat_vis=', dat_vis, 'Respuesta=', response)

            const respuesta = response.data;
        } catch (error) {

            errorAlert("DELETE SQL Server Error :" +
                error.response.status.toString() +
                " " +
                error.response.statusText);

            console.error("DELETE SQL Server Error", error);
            return false;
        }

    }

    //  borra el LolcaDb


    // Check if the table exists
    console.log('Ala Databse=', alasql.databases)
    if (alasql.databases.last.tables[alias]) {
        console.log(`Table last.${alias} exists.`);
        await localAlaSql(` delete from last.${alias} where recno=${recno}`);
    } else {
        console.log(`Table last.${alias} does not exist.`);
    }

    await localAlaSql(` delete from now.${alias} where recno=${recno}`);
    alasql('USE now;')

    //  borra en el arreglo
    for (let i = 0; i < This.value.View[alias].recnoVal.length; i++) {
        if (This.value.View[alias].recnoVal[i].recno == recno) {
            This.value.View[alias].recnoVal.splice(i, 1);
        }
    }


    // console.log('Db deleteSqlRow last ===>', key_pri, recno, await localAlaSql('USE last;\
    // select key_pri,recno from '+ alias) )

    //  borra en el arreglo de recno
    // delete This.value.View[alias].recnoVal[row];
    return true;
};

/// /////////////  deleteSqlRow local SQL /////////////////////
// alias  : Nombre de la vista a utilizar
// row : Renglon donde se encuentra el registro a borrar
// SqlUpodate : Actualizacion inmediata en SQLSERVER
/// ////////////////////////////////////////////
export const deleteSql = async (recno?: number, alias?: string, SqlUpdate?: boolean) => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!SqlUpdate) {
        SqlUpdate = false;
    }

    if (!alias) {
        // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
        errorAlert("SQL Server Error :no SQL view exists :" + alias);

        return false;
    }

    if (!recno) {
        recno = This.value.View[alias].recnoVal[This.value.View[alias].row].recno;
    }

    if (recno <= 0) {
        return null;
    } // no hay row por borrar


    console.log("Db  delete from now." + alias + ` where recno=${recno}`);

    // Actualizacion inmediata en SQLSERVER
    if (SqlUpdate) {
        /* 28/ags/2025
        const data = await localAlaSql(
            "USE last;\
    select key_pri from last." +
            alias +
            " where recno=?",
            recno
        );
        const key_pri = data[1][0].key_pri;
         26/Dic/2024 el deleteSqlRow se encarga de borrar en SQLSERVER y localSql
        await localAlaSql(
          " delete from now." + alias + " where recno=?",
          recno
        );
        */

        // utiliza la tabla de actualizacionde SQL
        // console.log('Db delete alias DeleteSqlRow',key_pri, alias)
        //if (key_pri > 0) {
        // si existe en el SQLSERVER
        if (!(await deleteSqlRow(recno, alias)))
            return false;

        //}
    } else
        await localAlaSql(`delete from now.${alias} where recno=${recno}`);

    const recnoArray = await localAlaSql(
        " select recno from now." + alias + "  order by recno"
    );

    console.log('Db delete recnoArray', recnoArray)

    // por reactividad borramos de uno por uno
    while (This.value.View[alias].recnoVal.length > 0) {
        This.value.View[alias].recnoVal.pop();
    }

    const recnoVal = [];
    let row = -1;
    for (let i = 0; i < recnoArray.length; i++) {
        if (recno > recnoArray[i].recno) {
            row = i;
        }
        recnoVal[i] = { recno: recnoArray[i].recno, id: i };
    }
    This.value.View[alias].recnoVal = recnoVal;
    recno = 0;
    if (row >= 0) {
        recno = recnoArray[row].recno;
    }

    // console.log('Db Despues de borrar recnoval ', This.value.View[alias].recnoVal)
    // console.log('Db delete despues slice recno reg recnoVal===>',recno,This.value.View[alias].recnoVal)
    // console.log('Db Despues de borrar alaSql',localAlaSql('select recno,key_pri from '+ alias ))
    if (recno > 0) {
        return await goto(recno);
    } // se va a leer registro
    return [];
};

export const deleted = async (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias)   // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo

    const recno = This.value.View[alias].recno
    const data = await localAlaSql('select now.' + alias + '.key_pri from now.' + alias + '  \
        LEFT JOIN last.' + alias + ' on now.' + alias + '.key_pri=last.' + alias + 'key_pri' + ' where recno=? ', recno)
    alasql('USE now;')

    if (data[0] && data[0].key_pri > 0)
        return true
    else
        return false

}

/**
 * Borra el registro actual de la vista local y su correspondiente en SQLSERVER si esta configurado.
 * @param query query que se va a ejecutar en la base de datos local, si no se da se borrara el registro actual.
 *              Si se da una query que inicia con WHILE, se reemplazara por WHERE y se agregara la condicion de recno mayor o igual que el actual.
 *              Si se da una query que inicia con FOR, se reemplazara por WHERE y se agregara la condicion de recno mayor o igual que el actual.
 *              Si se da una query que inicia con NEXT, se reemplazara por WHERE y se agregara la condicion de recno mayor o igual que el actual y menor que el actual mas el valor que se pase en NEXT.
 * @param alias nombre de la vista que se va a borrar, si no se da el alias se tomara el nombre de la vista actual segun el area de trabajo.
 * @returns Promesa que se resuelve cuando se termina de ejecutar la query.
 */
export const deleteLocalSql = async (query?: string, alias?: string) => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias) {
        // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }
    const recno = This.value.View[alias].recno

    if (!query)
        query = 'DELETE FROM now.' + alias + ' WHERE recno=' + recno
    else {
        if (query.trim() == 'ALL')
            query = 'DELETE FROM now.' + alias
        if (query.indexOf('WHILE') >= 0)
            query = 'DELETE FROM now.' + alias + ' WHERE recno>=' + recno + ' AND ' + query.replace('WHILE', '');
        if (query.indexOf('FOR') >= 0)
            query = 'DELETE FROM now.' + alias + query.replace('WHILE', 'WHERE');
        if (query.indexOf('NEXT') >= 0)
            query = 'DELETE FROM now.' + alias + ' WHERE recno>=' + recno + ' AND recno<recno+' + query.replace('NEXT', '');

    }

    return await localAlaSql(query);
}




/// /////////////  Vfp table insert /////////////////////
// nom_vis  : Nombre de la vista a utilizar
/// ////////////////////////////////////////////
// Aqui me quede
export const insert = async (alias: string, m: Record<string, never>) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias) {
        // si no se da el alias
        alias = This.value.are_tra[This.value.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
        errorAlert("SQL Server Error :No SQL view exists " + alias);
        return;
    }
    // Leemos los datos a actualizar
    const recno = This.value.View[alias].recno;
    const nom_vis = This.value.View[alias].tabla;

    /*
    const valores = await newLocalDb.select({
      from: alias,
      where: {
        recno: This.value.View[alias].recno
      }
    });
   */

    const valores = await localAlaSql(
        "USE now;\
            select from " +
        alias +
        " where renco=?",
        recno
    );

    const dat_vis = {
        id_con: "",
        tip_llamada: "INSERT",
        // tok_aut: This.value.tok_aut,
        nom_vis,
        where: "",
        dat_act: valores,
    };

    try {
        const response = await axiosCall(dat_vis);
        if (response == null) return;

        /*
              const response = await axios.post(This.value.url + "sql", dat_vis, {
                headers: { "Content-type": "application/json" },
              });
        */
        const respuesta = response.data;

        /*
        This.value.insertLocalDb(alias, respuesta);
        */
        await localAlaSql(
            "USE now;\
              UPDATE " + alias +
            ` set  key_pri=${respuesta.key_pri},set timestamp=${respuesta.timestamp} where recno=${recno} `
        );

        await localAlaSql(
            "USE last;\
              DELETE last."+ alias +
            ` where recno=${recno}; INSERT INTO last.${alias} ` +
            " SELECT * from now." + alias +
            ` where recno=${recno}`
        );
        alasql('USE now;')
        return;
    } catch (error) {
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );
        alasql('USE now;')
        return false;
    }
};

/// /////////////  sqlexec /////////////////////
// query  : Query a ejecutar
// tip_res: D=Data T=Text J=JSON NULL=no data returned
/// ///////////////////////////////////////////

export const SQLExec = async (query: string, alias?: string, tip_res?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial


    if (!alias) {
        alias = "sqlresult";
    }

    if (!tip_res) {
        tip_res = "D";
    } else {
        tip_res = tip_res.toUpperCase()
        if (tip_res != "T" && tip_res != "J" && tip_res != "NULL") {
            tip_res = 'D'

        }
    }
    // si existe el alias lo inicializamos
    if (This.value.View[alias]) {
        This.value.View[alias] = {}; // Generamos el nuevo alias
        This.value.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
        This.value.View[alias].data = {}; // asignamos el valor del ultimo registro
        This.value.View[alias].recCount = 0; // Total de registros de la vista
        This.value.View[alias].eof = false; // Fin de archivo
        This.value.View[alias].bof = false; // Principio de archivo
        This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek
        This.value.View[alias].row = -1; // Renglon posicionado el registro
    }
    const dat_vis = {
        id_con: "",
        tip_llamada: "SQLEXEC",
        query,
    };

    try {
        //console.log("1) Begin SQLEXEC  Query=", query, 'alias=', alias);
        let respuesta = await axiosCall(dat_vis);
        // console.log('2) Begin  SQLEXEC axios respuesta=', respuesta)

        if (respuesta.length == 0) {
            console.warn('3) Begin  SQLEXEC return sin  respuesta')
            return respuesta
        }

        if (respuesta == null) return null;

        // respuesta=objToLowerCase(respuesta)
        //  console.log('Db execute alias query,respuesta', dat_vis.query,respuesta)
        if (alias.toUpperCase() == "MEMVAR") {

            //   console.log("Db execute MEMVAR query=", query, "respuesta=", respuesta)
            return respuesta;
        }

        if (alias.toUpperCase() == "JSON") {
            const json = JSON.parse(respuesta);
            return json;
        }
        // Borramos localmente la tabla si existe

        This.value.View[alias] = {}; // Generamos el nuevo alias
        This.value.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
        This.value.View[alias].data = {}; // asignamos el valor del ultimo registro
        This.value.View[alias].recCount = 0; // Total de registros de la vista
        This.value.View[alias].eof = false; // Fin de archivo
        This.value.View[alias].bof = false; // Principio de archivo

        This.value.View[alias].row = -1; // Renglon posicionado el registro
        This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek
        await select(alias);

        // console.log('Db SQLExec =====>',respuesta)
        // Generamos la extructura de la respuesta
        if (respuesta.length == 0) {
            return false;
        }

        // generamos registro recno y arreglo recnoVal
        const recnoVal = [];
        for (let i = 0; i < respuesta.length; i++) {
            respuesta[i].recno = i + 1;
            recnoVal[i] = { recno: i + 1, id: i };
        }

        //  console.log('Db Ejecutara ala con  :', respuesta)

        let resp = await localAlaSql(
            ` DROP TABLE IF EXISTS last.${alias} ; DROP TABLE IF EXISTS now.${alias} ; `
        );
        resp = await localAlaSql(` CREATE TABLE now.${alias} ;`);
        resp = await localAlaSql(` SELECT * INTO now.${alias} FROM ? ; USE now ;`, [
            respuesta,
        ]);
        //    console.log('Db Axios sqlexec',response[0][0])
        //    const respuesta = response.data;
        //* ******************** */
        if (respuesta.length > 0) { // si hay datos Asignamos los valores a la vista
            This.value.View[alias].recno = respuesta.length; // asignamos el ultimo numero registro de trabajo
            This.value.View[alias].recCount = respuesta.length; // registros totales
            This.value.View[alias].data = respuesta[respuesta.length - 1]; // asignamos el valor del ultimo registro
            This.value.View[alias].recnoVal = [...recnoVal];
            for (let i = 0; i < respuesta.length; i++)
                This.value.View[alias].Records[i] = respuesta[i].recno
        }

        if (tip_res.toUpperCase() == "NULL") return true;
        if (tip_res == 'J') return JSON.stringify(respuesta)

        return respuesta;
    } catch (error) {
        console.error("SQL Server Error", query, error);
        if (error.response) {
            errorAlert(
                "SQL Server Error :" +
                error.response.status.toString() +
                " " +
                error.response.statusText
            );
        }
        return false;
    }
};
/// ////////////////////////////////////////////
//  Genera tablas en servidor de SQL
/// ///////////////////////////////////////////

export const genTabla = async (tabla: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!tabla) {
        return;
    }
    const dat_vis = {
        id_con: "",
        tip_llamada: "GENTABLA",
        nom_tab: tabla,
    };

    try {
        const respuesta = await axiosCall(dat_vis);
        //alert(" Table updated successfully " + tabla)
        MessageBox(" Table updated successfully " + tabla);
    } catch (error) {
        console.error("SQL Server Error", error.response);
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );
        return false;
    }
    return true;
};

/// ////////////////////////////////////////////
//  Genera indices en servidor de SQL
/// ///////////////////////////////////////////

export const genIndices = async (tabla: string, nom_ind: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!nom_ind) nom_ind = "";
    if (!tabla) {
        return;
    }

    const dat_vis = {
        id_con: "",
        tip_llamada: "GENINDICES",
        nom_tab: tabla,
        nom_vis: nom_ind,
    };

    try {
        const respuesta = await axiosCall(dat_vis);
        if (respuesta == null) return null;
        if (respuesta.length > 0) {
            MessageBox(respuesta);
            return true;
        }
    } catch (error) {
        console.error("SQL Server Error", error);
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        return false;
    }
};

/// ////////////////////////////////////////////
//  Genera vistas en servidor de SQL
/// ///////////////////////////////////////////

export const genVistasSql = async (tabla: string, nom_vis?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!tabla) {
        return;
    }
    if (!nom_vis) nom_vis = "";

    const dat_vis = {
        id_con: "",
        tip_llamada: "GENVISTASSQL",
        nom_tab: tabla,
        nom_vis: nom_vis,
    };

    try {
        const respuesta = await axiosCall(dat_vis);
        if (respuesta == null) return;
        if (respuesta.length > 0) {
            MessageBox(respuesta);
            return true;
        }
    } catch (error) {
        console.error("SQL Server Error", error);
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        return false;
    }
};

/// ////////////////////////////////////////////
//  Genera MODEL en el backEnd
/// ///////////////////////////////////////////

export const genModel = async (tabla: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!tabla) {
        return;
    }

    const dat_vis = {
        id_con: "",
        tip_llamada: "GENMODEL",
        nom_tab: tabla,
    };

    if (tabla == "ALL") {
        dat_vis.tip_llamada = "GENMODELS";
    }

    try {
        const respuesta = await axiosCall(dat_vis);
        if (respuesta == null) return;
        if (dat_vis.tip_llamada == "GENMODEL")
            MessageBox("The sequelize MODEL (BACK-END) was generated for the table " + tabla + " " + respuesta[0]);
        else
            MessageBox(
                "All sequelize MODELS (BACK-END) were generated " + respuesta[0]
            );

        return true;
    } catch (error) {
        console.error("SQL Server Error", error);
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        return false;
    }
};

// ---  oJo        Checar si se necesita  ----------
/// /////////////  Vfp select() /////////////////////
// Vista de captura de datos
//
/// //////////////////////////////////////////////
const vista_captura = async (m: any, nom_vis: string, alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    console.log("Db vista de captura alias ", nom_vis, alias);
    if (!alias) {
        // Si no hay alias asigna el mismo nombre de la vista
        alias = nom_vis;
    }
    let query =
        " SELECT fil_vis FROM man_comevis WHERE nom_vis= '" +
        nom_vis.trim() +
        "'";

    let exp_where = "";
    const dat_vis = {
        id_con: "",
        tip_llamada: "SQLEXEC",
        query,
    };

    const replacements: any = {};
    // obtenemos el filtro de la vista
    try {
        const data = await axiosCall(dat_vis);
        if (data == null) return null;
        // console.log('Db Respuesta axios data===>', data)
        const respuesta = data[0];
        // console.log('Db Axios gen_vista data[]==>data,m ',data,m)

        let nom_cam = "";
        let con_vis = ""; // generamos la condicion de la vista
        let exp_vis = data[0].fil_vis.trim().toLowerCase();
        let pos = exp_vis.indexOf(","); // Posicion de la primera coma

        while (pos > 0) {
            // Recorremos todas las variables del indice
            nom_cam = exp_vis.substr(0, pos);
            replacements[nom_cam] = m[nom_cam];
            con_vis = con_vis + nom_cam + " =: " + nom_cam;

            exp_vis = exp_vis.substr(pos + 1);
            pos = exp_vis.indexOf(",");
            if (pos > 0) {
                con_vis = con_vis + " AND ";
            }
        }
        if (exp_vis.length > 0) {
            replacements[exp_vis] = m[exp_vis];

            con_vis = " WHERE " + con_vis + exp_vis + "=:" + exp_vis;
        }

        exp_where = con_vis; // genera la expresion where
    } catch (error) {
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        // MessageBox( error.response.status.toString() + " " + error.response.statusText,16,"SQL Error " );

        console.error("SQL Server Error", error);

        return false;
    }

    query = " SELECT * FROM " + nom_vis + exp_where;
    const dat_sel = {
        id_con: "",
        tip_llamada: "SQLEXEC",
        query,
        opciones: { replacements },
    };
    // console.log('Db Axios ==>' + nom_vis, exp_where, replacements)
    try {
        const data = await axiosCall(dat_sel);
        if (data == null) return null;
        console.log("Db Axios genera vistas===>>>", data);
        // Aumentamos a la rspuesta el regitro recno
        return await genera_tabla(data, alias);
    } catch (error) {
        errorAlert(
            "SQL Server Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        console.error("SQL Server Error", error);
        // MessageBox(error.response.status.toString() + " " + error.response.statusText, 16, "SQL Error "      );
    }
};

/// /////////////  Vfp select() /////////////////////
// alias : area seleccionada
/// //////////////////////////////////////////////
export const select = (alias?: string | number) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    // console.log('Db Select 0',This.value.Form)
    if (!alias) {
        return This.value.num_are;
    }

    if (typeof alias === "number") {
        This.value.num_are = alias;
    } else {
        const alias_sel: any = alias;
        This.value.num_are = This.value.are_tra.indexOf(alias_sel) + 1; // busca el numero de alias
    }

    //console.log("Db Select alias ", alias);

    return This.value.num_are;
};

/// //////////////////////////////////////////////////
// genera la tabla en alasql
// data : json con la estructura de la tabla
// alias : nombre que tendra la tabla
// noData : si es useNodata
// obs : Borrar si no se utiliza
/// //////////////////////////////////////////////////
const genera_vista = async (data: {}, alias: string, noData?: boolean) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    alias = alias.trim();
    This.value.num_are = This.value.are_tra.indexOf(alias) + 1; // regresa un -1 si no hay elemento

    if (This.value.num_are == 0) {
        // si es una area de trabajo nueva busca si ya existe el alias
        This.value.are_tra.push(alias); // Se incremente en uno y se asigna que alias tiene
    } else {
        // Si existe la tabla borra los regisros
        // localAlaSql('USE now ; ')
        await localAlaSql("delete from  last." + alias + "; ");
        await localAlaSql("delete from now." + alias + "; ");
        alasql('USE now;')
        // localAlaSql('USE last ; ')
        return;
    }
    // Si es una vista nueva
    This.value.num_are = This.value.are_tra.indexOf(alias) + 1; // asigna el numero de area de trabajo
    // Obtenemos la estructura de la vista desde la base de datos

    /// ///   Estructura
    const dat_est = {
        id_con: "",
        tip_llamada: "GETDEF",
        query: alias,
    };
    //    console.log('Db Axios ==>' + nom_vis, exp_where, replacements)
    try {
        const data = await axiosCall(dat_est);
        if (data == null) return;
        // console.log('Db Estructura vistas===>>', data)
    } catch (error) {
        errorAlert(
            "SQL Error :" +
            error.response.status.toString() +
            " " +
            error.response.statusText
        );

        //MessageBox( error.response.status.toString() + " " + error.response.statusText, 16,"SQL Error " );

        return;
    }

    // Inicializamos la vista
    if (!This.value.View[alias]) {
        This.value.View[alias] = {}; // Generamos el nuevo alias
        This.value.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal

        if (noData) {
            // agregamos todos los componente de uno por uno para no romper la reactividad
            for (const comp in data) {
                This.value.View[alias][comp] = data[comp]; // asignamos su estructura si es de una vista actualizable
            }
        }
    }
    // por reactividad borramos de uno por uno
    while (This.value.View[alias].recnoVal.length > 0) {
        This.value.View[alias].recnoVal.pop();
    }

    //    delete This.value.View[alias]['valores']  // borramos el registro de valores
    This.value.View[alias].recno = 0; // asignamos el ultimo numero registro de trabajo
    This.value.View[alias].recCount = 0; // registros totales
    This.value.View[alias].tablaSql = alias; // tabla en servidor SQL

    if (!noData || data.length > 0) {
        // si hay datos
        // Generamos el campo recno
        const recnoVal = [];
        for (let i = 0; i < data.length; i++) {
            data[i].recno = i + 1;
            //        recnoVal[i] = i + 1
            recnoVal[i] = { recno: i + 1, id: i };
        }

        // Asignamos los valores a la vista

        //      This.value.View[alias] = response; // asignamos su estructura  y filtros de condiciones
        This.value.View[alias].recno = data.length; // asignamos el ultimo numero registro de trabajo
        This.value.View[alias].recCount = data.length; // registros totales
        This.value.View[alias].tablaSql = alias; // tabla en servidor SQL
        This.value.View[alias].data = data[data.length - 1]; // asignamos el valor del ultimo registro

        // This.value.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion

        // Bora las tablas
        await localAlaSql("USE last ; DROP TABLE IF EXISTS last." + alias + ";")
        await localAlaSql("USE now ; DROP TABLE IF EXISTS now." + alias + ";")

        await select(alias);

        alasql
            .promise(
                "USE now; CREATE TABLE " +
                alias +
                " ; \
      SELECT * INTO now." +
                alias +
                "  FROM ?",
                [data]
            )
            .then(function () {
                // Generara la tabla en last (old)
                alasql
                    .promise(
                        "USE last; CREATE TABLE " +
                        alias +
                        " ; \
          SELECT * INTO " +
                        alias +
                        " FROM now." +
                        alias
                    )

                    .catch(function (error) {
                        console.error("Error al generar Vis_captura" + alias, error);
                    });
            });

        // revisar despues si al insertar los datos el recno queda como lo habiamos generado
        // o seleccionar los recno para llenar el recnoval
        // recnoVal=localAlaSql(SELECT recno FROM now.' + alias)

        This.value.View[alias].recnoVal = [...recnoVal]; // utilizamos el spread Operator
        // console.log('Db RecnoVal===>', This.value.View[alias].recnoVa)
    } else {
        This.value.View[alias].data = {};
        This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek
    } // no hay datos
    alasql('USE now;')
    return true
}

/// //////////////////////////////////////////////////
// genera la tabla en alasql
// respuesta : json con los renglones para generar la tabla
// alias : nombre que tendra la tabla
// noData : si es useNodata
/// //////////////////////////////////////////////////

const genera_tabla = async (respuesta: any, alias: string, noData?: boolean) => {
    // console.log("1 Db genera_tabla"); // .data
    const { This } = toRefs(state) // Hace referencia al valor inicial
    alias = alias.trim();
    This.value.num_are = This.value.are_tra.indexOf(alias) + 1; // regresa un -1 si no hay elemento

    // borra las tablas en ALA
    await localAlaSql("DROP TABLE IF EXISTS last." + alias + ";");
    await localAlaSql("DROP TABLE IF EXISTS now." + alias + ";");

    if (!This.value.View[alias]) {
        // console.log("Db geneta_tabla ", alias);
        noData = true;
    } // No hay definicion de vista

    if (This.value.num_are == 0) {
        // si es una area de trabajo nueva
        This.value.are_tra.push(alias);
        noData = true;
    }
    This.value.num_are = This.value.are_tra.indexOf(alias) + 1; // asigna el numero de area de trabajo

    // Inicializamos la vista

    if (noData) {

        This.value.View[alias] = {}; // Generamos el nuevo alias
        This.value.View[alias].recnoVal = []; // Generamos el arreglo de recnoVal
        This.value.View[alias].tip_obj = respuesta.tip_obj; // MODEL O VIEW
        This.value.View[alias].tablaSql = respuesta.nom_tab; // nombre de tabla en servidor SQL
        This.value.View[alias].exp_indice = respuesta.exp_indice;
        This.value.View[alias].exp_where =
            respuesta.exp_where == null ? " " : respuesta.exp_where;
        This.value.View[alias].order = respuesta.ord_vis; // orden de la vista

        This.value.View[alias].data = {}; // asignamos el valor del ultimo registro
        This.value.View[alias].val_def = { recno: "recno" }; // valores default
        This.value.View[alias].recCount = 0; // Total de registros de la vista
        This.value.View[alias].recno = 0; // Total de registros de la vista

        This.value.View[alias].eof = false; // Fin de archivo
        This.value.View[alias].bof = false; // Principio de archivo

        This.value.View[alias].row = -1; // Renglon posicionado el registro
        This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek
        // agregamos toda la definicion de la tabla

        if (!respuesta.est_tabla) {
            // Si no hay estructura de la tabla
            /// ///   Obtiene la Estructura
            const dat_est = {
                id_con: "",
                tip_llamada: "GETDEF",
                query: alias,
            };

            try {
                const estructura = await axiosCall(dat_est);
                console.log('genera_tabla axios GETDEF estructura ===>>', estructura, 'Llamada axios', dat_est)
                if (estructura == null) return null;

                respuesta.est_tabla = estructura;
                // console.log('Db Estructura vista===>>', respuesta)
            } catch (error) {
                console.error("SQL Error", error);
                errorAlert(
                    "SQL Error :" +
                    error.response.status.toString() +
                    " " +
                    error.response.statusText
                );
                //MessageBox( error.response.status.toString() + " " + error.response.statusText, 16, "SQL Error " );
                alasql('USE now;')
                return null;
            }

            /// /////////////////////////////
        }
        // borra las tablas en ALA
        //  await localAlaSql('USE now ; DROP TABLE IF EXISTS now.' + alias + ';')
        //  await localAlaSql('USE last ; DROP TABLE IF EXISTS last.' + alias + ';')

        This.value.View[alias].est_tabla = respuesta.est_tabla; // estructura de la tabla

        // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
        let des_tab = " CREATE TABLE " + alias + " (recno INT PRIMARY KEY";

        for (const nom_ele in respuesta.est_tabla) {
            // genera la descripcion de la tabla para generarla en alasql
            des_tab =
                des_tab + "," + nom_ele + " " + respuesta.est_tabla[nom_ele].tip_cam;

            if (respuesta.est_tabla[nom_ele].tip_cam == "STRING")
                des_tab = des_tab + "(" + respuesta.est_tabla[nom_ele].lon_dat + ")";

            const val_def = respuesta.est_tabla[nom_ele].val_def;
            // const val_def=respuesta.est_tabla[nom_ele].replace('undefined','null')

            This.value.View[alias].val_def[nom_ele] = val_def;

            //  This.value.View[alias]["val_def"] = val_def.replace('undefined','null')    ; // valores default

            //        val_def = val_def + nom_ele + ':' + respuesta.est_tabla[nom_ele].val_def + ','

            /*  Indexed Local Data base
            This.value.newTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
            This.value.oldTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
            */
        }
        // console.log('Db Estructura View respuesta===>', alias, respuesta)
        // console.log('Db Estructura View ===>', alias, This.value.View[alias].val_def)

        des_tab = des_tab + ")";
        // console.log('Db Valores default=====>',alias,This.value.View[alias].val_def)

        // console.log('Db ALASQL Estructura ===>',des_tab)
        // Creamos la tablas

        //console.log("Db ins_sql=", des_tab);

        try {
            //  await localAlaSql('USE now ; DROP TABLE IF EXISTS now.' + alias + '; ')
            await localAlaSql("USE last ;" + des_tab);
            await localAlaSql("USE now ;" + des_tab);

            //  await localAlaSql('USE last ; DROP TABLE IF EXISTS last.' + alias + '; ')
        } catch (error) {
            console.warn("Db ala error", error, des_tab);
        }
    }
    // console.log("2 Db genera_tabla"); // .data
    // por reactividad borramos de uno por uno
    while (This.value.View[alias].recnoVal.length > 0) {
        This.value.View[alias].recnoVal.pop();
    }

    //    delete This.value.View[alias]['valores']  // borramos el registro de valores
    This.value.View[alias].recno = 0; // asignamos el ultimo numero registro de trabajo
    This.value.View[alias].recCount = 0; // registros totales

    /*    This.value.View[alias]["tablaSql"] = respuesta.nom_tab; // nombre de tabla en servidor SQL
        This.value.View[alias]["exp_indice"] =respuesta.exp_indice
        This.value.View[alias]["exp_where"] =respuesta.exp_where
        This.value.View[alias]["tip_obj"] = respuesta.tip_obj
    */
    // console.log('Db Genera_tabla final==>',This.value.View[alias],alias)

    if (noData) {
        //  console.log("Db genera_tabla View creada", alias, This.value.View[alias]);
        return await localAlaSql(`select * from ${alias} limit 0`);
    }

    // console.log('Db Genera_tabla datos==>', respuesta)

    if (respuesta.length > 0) {
        // si hay datos
        // Generamos el campo recno
        const recnoVal = [];
        const records = []
        for (let i = 0; i < respuesta.length; i++) {
            respuesta[i].recno = i + 1;
            //        recnoVal[i] = i + 1
            recnoVal[i] = { recno: i + 1, id: i };
            records.push(i)
        }

        This.value.View[alias].Records = records
        // Asignamos los valores a la vista
        //      This.value.View[alias] = response; // asignamos su estructura  y filtros de condiciones
        // console.log("1) Db genera_tabla View creada", alias, 'recno=', This.value.View[alias].recno);
        This.value.View[alias].recno = respuesta.length; // asignamos el ultimo numero registro de trabajo
        // console.log("2) Db genera_tabla View creada", alias, 'recno=', This.value.View[alias].recno);
        This.value.View[alias].recCount = respuesta.length; // registros totales
        //    This.value.View[alias]["tablaSql"] = alias // tabla en servidor SQL
        This.value.View[alias].data = respuesta[respuesta.length - 1]; // asignamos el valor del ultimo registro

        await select(alias);
        //  console.log("5 Db genera_tabla"); // .data

        try {
            await localAlaSql(
                "USE now; CREATE TABLE now." +
                alias +
                " ; \
          SELECT * INTO now." +
                alias +
                "  FROM ?",
                [respuesta]
            );
            await localAlaSql(
                "USE last; CREATE TABLE last." +
                alias +
                " ; \
          SELECT * INTO last." +
                alias +
                "  FROM ?",
                [respuesta]
            );
        } catch (error) {
            console.error("Error al generar Vis_captura" + alias, error);
            alasql('USE now;')
            return null;
        }
        alasql('USE now;')
        // console.log("5 Db genera_tabla"); // .data
        This.value.View[alias].recnoVal = [...recnoVal]; // utilizamos el spread Operator

        //console.log('Db View leida respuesta ===>', alias, respuesta)

        // si  no hay asignacion a valores de componentes
        //   26/Ags/2025
        if (!This.value.View[alias].componente) {
            //  console.log("6 Db genera_tabla respuesta=", respuesta); // .data
            return respuesta;
        }

        const componente = This.value.View[alias].componente;
        // revisar no entiendo
        for (const comp in componente) {
            // recorre componente por componente
            for (let i = 0; i < comp.length; i++) {
                componente[comp][i].value = recnoVal[comp]; // asignamos el valor a c/componente del form
            }
        }
        // console.log("6 Db genera_tabla"); // .data
        return respuesta;
    } else {
        // console.log("7 Db genera_tabla"); // .data
        This.value.View[alias].data = {};
        This.value.View[alias].Records = []; // Arreglo de registros para skip locate y seek
    } // no hay datos
};

/// /////////////  Vfp recCount() /////////////////////
// alias    : Alias
/// ////////////////////////////////////////////
export const recCount = (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias) {
        // alias = This.value.are_tra[-1]; // buscamos a cual alias pertenece
        alias = This.value.are_tra[This.value.num_are - 1];
    }
    if (!This.value.View[alias]) {
        console.warn("recCount() No existe el alias", alias);
        return 0;
    }

    //    if (!alias) MessageBox('No existe el alias',alias)
    //         return 0
    // console.log("Db Reccount alias ===>", alias, This.value.View[alias].recCount);
    const recCount = alasql(`select column count(recno) from ${alias}`)
    console.log("Db Reccount alias ===>", alias, recCount);

    return This.value.View[alias].recCount;
}

////////////////  Vfp reccno() /////////////////////
// record Number
// alias    : Alias
///////////////////////////////////////////////
export const recNo = (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias) {
        // alias = This.value.are_tra[-1]; // buscamos a cual alias pertenece
        alias = This.value.are_tra[This.value.num_are - 1];
    }

    // const vis_act = obj_vis.value;

    if (alias == null) {
        alias = This.value.are_tra[This.value.num_are - 1]; // buscamos a cual alias pertenece
    }
    return This.value.View[alias].recno;
}

/// /////////////////////////////  Vfp found() /////////////////////
// Devuelve true si el registro si se encontro en un locate
// alias    : Alias
/// ////////////////////////////////////////////
export const found = (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias) {
        // alias = This.value.are_tra[-1]; // buscamos a cual alias pertenece
        alias = This.value.are_tra[This.value.num_are - 1];
    }

    if (This.value.View[alias].recno == 0)
        return false

    return true
}


/// /////////////////////////////  local Db ///////////////////////////////////
// Borra  LocalDb
const borraLocalDb = async (db_name: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    const req = await indexedDB.deleteDatabase(db_name);
    req.onsuccess = function () {
        console.log("Db Deleted database successfully ", db_name);
    };
    req.onerror = function () {
        console.log("Couldn't delete database ", db_name);
    };
    req.onblocked = function () {
        console.log(
            "Couldn't delete database due to the operation being blocked ",
            db_name
        );
    };

    /*
        alasql.promise("DROP INDEXEDDB DATABASE IF  EXISTS 'New' ;").
                          then(()=>{
                            localAlaSql(" DROP INDEXEDDB DATABASE IF  EXISTS 'Old'")
 
                          }).
                          then(()=>{
                            localAlaSql("DROP INDEXEDDB DATABASE IF  EXISTS Temp_ ;")
 
                          }).
                          then(()=>{
                            localAlaSql("CREATE INDEXEDDB DATABASE Temp_ ;")
 
                            console.log('Db Creo Temp_')
                          }).
                          catch((error)=>{
                            console.log('Db Error al borrar Base de datos Local')
 
                          })
    */

    //    localAlaSql("CREATE INDEXEDDB DATABASE IF NOT EXISTS temp_;\
    //           ATTACH INDEXEDDB DATABASE temp_")

    //       ATTACH INDEXEDDB DATABASE 'NEW';")

    // localAlaSql("ATTACH INDEXEDDB DATABASE 'NEW';")

    //        ATTACH INDEXEDDB DATABASE 'Old'; \
    //        ATTACH INDEXEDDB DATABASE '_Temp';")

    /*
const newDb = {
name: "New",
tables: []
};
const oldDb = {
name: "Old",
tables: []
};
const tempDb = {
name: "tempDb",
tables: []
};
 
try {
 
const conn = new Connection();
conn.addPlugin(workerInjector);
await conn.initDb(newDb);
await conn.dropDb();  // borra toda la base de datos
await conn.terminate();
 
const old = new Connection();
old.addPlugin(workerInjector);
await old.initDb(oldDb);
await old.dropDb(); // borra toda la base de datos
await old.terminate();
 
const temp = new Connection();
old.addPlugin(workerInjector);
await old.initDb(tempDb);
await old.dropDb(); // borra toda la base de datos
await old.terminate();
 
}
catch (error) {
MessageBox.errorAlert(
error,
"Error clear localDb ",
"error"
);
return false;
}
 
*/
};

///////////////////////////////////////////////
// LLamada axios al back-end 
// dat_lla: datos de la llamada axios
///////////////////////////////////////
export const axiosCall = async (dat_lla: Record<string, unknown>) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (
        !(This.value.session.id_con > " ") ||
        This.value.session.user == "" ||
        This.value.session.nom_emp == ""
    ) {
        console.log(
            "Data bases session =======>",
            This.value.session.id_con,
            This.value.session.user,
            This.value.session.nom_emp
        );
        errorAlert("Back End error : Session not active");
        //MessageBox("Back End error", 16, "SQL Error Open");

        const router = useRouter();
        //window.close()
        router.push("/Login");
        return;
    }

    dat_lla.id_con = This.value.session.id_con; // asignamos el id de connexion

    /*   Creo que ya quedo fuera de uso
   const broadcast=This.value.socketIo?This.value.session.socketId+new Date().getTime().toString():''
 
    if (broadcast>''){
       dat_lla.broadcast=broadcast
        This.value.socketIo.on(broadcast), async (res: {}) => {
          const respuesta = res.data
          console.log('Sockect response  ======>>>', dat_lla, 'respuesta', 'OK')
          return respuesta        
 
        }
          This.value.socketIo.emit('sql async',dat_lla)
    }
 
   */
    // hay socket de conexion // Tenemos que poner en verdadero para utilizar sockets

    if (This.value.socket.value && false) {
        try {
            if (dat_lla.tip_llamada == "UPDATE") {
                console.log(" DataBase Socket UPDATE data =", dat_lla.dat_act);
                /* // busqueda del campo timestamp para trasmitirlo
              for (const campo in dat_lla.dat_act) {
      
                   console.log('Socket UPDATE campo =',campo,'valor ',dat_lla.dat_act[campo],'typeof=',typeof dat_lla.dat_act[campo])
      
                    if (typeof dat_lla.dat_act[campo]=='buffer'){
                      var buffArray = new Uint8Array(dat_lla.dat_act[campo]);
                      dat_lla.dat_act[campo]=buffArray
      
                    }
                 }
               */
            }

            const data = await This.value.session.updateSql(dat_lla); // llama sockets
            console.log(" DataBase Socket UPDATE ok data=", data);
            return data;
        } catch {
            console.warn("Error SQL Scoket");
        }
    }

    const ThisForm: any = This.value.Form;
    let numIntentos = 0;
    let numLogin = 0;

    const controller = new AbortController();
    const signal = controller.signal;
    // cancel the request,  controller.abort()
    // el signal en la llamada no llevara nada  signal
    // console.log('Db Axios call llamada  ======>>>', dat_lla, This.value.url)
    // This.value.axiosActive = true;
    setTimeout(() => controller.abort(), 60000); // 60 segundos

    do {
        try {
            console.log('AXIOS ', dat_lla)
            const response = await axios.post(This.value.session.url + "sql", dat_lla, {
                signal, //: AbortSignal.timeout(300000),  // milisegundos 5 minutos
                //    headers: { 'Content-type': 'application/json' },
            });
            /*
            data - The response body provided by the server. If the response from the server is a JSON, Axios will automatically parse data into a JavaScript object.
            status - The HTTP status code from the response e.g. 200, 400, 404.
             */
            //  This.value.axiosActive = false;
            const respuesta = response.data;
            /*
            console.log(
              "5 Db Axios call response  ======>>>",
              dat_lla,
              "respuesta ---OK---  Respuesta=",
              respuesta
            );
    
            */
            return respuesta;
        } catch (error) {
            console.error("Axios error datos de llamada =====>>", dat_lla, 'Error= ', error);
            if (error.message == "Network Error") {

                errorAlert("Network Error");

                return false;
            }

            const messageError = error.response && error.response.data ? error.response.data : ''

            if (axios.isCancel(error)) {
                console.error("Request cancelled", error.message);
                errorAlert("User cancel request :");
                //await MessageBox( error.response.statusText, 16, "User cancel request "       );
                numLogin = 3;
            } else {
                //handle the error
                // status - The HTTP status code from the response e.g. 200, 400, 404.
                // statusText - The HTTP status message from the server response e.g. OK, Bad Request, Not Found.
                //  const error = thrown;
                //          errorAlert("SQL Data Base Error  :" + error.response.data);
                await errorAlert(messageError);

                // si es un error de desconexion
                const status = error.response.status.toString()
                if (status == "401" || status == "403" || status == "408") {

                    if (This.value.session.nom_emp == "" || status == "401" || status == "408") {
                        await MessageBox('Connection error. Try ' + numIntentos.toString() + ' to reconnect', 16, "ERROR");
                        numIntentos++
                        const router = useRouter();
                        router.push("/Login");
                        return;
                    }

                    // This.value.axiosActive = false;
                    const { id_con } = storeToRefs(This.value.session); //pasa los elementos por referencia al Global
                    id_con.value = "";
                }
                numIntentos++;

                if (
                    (!window.navigator.onLine &&
                        !error.response &&
                        error.code === "ERR_NETWORK") ||
                    error.toJSON().message === "Network Error"
                ) {
                    errorAlert(
                        "No internet connection. Try " +
                        numIntentos.toString() +
                        " to reconnect"
                    );
                } else return false;

                if (numIntentos == 5) {
                    numLogin++;
                    //const session=storeToRefs(Session)
                    // const session = Session()
                    const { id_con } = storeToRefs(This.value.session); //pasa los elementos por referencia al Global

                    //          ThisForm.prop.login = false
                    id_con.value = ""; // borra session
                    await This.value.delay(10000); // espera 10 segundos
                    if (id_con.value == "") numLogin = 3;
                } else await This.value.delay(2000); // espera 2 segundos para tratar de reconectar
            }
            return false;
        } // Fin catch error
    } while (numLogin < 3);
    // This.value.axiosActive = false;
    MessageBox('Connection error. Try ' + numIntentos.toString() + ' to reconnect', 16, "ERROR");
    window.close();
}

//////////////////////////////////
// Funcion de delay
// ms : milisegundos
////////////////////////////////


const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/// /////////////////////////////////////////////////
// Instruccion sql base de datos local
// db_name :Base de datos a utilizar
// ins_sql : Instruccion SQL
/// //////////////////////////////////////
export const localSql = async (ins_sql: string, DataBase?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!DataBase) {
        DataBase = "now";
    }

    // console.log('Db localSql===>>', DataBase.toLowerCase)

    if (DataBase.toUpperCase() == "NEW" || DataBase.toUpperCase() == "NOW") {
        DataBase = "now";
    }

    if (DataBase.toUpperCase() == "OLD" || DataBase.toUpperCase() == "LAST") {
        DataBase = "last";
    }

    try {
        ins_sql = "USE " + DataBase + " ; " + ins_sql;
        // console.log('Db localSQL===>',ins_sql)
        const resultado = await localAlaSql(ins_sql);
        // console.log('Db Lectura SQL',resultado[1][0])
        return resultado[1];
    } catch (error) {
        console.error("localSql error==>", error);
    }
}

/// /////////////////////////////////////////////////
// Instruccion sql base de datos local
// db_name :Base de datos a utilizar
// ins_sql : Instruccion SQL
/// //////////////////////////////////////
export const localAlaSql = async (ins_sql: string, datos?: any) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    await alasql('USE now ;')

    try {
        if (!datos) {
            const data = await alasql(ins_sql);
            alasql('USE now ;')
            return data;
        }

        const data = await alasql(ins_sql, datos);
        alasql('USE now ;')
        return data;
    } catch (error) {
        console.error("localAlaSql error==>", error, ins_sql);
        errorAlert("local SQL error :" + ins_sql);
        alasql('USE now ;')
        return false;
    }
}


export const selectInto = async (ins_sql: string, alias?: string, filename?: string) => {

    const { This } = toRefs(state) // Hace referencia al valor inicial

    // alias  : TXT(filename)
    //          CSV(filename,options)
    //          XLSX("restest280b.xlsx")
    try {
        await localAlaSql(" USE now ; ");

        if (!alias) {
            alias = "sqlresult";
        }

        alias = alias.toUpperCase();
        ins_sql = ins_sql.trim();

        let resultado = {};
        if (
            alias == "TXT" ||
            alias == "CSV" ||
            alias == "TAB" ||
            alias == "TSV" ||
            alias == "XLSX" ||
            alias == "HTML" ||
            alias
        ) {
            alasql
                .promise(ins_sql + " INTO " + alias + "(" + filename + ")")
                .then(function (data) {
                    resultado = data;
                    // console.log('Db Datos Guardados');
                })
                .catch(function (err) {
                    console.error("select Into Error:", err);
                });
        } else {
            await localAlaSql("DROP TABLE IF EXISTS " + alias + "; ");

            const resultado = await localAlaSql(ins_sql + " INTO " + alias);

            if (resultado.length) {
                // el resultado es un arreglo
                select(alias);
                await localAlaSql(
                    " CREATE TABLE IF NOT EXISTS" +
                    alias +
                    " ; \
        SELECT * INTO " +
                    alias +
                    "  FROM ?",
                    [resultado]
                );
                const resp = await localAlaSql("select * from " + alias);
            }
        }
        return resultado;
    } catch (error) {
        console.error("SelectInto error==>", error);
    }
}

//= ===============================

/// /////////////////////////////////////////////////
// Lee Value de la tabla local
/// //////////////////////////////////////
export const readCampo = async (
    ControlSource: string,
    recno: number,
    DataBase?: string
) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (ControlSource == "") {
        return;
    } // No  hay ControlSource

    if (!DataBase) {
        DataBase = "now";
    }

    if (DataBase.toUpperCase() == "NEW" || DataBase.toUpperCase() == "NOW") {
        DataBase = "now";
    }

    if (DataBase.toUpperCase() == "OLD" || DataBase.toUpperCase() == "LAST") {
        DataBase = "last";
    }

    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) {
        return;
    } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    //  console.log('Db readCampo=', tabla, campo, recno)

    const data = await readValue(tabla, campo, recno, DataBase);
    // console.log('Db Read renglon ',data[0])

    //    return data[0][campo]
    alasql('USE now ;')
    return data[0];
};

/// /////////////////////////////////////////////////
// Lee Valor de un campo
/// //////////////////////////////////////
export const readValue = async (
    tabla: string,
    campos: string,
    recno: number,
    DataBase: string
) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    const data = await localAlaSql(
        "USE " +
        DataBase +
        " ; SELECT " +
        campos +
        ",key_pri  FROM " +
        tabla +
        " WHERE recno=? ;",
        recno
    );

    alasql('USE now ;')
    if (data.length > 1) {
        for (const campo in data[1][0]) {
            if (campo != "key_pri" && typeof data[1][0][campo] === "string") {
                data[1][0][campo] = data[1][0][campo].trim();
            }
        }
        This.value.View[tabla].Recno = recno // actualizamos el recno de la vista

        return data[1]; // todos los campos
    } else
        console.warn('Sql.readValue no data =====>', tabla, campos, recno, data)

    return [];
};

/// /////////////////////////////////////////////////
// Graba Value de la tabla local
/// //////////////////////////////////////
export const updateCampo = async (Value: any, ControlSource: string, recno: number, old?: boolean) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    // async update(Value: any) {
    //  const ControlSource = This.value.ControlSource;
    // console.log('Db updateCampo===', Value, ControlSource)

    if (ControlSource == "" || recno == 0) {
        return;
    } // No  hay ControlSource
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) {
        return;
    } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    let valor = "";

    switch (typeof Value) {
        case "number":
            valor = Value.toString();
            break;
        case "string":
            valor = Value.replaceAll("'", "''");
            valor = "'" + valor + "'";
            break;
        case "boolean":
            valor = Value.toString();
            break;
        default:
            valor = "'" + Value + "'";
            break;
    }

    //    if (typeof Value=='string' || )

    try {
        //     await localAlaSql('USE now;')
        const ins_sql = `UPDATE now.${tabla}  set ${campo}=${valor}  WHERE recno=${recno}`;
        // console.log("Db update ala===>", ins_sql);
        await localAlaSql(ins_sql);
        if (old) {
            const ins_sql = `UPDATE last.${tabla}  set ${campo}=${valor}  WHERE recno=${recno}`;
            // console.log("Db update ala===>", ins_sql);
            await localAlaSql(ins_sql);
        }
    } catch (error) {
        console.error("AlaSql error==>", error);
    }
    alasql('USE now ;')
    return true;
};

/// /////////////////////////////////////////////////
// Graba Value de la tabla local
/// //////////////////////////////////////
export const asignaComponente_xx = async (ControlSource: string, refValue: any) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) {
        return;
    } // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const alias = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

    // Si no esta dado de alta la vista, componente
    if (!This.value.View[alias]) {
        This.value.View[alias] = {
            recnoval: [],
        };
    } // objeto vacio

    if (!This.value.View[alias].componente) {
        This.value.View[alias].componente = {};
    } // arreglo vacio

    if (!This.value.View[alias].componente[campo]) {
        This.value.View[alias].componente[campo] = [];
    }

    This.value.View[alias].componente[campo].push(refValue); // aumenta el arreglo con las referencias componentes
};



/**
 * getAlias: Devuelve el alias actual si no se especifica,
 *           o el alias pasado como parametro si se especifica
 * @param alias {string} : nombre del alias
 * @returns {string|null} : nombre del alias actual, null si no hay datos
 */
export const getAlias = (alias?: string): string | null => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    if (!alias) {
        if (!This.value.are_tra[This.value.num_are - 1]) {
            return null;
        }
        return This.value.are_tra[This.value.num_are - 1];
    }
    return alias
}


/**
 * goto: Se mueve al registro segun desplazamiento
 * despla : Si es numerico brinca al recno con ese numero,
 *          Si es string top=brinca la primer registro del alias, button=brinca la ultimo registro del alias
 * @param despla {number|string} : desplazamiento, si es numerico brinca al recno con ese numero, si es string
 * top=brinca la primer registro del alias, button=brinca la ultimo registro del alias
 * @param alias {string} : nombre del alias
 * @returns {number|null} : recno del registro, null si no hay datos
 */
export const goto = async (despla: string | number, area?: string, lastDatabase?: boolean) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    let table = 'now.'

    if (lastDatabase)
        table = 'last.'

    const alias = area ? area : getAlias(); // obtiene el alias actual si no se especifica

    table = table + alias // agrega la base de datos al alias

    if (!This.value.View[alias])  // No hay alias
        return null

    This.value.View[alias].eof = false;
    This.value.View[alias].bof = false;

    let data = [];
    let recno = 0;

    if (typeof despla == "string") {  // desplazamiento top o bottom
        despla = despla.toLowerCase().trim()

        if (despla == 'top')
            data = await localAlaSql(`SELECT top 1 *  FROM ${table} order by recno `);

        if (despla == 'bottom')
            data = await localAlaSql(`SELECT top 1 *  FROM ${table} order by recno desc`)

        await alasql('USE now;')
        if (despla == 'top' && data.length == 0) { // No hay datos
            if (!lastDatabase)
                initAlias(alias) // Inicializa el alias si no hay datos

            return [];
        }
        recno = data[0].recno;
        // Asigna el Row del grid
        This.value.View[alias].row = -1;

        /*
        for (let row = 0; This.value.View[alias].recnoVal.lenght; row++) {
            if (This.value.View[alias].recnoVal[row].recno == recno) {
                This.value.View[alias].row = row;
                break;
            }
        }
        */
        const row = This.value.View[alias].recnoVal.find((ele) => ele.recno == recno);

        This.value.View[alias].row = row.id;

        This.value.View[alias].recno = recno;
        This.value.View[alias].data = data[0];
        bof(alias)
        eof(alias)
        alasql('USE now;')
        return data[0]
    }

    recno = despla;
    if (recno == 0)
        recno = This.value.View[alias].recno;

    data = await localAlaSql(` SELECT * FROM ${table}  where recno=?`, recno);
    await alasql('USE now;')
    if (data.length == 0) {

        if (!lastDatabase)
            initAlias(alias) // Inicializa el alias si no hay datos
        alasql('USE now;')
        return [];
    }

    This.value.View[alias].row = -1;

    // Lee datos del alias del registro actual
    This.value.View[alias].recno = data[0].recno;
    const row = This.value.View[alias].recnoVal.find((ele) => ele.recno == recno);
    This.value.View[alias].row = row.id;
    This.value.View[alias].data = data[0]
    bof(alias)
    eof(alias)
    alasql('USE now;')

    return data[0]

};

/**
 * Inicializa el alias si no hay datos
 * @param {string} alias Nombre del alias
 * @returns {void}
 */
export const initAlias = (alias: string): void => {

    const { This } = toRefs(state) // Hace referencia al valor inicial
    This.value.View[alias].row = -1;
    This.value.View[alias].eof = true;
    This.value.View[alias].bof = true;
    This.value.View[alias].recno = 0
    This.value.View[alias].data = []; // No hay datos

}

//////////////////////////////////////////////
// bof : Indica si esta a principo del archivo
//////////////////////////////////////////////

export const bof = async (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias)
        alias = This.value.are_tra[This.value.num_are - 1];

    let bof = false
    // await localAlaSql("USE now")
    const data = await localAlaSql(" SELECT MIN(recno) as recno   FROM now." + alias + ' order by recno limit 1');
    if (data.length > 0) {
        if (data[0].recno == This.value.View[alias].recno)
            bof = true
    } else
        bof = true

    This.value.View[alias].bof = bof
    return bof
}

/**
 * Retrieves the old value of a of a remote view for the current record number.
 *
 * @param field - The name of the field to retrieve the value for.
 * @param alias - Optional alias for the table. If not provided, the last alias in the area of work will be used.
 * @returns The value of the specified field if it exists, otherwise returns false.
 */

export const oldValue = async (field: string, alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias) {
        alias = This.value.are_tra[This.value.num_are - 1];
    }

    const recno = This.value.View[alias].recno
    const data = await localAlaSql(`select ${field} from last.${alias} where recno=${recno}`)
    alasql('USE now;')
    if (data.length > 0)
        return data[0][field]
    return false
}

/**
 * Retrieves the current value of a remote view for the current record number.
 *
 * @param field - The name of the field to retrieve the value for.
 * @param alias - Optional alias for the table. If not provided, the last alias in the area of work will be used.
 * @returns The value of the specified field if it exists, otherwise returns false.
 */

export const currentValue = async (field: string, alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias) {
        alias = This.value.are_tra[This.value.num_are - 1];
    }

    const recno = This.value.View[alias].recno
    const data = await localAlaSql(`select now.${field} from ${alias} where recno=${recno}`)
    alasql('USE now;')
    if (data.length > 0)
        return data[0][field]
    return false
}


//////////////////////////////////////////////
// eof : Indica si esta a fin del archivo
//////////////////////////////////////////////

export const eof = async (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias) {
        alias = This.value.are_tra[This.value.num_are - 1];
    }
    const data = await localAlaSql(" SELECT recno as recno   FROM now." + alias + ' order by recno desc limit 1');
    let eof = false
    if (data.length > 0) {
        if (data[0].recno == This.value.View[alias].recno)
            eof = true
    }
    else
        eof = true
    This.value.View[alias].eof = eof
    alasql('USE now;')
    return eof
}

export const afields = (alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!alias) {
        alias = This.value.are_tra[This.value.num_are - 1];
    }
    return This.value.View[alias].est_tabla
}

/**
 * Moves the record pointer relative to the current record number and returns the new record number.
 * @param despla - The number of records to move. If positive, moves forward, if negative, moves backward.
 * @param alias - The alias of the table. If not provided, the last alias in the area of work will be used.
 * @returns The new record number if the move is successful, 0 if there are no records.
 */
export const skip = async (despla?: number, alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    alias = alias ? alias : getAlias(); // obtiene el alias actual si no se especifica

    if (!despla)
        despla = 1;

    if (despla == 0)
        return 0; // No hay desplazamiento

    let data = [];
    const recno = This.value.View[alias].recno
    if (despla > 0)
        data = await localAlaSql(`"select recno from now.${alias} where recno >${recno} order by recno limit ${despla}`);
    else
        data = await localAlaSql(`"select recno from now.${alias} where recno <${recno} order by recno desc limit ${-despla}`);

    alasql('USE now;')
    if (data.length > 0)
        return await goto(data[data.length - 1].recno, alias); // se va a leer registro

    // si no hay datos
    initAlias(alias) // Inicializa el alias si no hay datos
    return 0; // No hay datos
};

/// /////////////////////////////////////////////////
// scatter Lee los datos del registro actual
// tipo : MEMVAR (todos los registros), FIELDS (solo los campos que esten en FIELDS )
/// //////////////////////////////////////
/**
 * Gets the data from the current record
 * @param {Object} aliasFields - fields to read in an array ['field1','field2'.....'filedn']
 * @param {Object} alias - alias table
 * @returns {Object} A new object with data field 
 */

export const scatter = async (aliasFields?: [], alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial


    let fields = []
    if (!alias) {
        if (!This.value.are_tra[This.value.num_are - 1]) {
            return false;
        }
        alias = This.value.are_tra[This.value.num_are - 1];
    }
    console.log('sccater fields', aliasFields, alias)

    const res = await goto(0, alias); // lee los datos actuales
    if (!aliasFields)
        return res


    const resultado = {};
    for (const ele of aliasFields) {
        //   console.log('scatter res=', ele)
        resultado[ele] = res[ele]


    }

    // console.log('scatter res=', resultado)
    return resultado

};


/// /////////////////////////////////////////////////
// scatter Lee los registros y pone sus campos en blanco del registro actual
// tipo : MEMVAR (todos los registros), FIELDS (solo los campos que esten en FIELDS )
/// //////////////////////////////////////
export const scatterBlank = async (aliasFields?: [], alias?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    let resultado = {}
    let fields = []


    if (!alias) {
        if (!This.value.are_tra[This.value.num_are - 1]) {
            return false;
        }
        alias = This.value.are_tra[This.value.num_are - 1];
    }

    // checar diferencia entre recnoVal y recno
    // const recno = This.value.View[alias].recnoVal[This.value.View[alias].row].recno;
    // const recno = await goto(0, alias); // lee los datos actuales
    //const recno = await goto(0, alias); // lee los datos actuales

    if (!aliasFields) {
        for (const campo of View[alias].val_def)
            resultado[campo] = View[alias].val_def[campo]
        return resultado
    }

    for (const campo of aliasFields)
        resultado.push(View[alias].val_def[campo])

    return resultado

};


/**
 * Gathers data from the provided array and updates the current record in the specified alias.
 * 
 * @param {[]} from - An array containing data to be gathered and updated in the database.
 * @param {[]?} aliasFields - An optional array of field names that are to be updated.
 *                            If not provided, all fields in the current view's default values will be used.
 * @param {string?} alias - An optional string representing the alias of the view to update.
 *                          If not provided, the current alias in the area of work will be used.
 * 
 * @returns {Promise<null|boolean>} - Returns null if the current record number could not be determined,
 *                                    otherwise performs the update operation.
 */

export const gatherFrom = async (from: [], aliasFields?: [], alias?: string): Promise<null | boolean> => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    //    let resultado = [];
    let fields = []

    if (!alias) {
        if (!This.value.are_tra[This.value.num_are - 1]) {
            return false;
        }
        alias = This.value.are_tra[This.value.num_are - 1];
    }

    if (!aliasFields) {
        aliasFields = []

        for (const campo of This.value.View[alias].val_def) {
            aliasFields.push(campo)
        }
    }

    // checar diferencia entre recnoVal y recno
    // const recno = This.value.View[alias].recnoVal[This.value.View[alias].row].recno;

    const res = await goto(0, alias); // lee los datos actuales

    if (res.length == 0) {  // no hay regisro a actualoizar
        return false;
    }

    const recno = res.recno

    let update = 'UOPDATE now.' + alias + ' SET '
    let sep = ''

    for (const field of aliasFields) {
        if (from[field]) {
            const valor = from[field]
            if (typeof valor == 'string') {
                update = update + sep + field + `='${valor}'`
            } else
                update = update + sep + field + `=${valor}`
            sep = ','
        }

    }

    update = update + ` WHERE recno=${recno} `
    console.log('Db gatherFrom update=', update)
    return await localAlaSql(update);
};



/// //////////////////////////////
// Clona una vista local
// baseAlias: Vista local la cual se va clonar
// alias: Vista en donde quedara la vista clonada
// filters: Variables que filtraran la vista clonada
/// //////////////////////////////
export const localClone = async (
    baseAlias: string,
    alias: string,
    filters?: {},
    force?: boolean
) => {
    if (!filters) filters = {};

    const { This } = toRefs(state) // Hace referencia al valor inicial
    alias = alias.trim();
    let where = "";
    console.log("Db DataBAse LocalCLone filters", filters);
    for (const variable in filters) {
        console.log("Db DataBAse LocalCLone varaible", variable);
        if (where > " ") where = where + " and ";

        var cam = filters[variable];
        var campo = "";
        const tipo = typeof cam;
        var comillas = "";
        var com_trim = "";
        var ter_trim = "";
        switch (tipo) {
            case "number":
                campo = cam.toString();
                break;
            case "bigint":
                campo = cam.toString();
                break;
            case "boolean":
                campo = cam ? "1" : "0";
                break;
            case "string":
                comillas = "'";
                campo = cam.trim();
                com_trim = "trim(";
                ter_trim = ")";
                break;
        }

        where =
            where +
            `${com_trim} ${variable} ${ter_trim}=${comillas}${campo}${comillas}`;
    }
    if (where > "") where = " where " + where;

    console.log("Db DataBase Clone where ", where);

    if (!This.value.View[alias] || force) {
        // si no existe el alias
        This.value.View[alias] = This.value.View[baseAlias]; // Copiamos su definicion

        // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
        let des_tab = " CREATE TABLE " + alias + " (recno INT PRIMARY KEY";
        const est_tabla = This.value.View[alias].est_tabla;
        for (const nom_ele in est_tabla) {
            // genera la descripcion de la tabla para generarla en alasql
            des_tab = des_tab + "," + nom_ele + " " + est_tabla[nom_ele].tip_cam;
        }

        des_tab = des_tab + ");";
        // Creamos la tablas
        await localAlaSql("USE last ; DROP TABLE IF EXISTS last." + alias + "; " + des_tab + "; ");
        await localAlaSql("USE now ; DROP TABLE IF EXISTS now." + alias + "; " + des_tab + "; ");
        //console.log('Db clone DB ',    await localAlaSql('select * from '+ alias ))
    }

    // borramos los datos
    await useNodata(alias);

    //console.log('Db Clone Datos  ',baseAlias,alias,await This.value.localSql(`select * from now.${baseAlias}  ${where}`))

    var query = `select *  from now.${baseAlias}  ${where}`;

    const respuesta = await localSql(query);
    //console.log("Db Clone respuesta ", query, respuesta);

    // Generamos el campo recno
    if (respuesta.length > 0) {
        const recnoVal = [];
        for (let i = 0; i < respuesta.length; i++) {
            const recno = respuesta[i].recno;
            respuesta[i].recno = i + 1;
            /*  if (respuesta[i].recno!=recno){
               query = `update now.${alias} set recno=${respuesta[i].recno} where recno=${recno} `
               await This.value.localSql(query)
             }
            */

            recnoVal[i] = { recno: i + 1, id: i };
            await localAlaSql("INSERT INTO now." + alias + " VALUES ?", [
                respuesta[i],
            ]);
            await localAlaSql("INSERT INTO last." + alias + " VALUES ?", [
                respuesta[i],
            ]);
        }

        console.log("Db Clone now ", await localSql("select * from now." + alias));

        //Generamos el last
        //query = `select * INTO last.${alias} from New.${alias}`

        This.value.View[alias].recno = respuesta.length; // asignamos el ultimo numero registro de trabajo
        This.value.View[alias].recCount = respuesta.length; // registros totales
        //    This.value.View[alias]["tablaSql"] = alias // tabla en servidor SQL
        This.value.View[alias].data = respuesta[respuesta.length - 1]; // asignamos el valor del ultimo registro
        This.value.View[alias].recnoVal = [...recnoVal]; // utilizamos el spread Operator
        alasql('USE now;')

        return true
    }
    This.value.View[alias].recno = -1; // asignamos el ultimo numero registro de trabajo
    This.value.View[alias].recCount = 0; // registros totales
    //    This.value.View[alias]["tablaSql"] = alias // tabla en servidor SQL
    This.value.View[alias].data = []; // asignamos el valor del ultimo registro
    This.value.View[alias].recnoVal = []; // utilizamos el spread Operator
    alasql('USE now;')
    return true
};

/**
 * JasperReport
 *
 * Genera un reporte en PDF con JasperReport
 * @param {string} query - Consulta SQL que se usara para generar el reporte
 * @param {string} for_rep - Contenido del archivo jrxml
 * @param {string} [dataView=''] - Nombre de la vista que se usara para generar el reporte
 * @returns {Promise<Buffer>} - Buffer con el contenido del reporte en PDF
 */
export const jasperReport = async (query: string, for_rep: string, dataView?: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    if (!dataView) dataView = "";

    const dat_rep = {
        id_con: This.value.session.id_con,
        tip_llamada: "JASPERREPORT",
        jrxml: for_rep,
        dataView,
        query,
    };
    //    console.log("Db JasperReport Llamada", dat_rep);
    // display contruyendo reporte

    try {
        const response = await axios.post(This.value.session.url + "sql", dat_rep, {
            responseType: "arraybuffer",
        });
        //      console.log;
        return response.data;
    } catch (error) {
        errorAlert("Report Server Error  :" + error.response.statusText);
        //await MessageBox(error.response.statusText, 16, "Report Server Error  ");
        return null;
    }

    //   const buffer=await axiosCall(dat_rep)
    //   return buffer
}

export const timbraCFDI = async (tdo_tdo: string, ndo_doc: number) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial

    const dat_timbrado = {
        // id_con: This.value.session.id_con,
        tip_llamada: "GENCFDI",
        tdo_tdo: tdo_tdo,
        ndo_doc: ndo_doc
    };

    try {
        const response: any = await axiosCall(dat_timbrado);
        return true;
    } catch (error) {
        errorAlert("Timbra CFDI  :" + error.response.statusText);
        return false;
    }
}


export function dropView(alias: string) {
    localAlaSql(
        "USE now ; DROP TABLE IF EXISTS now." + alias + ";"
    );
    localAlaSql(
        "USE last ; DROP TABLE IF EXISTS last." + alias + ";"
    );

    delete This.value.View[alias]
    alasql('USE now;')

}
/// //////////////////////////////
// portea la funcion alasql a VfpCursor
/// //////////////////////////////
export const VfpCursor = async (query: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    const data = await localAlaSql(query);
    // console.log('Db VfpCursor ==>', data)
    return data;
};

export const xmlToCursor = async (xml: string, alias: string) => {
    const { This } = toRefs(state) // Hace referencia al valor inicial
    xml = xml.replace('<VFPData>', '')
    xml = xml.replace('</VFPData>', '')
    const jsonString = xml2js(xml, { compact: true, spaces: 2 });
    const data = [jsonString.data._attributes]
    alasql(`USE now; CREATE TABLE ${alias};`);
    alasql.tables[alias].data = data;

}

const errorAlert = async (message: string) => {

    await MessageBox(message, 16, "SQL Server Error  ");
    //alert(message);
}

// Fin de la clase================================

