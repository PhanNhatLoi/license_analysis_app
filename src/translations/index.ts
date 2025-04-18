import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as resources from './resources';
import {store} from '@redux/store';

const initI18n = () => {
  const state = store.getState();
  const lng = state.initApp?.language || 'vi';

  return i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });
};

export default initI18n;
