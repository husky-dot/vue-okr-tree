import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import "github-markdown-css";
new Vue({
  render: h => h(App)
}).$mount("#app");
