import { Feather } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";

export default function Layout() {
  const { address } = useLocalSearchParams();
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: address.toString(),
          headerRight: (props) => (
            <Pressable>
              <Feather
                {...props}
                name="user"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            </Pressable>
          ),
          headerTintColor: colorScheme == "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
        }}
      />
      <Stack.Screen
        options={{ presentation: "modal" }}
        name="details"
      />
    </Stack>
  );
}
