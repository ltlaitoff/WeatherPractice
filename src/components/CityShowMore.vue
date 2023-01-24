<template>
	<div class="container">
		<ul>
			<li>
				<img class="banner-country" crossorigin="anonymous" :src="countryFlagImg" />
			</li>
			<li><img src="../assets/humidity.svg" /></li>
			<li><img src="../assets/temperature.svg" /></li>
			<li><img src="../assets/main.svg" /></li>
			<li><img src="../assets/pressure.svg" /></li>
			<li><img src="../assets/description.svg" /></li>
			<li><img src="../assets/wind.svg" /></li>
			<li><img src="../assets/speed.svg" /></li>
		</ul>
		<ul>
			<li>{{ info.name }}</li>
			<li>humidity</li>
			<li>temp/feels like</li>
			<li>main</li>
			<li>pressure</li>
			<li>description</li>
			<li>wind deg</li>
			<li>wind speed</li>
		</ul>
		<ul>
			<!-- {{ info.coord }} -->
			<li>{{ sys.country }}</li>
			<li>{{ main.humidity }}</li>
			<li>{{ main.temp }}&#8451;</li>
			<li>{{ weather.main }}</li>
			<li>{{ main.pressure }}hpa</li>
			<li>{{ weather.description }}</li>
			<li>{{ wind.deg }}</li>
			<li>{{ wind.speed }}</li>
		</ul>
		<ul>
			<!-- {{ info.coord }} -->
			<li>[{{ coord.lon }}];[{{ coord.lat }}]</li>
			<li></li>
			<li>{{ main.feels_like }}&#8451;</li>
		</ul>
	</div>
</template>

<script>
import { Api } from '../api'

export default {
	props: {
		item: {
			type: String,
			require: false
		}
	},
	data() {
		return {
			info: {},
			sys: {},
			weather: {},
			coord: {},
			main: {},
			wind: {},
			countryFlagImg: ''
		}
	},
	mounted() {
		if (this.item) {
			Api.getWeatherInfo(this.item)
				.then(res => {
					console.log(res.data)
					this.info = res.data
					this.sys = res.data.sys
					this.weather = res.data.weather[0]
					this.coord = res.data.coord
					this.main = res.data.main
					this.wind = res.data.wind
					this.countryFlagImg = `https://countryflagsapi.com/png/${res.data.sys.country}`
				})
				.catch(e => {
					alert(e)
				})
		}
	}
}
</script>

<style scoped>
* {
	box-sizing: border-box;
}

.container {
	background: rgba(0, 0, 0, 0.7);
	width: 720px;
	margin: 0 auto;
	margin-top: 50px;
	padding: 50px 70px;
	display: flex;
	justify-content: space-between;
	color: #fff;
}

.banner-country {
	border-radius: 15%;
}

li {
	margin-bottom: 5px;
	text-align: center;
	height: 32px;
	font-size: 24px;
}

img {
	width: 32px;
	height: 32px;
}
</style>
