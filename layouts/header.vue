<template>
  <div id="app-layout-header" >

    <div style="width: 80%;
                            height: 55px;
                            display: flex;">
      <!--img class="logoVue" :src="logo" style="width:50px;height:50px;" /-->
      <div class="Web-ones">
        <img class="logoVue" :src="logo" style="width:50px;height:50px" />eb-Ones Technology
      </div>

      <div class="Company" style="align-self:flex-end;margin-left: auto;">
        <div class='title' v-if="nomEmp" style="display:flex; item-align:flex-end:top:5">

        </div>
        <div class="dataEmp" style="display:flex; flex-wrap:wrap;item-align:flex-end">


          <div style="flex: 1; text-align: left;">
            <p>{{ Datos.nomEmp }}</p>
            <p>{{ Datos.fpo_pge }}</p>

          </div>
          <img v-if="logoEmp && logoEmp.length > 5" class="logoEmp" :src="logoEmp"
          style="width:60px;height:60px; float: inline-end" />


        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup >
//vertical-align:middle;
// @/assets/logo.pn

//import logo from '@/assets/logo.png'
import logo from '@/WebOnes.ico'

const props = defineProps<{
  logoEmp: string;
  nomEmp: string;
  titleName: string;
  fpo_pge: string;
}>()

const Datos=ref(props)

Datos.value.nomEmp=props.nomEmp.trim()
Datos.value.titleName=props.titleName
Datos.value.fpo_pge=new Date(props.fpo_pge).toDateString()
//const logoEmp = ref(props.logoEmp)
//logoEmp.value = "/logos/Logo_Empresa.png"
//const nomEmp = ref(props.nomEmp)
//nomEmp.value = "Siavcom Software"

</script>