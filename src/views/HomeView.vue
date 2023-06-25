<template>
  <div class="home">
    <h3 class="home__title">Home</h3>
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
    <h4 class="home__welcome" v-else>
      Hello {{ $store.getters.user }}! Check
      <router-link to="/list"> tasks</router-link>
    </h4>
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

<style lang="less" scoped>
.home {
  padding: 0.5em 1em;

  &__title {
    font-size: 1.8em;
  }

  &__welcome {
    font-size: 1.6em;

    & a {
      color: #ff5656;
    }
  }
}

.form {
  text-align: left;
  width: 400px;
  margin-top: 20%;
  margin-left: auto;
  margin-right: auto;

  &__label {
    font-size: 1.6em;
    line-height: 2em;
  }

  &__input {
    width: 100%;
    font-size: 1.4em;
    padding: 0.6em;
    font-family: sans-serif;
    margin-bottom: 1em;
  }

  &__button {
    width: 49%;
    border: none;
    color: #ffffff;
    padding: 0.4em;
    border-radius: 0.2em;
    background-color: #ff5656;

    &:last-child {
      margin-left: 4px;
    }
  }
}
</style>
