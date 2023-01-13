<template>
  <VueForm v-bind:THISFORM="THISFORM">
    <template #header />
    <template #main />
    <template #footer />
  </VueForm>
</template>
<script  lang="ts" setup>
import VueForm from "/components/form.vue";
import { THISFORM } from './ThisForm'
</script>