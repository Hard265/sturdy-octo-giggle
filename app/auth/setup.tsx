import { View, FlatList, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import { generateMnemonic } from "../../util/cryptography";
import { usePreventScreenCapture } from "expo-screen-capture";

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
      <View className="flex flex-row items-center p-4 mb-4  border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800  dark:border-yellow-800">
        <FontAwesome5
          name="exclamation-triangle"
          size={24}
          color={colorScheme == "dark" ? "#FFF176" : "#F9A825"}
        />
        <View className="flex-1 pl-3">
          <Text className=" text-sm text-yellow-800 dark:text-yellow-300 text-wrap">
            Please write down your backup seed phrase on a piece of paper and
            store it in a safe place. Do not store it on your computer, phone,
            or online. Do not share it with anyone.
          </Text>
        </View>
      </View>
      <View className="flex flex-row gap-y-2 flex-wrap mt-4 mb-8 gap-x-2 justify-center">
        {mnemonic
          .trim()
          .split(" ")
          .map((item: string, index: number) => (
            <View
              key={item}
              className="inline-flex flex-row gap-x-2 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <Text className="text-sm text-gray-300 dark:text-gray-400">
                {index + 1}
              </Text>
              <Text className="font-semibold text-gray-900 dark:text-white">
                {item}
              </Text>
            </View>
          ))}
      </View>
      <View className="mt-auto">
        <Pressable
          className="flex items-center flex-row mb-4"
          onPress={() => setTerms(!terms)}
        >
          <View className="flex justify-center items-center w-6 h-6 text-blue-600 bg-gray-800 border border-gray-400 rounded dark:border-gray-600 mr-2">
            {terms && (
              <FontAwesome5
                name={"check"}
                size={16}
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
          onPress={() => router.push("/auth/mnemonic-confirm-modal")}
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
