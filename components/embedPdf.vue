<template>
 <div v-if="loading && prop.Visible && BSource==''" class="splash-screen">
    <div class="spinner-wrapper">
      <div class="spinner">
        <p>..........Loading data..........</p>
      </div>
    </div>
  </div>

  <div v-else class="wraper" >
    <div class='reportViewer' :style="style">
      <iframe :src="BSource" :width="style.width" height="1200px" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { NuxtloadingIndicator } from '~/.nuxt/components';

/*
    <a :href="BSource">http</a>.

<v-btn
 
      color="yellow"
      icon><v-icon>prop.Image</v-icon>
           

      </v-btn>



*/
/*import { 
   //toRefs,
   //defineProps,
   ref, watch } from "vue";
*/
const props = defineProps<{
  //Value: string;
  prop: {
    Click: false;
    ToolTipText: string;
    View: "";
    Field: "";
    Recno: "";
    Value: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Sw_val: false;
    Capture: false;
    Name: "";
    Label: "";
    Type: "text";
    Visible: false;
    TabIndex: number;
    BaseClass: "imgButton";
    Source: null;

    componentStyle: {
      background: "white";
      padding: "5px"; // Relleno
      color: "#b94295";
      width: "30px";
      height: "30px";
    };

  };

  style: {
    background: "white";
    backgroundColor: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
    borderColor: "#000a01";
    borderWidth: "1px";
    zIndex: 1;
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner valor left y top
    left: number;
    Top: number;
  };


}>();
const BSource = ref('')
const loading = ref(true)

watch(
  () => props.prop.Source,

  (new_val, old_val) => {
    console.log('embedPdf sourcelength=',new_val.byteLength,'Bsource',BSource.value,'loading=',loading)
    BSource.value = ''

    if (new_val.byteLength) {

      //const blob = new Blob([JSON.stringify(new_val)],{type: 'application/pdf'})


      const blob = new Blob([new_val], { type: 'application/pdf' }); // JavaScript Blob

      BSource.value = URL.createObjectURL(blob);
      console.log('embedPdf asigna buffer URL', BSource.value)


      loading.value = false

      // BSource.value = objectUrl
      /*  
      const blob = new Blob([new_val])
      console.log('embedPdf source blob', blob)
  
      const objectUrl = URL.createObjectURL(blob);
  
      BSource.value = objectUrl;
      */
    } else 
      loading.value = true


      console.log('embedPdf Buffer=',BSource.value)
  },
  { deep: false }
);



//const Value = ref(props.prop.Value);
//const { Value } = toRefs(props);
</script>
<style scoped >
/* Tooltip and error container */
</style>

