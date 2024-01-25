import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { PlatformColor, Pressable, Switch, Text, TextInput, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useState } from "react";

export default function Modal() {
  const { address } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [archived, setArchived] = useState(false)

  return (
    <View className="flex-1 p-2 dark:bg-black">
      <Stack screenOptions={{ title: address.toString() }} />

      <View className="w-36 h-36 mx-auto mt-8 mb-4 rounded dark:bg-gray-900 "></View>
      <View className="flex flex-row">
        <TextInput
          value={address.toString()}
          editable={false}
          className="block p-2.5 flex-1 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700"
        />
        <Pressable className="p-2.5 bg-gray-50 rounded-r-lg border border-l-0 border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:border-gray-500">
          <Feather
            name="clipboard"
            size={24}
            color={
              colorScheme === "dark" ? Colors.dark.text : Colors.light.text
            }
          />
        </Pressable>
      </View>

      {/* a card button to delete chat */}
      <Pressable className="sm:container flex flex-row mt-auto justify-between p-4 rounded-t-lg bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700">
        <Text className="text-sm text-gray-800 dark:text-gray-300 uppercase">
          Archive Chat
        </Text>
        <Switch onValueChange={setArchived} value={archived} className="h-4"/>
      </Pressable>
      <Pressable className="sm:container flex flex-row justify-between p-4 bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700">
        <Text className="text-sm text-red-800 dark:text-red-400 uppercase">
          Block
        </Text>
        <Feather
          name="slash"
          size={24}
          color={
            colorScheme === "dark" ? Colors.dark.error : Colors.light.error
          }
        />
      </Pressable>
      <Pressable className="sm:container flex flex-row justify-between p-4 rounded-b-lg bg-red-50 dark:bg-gray-800 border border-t-0 border-red-100 dark:border-gray-700">
        <Text className="text-sm text-red-800 dark:text-red-400 uppercase">
          Delete Chat
        </Text>
        <Feather
          name="trash-2"
          size={24}
          color={
            colorScheme === "dark" ? Colors.dark.error : Colors.light.error
          }
        />
      </Pressable>
    </View>
  );
}
