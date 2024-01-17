import { Stack } from "expo-router";
import { View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 dark:bg-black">
      <Stack.Screen options={{
        headerTitle: 'Chats',
        headerTitleAlign: "center",
      }} />
    </View>
  );
}
