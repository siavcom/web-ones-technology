//import fs from '@/node_modules/file-system/file-system.js';

///////// Funciones nativas de NodeJS /////////
import fs from 'fs'
//import { readFile } from 'node:fs/promises'
import { exec } from 'child_process'
////////////////////////////////////////////


//import dat_emp from './Empresas.json'
export default defineEventHandler(async (event) => {
  const path = '/sistemas/web-ones/public'
  const body = await readBody(event)

  const call = body.call  // obtiene el tipo de llamada

  let data: any
  let nameFile = ''

  switch (call) {
    case 'leeEmpresas':
      data = fs.readFileSync(path + '/Empresas.json')
      body.data = data

      return data

    case 'readFile':
      nameFile = body.nameFile.trim()
      try {
        const contents = fs.readFileSync(path + nameFile);
        body.data = data
        return data
      } catch (error) {
        body.data = null
      }
      return

    case 'imgBase64':

      nameFile = body.nameFile.trim()
      console.log('1) =========================> Comienza leeArchivo data=', path + nameFile)
      const tipArchivo = nameFile.trim().slice(-3)

      try {
        //const contents = await readFile(path + nameFile, { encoding: 'base64' });
        const contents = fs.readFileSync(path + nameFile, { encoding: 'base64' });
        data = `data:image/${tipArchivo};base64,` + contents
        body.data = data
        console.log('2) =========================> Termino leeArchivo data=', path + nameFile, data.slice(0, 50))
        return data
      } catch (error) {
        body.data = null
      }
      return //data
    case 'print':
      const Fs = fs

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

      Fs.writeFile(file, buffDatos, function (err) {
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

    default:
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
