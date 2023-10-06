/**
 * 번역 라이브러리 (expo-localization, i18n-js)
 * 로컬 저장 (AsyncStorage)
 */
import { useEffect, useState } from 'react';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 나라별 언어 셋팅
const ko = require('./lang/lang.ko.json');
const en = require('./lang/lang.en.json');
const ja = require('./lang/lang.ja.json');
const zh = require('./lang/lang.zh.json');
const es = require('./lang/lang.es.json');

const i18n = new I18n({
  ko,
  en,
  ja,
  zh,
  es,
});

// 디바이스 설정 디폴트 언어
const deviceLanguage = getLocales()[0].languageCode;
const LOCALE_KEY = 'locale2';

export const useTranslation = () => {
  const [locale, _setLocale] = useState(null);

  const setLocale = (v) => {
    _setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  };

  const init = async () => {
    const fs = await AsyncStorage.getItem(LOCALE_KEY);
    fs !== null ? _setLocale(fs) : _setLocale(deviceLanguage);
  };

  useEffect(() => {
    init();
  }, []);

  return {
    locale,
    setLocale,
    t: (scope) => i18n.t(scope, { locale }),
  };
};
