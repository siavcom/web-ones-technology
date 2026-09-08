<template>
  <div :id="Id + '_component'" class="divi radio radio_class1" :style="Styles.style"
    v-show="This.prop.Visible" @click.middle.stop="middleClick()">
    <span :id="Id + '_label'" class="etiqueta radio radio_class2" v-if="This.prop.Caption"
      :style="Styles.captionStyle">
      {{ This.prop.Caption }}
    </span>
    <div :id="Id + '_options'" class="radio radio_class3" :style="This.containerStyle">
      <label v-for="opt in optionList" :key="opt.prop.OptionNumber" class="radio radio_class4"
        :style="Styles.inputStyle">
        <input :id="Id + '_opt_' + opt.prop.OptionNumber" :name="Id" type="radio"
          :value="opt.prop.OptionNumber" v-model="Value"
          :disabled="This.prop.ReadOnly || This.prop.Disabled || opt.prop.ReadOnly"
          class="radio radio_class5" @change="onChange" />
        {{ opt.prop.Caption }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const emit = defineEmits(["update", "update:Value", "update:Status"])

const props = defineProps<{
  Value: string | number;
  Registro: number;
  prop: any;
  style: any;
}>()

const This = props.prop.This
const Este = props.prop.This

const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })
const Styles = {
  captionStyle: captionStyle,
  inputStyle: inputStyle,
  style: divStyle
}

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 1000).toString()
This.Id = Id
This.prop.htmlId = Id

const optionList = computed(() => This.options.filter((o: any) => o && o.prop))

const Value = computed({
  get: () => This.prop.Value,
  set: (val: string | number) => {
    This.prop.Value = +val
    emit('update:Value', This.prop.Value)
  }
})

const onChange = () => {
  This.prop.Value = +Value.value
  This.afterMounted()
  emit('update:Value', This.prop.Value)
  emit('update:Status', 'A')
  emit('update')
}

const middleClick = () => {
  if (This.Form && This.Form.translateContainer)
    This.Form.translateContainer.open(ref(This))
}
</script>
