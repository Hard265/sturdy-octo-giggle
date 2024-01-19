import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function Settings() {
  return (
    <View className="flex-1 p-8 items-center justify-center dark:bg-black">
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          title: "Me",
          headerTintColor:
            useColorScheme().colorScheme == "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor:
              useColorScheme().colorScheme == "dark" ? "black" : "white",
          },
        }}
      />
      
    </View>
  );
}
