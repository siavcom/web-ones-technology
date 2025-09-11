<template>
  <VueForm v-bind:ThisForm="Form">
    <template #header />
    <template #main />
    <template #footer />
  </VueForm>
</template>
<script lang="ts" setup>
import VueForm from "@/components/form.vue";
import { ThisForm } from './ThisForm'
const Form = reactive(new ThisForm) //no quitar el new 
</script>