import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function Modal() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <Pressable className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <MaterialIcons name="close" />
        </Pressable>
        <View className="p-4 md:p-5 text-center">
          <MaterialIcons
            name="check-circle"
            size={100}
            color="#4CAF50"
          />
        </View>
      </View>
    </View>
  );
}
