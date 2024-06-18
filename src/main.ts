import '@/style/index.scss'
import 'virtual:uno.css'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { prototypeInterceptor, routeInterceptor } from './interceptors'
import store from './store'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(prototypeInterceptor)
  return {
    app,
  }
}
