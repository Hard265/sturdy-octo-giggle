import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";



export default function Page() {
  return (
    <View className="flex-1 justify-center items-center blur">
      <Text className="text-4xl font-black mb-8">Home page</Text>
      <StatusBar style="auto"/>
    </View>
  )
}
