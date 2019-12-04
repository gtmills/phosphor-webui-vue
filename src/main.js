import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { dateFilter } from "vue-date-fns";
import {
  ButtonPlugin,
  CollapsePlugin,
  LayoutPlugin,
  LinkPlugin,
  NavbarPlugin,
  NavPlugin,
  TablePlugin,
  ModalPlugin,
  BadgePlugin,
  FormCheckboxPlugin,
  ListGroupPlugin
} from "bootstrap-vue";

Vue.filter("date", dateFilter);

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
Vue.use(FormCheckboxPlugin);
Vue.use(ListGroupPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
