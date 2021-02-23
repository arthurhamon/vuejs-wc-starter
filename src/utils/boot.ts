/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import axios from 'axios';
import { Env } from '@/interfaces/wc-config';
import { IBoot } from '@/interfaces/boot';
import { environment } from '@/utils/environment';

/**
 * Boot reference the app configuration,
 * insert here all the functtion that need
 * to be execute before the WC load.
 *
 * @export
 * @class Boot
 * @implements {IBoot}
 */
export class Boot implements IBoot {
  public env: Env = 'prod';

  constructor(env: Env) {
    if (env) {
      this.env = env;
    }
  }

  /**
   * Function for creating an instance of Axios with an API has base url
   *
   * @memberof Boot
   */
  public initApi(): void {
    Vue.prototype.$api = axios.create({
      baseURL: environment[this.env].apiBaseUri,
    });
  }

  /**
   * Function to call if you need to initialise a Sentry instance
   *
   * @memberof Boot
   */
  public initSentry(): void {
    if (environment[this.env]?.sentry?.enabled) {
      const sentryClient = new Sentry.BrowserClient({
        ...environment[this.env].sentry.config,
        integrations: [new VueIntegration({ Vue, attachProps: true })],
      });
      Vue.prototype.$sentry = new Sentry.Hub(sentryClient);
    }
  }
}
