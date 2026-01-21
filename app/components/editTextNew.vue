<template>
    <!--Se necesita el siguiente div para que funcione el siguiente v-show-->
    <span :id="Id + '_component'" class=" divi inputDivi" :title="This.prop.ToolTipText" :style="Styles.style"
        v-show="This.prop.Visible" @click.middle.stop="middleClick()">
        <span :id="Id + '_label'" class=" etiqueta" v-if="prop.Caption" :style="Styles.captionStyle">{{ prop.Caption
            }}</span>

        <input :id="Id" v-if="propType == 'number'" class="number" type="text" inputmode="numeric"
            :style=Styles.inputStyle ref="Ref" :disabled="This.prop.Disabled" :min="prop.Min" :max="prop.Max"
            v-model.trim="currentValue[focusIn]" :readonly="This.prop.ReadOnly" :placeholder="prop.Placeholder"
            :tabindex="prop.TabIndex"
            onkeypress='return  event.charCode== 45 || event.charCode== 46 || event.charCode== 43 || (event.charCode >= 48 && event.charCode <= 57)'
            @focusout="lostFocus" @focus="onFocus" @keypress="keyPress($event)" v-on:keyup.63="clickHelp()"
            v-on:keyup.13="keyPress($event)" v-on:keyup.backspace="keyPress($event)"
            v-on:keyup.delete="keyPress($event)" v-on:keyup.down="keyPress($event)" v-on:keyup.up="keyPress($event)"
            @input.self="onInput" @keydown.delete="keyPress($event)">

        <!-- @input.self="onInput"   @click.capture="onClick"
	        
	      onkeypress='return  event.charCode== 45 || event.charCode== 46 || event.charCode== 43 || (event.charCode >= 48 && event.charCode <= 57)'
	      @focusout="lostFocus" @focus="onFocus" @keypress="keyPress($event)" v-on:keyup.63="clickHelp()"
	      @click.middle.stop="middleClick()" v-on:keyup.delete="key = 127" v-on:keyup.13="key = 13"
	      v-on:keyup.backspace="key = 8"
	    v-maska="maska" @maska="onMaska"
	      key != 45 && key != 46 && key != 43) && (key < 48 || key > 57)
	    v-on:keyup.enter="clickReturn()" 
	        v-maska="maska" @maska="onMaska" data-maska-reversed
	      :data-maska-number-fraction="props.prop.Decimals" data-maska-number-unsigned
	      
	    -->
        <!--spinner-->

        <input :id="Id" v-else-if="propType == 'spinner'" class="number" type="number" :style=Styles.inputStyle
            ref="Ref" :disabled="This.prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="This.prop.Value"
            :maxlength="MaxLength" :step="This.prop.Step" :readonly="This.prop.ReadOnly" :tabindex="prop.TabIndex"
            @keypress="keyPress($event)" @focus="onFocus" @input="emitValue(false)" v-on:keyup.63="clickHelp()"
            v-on:keyup.13="keyPress($event)" v-on:keyup.backspace="keyPress($event)"
            v-on:keyup.delete="keyPress($event)" v-on:keyup.down="keyPress($event)" v-on:keyup.up="keyPress($event)">
        <!--v-on:keyup.enter="clickReturn()"  @click.capture="onClick" -->
        <!--textArea -->
        <div :id="Id" v-else-if="propType == 'textarea'" :style=Styles.inputStyle>
            <textarea :id="Id + '_textarea'" class="textArea" ref="Ref" spellcheck="false" :style=Styles.inputStyle
                v-model="Value" :readonly="This.prop.ReadOnly" :disabled="This.prop.Disabled"
                :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" type="textArea" :rows="Styles.inputStyle.rows"
                :cols='Styles.inputStyle.cols' @keypress="keyPress($event)" @focus="onFocus" @focusout="lostFocus"
                v-on:keyup.13="keyPress($event)" v-on:keyup.backspace="keyPress($event)"
                v-on:keyup.delete="keyPress($event)" v-on:keyup.down="keyPress($event)" v-on:keyup.up="keyPress($event)"
                @keydown.delete="keyPress($event)"></textarea>
        </div>
        <!--fecha v-model="currentValue[1]"  v-model="currentDate" se utiliza el value para que con emit funcione-->
        <!--div v-else-if="propType.slice(0, 4) == 'date'"-->
        <input :id="Id" v-else-if="propType == 'date' || propType == 'datetime'" class="date" ref="Ref"
            :style=Styles.inputStyle :type="propType == 'datetime' ? 'datetime-local' : 'date'" :min="prop.Min"
            :max="prop.Max" v-model="currentDate" :disabled="This.prop.Disabled" :readonly="This.prop.ReadOnly"
            :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focus="onFocus" @focusout="lostFocus"
            v-on:keyup.63="clickHelp()" v-on:keyup.13="keyPress($event)" v-on:keyup.backspace="keyPress($event)"
            v-on:keyup.delete="keyPress($event)" v-on:keyup.down="keyPress($event)" v-on:keyup.up="keyPress($event)"
            @keydown.delete="keyPress($event)">
        <!--v-on:keyup.enter="clickReturn()" -->
        <!--input v-show="focusIn == 0" class="text" :style=Styles.inputStyle type="text" v-model="displayDate"
	          :readonly="true" :placeholder="prop.Placeholder" @focus="onFocus"-->
        <!--/div-->
        <div :id="Id" class='json' v-else-if="propType == 'json'" ref="Ref" :style=Styles.style>
            <!--span  v-if="currentJson[comp][data].type=='label'">{{ currentJson[comp][data].value + " " }}</span>
	                <input v-if="currentJson[comp][data].type==!label"
	                  v-model="currentJson[comp][data].value" :type="currentJson[comp][data].type" -->

            <!--TransitionGroup name='detailJson' tag="div"-->
            <!--details-->
            <div :id="Id + '_detail_' + key" v-for="(comp, index, key) in compJson" key:='index' open='true'>
                <!--summary :id="Id" :style="{ fontWeight: 'bold', height: Styles.inputStyle.height }" :key='index'-->
                <label>{{ comp.label }}
                </label>
                <!--/summary-->
                <input :id="Id + '_json_input' + key" v-model="comp.value" :type="comp.type ? comp.type : 'text'"
                    :readonly="comp.readOnly || This.prop.ReadOnly ? true : false"
                    :disabled="comp.disabled || This.prop.Disabled ? true : false"
                    :style="comp.style ? comp.style : { width: 'auto', height: '13px' }" @focusout="lostFocus"
                    @focus="onFocus">

            </div>
            <!--/details-->
            <!--/TransitionGroup-->
        </div>

        <!--   CHECKBOX   -->

        <input :id="Id" v-else-if="propType == 'checkbox'" class="checkbox" type="checkbox" :style=Styles.inputStyle
            ref="Ref" :readonly="This.prop.ReadOnly" :disabled="This.prop.Disabled || This.prop.ReadOnly"
            :tabindex="prop.TabIndex" v-model="checkValue" @click="clickCheckBox()" @focus="onFocus"
            @keypress="keyPress($event)">

        <!--  TEXT   -->
        <input :id="Id" v-else class="text" ref="Ref" spellcheck="false" :style=Styles.inputStyle :type="propType"
            v-model.trim="Value" :readonly="prop.ReadOnly" :disabled="This.prop.Disabled" :maxlength="MaxLength"
            :size="prop.MaxLength" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @focusout="lostFocus"
            @focus="onFocus" v-on:keyup.63="clickHelp()" v-maska="maska" @maska="onMaska" @keypress="keyPress($event)"
            @keypress.backspace="keyPress($event)" @keypress.delete="keyPress($event)" @keypress.down="keyPress($event)"
            @keypress.up="keyPress($event)" @keydown.delete="keyPress($event)">
        <!--v-on:keyup.enter="clickReturn()" se quita ya que onFocus es que lo substituye @click.capture="onClick"-->

        <!--/span-->
        <!--div v-if="propType == 'number'">CurrentValue ={{ currentValue[focusIn] }} focusIn{{ focusIn }}</div-->
        <img :id="Id + '_help'"
            v-if="!prop.This.prop.ReadOnly && !This.prop.Disabled && prop.Help && This.prop.InputProp.Visible"
            class='help_icon' src="/Iconos/svg/lupa.svg" :style=helpStyle @click.prevent="clickHelp()" />
        <div :id="Id + '_error'" class="errorText" v-show="displayError">{{ This.prop.ErrorMessage.toString().length >=
            1 ?
            This.prop.ErrorMessage
            :
            '--- Invalid Input ---'
            }}</div>

        <!--Compponentes que no estan en bloque-->

        <div class="component_container" :style="containerStyle">
            <component :id="Id + '_component_' + compMain" v-for="(compMain) in This.main" :key="compMain"
                :is="impComponent(This[compMain].prop.BaseClass)" v-model:Value="This[compMain].prop.Value"
                :Registro="props.Registro" :prop="This[compMain].prop" :style="This[compMain].style"
                :position="This[compMain].position">
            </component>
        </div>

        <!--Compponentes en bloque-->
        <div :id="Id + 'componentes_divi_' + key" v-for="(block, key) in This.block" :key="key">
            <label v-if="block.title && block.prop.Visible">{{ block.title }}</label>
            <div :id="Id + 'block_' + key" v-if="block.prop.Visible" :style="block.style">

                <div v-for="(component, key) in block.component" :key="key"
                    :id="Id + 'hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
                    <!--v-bind:Component="ref(Ele)"-->
                    <component :id="Id + '_component_' + key + component.prop.Name"
                        :is="impComponent(component.prop.BaseClass)" v-model:Value="component.prop.Value"
                        v-model:Status="component.prop.Status" :Registro="props.Registro" :prop="component.prop"
                        :position="component.position">
                        <!--:style="component.style" :inputStyle="component.inputStyle"
	                                               
	                      @click.capture="component.click()"-->
                    </component>
                </div>
            </div>
        </div>

        <!--/Teleport-->
        <!--   :ShowError="This[compMain].prop.ShowError" 
	       
	    @click.capture="This.eventos.push(This.map+'.' + compMain + '.click()')" 
	           @click.capture="This.Form.eventos.push(This[compMain].prop.Map + '.click()')">-->
    </span>
