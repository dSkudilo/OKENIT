import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import components from '@/components/ui'
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)

components.forEach(component => app.component(component.name, component))

app
  .use(store)
  .use(router)
  .mount('#app')
