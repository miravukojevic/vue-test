<template>
  <div class="container welcome">
    <img class="logo" src="./assets/logo.png">
    <hr/>
    <p class="enter-site" v-if="!seen">To enter application please alow access to your location <button class="btn btn-default" v-on:click="geolocationTest()">allow</button></p>
    <div class="wait" v-else-if="seen">
      <img class="loading" src="./assets/loading-transparent.gif">Please wait...
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        seen: false,
        position: ''
      }
    },
    methods: {
      geolocationTest() {
        this.seen = true;
        if(navigator.geolocation) {
         var self = this;
         navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
          }

      },
      showPosition(positions) {
        this.seen = true;
        this.position = positions.coords.latitude;
          console.log(this.position);
      },
      showError(error) {
        console.log(error);
        alert('deny');

        switch (error.code) {
          case error.PERMISSION_DENIED:
              alert('permision_denied');
              break;
          case error.POSITION_UNAVAILABLE:
              alert('POSITION_UNAVAILABLE')
              break;
          case error.TIMEOUT:
              alert('timeout')
              break;
      }
      }

  }
  }
</script>

<style>
.wait {
  font-size: 20px;
}
.loading {
  width: 28px;
  margin-top: -3px;
  margin-right: 5px;
}

</style>
