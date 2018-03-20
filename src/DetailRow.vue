<template>
    <div class="details-page">
      <h1>Welcome to detail page</h1>
      <p> aircraft's model: {{activeDetail.Mdl}}</p>
      <p> The manufacturer's name: {{activeDetail.Man}}</p>
      <p> The code and name of the departure airport: {{activeDetail.From}}</p>
      <p>   The code and name of the arrival airport: {{activeDetail.To}}</p>
      <p>Op je:{{activeDetail.Op}}</p>
      <img v-if="" :src="'//logo.clearbit.com/' + urlImg + '.com'">
      <a @click="$router.go(-1)">Back to aircraft list</a>
      <!-- <router-link :to="-1">back</router-link> -->
    </div>
</template>

  <script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return{
        airInfo:'',
        apiurl: 'http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fId=11315604',
        urlImg: ''
      }
    },
    created(){
      let test = this.activeDetail.Op
      this.urlImg = test.split(' ').slice(0,2).join('').toLowerCase();

      console.log(this.urlImg)
    },
    computed: {
      ...mapGetters(['activeDetail'])
    },
    methods: {

    },
  }
  </script>
<style>
.details-page{
color: #fff
}
</style>
