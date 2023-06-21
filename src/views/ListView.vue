<template>
  <div class="list">
    <TodoFilter />
    <div class="items"></div>
    <TodoForm />
    {{ items }}
  </div>
</template>

<script lang="ts">
import TodoForm from "@/components/TodoForm.vue";
import { Vue, Component } from "vue-property-decorator";
import TodoFilter from "@/components/TodoFilter.vue";

@Component({
  components: {
    TodoFilter,
    TodoForm,
  },
})
export default class ListView extends Vue {
  items = [];

  async mounted() {
    this.items = await this.$store.dispatch("fetchItems", "lol");
  }
}
</script>
