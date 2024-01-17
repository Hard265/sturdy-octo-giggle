import { View, FlatList, Text, Pressable } from "react-native";
import React from "react";

export default function Page(){
  const [mnemonic, setMnemonic] = React.useState(["you", "the", "bring", "director", "pixel"])
  
  const renderItem = ()=>{
    return (
      <View className="block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Text className="tracking-tight text-gray-900 dark:text-white">{text}</Text>
      </View>
    )
  }
  
  return (
    <View className="flex-1 p-4 dark:bg-black ">
      <View className="flex items-center p-4 mb-4 text-red-800 border-l-4 rounded-lg border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800">
        <Text className="ms-3 text-sm font-medium">
          Please write down your backup seed phrase on a piece of paper or a metal plate and store it in a safe place. Do not store it on your computer, phone, or online. Do not share it with anyone.
        </Text>
      </View>
      <FlatList
        className="my-auto"
        data={mnemonic}
        renderItem={renderItem}
        keyExtractor={item=>item}
      />
      <Text className="block text-center text-sm font-medium text-gray-700 dark:text-gray-600 tracking-tight mb-2">I agree to the terms and conditions</Text>
      <Pressable
        className="w-full flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3.5 mb-1 dark:bg-white"
        onPress={() => router.push("/auth/setup")}
        disabled={!terms}
      >
        <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
          CREATE
        </Text>
      </Pressable>
    </View>
  )
}
