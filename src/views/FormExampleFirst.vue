<template>
  <h2>Main Form</h2>
  <DynamicForm :formObj="formObj" :formModel="formModel" @cancel="clearForm" />
</template>

<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import { ref } from "vue";

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
  {
    name: "country",
    tag: "select",
    label: "Select Country",
    dataField: "country",
    options: [
      { text: "Russia", value: "RU" },
      { text: "Other", value: "Not-RU" },
    ],
  },
  {
    name: "policy",
    tag: "checkbox",
    label: "Policy agreement",
    dataField: "policy",
  },
];

const formModel = ref<Record<string, any>>({
  email: "",
  about: "",
  country: "",
  policy: "",
  age: "",
});

function clearForm() {
  for (const key of Object.keys(formModel.value)) {
    if (formModel.value[key]) {
      formModel.value[key] = "";
    }
  }
}
</script>

<style scoped></style>
