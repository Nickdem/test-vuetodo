<template>
  <h4 v-if="!getItem.id">Выберите задачу</h4>
  <p v-else>{{ getItem }}</p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Todoinfo extends Vue {
  get getItem() {
    const item = this.$store.getters.selectedTodo;
    return item;
  }
}
</script>

<style lang="less" scoped></style>
