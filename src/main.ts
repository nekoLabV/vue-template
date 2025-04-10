import '@/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import directives from '@/directives'

import App from './App.vue'

function initApp(config: Config) {
	const { el } = config
	const app = createApp(App)
	app.use(createPinia())
	directives.map((item) => app.directive(item.name, item.path))
	app.mount(el)
}

window.initApp = initApp