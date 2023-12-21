<template>
  <div id="app-layout-footer">

    <div id="user"> User: {{ props.user }}
    </div>
    <NuxtLink id="manual" to="http://siavcom.com.mx/help/Archivos/Menu%20general%20del%20sistema.html" external>
      ERP Siavcom Manual!
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup >

interface Props {
  user: string
}

const props = withDefaults(defineProps<Props>(), {
  user: ''
})
</script>