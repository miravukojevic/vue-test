<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Welcome from './Welcome.vue'
import AircraftList from './AircraftList.vue'

export default {
  name: 'App',
  components: {
    appWelcome: Welcome,
    appList: AircraftList
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
      margin-left: -55px;
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
