<template>
  <aside class="column">
    <TodoFilter v-if="filteredItems.length" />
    <TodoForm />
    <ul class="column__list" v-if="filteredItems.length">
      <li
        class="column__item item"
        v-for="item in filteredItems"
        :key="item.id"
      >
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
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TodoForm from "./TodoForm.vue";
import TodoFilter from "./TodoFilter.vue";

// не видит в интерфейсах
interface ITodoObj {
  title: string;
  description: string;
  id: string;
  status: string;
  comments: Array<string>;
}

@Component({
  components: {
    TodoForm,
    TodoFilter,
  },
})
export default class TodoColumn extends Vue {
  @Prop({ default: "Column", type: String })
  columnName!: string;
  items = [];

  async mounted() {
    this.items = await this.$store.dispatch("fetchItems", this.columnName);
  }

  unmount() {
    this.items = [];
  }

  @Watch("columnName")
  async onColumnNameChanged(value: string, oldValue: string) {
    this.items = await this.$store.dispatch("fetchItems", this.columnName);
  }

  get filteredItems() {
    const items: Array<ITodoObj> = this.items;

    return items.filter((item) =>
      item.title.includes(this.$store.getters.filter)
    );
  }
}
</script>

<style lang="less" scoped>
.column {
  display: flex;
  flex-direction: column;
  width: 200px;
  border-right: 1px solid #7c7c7c;
  border-left: 1px solid #7c7c7c;
  height: 100%;

  &__item {
    border-bottom: 1px solid #7c7c7c;
    padding: 0.5em 1em;
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
