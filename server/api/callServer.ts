
//import fs from '@/node_modules/file-system/file-system.js';

///////// Funciones nativas de NodeJS /////////
import fs from 'fs'
import { exec } from 'child_process'
////////////////////////////////////////////


import dat_emp from './Empresas.json'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const call = body.call  // obtiene el tipo de llamada


  switch (call) {
    case 'leeEmpresas':

      body.data = dat_emp
      return dat_emp

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
