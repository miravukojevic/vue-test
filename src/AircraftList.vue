<template>
  <div class="container">
    <div class="wait" v-if="showLoad">
      <img class="loading" src="./assets/loading-transparent.gif">Please wait...
    </div>
  <div class="content-table" v-else>
    <button class="btn btn-default" @click="sortArray(airInfo)">Sort by highest altitude <i class="fa fa-sort-up"></i></button>
    <table cellspacing="0" cellpadding="0" class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Flight Code Number</th>
        <th scope="col" @click="sort('alt')">Altitude</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(info) in airInfo" :key="info.Icao" @click="onClick(info.Id, info)">
        <th scope="row"><i class="fa fa-plane"></i></th>
        <td>{{info.Icao}}</td>
        <td>{{info.Alt}}</td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['details'],
  data () {
    return {
      list: [],
      airInfo: '',
      timer: '',
      showLoad: true,
      positions: {},
      apiurl: 'http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat={lat}&lng={lng}'
    }
  },
  created() {
    this.positions = this.$store.getters.getPositions;

    if(typeof this.positions.latitude == "undefined" || typeof this.positions.longitude == "undefined")
      this.$router.push({name: 'Welcome'});
  else
  {
      // this.apiurl = this.apiurl.replace("{lat}", this.positions.latitude);
      // this.apiurl = this.apiurl.replace("{lng}", this.positions.longitude);

      this.apiurl = this.apiurl.replace("{lat}", '33.433638');
      this.apiurl = this.apiurl.replace("{lng}", '-112.008113');

      this.fetchData()
  }
  },
  computed: {
    ...mapGetters(['activeDetail'])
  },
  methods: {
    ...mapActions(['setDetails']),
    fetchData() {
      this.$http.jsonp(this.apiurl).then(response => {

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
    dynamicSort(property) {
      let sortOrder = -1;
      if(property[0] === "-") {
      sortOrder = 1;
      property = property.substr(1);
      }
        return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    },
    sortArray(airInfo){
      airInfo.sort(this.dynamicSort('Alt'))
    },
    onClick (id, item) {
       this.setDetails(item)
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
.btn-default {
  float:right;
  color: #fff;
  background: none;
  border: none;
  padding-right: 0;
  }
.btn-default .fa{
  margin-left: 5px;
  vertical-align: bottom;
}
.btn-default:hover, .btn-default:active, .btn-default:focus{
  color: #fff;
  background: none;
  border:none;
  outline: none;
}
</style>
