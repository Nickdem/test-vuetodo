<template>
  <div class="create">
    <button v-if="!show" @click="show = !show" class="create__button">+</button>
    <form v-else class="create__form form" @submit.prevent="submitHandler">
      <label class="form__label" for="title">Название задачи:</label>
      <input class="form__input" type="text" id="title" v-model.trim="title" />
      <label class="form__label" for="description">Описание задачи:</label>
      <textarea
        class="form__input"
        id="description"
        v-model.trim="description"
      ></textarea>
      <button type="submit" class="form__button">Create</button>
      <button @click="show = !show" class="form__button form__button--close">
        Close
      </button>
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
    if (this.title == "") {
      return;
    }
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

<style lang="less" scoped>
.create {
  text-align: center;
  border-bottom: 1px solid #7c7c7c;
  padding: 0.5em 1em;

  &__button {
    background-color: #dddddd;
    font-size: 2em;
    height: 70px;
    width: 100%;
    border-radius: 0.2em;
    border: none;
    color: #7c7c7c;
  }
}

.form {
  text-align: left;

  &__label {
    font-size: 1.6em;
  }

  &__input {
    width: 100%;
    font-size: 1.4em;
    padding: 0.6em;
  }

  &__button {
    width: 48%;
    border: none;
    color: #ffffff;
    padding: 0.4em;
    border-radius: 0.2em;
    background-color: #ff5656;

    &--close {
      background-color: #7c7c7c;
      margin-left: 4%;
    }
  }
}
</style>
