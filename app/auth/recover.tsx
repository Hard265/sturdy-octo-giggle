import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "nativewind";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

type itemProps = {
  item: string;
};

export default function Page() {
  const [isChecked, setChecked] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState("");
  const { colorScheme, setColorScheme } = useColorScheme();

  const renderItem = ({ item }: itemProps) => {
    return (
      <View className="p-2 m-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Text className="tracking-tight text-gray-900 dark:text-white">
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 p-6 justify-end dark:bg-black">
      <View className="flex-row items-center justify-between">
        {/* <FlatList
       contentContainerStyle={{
        display: "flex",
        alignItems: "center",

       }}
        numColumns={4}
        data={mnemonic.split(" ")}
        keyExtractor={item=>item}
        renderItem={renderItem}
       /> */}
      </View>
      <View className="my-auto">
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phrase
        </Text>
        <TextInput
          numberOfLines={2}
          onChangeText={(value: string) => setMnemonic(value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        />
        <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Please provide the seed phrase of the account you want to import.
        </Text>
      </View>
      <View className="flex flex-row items-center mb-4">
        <Checkbox
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree to terms and conditions
        </Text>
      </View>
      <Pressable
        className="w-full flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3.5 mb-1 dark:bg-white"
        onPress={() => router.push("/chat/")}
        disabled={!isChecked}
      >
        <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
          Import
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
