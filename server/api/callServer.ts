/////////////////////////////////////////////
// Description : Servidor backEnd 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2025-02-12
// Update Date  :  2025-12-27
/////////////////////////////////////////////

/*
************** Nitro Storage *******************     
https://click.convertkit-mail.com/lmumr5503gtmhn6n54xt6h83x5400bghn382/25h2h9u337vlm7u8/aHR0cHM6Ly9taWNoYWVsbnRoaWVzc2VuLmNvbS93ZWVrbHktMjM4LW9jdG9iZXItMDg=

Nitro, the server that Nuxt uses, comes with a very powerful key-value storage system:
const storage = useStorage(<storageName>?); // <storageName> is optional

// Save a value
await storage.setItem('some:key', value);

// Retrieve a value
const item = await storage.getItem('some:key');
***********************************************
*/


//const storage = useStorage();
// Retrieve a value
//const item = await storage.getItem('some:key');
/////////////  librerias sql server ///////////////
//import MSSQL from "tedious"  //MSSQL
import MSSQL from "mssql";
import postgres from 'postgres'

//import fs from '@/node_modules/file-system/file-system.js';

///////// Funciones nativas de NodeJS /////////
//import fs from 'fs'
import { exec } from 'child_process'
import fs from 'fs/promises'; // Use fs.promises for async/await
//import { unlinkSync } from 'fs';
//import { join } from 'path';
//import { tmpdir } from 'os';
import { promisify } from 'util';
//import { log } from "console";

const execAsync = promisify(exec);
////////////////////////////////////////////

const config = useRuntimeConfig()
const path = config.webOnesServer
const sqlNitro = config.sqlNitro

let empresasJson = {}

let SQLServer: postgres.Sql<{}> | null

let serverConfig = {}
let sqlConfig = {}
const sqlPool: any = {}
const connections: any = {}


