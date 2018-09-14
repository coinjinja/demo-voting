<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

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
  background: rgba(0, 0, 0, 60%);
  display: flex;
}
.header .title {
  text-align: right;
  flex: 1;
  cursor: pointer;
}
</style>
