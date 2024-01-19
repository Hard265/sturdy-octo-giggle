import { Slot } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-gray-200 dark:bg-black">
      <Slot />
    </View>
  );
}
