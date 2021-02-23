<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { store, mutations } from '@/utils/store';
import { Boot } from '@/utils/boot';
import { IWcConfig } from '@/interfaces/wc-config';
import i18n from '@/utils/i18n';
import HelloWorld from './components/HelloWorld.vue';

Vue.prototype.$http = axios;

@Component({
  i18n,
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  /**
   * The web component configuration
   * pass via props to get the environment from the mother app
   */
  @Prop()
  public readonly wcconfig!: IWcConfig;

  get isValue() {
    return store.isValue;
  }

  get value() {
    return store.value;
  }

  beforeCreate() {
    mutations.setValue('My value from before Create');
  }

  created() {
    console.log('WC rendered with config :', this.wcconfig);
    this._initWc(this.wcconfig);
  }

  /**
   * Init the web component
   *
   * @param {IWcConfig} config
   * @returns
   * @memberof App
   */
  private _initWc(config: IWcConfig) {
    // Boot the app, you can add a custom env, default is prod
    // Add this to the Vue instance properties
    Vue.prototype.$appBoot = new Boot(config?.env);
    // Call this to init Sentry
    this.$appBoot.initSentry();
    // Init the Api
    this.$appBoot.initApi();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
