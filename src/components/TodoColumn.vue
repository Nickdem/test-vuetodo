<template>
  <aside class="column">
    <TodoFilter v-if="filteredItems.length" />
    <TodoForm v-if="columnName == 'todo'" />
    <TodoList :items="filteredItems" />
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TodoForm from "./TodoForm.vue";
import TodoFilter from "./TodoFilter.vue";
import TodoList from "./TodoList.vue";

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
    TodoList,
  },
})
export default class TodoColumn extends Vue {
  @Prop({ default: "Column", type: String })
  columnName!: string;

  async mounted() {
    await this.$store.dispatch("fetchItems");
  }

  get filteredItems() {
    const items: Array<ITodoObj> = this.$store.getters.items;

    return items.filter(
      (item) =>
        item.title.includes(this.$store.getters.filter) &&
        item.status === this.columnName
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
}
</style>
