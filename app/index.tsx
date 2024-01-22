import { Stack } from "expo-router";
import { Link, Slot, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

export default function Page() {
  return (
    <View className="p-8 flex-1 justify-end items-center dark:bg-black">
      <Pressable
        className="w-full flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3.5 dark:bg-white"
        onPress={() => router.replace("/chat/")}
      >
        <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
          get started
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
