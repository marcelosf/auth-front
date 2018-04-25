// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import {store} from '@/store/Store';

import App from './App'
import router from './router'

Vue.use(Vuetify, {

  theme: {

    primary: '#42A5F5',

    secondary: '#b0bec5',

    accent: '#8c9eff',

    error: '#b71c1c'

  }

})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
