<template>
   <NuxtLoadingIndicator />
   <div v-if='progress < 100 && progress > 0' class="progress-bar">Loaded {{ progress }} %</div>
   <div>
      <slot />
   </div>
</template>

<script lang="ts" setup>

const {
   progress,
   isLoading,
   start,      // Start from 0
   set,        // Overwrite progress
   finish,     // Finish and cleanup
   clear       // Clean up all timers and reset
} = useLoadingIndicator({
   duration: 3000,  // Defaults to 2000
   throttle: 200,   // Defaults to 200
});
const progreso = ref(progress)

/*
const emit = defineEmits(["updateIsOpen"])
const props = defineProps<{
  ThisForm: null;
}>();

const ThisForm = reactive(new props.ThisForm) // no quitar el new 
*/

</script>
