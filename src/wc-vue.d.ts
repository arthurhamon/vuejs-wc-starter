/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue from 'vue';
import { AxiosInstance } from 'axios';
import { Hub } from '@sentry/browser';
import { Boot } from '@/utils/boot';

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance;
    $api: AxiosInstance;
    $sentry: Hub;
    $appBoot: Boot;
  }
}
