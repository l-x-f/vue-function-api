import Vue from "vue";
import App from "./App.vue";

import { plugin } from "vue-function-api";
// 显式地通过 Vue.use() 来安装 vue-function-api插件
Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
