<template>
  <h2>Slots example</h2>
  <DynamicForm
    :formObj="formObj"
    :formModel="formModelState"
    @cancel="clearFormState"
  >
    <template #input-email
      ><label for="customInput">My custom input</label>
      <input
        class="custom-input"
        id="customInput"
        v-model="formModelState.email"
      />
    </template>
  </DynamicForm>
</template>

<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import { computed, ref } from "vue";
import { useStore } from "@/store";

const state = useStore();
const clearFormState = () => state.commit("clearForm");
const formModelState = computed(() => state.state.formModelState);
const formObj = [
  {
    name: "email",
    tag: "input",
    label: "email",
    props: { type: "text" },
    dataField: "email",
  },
  {
    name: "age",
    tag: "input",
    label: "age",
    props: { type: "number" },
    dataField: "age",
  },
  { name: "about", tag: "textarea", label: "About me", dataField: "about" },
];
</script>

<style scoped>
.custom-input-wrap {
  display: flex;
  flex-direction: column;
}
.custom-input {
  width: 100%;
  height: 52px;
  border: 2px solid black;
  padding: 15px;
}
</style>
