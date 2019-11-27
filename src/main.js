import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import {
  ButtonPlugin,
  CollapsePlugin,
  LayoutPlugin,
  LinkPlugin,
  NavbarPlugin,
  NavPlugin
} from "bootstrap-vue";

Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(CollapsePlugin);
Vue.use(LinkPlugin);
Vue.use(NavbarPlugin);
Vue.use(NavPlugin);

Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
