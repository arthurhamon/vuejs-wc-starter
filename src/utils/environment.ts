/* eslint-disable import/prefer-default-export */
// The file contents for all environment
import { name, version } from '../../package.json';

const sentryDsn = 'DSN';
const release = `${name}@${version}`;

export const environment = {
  i18n: {
    locale: 'us',
    fallback: 'us',
  },
  dev: {
    apiBaseUri: 'http://localhost:8081',
    sentry: {
      enabled: false,
      config: {
        dsn: sentryDsn,
        environment: 'development',
        release,
      },
    },
  },
  stage: {
    apiBaseUri: 'https://mystage.api.url.com',
    sentry: {
      enabled: false,
      config: {
        dsn: sentryDsn,
        environment: 'staging',
        release,
      },
    },
  },
  prod: {
    apiBaseUri: 'https://myprod.api.url.com',
    sentry: {
      enabled: true,
      config: {
        dsn: sentryDsn,
        environment: 'production',
        release,
      },
    },
  },
};
