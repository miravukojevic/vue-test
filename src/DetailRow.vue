<template>
    <div class="details-page container">
      <h1>Welcome to {{activeDetail.Mdl}} details</h1>
      <table cellspacing="0" cellpadding="0" class="table table-sm table-dark">
        <tbody>
          <tr>
            <th scope="row" class="border-none">Aircraft's model</th>
            <td class="border-none">{{activeDetail.Mdl}}</td>
          </tr>
          <tr>
            <th scope="row">The manufacturer's name</th>
            <td>{{activeDetail.Man}}</td>
          </tr>
          <tr v-if="activeDetail.From">
            <th scope="row">The code and name of the departure airport</th>
            <td>{{activeDetail.From}}</td>
          </tr>
          <tr v-if="activeDetail.To">
            <th scope="row">The code and name of the arrival airport</th>
            <td>{{activeDetail.To}}</td>
          </tr>
          <tr>
            <th scope="row">The logo of company</th>
            <td>
              <img  v-if="urlImg"  :src="'//logo.clearbit.com/' + urlImg + '.com'" alt="activeDetail.Op">
              <img  v-else  src="./assets/noimage.png" alt="No image under this url">
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="back-link" to="/aircraft"><i class="fa fa-arrow-left"></i> Back to aircraft list</router-link>
    </div>
</template>

  <script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'DetailRow',
    data() {
      return{
        airInfo:'',
        urlImg: ''
      }
    },
    created(){
      if (this.activeDetail.Op){
      let imgByOp = this.activeDetail.Op
      this.urlImg = imgByOp.split(' ').slice(0,2).join('').toLowerCase();
      }
      console.log(this.urlImg)
    },
    computed: {
      ...mapGetters(['activeDetail'])

    }
  }
  </script>
<style>
  .details-page{
    color: #fff;
    background: url("assets/airplane-bg.png") no-repeat right 5% top 30px;
    padding-top: 40px;
    min-height: 500px;
  }
  .details-page h1 {
    margin-bottom: 40px;
  }
  .back-link{
    float: right;
    margin-top: 30px;
    color: #fff;
  }
  .back-link:hover {
    color: #fff;
    cursor: pointer;
    border-bottom: 1px solid #32383e;
    padding-bottom: 3px;
    text-decoration: none;
  }
  .border-none{
    border-top: none !important;
  }
</style>
