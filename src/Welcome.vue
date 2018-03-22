<template>
  <div class="container welcome">
    <img class="logo" src="./assets/logo.png">
    <hr/>
    <p class="enter-site" v-if="!seen">To enter application please alow access to your location <button class="btn btn-default allow-btn" v-on:click="geolocationTest()">Allow</button></p>
    <div class="wait" v-if="showLoading">
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
        showLoading: false,
        position: '',
        alertmessage: '',
        showModal: false
      }
    },
    methods: {
      geolocationTest() {
        this.seen = true;
        this.showLoading = true;
        if(navigator.geolocation) {
         var self = this;
         navigator.geolocation.watchPosition(this.showPosition, this.showError);


          }

      },
      showPosition(positions) {
        this.seen = true;

        this.$store.dispatch('setPositions', positions.coords);
        this.$router.push('/aircraft');
      },
      showError(error) {
        this.seen = true;
        switch (error.code) {
          case 1:
          console.log(error)
              this.alertmessage = "Permission denied! Please alow access to your location to enter website.";
              this.showModal = true;
              this.showLoading = false;
              break;
          case 2:
              this.alertmessage = "Position unavailable! Please alow access to your location to enter website.";
              this.showModal = true;
              this.showLoading = false;
              break;
          case 3:
              this.alertmessage = "Timeout! Please alow access to your location to enter website.";
              this.showModal = true;
              this.showLoading = false;
              break;
          }
      }

    }
  }
</script>

<style>
  .allow-btn {
    background: url("assets/sucess.png") #35C245 no-repeat left 3px center;
    padding: 10px 10px 10px 33px;
    color: #fff;
    margin: 20px auto;
    display: block;
    float: none;
  }
  .allow-btn:hover{
    background: url("assets/sucess-hover.png") #26BA34 no-repeat left 3px center;
    color: #fff;
  }
  .wait {
    font-size: 20px;
  }
  .loading {
    width: 28px;
    margin-top: -3px;
    margin-right: 5px;
  }
  #alertModal {
    background-color: rgba(250,0,0,.4);
    border: 1px solid #999;
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
    padding: 30px;
  }
</style>
