import { Text, View } from "react-native";

export default function Page(){
  return <View>
    <View className="flex flex-col items-center pb-10">
        <View className="w-24 h-24 mb-3 rounded-full shadow-lg"></View>
        <Text className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</Text> 
    </View>
  </View>
}
