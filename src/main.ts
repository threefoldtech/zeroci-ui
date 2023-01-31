import Vue from "vue";
import ZeroCI from "./ZeroCI.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(ZeroCI),
}).$mount("#app");
