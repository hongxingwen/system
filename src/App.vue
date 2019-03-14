<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <sideBar v-if="routerFlag"></sideBar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
import sideBar from './components/sideBar'
export default {
  name: 'app',
  data() {
    return {
      routerFlag: true
    }
  },
  components: {
    Header,
    sideBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  position: relative;
}
</style>
