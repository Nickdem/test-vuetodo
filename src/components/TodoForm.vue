<template>
  <div class="create">
    <button v-if="!show" @click="show = !show" class="create__button">
      Add
    </button>
    <form v-else class="create__form form" @submit.prevent="submitHandler">
      <label class="form__label" for="title">Название задачи:</label>
      <input class="form__input" type="text" id="title" v-model.trim="title" />
      <label class="form__label" for="description">Описание задачи:</label>
      <textarea
        id="description"
        cols="30"
        rows="10"
        v-model.trim="description"
      ></textarea>
      <button class="form__button">Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import { dateNow } from "@/utils/helpers";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoForm extends Vue {
  show = false;
  title = "";
  description = "";

  submitHandler() {
    this.$store.dispatch("createItem", {
      title: this.title,
      description: this.description,
      status: "todo",
      id: dateNow(),
      comments: [],
    });
    this.title = "";
    this.description = "";
    this.show = !this.show;
  }
}
</script>