</template>

<script setup lang="ts">
defineProps<{
    middleClick: () => void;
    This: null;
    Styles: { captionStyle: any; inputStyle: any; style: any; };
    prop: { Autofocus: false; BaseClass: "EditText"; Capture: true; ControlSource: string; Currency: "   "; CurrencyDisplay: "code"; Decimals: number; Disabled: boolean; ErrorMessage: ""; Field: ""; First: boolean; Focus: boolean; Format: ""; Grid: false; Help: false; htmlId: string; InputMask: ""; Key: number; MaxLength: 0; Min: number; Max: number; Name: string; Notation: "standard"; Nu: "arab"; Placeholder: ""; ReadOnly: false; RefValue: null; Status: string; ShowError: boolean; Style: string; TabIndex: number; Tag: ""; textLabel: ""; This: null; ToolTipText: string; Type: string; Valid: true; Value: string; View: ""; Visible: true; When: boolean; };
    lostFocus: () => Promise<void>;
    onFocus: () => Promise<void>;
    keyPress: ($event: { charCode: number; preventDefault: () => void; keycode: number; charCod: number; }) => number | Promise<void> | undefined;
    clickHelp: () => Promise<void>;
    onInput: ({ target }: { target: any; }) => void;
    currentValue: string[];
    focusIn: number;
    emitValue: (readCam?: boolean, isValid?: boolean, newValor?: string) => Promise<void>;
    MaxLength: 0;
    Value: string;
    currentDate: string;
    compJson: never[];
    clickCheckBox: () => void;
    checkValue: boolean;
    onMaska: (event: CustomEvent<MaskaDetail>) => void;
    maska: { mask: ""; tokens: { X: { pattern: RegExp; }; S: { pattern: RegExp; }; A: { pattern: RegExp; transform: (chr: string) => string; }; a: { pattern: RegExp; transform: (chr: string) => string; }; '9': { pattern: RegExp; }; }; };
    helpStyle: { marginTop: string; width: string; maxHeight: string; paddingLeft: string; alignContent: string; };
    displayError: boolean;
    containerStyle: any;
    impComponent: (name: string) => object;
}>()
const Id = defineModel<string>('Id', { required: true })
const propType = defineModel<any>('propType', { required: true })
</script>
