import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App, {
    props: {
      wcconfig: {
        env: process.env.VUE_APP_ENV,
      },
    },
  }),
}).$mount('#app');
