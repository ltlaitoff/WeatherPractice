<template>
	<div class="container">
		<ul>
			<li>{{ info.name }}</li>
			<li><img src="../assets/humidity.svg" /></li>
			<li><img src="../assets/temperature.svg" /></li>
			<li><img src="../assets/main.svg" /></li>
			<li><img src="../assets/pressure.svg" /></li>
			<li><img src="../assets/description.svg" /></li>
		</ul>
		<ul>
			<li>{{ sys.country }}</li>
			<li>humidity</li>
			<li>temp</li>
			<li>main</li>
			<li>pressure</li>
			<li>description</li>
		</ul>
		<ul>
			<li>[{{ coord.lon }}];[{{ coord.lat }}]</li>
			<li>{{ main.humidity }}</li>
			<li>{{ main.temp }}&#8451;</li>
			<li>{{ weather.main }}</li>
			<li>{{ main.pressure }}hpa</li>
			<li>{{ weather.description }}</li>
		</ul>
	</div>
</template>

<script>
import { Api } from '../api'

export default {
	name: 'CityShow',
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
			main: {}
		}
	},
	mounted() {
		if (this.item) {
			Api.getWeatherInfo(this.item)
				.then(res => {
					this.info = res.data
					this.sys = res.data.sys
					this.weather = res.data.weather[0]
					this.coord = res.data.coord
					this.main = res.data.main
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
