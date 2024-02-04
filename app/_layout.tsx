import { Slot, Stack, router } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { setBackgroundColorAsync } from "expo-system-ui"


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Medium': require('../assets/fonts/Inter/Inter-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // useEffect(function didMount() {
  // }
  // )


  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: scheme == "dark" ? "#000" : "#e5e7eb", }, headerTintColor: scheme == "dark" ? "#f3f4f6" : "#1f2937" }}>
      <Stack.Screen name="index" options={{
        headerShown: false
      }} />
    </Stack>
  )
}
