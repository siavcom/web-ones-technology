<template>
  <div class='browse' :style="props.style" >
    <div v-for="(item, index) in list" :key="index" style="background:cornflowerblue; color:#eee; border:1px solid #CCC; padding: 1.5rem; margin:.5rem 0; border-radius: 10px;">
      <div class="item">{{ item }}</div>
    </div>

    <infinite-loading spinner="bubbles"  @infinite="infiniteScroll"></infinite-loading>
  </div>
</template>


<script setup lang="ts">

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  prop: {
    RowSource : string;
    Disabled : boolean;
    Visible :boolean;
  };

  style: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  Recno: 0;
  Component: null;
  db: any

}>()

const list=ref([])
const titles=ref([])
var page=0

////////////////////////////////////////
// RowSource
///////////////////////////////////////
watch(
  () => props.prop.RowSource,
  (new_val, old_val) => {
    if (new_val==''){
        list.value=[]
        titles.value=[]
      } else infiniteScroll(false)

  },
  { deep: false }
);

const infiniteScroll=($state: { loaded: () => void; complete: () => void; }) =>{
      props.db.value.AlaSql('select * from '+props.prop.RowSource).then(data => {
        console.log('=====browse data=====',data)

        if (data.length) {
          page += 1
          for( const row in data){
             const item=data[row]  
             list.value.push(item)
          }
          $state.loaded()
        } else {
          $state.complete()
        }
      })
 }
  
</script>