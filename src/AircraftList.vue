<template>
  <div class="container">
    <div class="wait" v-if="showLoad">
      <img class="loading" src="./assets/loading-transparent.gif">Please wait...
    </div>
  <table cellspacing="0" cellpadding="0" class="table table-striped table-dark" v-else>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Flight Code Number</th>
      <th scope="col">Altitude</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="info in airInfo" :key="info.Icao" @click="onClick(info.Id)">
      <th scope="row"><i class="fa fa-plane"></i></th>
      <td>{{info.Icao}}</td>
      <td>{{info.Alt}}</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      airInfo: '',
      timer: '',
      showLoad: true
    }
  },
  components: {

  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

      this.$http.jsonp('http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.433638&lng=-112.008113&fDstL=0&fDstU=100', {foo: 'bar'}).then(response => {

        console.log("a");
          // get status
          response.status;

          // get status text
          response.statusText;

          // get 'Expires' header
          response.headers.get('Expires');

          // get body data

          this.airInfo = response.data.acList

          // setTimeout(this.fetchData(), 200);
          this.showLoad = false;

          }, response => {
            // error callback
          });
    },
    onClick (id) {
      console.log("op")
         this.$router.push({name: 'DetailRow', params:{id: id}});
      }
  }
}
</script>

<style>
.container {
  padding-top: 30px;
}
table{
  border: none;
  border-collapse: collapse;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
  color: #fff;
  text-align: left;
  border-color: #32383e;
}
.fa-rotate-45 {
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -o-transform: rotate(270deg);
  transform: rotate(270deg);
}
.table-striped>tbody>tr:nth-of-type(odd){
  background-color: #2B2E31;
}
.wait{
  color: #fff;
}
.wait img{
  width:40px;
  height: 40px;
}
</style>
