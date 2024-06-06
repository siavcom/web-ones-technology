<template>
  <div id="app-layout-header">

    <div id="header" style="width: 98%;height: 65px; display: flex;">
      <!--img class="logoVue" :src="logo" style="width:50px;height:50px;" /-->
      <div id="webOnes" class="Web-ones">
        <img loading="lazy" class="logoWebOnes" :src="logo" style="width:50px;height:50px" />eb-Ones
        Technology
      </div>

      <div id="company" class="Company" style="align-self:flex-end;margin-left: auto;">
        <div class='title' v-if="nomEmp" style="display:flex; item-align:flex-end:top:5">

        </div>
        <div id="dataEmp" class="dataEmp" style="display:flex; flex-wrap:wrap;item-align:flex-end">
          <div style="flex: 1; text-align: left; top:10px">
            <p>{{ props.nomEmp.trim() }}</p>
            <p>{{ new Date(props.fpo_pge).toDateString() }}</p>
          </div>
          <nuxt-img id="logoEmp" v-if="logoEmp && logoEmp.length > 5" class="logoEmp" :src="logoEmp"
            style="width:auto;height:75px; float: inline-end" loading="lazy" />

          <!--nuxt-img id="logoEmp" v-if="srcLogo.length > 5" :src="srcLogo" class="logoEmp"
            style="width:auto;height:75px; float: inline-end" loading="lazy" /-->
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
//vertical-align:middle;
// @/assets/logo.pn

//import logo from '@/assets/logo.png'

import logo from '/assets/WebOnes.ico'

//

interface Props {
  logoEmp: string;
  nomEmp: string;
  titleName: string;
  fpo_pge: string;
  user: string
}

const props = withDefaults(defineProps<Props>(), {
  logoEmp: '',
  nomEmp: 'Web-Ones',
  titleName: 'Main',
  fpo_pge: new Date().toString(),
  user: ''
})

console.log('LayOut Header Props', props)


/*
const srcLogo = ref('')
const logoEmp1 = ref(props.logoEmp)


const leeLogo = async () => {
  console.log('1) leeLogo() file=', logoEmp1.value)
  const call = {
    method: 'post',    // Se necesita para que haga la llamada y retorne los datos
    body: {
      call: 'imgBase64',
      nameFile: props.logoEmp
    }
  }

  const { data } = await useFetch('/api/callServer', call)
  srcLogo.value = data.value

  const bannerImage = srcLogo.value //document.getElementById('bannerImg');


  localStorage.setItem("imgData", bannerImage);

  //localStorage.setItem("imgData", srcLogo.value);


  console.log('4) leeLogo() header file=', srcLogo.value)

  const dataImage = localStorage.getItem('imgData');
  //const bannerImg = document.getElementById('tableBanner');
  // bannerImg.src = "data:image/png;base64," + dataImage;
  //bannerImg.src = "data:image/png," + dataImage;


  //  srcLogo.value = "data:image/png;base64," + dataImage;
  srcLogo.value = dataImage;

}



if (props.logoEmp.length > 5) {
  leeLogo()

}
*/



</script>