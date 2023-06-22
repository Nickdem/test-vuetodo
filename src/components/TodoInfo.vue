<template>
  <div class="info">
    <h4 class="info__title" v-if="!item.id">Choose a task</h4>
    <div class="info__item item" v-if="item.id && !editMode">
      <h4 class="item__date">{{ formatedDate(new Date(+item.id)) }}</h4>
      <h2 class="item__title">
        Title: <br />
        {{ item.title }}
      </h2>
      <p class="item__status">
        Status: <br />
        {{ item.status }}
      </p>
      <p class="item__description">
        Description: <br />
        {{ item.description.length ? item.description : "empty" }}
      </p>
      <button @click="editMode = true">Edit</button>
      <ul class="item__list">
        <li
          class="item__comment comment"
          v-for="comment in item.comments"
          :key="comment.id"
        >
          {{ comment.author }} {{ comment.message }}
        </li>
      </ul>
    </div>
    <div v-if="editMode">
      <form class="form" @submit.prevent="submitHandler">
        <label class="form__label" for="title">Название задачи:</label>
        <input
          class="form__input"
          type="text"
          id="title"
          v-model.trim="form.title"
        />
        <label class="form__label" for="status">Статус:</label>
        <select id="status" class="form__input" v-model="form.status">
          <option value="todo">Todo</option>
          <option value="in-progress">In-progress</option>
          <option value="done">Done</option>
        </select>
        <label class="form__label" for="description">Описание задачи:</label>
        <textarea
          class="form__input"
          id="description"
          v-model.trim="form.description"
        ></textarea>
        <button class="form__button" type="submit">Save</button>
        <button
          class="form__button form__button--delete"
          @click="deleteHandler(item.id)"
        >
          Delete
        </button>
        <button
          class="form__button form__button--close"
          @click="editMode = false"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Todoinfo extends Vue {
  editMode = false;
  form = this.$store.getters.selectedTodo;

  get item() {
    const item = this.$store.getters.selectedTodo;
    return item;
  }

  @Watch("item")
  whenSetItem(value: string, oldValue: string) {
    this.editMode = false;
    const form = Object.assign({}, this.item);
    this.form = form;
  }

  formatedDate(d: Date) {
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  }

  submitHandler() {
    if (this.form.title == "") {
      return;
    }
    this.$store.dispatch("changeItem", this.form);
    this.editMode = false;
  }

  deleteHandler(id: string) {
    this.$store.dispatch("deleteItem", id);
  }
}
</script>

<style lang="less" scoped>
.info {
  padding: 0.5em 1em;
  width: 70%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &__title {
    font-size: 2em;
  }
}

.item {
  &__date {
    text-align: center;
    font-size: 2em;
    color: #7c7c7c;
  }

  &__title {
    font-size: 2em;
    margin: 1em 0;
  }

  &__status {
    font-size: 1.8em;
    margin: 1em 0;
  }

  &__description {
    font-size: 1.8em;
    margin: 1em 0;
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
    width: 10%;
    border: none;
    color: #ffffff;
    padding: 0.4em;
    border-radius: 0.2em;
    background-color: #ff5656;

    &--close {
      background-color: #7c7c7c;
      margin-left: 1%;
    }

    &--delete {
      background-color: #dddddd;
      margin-left: 1%;
      color: black;
    }
  }
}
</style>
