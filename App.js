import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useTranslation } from './src/use-translation';
import { useCookie } from './src/use-cookie';
import Button from './src/components/Button';

// Splash 화면 항상 표출
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale } = useTranslation();
  const { cookieKey } = useCookie();

  const [isLoaded, setIsLoaded] = useState(false);

  // 준비완료되면 상태값 변경
  useEffect(() => {
    if (locale !== null && cookieKey !== '') {
      setIsLoaded(true);
    }
  }, [locale, cookieKey]);

  // 로드 후 스플래시 숨기기
  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  // if (locale === null || cookieKey === '') return null;

  return (
    <View style={styles.container}>
      <Text>{t(cookieKey)}</Text>
      <View style={styles.buttonContainer}>
        <Button text="KO" onPress={() => setLocale('ko')} isSelected={locale === 'ko'} />
        <Button text="EN" onPress={() => setLocale('en')} isSelected={locale === 'en'} />
        <Button text="JA" onPress={() => setLocale('ja')} isSelected={locale === 'ja'} />
        <Button text="ZH" onPress={() => setLocale('zh')} isSelected={locale === 'zh'} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
