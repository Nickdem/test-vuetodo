<template>
  <div class="home">
    <h3>Home</h3>
    <form v-if="!$store.getters.user.length" class="form">
      <label class="form__label" for="name">Your name:</label>
      <input class="form__input" type="text" id="name" v-model.trim="name" />
      <button
        name="sign-up"
        class="form__button"
        @click.prevent="submitHandler"
      >
        Sign up
      </button>
      <button
        name="sign-in"
        class="form__button"
        @click.prevent="submitHandler"
      >
        Sign in
      </button>
    </form>
    <div class="" v-else>Hello {{ $store.getters.user }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeView extends Vue {
  name = "";

  submitHandler(e: Event) {
    if (this.name == "") {
      return;
    }
    const target = e.target as HTMLButtonElement;
    if (target.name == "sign-in") {
      this.$store.dispatch("loginUser", this.name);
    }

    if (target.name == "sign-up") {
      this.$store.dispatch("regUser", this.name);
    }
  }
}
</script>
