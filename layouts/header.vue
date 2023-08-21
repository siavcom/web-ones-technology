<template>
  <div id="app-layout-header">

    <div style="width: 80%;
                            height: 55px;
                            display: flex;">
      <img class="logoVue" src="@/assets/logo.png" style="width:50px;height:50px;" />
      <div class="Web-ones">
        <img class="logoVue" src="@/assets/logo.png" style="width:50px;height:50px;" />eb-Ones Technology
      </div>

      <div class="Company" style="align-self:flex-end;margin-left: auto;">
        <div class='title' v-if="nomEmp" style="display:flex; item-align:flex-end">

        </div>
        <img v-if="logoEmp.length > 5" class="logoEmp" :src="logoEmp" style="width:50px;height:50px; float: inline-end;" />
        <div class="dataEmp" style="display:flex; flex-wrap:wrap;item-align:flex-end">
          <div  style="flex: 1; text-align: left;">{{ nomEmp }}</div>
          <div class="break"></div>
          <div class="date"  >{{ fpo_pge }}</div>

        </div>
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
  fpo_pge: string;
  
}>()

//const logoEmp = ref(props.logoEmp)
//logoEmp.value = "/logos/Logo_Empresa.png"
//const nomEmp = ref(props.nomEmp)
//nomEmp.value = "Siavcom Software"

</script>