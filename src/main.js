import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ButtonPlugin,
  CollapsePlugin,
  LayoutPlugin,
  LinkPlugin,
  NavbarPlugin,
  NavPlugin,
  TablePlugin,
  ModalPlugin,
  BadgePlugin
} from "bootstrap-vue";

Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(CollapsePlugin);
Vue.use(LinkPlugin);
Vue.use(NavbarPlugin);
Vue.use(TablePlugin);
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(NavPlugin);
Vue.use(BadgePlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
