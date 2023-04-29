import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.mount('#app')
