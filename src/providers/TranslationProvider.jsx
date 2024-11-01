/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/locale-data/ja';
import '@formatjs/intl-relativetimeformat/locale-data/zh';
import { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { I18N_CONFIG_KEY, I18N_DEFAULT_LANGUAGE } from '@/i18n';
import { getData, setData } from '@/utils';
const calculateInitialLanguage = () => {
  const currentLanguage = getData(I18N_CONFIG_KEY);
  return currentLanguage ?? I18N_DEFAULT_LANGUAGE;
};
const initialProps = {
  currentLanguage: calculateInitialLanguage(),
  changeLanguage: _ => {}
};
const TranslationsContext = createContext(initialProps);
const useLang = () => useContext(TranslationsContext);
const I18NProvider = ({
  children
}) => {
  const {
    currentLanguage
  } = useLang();
  return <IntlProvider messages={currentLanguage.messages} locale={currentLanguage.code} defaultLocale={calculateInitialLanguage().code}>
      {children}
    </IntlProvider>;
};
const TranslationProvider = ({
  children
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(initialProps.currentLanguage);
  const changeLanguage = language => {
    setData(I18N_CONFIG_KEY, language);
    setCurrentLanguage(language);
  };
  return <TranslationsContext.Provider value={{
    currentLanguage,
    changeLanguage
  }}>
      <I18NProvider>{children}</I18NProvider>
    </TranslationsContext.Provider>;
};
export { TranslationProvider, useLang };