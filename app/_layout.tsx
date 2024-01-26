import { Slot } from "expo-router";
import { View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { useCallback } from "react";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View className="flex-1 bg-gray-200 dark:bg-black">
      <Slot />
    </View>
  );
}
