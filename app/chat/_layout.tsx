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
      <Stack.Screen
        name="[address]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scan"
        options={{ title: "Scan QR code", presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        options={{
          title: "create",
          headerRight: (props) => (
            <Pressable onPress={() => router.push("/chat/scan")}>
              <Feather
                name="maximize"
                size={24}
                color={props.tintColor}
              />
            </Pressable>
          ),
          presentation: "modal",
        }}
        name="start"
      />
    </Stack>
  );
}
