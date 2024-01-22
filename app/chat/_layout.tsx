import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";

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
      <Stack.Screen name="index" options={{
        title: "", headerRight(props) {
          return <Pressable>
            <Feather name="user" size={24} color={props.tintColor} />
          </Pressable>
        },
      }} />
      <Stack.Screen
        name="[address]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scan"
        options={{ title: "Scan QR code", presentation: "fullScreenModal" }}
      />
    </Stack>
  );
}
