<template>
  <div id="app-layout-header">

    <div style="width: 49%;
                            height: 50px;
                            display: flex;">
      <img class="logoVue" src="@/assets/logo.png" style="width:50px;height:50px;" />
      <div class="Web-ones">
        <img class="logoVue" src="@/assets/logo.png" style="width:50px;height:50px;" />eb-Ones Technology
      </div>

      <div style="vertical-align:middle; text-align:right;">
        {{ nomEmp }}
        <img class="logoEmp" :src="LogoEmp" style="width:50px;height:50px;" />

      </div>

    </div>
    <slot />
  </div>
</template>


<script lang="ts" setup >

const props = defineProps<{
  logoEmp: string;
  nomEmp: string;
}>()

const LogoEmp = ref(props.logoEmp)
LogoEmp.value = "/img/Logo_Empresa.png"
const nomEmp = ref(props.nomEmp)
//nomEmp.value = "Siavcom Software"

</script>