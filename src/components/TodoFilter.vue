<template>
  <form class="form">
    <label class="form__label" for="filter">Фильтр по названию:</label>
    <input
      class="form__input"
      type="text"
      id="filter"
      v-model.trim="filter"
      @input="inputHandler"
    />
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoFilter extends Vue {
  filter = "";

  inputHandler() {
    this.$store.dispatch("changeFilter", this.filter);
  }
}
</script>

<style lang="less" scoped></style>
