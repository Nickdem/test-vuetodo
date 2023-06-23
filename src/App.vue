<template>
  <div id="app" class="container">
    <header class="header">
      <span class="header__logo">TM</span>
      <nav class="header__navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/list" v-if="$store.getters.user.length"
          >List</router-link
        >
        <button @click="logoutHandler" v-if="$store.getters.user.length">
          Log out
        </button>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <span class="footer__text">2023</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "./router";

@Component
export default class AppView extends Vue {
  async mounted() {
    await this.$store.dispatch("getUser");
  }

  logoutHandler() {
    this.$store.dispatch("logoutUser");
    router.push("/");
  }
}
</script>

<style lang="less">
@red: #ff5656;
@link-color: #ffffff;
@link-color-hover: darken(@link-color, 20%);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
}

body {
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: #3d3d3d #eee;
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 10px;
}

.header {
  background-color: @red;
  padding: 2em 6em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    font-size: 4em;
    color: @link-color;
  }

  &__navigation {
    display: flex;
    column-gap: 2em;

    a {
      font-size: 2em;
      font-weight: bold;
      color: @link-color;

      &.router-link-exact-active {
        color: @link-color-hover;
      }
    }
  }
}

.container {
  max-width: 1440px;
  margin: 1em auto;
  border-radius: 0.5em;
  border: 1px solid #7c7c7c;
  box-shadow: 0 0 5px #393939;
}

.main {
  height: calc(100vh - 85px - 63px - 20px);
}

.footer {
  background-color: @red;
  padding: 2em 0;
  text-align: center;
  &__text {
    color: @link-color;
    font-size: 2em;
  }
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  border-width: 1px 1px 1px 2px;
  border-color: #000;
  background-color: #dddddd;
}

::-webkit-scrollbar-thumb:hover {
  border-width: 1px 1px 1px 2px;
  border-color: #555;
  background-color: #000;
}

::-webkit-scrollbar-track {
  border-left: 1px solid #aaa;
}

::-webkit-scrollbar-track:hover {
  border-left: 1px solid #555;
  background-color: #eee;
}
</style>
