import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";
import chatStore from "../../store/chatStore";

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme != "dark" ? "#fff" : "#000",
        },
        headerTintColor: colorScheme == "dark" ? "#fff" : "#000",
      }}
    >
      
      <Stack.Screen
        name="[address]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/qrcode"
        options={{ title: "Scan QR code", presentation: "fullScreenModal" }}
      />
    </Stack>
  );
}
