<template>
  <ul class="column__list" v-if="items.length">
    <li class="column__item item" v-for="item in items" :key="item.id">
      <button
        class="item__wrapper"
        :class="{
          'item__wrapper--active': selected == item.id,
        }"
        @click="selectTodo(item)"
      >
        <h4 class="item__title">
          {{
            item.title.length > 10
              ? item.title.substring(0, 10) + "..."
              : item.title
          }}
        </h4>
        <p class="item__description">
          {{
            item.description.length > 10
              ? item.description.substring(0, 10) + "..."
              : item.description
          }}
        </p>
      </button>
    </li>
  </ul>
  <h2 v-else>Empty!</h2>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// не видит в интерфейсах
interface ITodoObj {
  title: string;
  description: string;
  id: string;
  status: string;
  comments: Array<string>;
}

@Component
export default class TodoList extends Vue {
  @Prop({ default: [], type: Array })
  items!: Array<ITodoObj>;
  selected = "";

  selectTodo(item: ITodoObj) {
    this.$store.dispatch("selectItem", item);
    this.selected = item.id;
  }
}
</script>

<style lang="less" scoped>
h2 {
  padding: 0.5em 1em;
}
.column__list {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}

.column__item {
  border-bottom: 1px solid #7c7c7c;
  height: 70px;
}
.item {
  &__wrapper {
    text-align: left;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    padding: 0.5em 1em;

    &--active {
      background-color: #dddddd;
    }
  }

  &__title {
    font-size: 1.8em;
    line-height: 1.4em;
  }

  &__description {
    font-size: 1.6em;
  }
}
</style>
