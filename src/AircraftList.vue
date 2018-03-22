<template>
  <div class="container air-craft-list">
    <div class="wait" v-if="showLoad">
      <img class="loading" src="./assets/loading-transparent.gif">Please wait...
    </div>
  <div class="content-table" v-else>
    <h1>Welcome to aircraft list</h1>
    <button class="btn btn-default" @click="sortArray()"><span>Sort by highest altitude <i class="fa fa-sort-up"></i></span></button>
    <table cellspacing="0" cellpadding="0" class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Flight Code Number</th>
        <th scope="col" @click="sort('alt')">Altitude</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="info in airInfo" :key="info.Icao" @click="onClick(info.Id, info)">
        <th scope="row"><i class="fa fa-plane" v-if="info.Trak > 0 && info.Trak < 180"></i><i class="fa fa-plane fa-rotate-45" v-else></i></th>
        <td>
          {{info.Icao}}
          <div class="relative">
            <div class="alt-text">Click on row to see details for {{info.Mdl}} aircraft</div>
          </div>
        </td>
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
  name: 'AircraftList',
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
      this.apiurl = this.apiurl.replace("{lat}", this.positions.latitude);
      this.apiurl = this.apiurl.replace("{lng}", this.positions.longitude);

      // this.apiurl = this.apiurl.replace("{lat}", '33.433638');
      // this.apiurl = this.apiurl.replace("{lng}", '-112.008113');

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

        // console.log("a");
          // get status
          response.status;
          this.airInfo = response.data.acList

          this.showLoad = false;
          setTimeout(this.fetchData, 60000);
          console.log('Data updated automaticly each minute')
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
    sortArray(){
      this.airInfo.sort(this.dynamicSort('Alt'))
    },
    onClick (id, item) {
       this.$router.push({name: 'DetailRow', params:{id: id}});
       this.setDetails(item)
    }
  }
}
</script>

<style>
  .container {
    padding-top: 30px;
  }
  .air-craft-list h1 {
    margin-bottom: 40px;
    color: #fff;
  }
  table{
    border: none;
    border-collapse: collapse;
  }
  .relative{
    position: relative;
  }
  .content-table tr {
    cursor: pointer;
    position: relative;
  }
  .content-table tr:hover .alt-text{
    display:block;
  }
  .alt-text:before {
    position: absolute;
    z-index: -1;
    content: '';
    right: calc(50% - 10px);
    top: -8px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #d9534f transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }
  .alt-text{
    position: absolute;
    display:none;
    top:3px;
    left: 0;
    transform: translate(0,-20px);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
    transform: translate(0,10px);
    background-color: #d9534f;
    padding: 10px 20px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: auto;
    z-index: 10;
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
