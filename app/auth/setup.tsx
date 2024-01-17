import { View, FlatList, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import { generateMnemonic } from "../../util/cryptograpy";


export default function Page() {
  const [terms, setTerms] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState("");
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setMnemonic(generateMnemonic());
  }, []);

  return (
    <View className="flex-1 p-4 pt-12 dark:bg-black">
      <StatusBar style="auto" />
      <View className="flex flex-row p-2 mb-4 mt-12 rounded-lg bg-red-50 dark:bg-gray-800 gap-y-2 gap-x-2">
        <Ionicons
          name="information-circle"
          size={24}
          color={colorScheme == "dark" ? "#EF5350" : "#C62828"}
        />
        <View className="block w-3/4">
          <Text className="block text-sm text-red-800  dark:text-red-400 text-wrap">
            Please write down your backup seed phrase on a piece of paper and
            store it in a safe place. Do not store it on your computer, phone,
            or online. Do not share it with anyone.
          </Text>
        </View>
      </View>
      <View className="flex flex-row gap-y-2 flex-wrap mt-4 mb-8" >
        {
          mnemonic.trim().split(" ").map((item: string)=>(
              <View className="p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700>
                <Text className="font-semibold text-gray-900 dark:text-white">
                  {item}
                </Text>
              </View>
          ))
        }
      </View>
      <View className="mt-auto">
        <Pressable
          className="flex items-center flex-row mb-4"
          onPress={() => setTerms(!terms)}
        >
          <View className="flex justify-center items-center w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600 mr-2">
            {terms && (
              <Ionicons
                name="md-checkmark"
                size={24}
                color={colorScheme == "dark" ? "black" : "white"}
              />
            )}
          </View>
          <Text className="text-gray-800 dark:text-gray-300 text-sm">
            I agree to terms and conditions
          </Text>
        </Pressable>
        <Pressable
          className="w-full justify-self-end flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3.5 mb-1 dark:bg-white"
          onPress={() => router.push("/chat/")}
          disabled={!terms}
        >
          <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
            create
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
