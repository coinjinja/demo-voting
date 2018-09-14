<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #000;
}
body, button {
  font-family: "Open Sans", "Source Han Sans", -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
.container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0 40px;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  color: #8c9599;
  font-weight: 600;
  font-size: 36px;
  display: flex;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 60%);
}
.header .title {
  text-align: right;
  flex: 1;
  cursor: pointer;
}
.nav {
  position: absolute;
  top: 80px;
  right: 0px;
  margin-right: 40px;
}
.nav button {
  cursor: pointer;
  font-size: 28px;
  background: transparent;
  color: #8c9599;
  border: 0;
  padding: 0 10px;
  outline: 0;
  border-right: 2px solid #8c9599;
}
.nav button.prev {
  border-right: 0;
  border-left: 2px solid #8c9599;
}
.nav button:active {
  color: #ccc;
  border-right-color: #ccc;
}
</style>
