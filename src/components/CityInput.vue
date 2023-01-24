<template>
	<div class="container">
		<div class="item-container">
			<h2>Додавання міста</h2>
			<p>Введіть назву міста</p>
			<div class="drop-list--wrapper">
				<input type="text" id="city-name" placeholder="Введіть місто" v-model="newCity" class="data-input" />
				<div class="drop-list" v-if="findedCities">
					<button class="drop-list--item" v-for="findCity in findedCities" :key="findCity"
						@click="onFindCityButtonClick(findCity)">{{
							findCity
						}}</button>
				</div>
			</div>
			<p class="new-city--error">{{ error }}</p>


		</div>


		<div class="item-container">
			<h2>Вибір міста</h2>
			<p>Оберіть місто</p>
			<select id="city-choose" v-model="currentCity" class="data-input">
				<option v-for="item in cityList">{{ item }}</option>
			</select>
			<p></p>
			<router-link :to="`/weather/${currentCity}`" class="button-style">
				Погода
			</router-link>
		</div>
	</div>
</template>

<script>
const cities = require('cities-list')

export default {
	props: {
		cityList: {
			type: Array,
			require: true
		}
	},
	data() {
		return {
			currentCity: '',
			newCity: '',
			allCities: [],
			error: ''
		}
	},
	computed: {
		findedCities() {
			if (this.newCity === '') return

			const citiesList = Object.keys(cities).map(item => item.toLowerCase())
			const cityNameLowered = this.newCity.toLowerCase()

			const allFindedCities = citiesList.filter((item) => {
				return item.includes(cityNameLowered)
			})

			return allFindedCities.slice(0, 5)
		}
	},
	methods: {
		addNewCity(cityName) {
			if (this.isExists()) {
				if (!this.$parent.cityList.includes(this.newCity)) {
					this.cityList.push(this.newCity)
					this.newCity = ''
					this.error = ''
				} else {
					this.error = 'Місто вже існує'
				}
				try {
					localStorage.setItem('cityList', JSON.stringify(this.cityList))
				} catch (e) {
					if (e == QUOTA_EXCEEDED_ERR) {
						alert('Перевищений ліміт')
					}
				}
			}
		},
		isExists() {
			this.allCities = Object.keys(cities)
			this.allCities = this.allCities.map(item => item.toLowerCase())

			// if (this.allCities.includes(this.newCity.toLowerCase())) {
			if (this.allCities.find(item => item.includes(this.newCity.toLowerCase()))) {
				console.log('ok')
				this.error = ''
				return true
			} else if (!this.newCity) {
				this.error = ''
			} else {
				this.error = 'Такого міста не існує'
				return false
			}
		},
		onFindCityButtonClick(cityName) {
			this.addNewCity(cityName)
			this.newCity = ''
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
	max-width: 720px;
	margin: 0 auto;
	margin-top: 100px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 50px 70px;
	font-family: 'Arial', serif;
	color: #fff;
}

.item-container {
	width: 290px;
}

.data-input {
	width: 250px;
	border-radius: 50px;
	padding: 10px;
	border: transparent;
	font-size: 18px;
}

.data-input:focus {
	outline: none;
}

h2 {
	font-size: 32px;
	padding-bottom: 5px;
	margin-bottom: 5px;
	position: relative;
}

p {
	margin-bottom: 5px;
	font-size: 18px;
	padding-left: 20px;
}

.button-style {
	width: 155px;
	background-color: rgb(26, 27, 33);
	padding: 10px 20px;
	display: block;
	text-decoration: none;
	color: #fff;
	text-align: center;
	border: transparent;
	font-size: 18px;
}

.drop-list--wrapper {
	position: relative;
}

.drop-list {
	margin-top: 10px;
	padding: 10px;
	border-radius: 10px;
	position: absolute;
	width: 250px;
	display: flex;
	flex-direction: column;
	background: white;
}


.drop-list--item {
	padding: 10px 25px;
	width: 100%;

	border: none;
	border-radius: 20px;
	background-color: transparent;
	transition: 0.2s all;

	text-transform: capitalize;
}

.drop-list--item:hover {
	background-color: rgb(26, 27, 33);
	color: white;
}

.new-city--error {
	margin-top: 15px;
}
</style>
