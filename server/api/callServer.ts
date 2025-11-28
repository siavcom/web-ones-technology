/*
************** Nitro Storage *******************     
https://click.convertkit-mail.com/lmumr5503gtmhn6n54xt6h83x5400bghn382/25h2h9u337vlm7u8/aHR0cHM6Ly9taWNoYWVsbnRoaWVzc2VuLmNvbS93ZWVrbHktMjM4LW9jdG9iZXItMDg=

Nitro, the server that Nuxt uses, comes with a very powerful key-value storage system:
const storage = useStorage();

// Save a value
await storage.setItem('some:key', value);

// Retrieve a value
const item = await storage.getItem('some:key');
***********************************************


*/

//import fs from '@/node_modules/file-system/file-system.js';

///////// Funciones nativas de NodeJS /////////
//import fs from 'fs'
import { exec } from 'child_process'
import fs from 'fs/promises'; // Use fs.promises for async/await
import { unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { promisify } from 'util';


//import openssl from 'openssl-nodejs'

const execAsync = promisify(exec);
let intentos = 0

////////////////////////////////////////////

//import dat_emp from './Empresas.json'
export default defineEventHandler(async (event) => {
  intentos++
  //const sqlServer = require("./app/siavcom.controllers.js");

  const path = '/sistemas/web-ones/public'
  const body = await readBody(event)

  const call = body.call  // obtiene el tipo de llamada

  let data: any
  let nameFile = ''
  const Fs = fs

  switch (call) {
    case 'sql':
      const sqlCall = body.sqlCall
      const req = body.sqlReq
      const result = {}
      //data = sqlServer[sqlCall](req, result)
      return data

    case 'leeEmpresas':


      // para funcionar con bun y node al mismo tiempo se utiliza leer con formato "utf-8" 
      // original
      // data=fs.readFileSync(path + '/Empresas.json')

      const res = await fs.readFile(path + '/Empresas.json', "utf-8")
      data = JSON.parse(res)

      body.data = data
      return data

    case 'readFile':
      nameFile = body.nameFile.trim()
      try {
        const contents = await fs.readFile(path + nameFile);
        body.data = data
        return data
      } catch (error) {
        body.data = null
      }
      return

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
    case 'OpenSSL':

      console.log('=====================Intentos====================', intentos)
      // Add OpenSSL logic here
      const tempInput = join(tmpdir(), `input_${Date.now()}.der`);
      const tempOutput = join(tmpdir(), `output_${Date.now()}.pem`);

      const par = body.params;
      // console.log('Parametros para OpenSSL:', par);

      const findPass = par.indexOf('-passin');
      const pwd_cer = findPass >= 0 ? par[findPass + 1] : ''

      const findIn = par.indexOf('-in');

      if (findIn >= 0) {
        const base64 = par[findIn + 1]
        //const certBuffer = Buffer.from(base64, 'base64');
        const derBuffer = Buffer.from(base64, 'base64');
        await Fs.writeFile(tempInput, derBuffer);
        par[findIn + 1] = tempInput
      }

      let command = 'openssl '
      for (let i = 0; i < par.length; i++) {
        switch (par[i]) {
          case '-in':
            command = command + par[i] + ` ${tempInput} `
            i++
            break;
          case '-passin':
            command = command + par[i] + ` pass:${pwd_cer} `
            i++
            break;

          default:
            command = command + par[i] + ' '
            break;
        }
      }
      // escribimos el resultado
      command = command + ` -out ${tempOutput}`;

      //        const command = `openssl pkcs8 -passin ${pwd_cer} -inform DER -in ${tempInput} -out ${tempOutput}`;

      // console.log('======== OpenSSL Comando a ejecutar :', command);

      try {
        const { stdout, stderr } = await execAsync(command);
        // Leer resultado
        const sslResult = await Fs.readFile(tempOutput, 'utf8');
        //console.log('Resultado:', sslResult, tempInput, tempOutput);
        body.data = sslResult
        return {
          success: true, result: sslResult, stdout: stdout,
          stderr: stderr
        }
      }
      catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: `OpenSSL error: ${error.message}`
        });
      } finally {
        // Limpiar archivos temporales
        try { unlinkSync(tempInput); } catch (e) { }
        try { unlinkSync(tempOutput); } catch (e) { }
      }

      break
    case 'enc_pal':
      console.log('========================> enc_pal', body.params)
      const pal_enc: string = body.params.pal_enc

      let pos = 0

      let clave = ''							// encripta password
      let lon_pal = pal_enc.length
      pos = 1

      for (let j = 1; j <= lon_pal; j++) {

        let Asc = pal_enc.substring(j, j + 1).charCodeAt(0)  // obtiene el codigo ascii

        if (Asc == 32)
          clave = clave + String.fromCharCode(Asc + pos)
        else
          switch (pos) {
            case 1:
              clave = clave + String.fromCharCode(Asc + 1)
              break;
            case 2:
              clave = clave + String.fromCharCode(Asc - 2)
              break;
            case 3:
              clave = clave + String.fromCharCode(Asc + 3)
              break;
            case 4:
              clave = clave + String.fromCharCode(Asc - 4)
              break;
            default:
              break;
          }
        pos = pos < 4 ? pos + 1 : 1

      }  //Endfor
      return clave

      break


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
