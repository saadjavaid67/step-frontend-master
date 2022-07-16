import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import PublicRoutes from './router';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { CookiesProvider } from 'react-cookie';
import themes from './settings/themes';
import AppLocale from './languageProvider';
import config, {
  getCurrentLanguage,
} from './containers/LanguageSwitcher/config';
import { themeConfig } from './settings';
import DashAppHolder from './dashAppStyle';
import Boot from './redux/boot';

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

const DashApp = () => (
  <ConfigProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <CookiesProvider>
          <DashAppHolder>
            <Provider store={store}>
              <PublicRoutes history={history} />
            </Provider>
          </DashAppHolder>
        </CookiesProvider>
      </ThemeProvider>
    </IntlProvider>
  </ConfigProvider>
);
Boot()
  .then(() => DashApp())
  .catch(error => console.error(error));

export default DashApp;
export { AppLocale };
