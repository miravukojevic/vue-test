<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <app-welcome></app-welcome>
  </div>
</template>

<script>
import Welcome from './Welcome.vue'

export default {
  name: 'App',
  components: {
    appWelcome: Welcome
  }
}
</script>

<style>
body{
  background: #000;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.logo {
  width: 300px;
  margin-top: 20%;
}
.welcome {
  color: #fff;
  font-size: 18px
}
hr{
  border-top: 1px solid #999;
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
