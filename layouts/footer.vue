<template>
  <div id="app-layout-footer">

    <div id="user"> User: {{ props.user }}
    </div>
    <NuxtLink id="manual" to="http://siavcom.com.mx/help/Archivos/Menu%20general%20del%20sistema.html" external>
      ERP Siavcom Manual!
    </NuxtLink>
  </div>
  <!--img class="mt-6 mb-2 rounded border" :src="qrcode" alt="QR Code"-->
</template>
<script lang="ts" setup>
// para usar esto npm i @vueuse/integrations

/*
import { useQRCode } from '@vueuse/integrations/useQRCode'

const qrcode = useQRCode('http://siavcom.com.mx', {
  errorCorrectionLevel: 'H',
  margin: 3,
})
*/
//console.log('QR :', qrcode)

interface Props {
  user: string
}

const props = withDefaults(defineProps<Props>(), {
  user: ''
})
</script>