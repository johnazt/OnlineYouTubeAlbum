import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { firebaseApp } from './firebase.js'
import { VueFire, VueFireAuth } from 'vuefire'


const app = createApp(App)
app
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.mount('#app')