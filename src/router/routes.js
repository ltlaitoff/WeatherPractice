import CityInfo from '../views/CityInfo.vue'
import Home from '../views/Home.vue'

const routes = [
	{ path: '/', component: Home },
	{
		path: '/weather/:city',
		component: CityInfo,
		props: true
	}
]
export { routes }
