import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";

export default function Header() {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerRight: (props) => (
          <View className="flex-row space-x-2">
            <Pressable
              className="p-2.5"
            >
              <Feather
                name="search"
                size={24}
                color={props.tintColor}
              />
            </Pressable>
            <Pressable
              className="p-2.5"
            >
              <Feather
                name="user"
                size={24}
                color={props.tintColor}
              />
            </Pressable>
          </View>
        ),
      }}
    />
  );
}
