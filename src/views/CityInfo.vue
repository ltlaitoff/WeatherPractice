<template>
	<CityShowMore :item="city"></CityShowMore>
</template>

<script>
import CityShowMore from '../components/CityShowMore.vue'

export default {
	props: {
		city: ''
	},
	components: {
		CityShowMore
	},
	data() {
		return {}
	}
}
</script>
