<template>
  <div id="app">
    <header class="header">
      <span class="header__logo">TM</span>
      <nav class="header__navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/list">List</router-link>
      </nav>
    </header>
    <main class="main container">
      <router-view />
    </main>
    <footer class="footer">
      <span class="footer__text">2023</span>
    </footer>
  </div>
</template>

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
  padding: 0 4em;
  max-width: 1440px;
  margin: 0 auto;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @red;
  padding: 2em 0;
  text-align: center;
  &__text {
    color: @link-color;
    font-size: 2em;
  }
}
</style>
