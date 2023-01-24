<template>
  <CityInput :cityList="cityList"></CityInput>
  <CityShow :item="currentPositionCity" v-if="currentPositionCity"></CityShow>
  <CityShow v-for="item in cityList" :item="item"></CityShow>
</template>

<script>
import { CityInput,CityShow } from '../Components';
import { Api } from '../Api';

export default{
  name:"Home",
  components:{
    CityInput,
    CityShow
  },
  data() {
    return {
      cityList:[],
      currentPositionCity:"",
    }
  },
  mounted(){
    this.getCityList();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        Api.getWeatherInfoByCoords(position.coords.latitude,position.coords.longitude)
      .then((res)=>{
      this.currentPositionCity = res.data.name;
    })
    .catch((e)=>{
      alert(e);
    })
      })
    }
  },
  methods:{
    getCityList(){
      if(localStorage.getItem('cityList')){
        this.cityList = JSON.parse(localStorage.getItem('cityList'));
      }
    }
  }
}

</script>