<template>
  <div>
    <div v-if="isOpen">
      <h1>Modal heading</h1>
      <p>This my first modal using vue.js</p>
    </div>
    <button @click="isOpen = !isOpen">
      Open modal
    </button>
  </div>
</template>

<script>

//https://vue-modal-demo.netlify.app/#features-at-a-glance


export default {
  data: function() {
    return {
      isOpen: false
    };
  }
};
</script>
