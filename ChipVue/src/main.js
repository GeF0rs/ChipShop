import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueLoading from 'vuejs-loading-plugin'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'

const debug = process.env.NODE_ENV !== 'production';

// Для dev-режима
if (debug) {
    axios.defaults.baseURL = 'https://localhost:5001/api/';
}

Vue.use(Vuelidate)
Vue.use(VueLoading)
Vue.use(Notifications)
Vue.use(VModal)

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})


