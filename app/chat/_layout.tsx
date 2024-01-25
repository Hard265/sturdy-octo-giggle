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
        name="index"
        options={{
          title: "",
          headerRight(props) {
            return (
              <View className="flex flex-row gap-x-4">
                <Pressable onPress={()=>router.push("/chat/qrcode")}>
                  <MaterialCommunityIcons
                    name="qrcode"
                    size={24}
                    color={props.tintColor}
                  />
                </Pressable>
                <Pressable>
                  <Feather
                    name="search"
                    size={24}
                    color={props.tintColor}
                  />
                </Pressable>
                <Pressable>
                  <Feather
                    name="user"
                    size={24}
                    color={props.tintColor}
                  />
                </Pressable>
              </View>
            );
          },
        }}
      />
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
