import Vue from 'vue'
import App from './App.vue'

// create global filter
Vue.filter('snippet', val => {
	if (!val || typeof val != 'string') return ''

	const charLimit = 100
	if (val.length > charLimit) {
		let spaceIndex = [...val].findIndex((l, i) => (l == ' ' || l == '\n') && i > charLimit)
		val =
			spaceIndex !== -1 && spaceIndex < charLimit + 20
				? val.slice(0, spaceIndex)
				: val.slice(0, charLimit)
		val += '...'
	}
	return val
})

new Vue({
	el: '#app',
	render: h => h(App),
})
