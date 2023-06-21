<template>
  <ul class="column__list" v-if="items.length">
    <li class="column__item item" v-for="item in items" :key="item.id">
      <h4 class="item__title">
        {{
          item.title.length > 15
            ? item.title.substring(0, 15) + "..."
            : item.title
        }}
      </h4>
      <p class="item__description">
        {{
          item.description.length > 15
            ? item.description.substring(0, 15) + "..."
            : item.description
        }}
      </p>
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
}
</script>

<style lang="less" scoped>
.column__list {
  overflow-x: hidden;
  overflow-y: scroll;
}

.column__item {
  border-bottom: 1px solid #7c7c7c;
  padding: 0.5em 1em;
  height: 70px;

  &:last-child {
    border: none;
  }
}
.item {
  &__title {
    font-size: 2em;
    line-height: 2em;
  }

  &__description {
    font-size: 1.6em;
  }
}
</style>
