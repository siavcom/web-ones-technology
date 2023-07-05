<template>
  <div id="app-layout-header">

    <div style="width: 49%;
                            height: 50px;
                            display: flex;">
      <img class="logoVue" src="@/assets/logo.png" style="width:50px;height:50px;" />
      <div class="Web-ones">
        <img class="logoVue" src="@/assets/logo.png" style="width:50px;height:50px;" />eb-Ones Technology
      </div>
      <div v-if="nomEmp" style=" text-align:right;">
        <p>{{ nomEmp }}</p>
        <p>{{ fpo_pge }}</p>
                
        <img v-if="logoEmp" class="logoEmp" :src="logoEmp" style="width:50px;height:50px;" />
      </div>

    </div>
  </div>
</template>


<script lang="ts" setup >
//vertical-align:middle;
const props = defineProps<{
  logoEmp: string;
  nomEmp: string;
  titleName: string;
  fpo_pge:string;
}>()

//const logoEmp = ref(props.logoEmp)
//logoEmp.value = "/img/Logo_Empresa.png"
//const nomEmp = ref(props.nomEmp)
//nomEmp.value = "Siavcom Software"

</script>