<template>
    <div>
      <h1>Welcome to detail page</h1>
      <p> aircraft's model.{{activeDetail.Mdl}}</p>
      <p> The manufacturer's name {{activeDetail.Man}}</p>
      <p> The code and name of the departure airport {{activeDetail.From}}</p>
      <p>   The code and name of the arrival airport {{activeDetail.To}}</p>
      <img src="//logo.clearbit.com/koreanair.com">
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
        detailtest: ''
      }
    },
    created(){

      this.detailsRow = this.$store.getters.getDetails;
            console.log(this.detailsRow);
      // this.$http.jsonp(this.apiurl).then(response => {


      //     // get status
      //     response.status;

      //     // get status text
      //     response.statusText;

      //     // get 'Expires' header
      //     response.headers.get('Expires');

      //     // get body data

      //     this.airInfo = response.data.acList
      //       console.log('tu sam');

      //     // setTimeout(this.fetchData(), 200);
      //     this.showLoad = false;

      //     }, response => {
      //       // error callback
      //     });
    },
    computed: {
      ...mapGetters(['activeDetail'])
    },
    methods: {
      onClick (event) {
        console.log('my-detail-row: on-click', event.target)
      }
    },
  }
  </script>
//  http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components
