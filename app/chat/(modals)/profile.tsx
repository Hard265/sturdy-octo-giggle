import { Pressable, Switch, Text, View } from "react-native";
import Toogle from "../../../components/Toggle";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Page() {
  const [nighty, setNighty] = useState(false);
  
  return (
    <View className="flex-1 items-center dark:bg-black p-2">

      <Pressable onPress={()=>nighty} className="sm:container flex flex-row mt-auto justify-between p-4 rounded-lg bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700">
        <Text className="text-sm text-gray-800 dark:text-gray-300 uppercase">
          Dark mode
        </Text>
        <Feather name="moon" size={24}/>
      </Pressable>
      <Pressable className="sm:container flex flex-row mt-auto justify-between p-4 rounded-lg bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700">
        <Text className="text-sm text-gray-800 dark:text-gray-300 uppercase">
          Two factor authentication
        </Text>
        <Toogle
          value={nighty}
          onChange={function (value: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Pressable>
    </View>
  );
}
