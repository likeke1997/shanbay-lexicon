// 导入 Vue
import Vue from "vue";
//
import VueResource from "vue-resource";
Vue.use(VueResource);
// 导入 VueRouter
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "./router.js";
// 导入 Mint-UI
import "mint-ui/lib/style.css";
import MintUI from "mint-ui";
Vue.use(MintUI);
// 导入组件
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
