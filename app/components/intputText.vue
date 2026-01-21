<template>
    <input :id="Id" v-else class="text" ref="Ref" spellcheck="false" :style=Styles.inputStyle :type="propType"
        v-model.trim="Value" :readonly="prop.ReadOnly" :disabled="This.prop.Disabled" :maxlength="MaxLength"
        :size="prop.MaxLength" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @focusout="lostFocus"
        @focus="onFocus" v-on:keyup.63="clickHelp()" v-maska="maska" @maska="onMaska" @keypress="keyPress($event)"
        @keypress.backspace="keyPress($event)" @keypress.delete="keyPress($event)" @keypress.down="keyPress($event)"
        @keypress.up="keyPress($event)" @keydown.delete="keyPress($event)">
</template>

<script setup lang="ts">
defineProps<{
    lostFocus: () => Promise<void>;
    onFocus: () => Promise<void>;
    clickHelp: () => Promise<void>;
    onMaska: (event: CustomEvent<MaskaDetail>) => void;
    keyPress: ($event: { charCode: number; preventDefault: () => void; keycode: number; charCod: number; }) => number | Promise<void> | undefined;
    Id: string;
    Styles: { captionStyle: any; inputStyle: any; style: any; };
    propType: any;
    prop: { Autofocus: false; BaseClass: "EditText"; Capture: true; ControlSource: string; Currency: "   "; CurrencyDisplay: "code"; Decimals: number; Disabled: boolean; ErrorMessage: ""; Field: ""; First: boolean; Focus: boolean; Format: ""; Grid: false; Help: false; htmlId: string; InputMask: ""; Key: number; MaxLength: 0; Min: number; Max: number; Name: string; Notation: "standard"; Nu: "arab"; Placeholder: ""; ReadOnly: false; RefValue: null; Status: string; ShowError: boolean; Style: string; TabIndex: number; Tag: ""; textLabel: ""; This: null; ToolTipText: string; Type: string; Valid: true; Value: string; View: ""; Visible: true; When: boolean; };
    This: null;
    MaxLength: 0;
    Value: string;
    maska: { mask: ""; tokens: { X: { pattern: RegExp; }; S: { pattern: RegExp; }; A: { pattern: RegExp; transform: (chr: string) => string; }; a: { pattern: RegExp; transform: (chr: string) => string; }; '9': { pattern: RegExp; }; }; };
}>()
</script>
