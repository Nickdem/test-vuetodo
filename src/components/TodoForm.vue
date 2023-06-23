<template>
  <div class="create">
    <button v-if="!show" @click="show = !show" class="create__button">
      Add
    </button>
    <form v-else class="create__form form" @submit.prevent="submitHandler">
      <label class="form__label" for="title">Item name:</label>
      <input class="form__input" type="text" id="title" v-model.trim="title" />
      <label class="form__label" for="description">Item description:</label>
      <textarea
        class="form__input"
        id="description"
        v-model.trim="description"
      ></textarea>
      <label class="form__label" for="user">For user:</label>
      <select id="user" class="form__input" v-model="to">
        <option v-for="user in $store.getters.users" :key="user" :value="user">
          {{ user }}
        </option>
      </select>
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
  to = "";

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
      from: this.$store.getters.user,
      to: this.to,
    });
    this.title = "";
    this.description = "";
    this.to = "";
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
    font-family: sans-serif;
  }

  textarea {
    resize: none;
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
