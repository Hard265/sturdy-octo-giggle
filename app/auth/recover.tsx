import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { Dispatch, SetStateAction } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

type itemData = {
  id: number;
  word: string
}

type itemProps = {
  index: number;
  word: string;
};


export default function Page() {
  const [terms, setTerms] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState([]);

  const renderItem = (item:itemProps)=>{

  }

  return (
    <View className="flex-1 p-6 justify-end dark:bg-black">
      <View className="my-auto">
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter seed phrase</Text>
        <TextInput
          numberOfLines={2}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        />
      </View>
      <View className="flex items-center flex-row mb-4">
        <View className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"></View>
        <Text className="text-gray-800 dark:text-gray-300 text-sm">I agree to terms and conditions</Text>
      </View>
      <Pressable
        className="w-full flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3.5 mb-1 dark:bg-white"
        onPress={() => router.push("/auth/setup")}
        disabled={!terms}
      >
        <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
          Import
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
