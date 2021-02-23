/*
 * Simple State Management
 * Because we don't need a big State manager like VueX
 * https://vuejs.org/v2/guide/state-management.html
 */
import Vue from 'vue';
import { IStore } from '@/interfaces/wc-config';

export const store: IStore = Vue.observable({
  isValue: false,
  value: '',
});

export const mutations = {
  setValue(newV: string) {
    store.value = newV;
    store.isValue = true;
  },
  resetValue() {
    store.value = '';
    store.isValue = false;
  },
};
