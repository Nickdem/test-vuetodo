<template>
  <div class="list">
    <aside class="sidebar">
      <button
        v-for="btn in btns"
        class="sidebar__btn"
        :class="activeColumnName == btn && 'sidebar__btn--active'"
        :key="btn"
        @click="activeColumnName = btn"
      >
        {{ btn.toUpperCase() }}
      </button>
    </aside>
    <TodoColumn :columnName="activeColumnName" />
    <TodoInfo />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TodoColumn from "@/components/TodoColumn.vue";
import TodoInfo from "@/components/TodoInfo.vue";

@Component({
  components: { TodoColumn, TodoInfo },
})
export default class ListView extends Vue {
  btns = ["todo", "in-progress", "done"];
  activeColumnName = "todo";
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  align-items: flex-start;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  background-color: #dddddd;

  &__btn {
    background: transparent;
    border: none;
    font-size: 2em;
    padding: 0.5em 1em;
    text-align: left;

    &--active {
      background-color: #7c7c7c;
    }
  }
}
</style>
