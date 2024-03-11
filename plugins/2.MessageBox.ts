/// ///////////////////////////////////////////
// Clase : MessageBox
// Author : Fernando Cuadras Angulo
// Creacion : Julio /2022
// Ult.Mod  : 22/Junio/2022
/////////////////////////////////////////////



import 'sweetalert2/dist/sweetalert2.min.css';


export default defineNuxtPlugin(() => {
  return {
    provide: {
      MessageBox: async (texto: string, tipo?: number, title?: string, timer?: number) => {
        /// ////////////////////////////
        if (!tipo)
          tipo = 0
        const { $swal } = useNuxtApp()
        let tip_ale = 'promp' // tipo de alerta 'promp'  'alert' 'confirm' 'warning'
        let icon = 'error' // tipo de icono  warning, error, success, info, and question
        // let showDenyButton = true
        let showCancelButton = true
        let showConfirmButton = true
        let showDenyButton = true

        let cancelButtonText = 'Cancel'
        let confirmButtonText = 'Ok'
        let denyButtonText = 'No'
        let timerProgressBar = false

        if (timer && timer > 5000) { timerProgressBar = true }

        cancelButtonText = '<i class="fa fa-thumbs-down"></i>'
        const confirmButtonAriaLabel = 'Thumbs up, correcto!'

        const reverseButtons = true

        let valor = tipo
        let val_ini = 512
        //  const sw_16 = false

        while (valor > 5) {
          valor = val_ini - valor
          if (valor > 5) { val_ini = val_ini / 2 }
        }
        //console.warn('messageBox 2',valor,tipo)

        switch (valor) {
          case 0: // ok
            //console.log('messagebox 0')

            icon = 'success'
            tip_ale = 'alert'
            showCancelButton = false
            showConfirmButton = true
            // confirmButtonText = 'OK'
            confirmButtonText = '<i class="fa fa-thumbs-up"></i> Great!'
            showDenyButton = false
            break
          case 1: // ok + cancel
            tip_ale = 'confirm'
            icon = 'info'
            showCancelButton = true
            showConfirmButton = true
            showDenyButton = false
            break
          case 2: // abort,retry and Ignore
            denyButtonText = 'Abortar'
            confirmButtonText = 'Retry'
            cancelButtonText = 'Cancel'

            tip_ale = 'confirm'
            icon = 'question'
            break
          case 3: // yes,no and cancel
            showCancelButton = true
            showConfirmButton = true
            showDenyButton = true
            tip_ale = 'confirm'
            icon = 'question'

            break
          case 4: // yes and no
            showCancelButton = false
            showConfirmButton = true
            showDenyButton = true
            tip_ale = 'confirm'
            icon = 'question'
            break
          case 5: // retry and cancel
            confirmButtonText = 'Reintentar'
            cancelButtonText = 'Abortar'
            showDenyButton = false
            icon = 'question'
            tip_ale = 'confirm'

            break

          default:
            break
        }

        valor = valor > 0 ? tipo - valor : tipo // restamos el primer resultado

        val_ini = 512
        while (valor > 16) {
          valor = val_ini - valor
          if (valor > 16) { val_ini = val_ini / 2 }
        }
        //console.warn('messageBox 3',valor,tipo)


        switch (valor) {
          case 16: // stop sign
            //console.log('messagebox 16')
            tip_ale = 'alert'
            icon = 'error'
            showCancelButton = false
            showConfirmButton = true
            // confirmButtonText = 'OK'
            showDenyButton = false
            break
          case 32: // Question mark
            tip_ale = 'promp'
            icon = 'question'
            break
          case 48: // Exclamation point
            tip_ale = 'warning'
            icon = 'info'
            showCancelButton = false
            showConfirmButton = false
            showDenyButton = false

            break
          case 64: // Information icon l
            tip_ale = 'alert'
            icon = 'info'
            break
          default:
            break
        }


        valor = valor > 0 ? tipo - valor : tipo // restamos el primer resultado        


        val_ini = 512
        while (valor > 511) {
          valor = val_ini - valor
          if (valor > 511) { val_ini = val_ini / 2 }
        }
        //console.warn('messageBox 4',valor,tipo)
        switch (valor) {
          case 256: // 2 button default
            break
          case 512: // 3 button
            break
          default:
            break
        }

        valor = tipo - valor // restamos el primer resultado

        /// ////////////////////////////////////////
        // Opciones Swal https://sweetalert2.github.io/
        /// ///////////////////////
        /*
        showConfirmButton true 	If set to false, a "Confirm"-button will not be shown.
        showDenyButton false 	If set to true, a "Deny"-button will be shown. It can be useful when you want a popup with 3 buttons.
        showCancelButton false 	If set to true, a "Cancel"-button will be shown, which the user can click on to dismiss the modal.
        confirmButtonText 'OK' 	Use this to change the text on the "Confirm"-button.
        denyButtonText 'No' 	Use this to change the text on the "Deny"-button.
        cancelButtonText 'Cancel' 	Use this to change the text on the "Cancel"-button.
        confirmButtonColor undefined 	Use this to change the background color of the "Confirm"-button. The default color is #3085d6
        denyButtonColor undefined 	Use this to change the background color of the "Deny"-button. The default color is #dd6b55
        cancelButtonColor undefined 	Use this to change the background color of the "Cancel"-button. The default color is #aaa
        confirmButtonAriaLabel '' 	Use this to change the aria-label for the "Confirm"-button.
    
        confirmButtonAriaLabel: 'Thumbs up, correcto!',
    
        denyButtonAriaLabel '' 	Use this to change the aria-label for the "Deny"-button.
        cancelButtonAriaLabel
    
        isConfirmed: false
        â€
        isDenied: true
        â€
        isDismissed: false
    
        */
        // No se importa swetAlert Ya que se importo desde cuando se hace la app de Vue
        let resultado = 0
        //await app.$swal({
        //const { swal } = useNuxtApp()
        await $swal.fire({
          title,
          text: texto,
          timer,
          timerProgressBar,
          reverseButtons,

          showConfirmButton,
          showCancelButton,
          showDenyButton,

          confirmButtonText,
          cancelButtonText,
          denyButtonText,

          confirmButtonAriaLabel,
          icon
        }).then((result) => {
          if (tip_ale === 'alert') { resultado = 0 } else {
            /*
                  Ok 1
                  Cancel 2
                  Abort 3
                  Retry 4
                  Ignore 5
                  Yes 6
                  No 7
      
                  */
            //          console.log('MessageBox resultado===>',tip_ale,result,result.isConfirmed)

            if (result.isConfirmed) { resultado = 6 }
            if (result.isDenied) { resultado = 7 }
            if (result.isDismissed) { resultado = 2 }
          }
        })
        //     console.log('MessageBox por aqui salio')
        return resultado
      }
    }
  }
}
)
