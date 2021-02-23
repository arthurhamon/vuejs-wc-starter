import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';
import VueCookies from 'vue-cookies';
import { environment } from '@/utils/environment';

Vue.use(VueCookies);
Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context('../i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach((key: string) => {
    if (key.includes('source')) {
      return;
    }
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: Vue.$cookies.isKey('app_locale') ? Vue.$cookies.get('app_locale') : environment.i18n.locale,
  fallbackLocale: environment.i18n.fallback || 'us',
  messages: loadLocaleMessages(),
});
