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
      <p class="item__status">
        From user: <br />
        {{ item.from }}
      </p>
      <p class="item__status">
        To user: <br />
        {{ item.to.length ? item.to : "empty" }}
      </p>
      <p class="item__description">
        Description: <br />
        {{ item.description.length ? item.description : "empty" }}
      </p>
      <button class="item__button" @click="editMode = true">Edit</button>
      <ul class="item__comments">
        <li class="item__comment comment">
          <p><b>Comments:</b></p>
        </li>
        <li
          class="item__comment comment"
          v-for="comment in item.comments"
          :key="comment.date"
        >
          <p>
            <span>{{ comment.author }}</span>
            {{ comment.message }}
          </p>
          <span>{{ formatedDate(new Date(+comment.date)) }}</span>
        </li>
        <li>
          <form class="comment__form form" @submit.prevent="commentHandler">
            <label class="form__label" for="comment">Add comment:</label>
            <input
              v-model.trim="comment"
              class="form__input"
              type="text"
              id="comment"
            />
            <button type="submit" class="form__button">Add</button>
          </form>
        </li>
      </ul>
    </div>
    <div v-if="editMode">
      <form class="form" @submit.prevent="submitHandler">
        <label class="form__label" for="title">Item name:</label>
        <input
          class="form__input"
          type="text"
          id="title"
          v-model.trim="form.title"
        />
        <label class="form__label" for="status">Item status:</label>
        <select id="status" class="form__input" v-model="form.status">
          <option value="todo">Todo</option>
          <option value="in-progress">In-progress</option>
          <option value="done">Done</option>
        </select>
        <label class="form__label" for="to">For user:</label>
        <select id="to" class="form__input" v-model="form.to">
          <option
            v-for="user in $store.getters.users"
            :key="user"
            :value="user"
          >
            {{ user }}
          </option>
        </select>
        <label class="form__label" for="description">Item description:</label>
        <textarea
          class="form__input"
          id="description"
          v-model.trim="form.description"
        ></textarea>
        <button class="form__button" type="submit">Save</button>
      </form>
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
    </div>
  </div>
</template>

<script lang="ts">
import { dateNow } from "@/utils/helpers";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Todoinfo extends Vue {
  editMode = false;
  form = this.$store.getters.selectedTodo;
  comment = "";

  get item() {
    const item = this.$store.getters.selectedTodo;
    return item;
  }

  @Watch("item")
  whenSetItem(value: string, oldValue: string) {
    this.editMode = false;
    const form = Object.assign({}, this.item);
    this.form = form;
    this.comment = "";
  }

  formatedDate(d: Date) {
    console.log("Испрпавить");

    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  }

  submitHandler() {
    if (this.form.title == "") {
      this.$store.dispatch(
        "updateMessage",
        "Поле названия не может быть пустым"
      );
      return;
    }
    this.$store.dispatch("changeItem", this.form);
    this.editMode = false;
  }

  commentHandler() {
    if (this.comment == "") {
      this.$store.dispatch(
        "updateMessage",
        "Поле комментарий не может быть пустым"
      );
      return;
    }
    this.form.comments.push({
      author: this.$store.getters.user,
      message: this.comment,
      date: dateNow(),
    });
    this.$store.dispatch("changeItem", this.form);
    this.comment = "";
  }

  deleteHandler(id: string) {
    const res = window.confirm("Удалить эту задачу?");
    if (res) {
      this.$store.dispatch("deleteItem", id);
    }
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

  &__button {
    width: 10%;
    border: none;
    color: #ffffff;
    padding: 0.4em;
    border-radius: 0.2em;
    background-color: #ff5656;
  }

  &__comments {
    border-top: 1px solid #7c7c7c;
  }

  &__comment {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1em;

    & p {
      font-size: 1.6em;
    }

    & span {
      color: #7c7c7c;
    }
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
    margin-bottom: 1%;

    &--close {
      background-color: #7c7c7c;
      margin-left: 1%;
    }

    &--delete {
      background-color: #dddddd;
      color: black;
    }
  }
}
</style>
