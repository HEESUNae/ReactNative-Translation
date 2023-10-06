import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import { useTranslation } from './src/use-translation';
import { useCookie } from './src/use-cookie';
import Button from './src/components/Button';
import LoadingView from './src/components/LoadingView';

// Splash 화면 항상 표출
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();

  const [isLoaded, setIsLoaded] = useState(false);

  // 폰트 설정
  const [fontsLoaded] = useFonts({
    RIDIBatang: require('./assets/fonts/RIDIBatang.otf'),
  });

  // 오늘 날짜 기준으로 설정
  const today = new Date();
  const todayText = format(t('today_is'), today.getFullYear(), today.getMonth() + 1, today.getDate());

  const locales = ['ko', 'en', 'ja', 'zh', 'es'];

  // 언어 셋팅 완료시 로딩화면 보여주기
  useEffect(() => {
    if (cookieKey !== '') {
      setIsLoaded(true);
    }
  }, [locale, cookieKey]);

  // 언어 셋팅 후 스플래시 숨기기
  useEffect(() => {
    if (locale !== null && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [locale, fontsLoaded]);

  if (!isLoaded) return <LoadingView />;

  return (
    <View style={styles.container}>
      <LottieView autoPlay={false} source={require('./assets/background.json')} resizeMode="cover" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map((item) => (
              <Button
                key={item}
                text={item.toUpperCase()}
                onPress={() => setLocale(item)}
                isSelected={locale === item}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    fontFamily: 'RIDIBatang',
    position: 'absolute',
    top: 70,
    fontSize: 13,
    color: '#8b658f',
  },
  cookieText: {
    fontFamily: 'RIDIBatang',
    fontSize: 22,
    color: '#372538',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 25,
  },
});
