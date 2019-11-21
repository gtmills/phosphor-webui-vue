import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import CarbonComponentsVue from "@carbon/vue";
import "@/assets/styles/index.scss";

Vue.prototype.$http = Axios;
Vue.use(CarbonComponentsVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