export default defineEventHandler(async (event) => {

  let user: string = ''
  let id_con: string = ''

  /**
   * 
   * @param query 
   * @param id_con  ID de la conexión
   * @returns sql rows
   */
  async function streamData(query: string, id_con: string) {
    let rows: any[] = []
    if (connections[id_con].dialect == 'mssql') {


      try {
        const config = sqlConfig
        // let pool = await MSSQL.connect(config);

        // 1. Crear la solicitud y activar el modo stream
        //const request = new MSSQL.Request(pool);
        const request = sqlPool[id_con].Request();
        request.stream = true;

        // 2. Ejecutar la consulta
        request.query(query);

        // 3. Manejar eventos
        request.on('row', row => {
          console.log('Fila recibida:', row);
          rows.push[row];

          // Procesar cada fila individualmente aquí
        });

        request.on('error', err => {
          console.error('Error en stream:', err);
        });

        request.on('done', result => {
          console.log('Stream finalizado con éxito.');
          sqlPool[id_con].close();
          return rows
        });

      } catch (err) {
        console.error('Error de conexión:', err);
      }

    }

  }


  /**
   * 
   * @param sqlQuery 
   * @param id_con  ID de la conexión
   * @returns sql result
   */
  async function SqlExec(sqlQuery: string, id_con: string) {
    let result

    if (connections[id_con].dialect == 'mssql') {
      //(async () => {

      try {
        //  const request = new sqlPool.Request(sqlPool[id_con]);

        const Request = await sqlPool[id_con].request()
        const result = await Request.query(sqlQuery);
        // Funciona 
        //const result = await sqlPool[id_con].request().query(sqlQuery);

        // const result = await request.query(sqlQuery);
        // console.log('1) ========================SQLExec ====================== result=', result.recordsets[0][0])
        return result.recordsets;
      } catch (err) {
        console.error('Error de conexión:', err);
        return err
      }

    }

    if (connections[id_con].dialect === 'posgres') {

      try {
        result = sqlPool[id_con].query(sqlQuery)
        // result = sqlPool[id_con]`${sqlQuery}`
        return result
        // Example: const result = await SQLServer(sqlQuery);
      } catch (err) {
        console.error('Error de conexión:', err);
        return err
      }
    }

    console.log('SQLExec result=', result)
    // return result;
  }

  // const sqlServer = require("./app/controllers/siavcom.controllers.js");

  //const sqlServer = require("./app/siavcom.controllers.js");


  //const path = '/sistemas/web-ones/public'
  const body = await readBody(event)
  const call = body.call  // obtiene el tipo de llamada
  let con_id = ''
  if (body.user)
    user = body.user

  if (body.id_con) {
    id_con = body.id_con
    con_id = 'sql:' + id_con
    const currentTime = new Date()

    // Borramos id_conexion con mas de un dia sin uso
    const pullConnection = connections
    for (const idCon in pullConnection) {
      const difMinutos = Math.abs(currentTime - connections[idCon].time) / (1000 * 60 * 60 * 60);;
      if (difMinutos > 60 * 24) { // Si tiene un dia sin utilizar
        delete connections[idCon]
        //connections.splice(1, 0, idCon);
        delete sqlPool[idCon]
        await useStorage().removeItem(con_id)

        //.deleteItem(con_id)
      }
    }

    if (connections[id_con]) { // aactualiza la conexion 
      connections[id_con].time = currentTime
      await useStorage().setItem(con_id, connections[id_con])
    }
  }


  let data: any
  let nameFile = ''
  const Fs = fs
  //  let SQLServer = null

  let result: any


  switch (call) {
    case 'leeEmpresas':
      // para funcionar con bun y node al mismo tiempo se utiliza leer con formato "utf-8" 
      // original
      // data=fs.readFileSync(path + '/Empresas.json')

      const res = await fs.readFile(path + '/Empresas.json', "utf-8")
      empresasJson = JSON.parse(res)

      body.data = empresasJson
      return empresasJson

    case 'iniEmpresa':
      //  const config = useRuntimeConfig()

      console.log('>>>>>>>>>>>>>>>>callServer sqlNitro=', sqlNitro)
      if (sqlNitro) {
        const empresa = body.empresa

        const pos = empresa.indexOf('@')
        let nombreEmpresa = ''

        if (pos >= 0)
          nombreEmpresa = empresa.substring(0, pos)
        else
          nombreEmpresa = empresa

        result = {
          result: 'Ok',
          logoEmp: '',
        }

        try {  // Lee el archivo de configuración del SQLServer de la empresa
          let leeEmp = await fs.readFile(path + '/' + nombreEmpresa + '/config.json', "utf-8")

          serverConfig = JSON.parse(leeEmp)
          sqlConfig = serverConfig.sqlConfig
          const mailServer = serverConfig.mailServer ? serverConfig.mailServer : '{}'
          // Save a value
          //   await storage.setItem(mailServer:mailServer);

          const mailServerKey = `mail:${nombreEmpresa}`
          console.log('1)  callServer >>>>>>>>>>   server key=' + mailServerKey, await useStorage().getItem(mailServerKey));

          await useStorage().setItem(mailServerKey, mailServer)



          //await useStorage().setItem('mail:Server', mailServer)
          //        console.log('2)  >>>>>>>>>>serverConfig=', await useStorage().getItem('mail:Server'))

          //const serverConfig = JSON.parse(leeEmp)

          sqlConfig.user = user.trim()
          sqlConfig.password = body.password
          let data: any = []

          //console.log('2)  >>>>>>>>>>iniEmp leeEmp sqlConfig=', sqlConfig)

          if (sqlConfig.dialect == 'mssql') {
            sqlPool[id_con] = await MSSQL.connect(sqlConfig);
          }
          if (sqlConfig.dialect == 'posgres') {
            sqlPool[id_con] = await postgres(sqlConfig)
          }

          connections[id_con] = {
            time: new Date(),
            dialect: sqlConfig.dialect,
            nom_emp: nombreEmpresa
          }
          await useStorage().setItem(con_id, connections[id_con]) // guardamos la conexion

          console.log('1)  >>>>>>>>>>iniEmp leeEmp sqlConfig poolConnections=', connections)

          //console.log('Test1====', await SqlExec(" select top 10 nom_doi from man_comedoi where cla_isu='LOGO' ", user))

          let query = `select arc_doi,nom_doi from man_comedoi where cla_isu='LOGO' and tip_doi='F' and con_doi=1 `
          data = await SqlExec(query, id_con)

          // console.log('1) data=', data[0][0].nom_doi)
          if (!data[0][0] || !
            data[0][0].arc_doi || data[0][0].arc_doi.length == 0) {
            query = `select arc_doi,nom_doi from man_comedoi where cla_isu='LOGO' and tip_doi='F' and con_doi=0 `
            data = await SqlExec(query, id_con)
            //  console.log('2) data=', data[0][0].nom_doi)
            // console.log('2) XXXXX  LeeLogo Logo[0][0] 1 =', data[0][0])
          }

          // El data se obtiene de la base de datos
          if (data[0][0] && data[0][0].arc_doi && data[0][0].arc_doi.length >= 10) {
            const tipArchivo = data[0][0].arc_doi.trim().slice(-3)
            result.logoEmp = `data:image/${tipArchivo};base64,` + data[0][0].arc_doi
            return result
          }
          // El logo se obtiene del servidor si no se encuentra en la base de datos
          if (empresasJson[empresa] && empresasJson[empresa].logoEmp && empresasJson[empresa].logoEmp.length > 0) {
            const logoEmp = empresasJson[empresa].logoEmp

            // console.log('1) =========================> Comienza leeArchivo logoEmp=', path + logoEmp)
            const tipArchivo = logoEmp.trim().slice(-3)
            try {
              //const contents = await readFile(path + nameFile, { encoding: 'base64' });
              const contents = await fs.readFile(path + logoEmp, { encoding: 'base64' });
              data = `data:image/${tipArchivo};base64,` + contents

              // body.data = data
              // console.log('2) =========================> Termino leeArchivo body=', body)
              result.logoEmp = data;
            } catch (err) {

              result = { error: true, message: 'Error reading logo file: ' + logoEmp }
              console.log(result)
            }
          }
        } catch (error) {

          result = { error: true, message: "Can't connect to SQL Server" }
          console.log(error)

        }
        return result;
      }
      break

    case 'sqlExec':
      const sqlQuery = body.sqlQuery;
      return SqlExec(sqlQuery, id_con)
    // Execute the SQL query using the appropriate database client


    case 'readFile':
      nameFile = body.nameFile.trim()
      try {
        const contents = await fs.readFile(path + nameFile);
        body.data = data
        return data
      } catch (error) {
        body.data = null
        return error
      }
      return

    /*
       case 'imgBase64':
   
       nameFile = body.nameFile.trim()
       //console.log('1) =========================> Comienza leeArchivo data=', path + nameFile)
       const tipArchivo = nameFile.trim().slice(-3)
   
       try {
         //const contents = await readFile(path + nameFile, { encoding: 'base64' });
         const contents = await fs.readFile(path + nameFile, { encoding: 'base64' });
         data = `data:image/${tipArchivo};base64,` + contents
         body.data = data
         // console.log('2) =========================> Termino leeArchivo data=', path + nameFile, data.slice(0, 50))
         return data
       } catch (error) {
         body.data = null
       }
       return //data
    
       case 'print':
       // Fs.writeFile('/tmp/test.txt', body.data)
       const datos = body.data
       //let buffDatos = datos
       // generamos un archivo temporal a imprimir
       let buffDatos = ''
       for (let i = 0; datos.length > i; i++) {
         for (const dato in datos[i]) {
           const caracter = String.fromCharCode(datos[i][dato])
           buffDatos = buffDatos + caracter
         }
   
       }
       //      const file = '/tmp/ticket' + ((Math.random() * 100).toFixed(0)).toString() + '.txt'
       const file = '/tmp/ticketBascula.txt'
   
       await Fs.writeFile(file, buffDatos, function (err) {
         if (err) {
           return console.log(err);
         }
         exec('lp -d Epson-TM-Impact-Receipt ' + file, function (err) {
           if (err) {
             return console.log(err);
           } else {
             exec('rm ' + file)
             return
   
           }
         }
         )
       })
   
       break
       */

  }



  return null




});




