<template>
  <div class="container welcome">
    <img class="logo" src="./assets/logo.png">
    <hr/>
    <p class="enter-site" v-if="!seen">To enter application please alow access to your location <button class="btn btn-default" v-on:click="geolocationTest()">allow</button></p>
    <div class="wait" v-else>
      <img class="loading" src="./assets/loading-transparent.gif">Please wait...
    </div>
    <!-- Modal box for alert messages -->
    <div id="alertModal" v-if="showModal" >
        <div class="modal-body">
          <i class='fa fa-exclamation-triangle'></i> {{alertmessage}}
        </div>
    </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        seen: false,
        position: '',
        alertmessage: '',
        showModal: false
      }
    },
    methods: {
      geolocationTest() {
        this.seen = true;
        if(navigator.geolocation) {
         var self = this;
         navigator.geolocation.watchPosition(this.showPosition, this.showError);
         console.log(navigator.geolocation)
          }

      },
      showPosition(positions) {
        this.seen = true;
        this.position = positions.coords.latitude;
        alert(this.position);
        console.log(navigator.geolocation.error)
          // this.alertmessage = "Permission denied! Please alow access to your location to enter website.";
      },
      showError(error) {
        this.seen = true;
        // $('.wait').css('display', none);
        switch (error.code) {
          case 1:
          console.log(error)
              this.alertmessage = "Permission denied! Please alow access to your location to enter website.";
              this.showModal = true;
              break;
          case 2:
              this.alertmessage = "Position unavailable! Please alow access to your location to enter website.";
              break;
          case 3:
              this.alertmessage = "Timeout! Please alow access to your location to enter website.";
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
.modal {
  display: block;
  color: black;
  color: red;
}
.modal-header {
  border-bottom: none;
  padding: 15px 15px 0 0;
}
.modal-body {
  padding-bottom: 30px;
}

</style>
