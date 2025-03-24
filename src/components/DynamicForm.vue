<template>
  <form class="dynamic-form-wrap">
    <div class="dynamic-form__element" v-for="(element, key) in formObj">
      <slot :name="`input-${element.name}`" v-if="element.tag === 'input'">
        <label v-if="element.label" :for="`${element.tag}-${key}`">{{
          element.label
        }}</label>
        <input
          v-bind="element.props"
          maxlength="255"
          :id="`${element.tag}-${key}`"
          v-model="formModel[element.dataField]"
        />
      </slot>
      <slot
        :name="`textarea-${element.name}`"
        v-if="element.tag === 'textarea'"
      >
        <label v-if="element.label" :for="`${element.tag}-${key}`">{{
          element.label
        }}</label>
        <textarea
          v-bind="element.props"
          :id="`${element.tag}-${key}`"
          v-model="formModel[element.dataField]"
        />
      </slot>
      <slot
        :name="`checkbox-${element.name}`"
        v-if="element.tag === 'checkbox'"
      >
        <div class="checkbox-wrap">
          <label v-if="element.label" :for="`${element.tag}-${key}`">
            {{ element.label }}
            <input
              :id="`${element.tag}-${key}`"
              type="checkbox"
              v-bind="element.props"
              v-model="formModel[element.dataField]"
            />
          </label>
        </div>
      </slot>
      <slot :name="`select-${element.name}`" v-if="element.tag === 'select'">
        <label v-if="element.label" :for="`${element.tag}-${key}`">{{
          element.label
        }}</label>

        <select
          v-bind="element.props"
          v-model="formModel[element.dataField]"
          :id="`${element.tag}-${key}`"
        >
          <option v-for="option in element.options" :value="option.value">
            {{ option?.text }}
          </option>
        </select>
      </slot>
    </div>
    <div class="controls">
      <button @click.prevent="saveForm">Save</button>
      <button @click.prevent="cancelForm">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

export interface FormObj {
  name: string;
  tag: string;
  label?: string;
  props?: Record<string, any>;
  dataField: string;
  options?: { value: number | string; text: string }[];
}

interface DynamicFormProps {
  formObj: FormObj[];
  formModel: Record<string, any>;
}

const emit = defineEmits<{
  cancel: [e: Event];
}>();

const { formObj, formModel } = defineProps<DynamicFormProps>();

//В реальном проекте я бы тоже сделал эмит и функцию-обработчик в родительском компоненте, либо передал бы
// функцию-обработчик в виде пропса. Но так как тут моковая функция, чтобы не дублировать код, прописал его здесь
function saveForm() {
  let savedForm = "";
  for (const [key, val] of Object.entries(formModel)) {
    if (val) {
      savedForm += `${key}: ${val}\n`;
    }
  }
  if (!savedForm) {
    alert("Форма пуста. Отправка невозможна.");
    return;
  }
  alert(`Вы отправили форму со следующими данными:\n${savedForm}`);
}
function cancelForm(e: Event) {
  emit("cancel", e);
}
</script>

<style lang="scss">
.dynamic-form-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
