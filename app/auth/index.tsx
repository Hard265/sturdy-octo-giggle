import { Link, Stack, router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-end p-8 dark:bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable
        className="w-full flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3.5 mb-3 dark:bg-white"
        onPress={() => router.push("/auth/setup")}
      >
        <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
          create account
        </Text>
      </Pressable>
      <Pressable
        className="w-full flex justify-center items-center py-3.5 px-5 me-2 mb-2 bg-transparent rounded-lg border border-gray-300 dark:bg-transparent dark:border-gray-600"
        onPress={() => router.push("/auth/recover")}
      >
        <Text className="text-sm font-medium text-gray-900  dark:text-gray-400 uppercase">
          import from seed
        </Text>
      </Pressable>
    </View>
  );
}
