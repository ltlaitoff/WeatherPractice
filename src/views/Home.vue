<template>
	<CityInput :cityList="cityList"></CityInput>
	<CityShow :item="currentPositionCity" v-if="currentPositionCity"></CityShow>
	<CityShow v-for="item in cityList" :item="item"></CityShow>
</template>

<script>
import CityInput from '../components/CityInput.vue'
import CityShow from '../components/CityShow.vue'
import { Api } from '../api'

export default {
	components: {
		CityInput,
		CityShow
	},
	data() {
		return {
			cityList: [],
			currentPositionCity: ''
		}
	},
	mounted() {
		this.getCityList()

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				Api.getWeatherInfoByCoords(
					position.coords.latitude,
					position.coords.longitude
				)
					.then(res => {
						this.currentPositionCity = res.data.name
					})
					.catch(e => {
						alert(e)
					})
			})
		}
	},
	methods: {
		getCityList() {
			if (localStorage.getItem('cityList')) {
				this.cityList = JSON.parse(localStorage.getItem('cityList'))
			}
		}
	}
}
</script>
