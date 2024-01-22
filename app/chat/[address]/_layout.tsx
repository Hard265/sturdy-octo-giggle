import { Feather } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";

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
        options={{ presentation: "modal" }}
        name="details"
      />
    </Stack>
  );
}
