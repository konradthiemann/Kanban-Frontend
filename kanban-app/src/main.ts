import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.mount('#app')
