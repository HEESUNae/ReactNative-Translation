import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './src/use-translation';
import Button from './src/components/Button';
import { useCookie } from './src/use-cookie';

export default function App() {
  const { t, locale, setLocale } = useTranslation();
  const { cookieKey } = useCookie();

  if (locale === null) return null;

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