/*

<script setup lang="ts">
 const { data } = await useFetch('/api/callServer',
      {
        method: 'post',    // Se necesita para que haga la llamada y retorne los datos
        body: { call: 'leeEmpresas' }
      }
    )
}
</script>


*/




/*
Para que este código compile sin errores, necesitas instalar los tipos:
npm install -D @types/node @types/pg @types/pg-query-stream
(Nota: JSONStream no suele tener tipos oficiales actualizados, por lo que usaremos un import compatible o require si prefieres evitar configuraciones complejas de d.ts).
typescript

import * as fs from 'fs';
import { Pool, PoolClient } from 'pg';
import QueryStream from 'pg-query-stream';
// @ts-ignore (JSONStream no tiene tipos definidos en DefinitelyTyped a veces)
import JSONStream from 'JSONStream';

// Configuración de la conexión
const pool: Pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_password',
  port: 5432,
});

async function exportToJson(): Promise<void> {
  const client: PoolClient = await pool.connect();
  const filePath: string = './resultado_usuarios.json';
  
  try {
    // 1. Crear el flujo de escritura al archivo
    const fileStream: fs.WriteStream = fs.createWriteStream(filePath);

    // 2. Definir la consulta y el flujo de Postgres
    const query: QueryStream = new QueryStream('SELECT id, nombre, email FROM usuarios');
    const dbStream: QueryStream = client.query(query);

    console.log('Iniciando exportación...');

    // 3. Conectar los flujos (Piping)
    dbStream
      .pipe(JSONStream.stringify('[', ',', ']'))
      .pipe(fileStream);

    // Manejo de eventos
    fileStream.on('finish', () => {
      console.log(`✅ Exportación completada: ${filePath}`);
      client.release();
      pool.end();
    });

    dbStream.on('error', (err: Error) => {
      console.error('❌ Error en el stream de la base de datos:', err.message);
      client.release();
    });

  } catch (err) {
    console.error('❌ Error de conexión o ejecución:', err);
    client.release();
  }
}

exportToJson();
*/