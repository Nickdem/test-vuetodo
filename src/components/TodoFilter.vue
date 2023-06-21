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

<style lang="less" scoped>
.form {
  padding: 0.5em 1em;
  border-bottom: 1px solid #7c7c7c;

  &__label {
    font-size: 1.6em;
  }

  &__input {
    width: 100%;
    font-size: 1.4em;
    padding: 0.6em;
  }
}
</style>
