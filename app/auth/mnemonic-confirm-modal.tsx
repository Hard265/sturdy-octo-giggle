import { Pressable, Text, View } from "react-native";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { BlurView } from 'expo-blur';

export default function Modal() {
  return (
    <View
      className="flex-1 p-4 items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0, .75)" }}
    >
      <View className=" container bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-600">
        <View className="flex flex-row items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            Backup confirmation
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
            <MaterialIcons
              name="close"
              size={20}
              color={useColorScheme().colorScheme == "dark" ? "white" : "black"}
            />
          </Pressable>
        </View>
        <View className="p-4 md:p-5">
          <View className="flex flex-row items-center p-4 mb-4  border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800  dark:border-yellow-800">
            <FontAwesome5
              name="exclamation-triangle"
              size={20}
              color={
                useColorScheme().colorScheme == "dark" ? "#FDD835" : "#F9A825"
              }
            />
            <View className="flex-1 pl-3">
              <Text className=" text-sm text-yellow-800 dark:text-yellow-600 text-wrap">
                Your seed phrase is the only way to recover your account.
              </Text>
            </View>
          </View>
          <View>
            <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase">
              Confirm seed
            </Text>
            <TextInput
              multiline
              numberOfLines={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            />
            <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              To confirm the seed phrase backup, type the seed in the box above.{" "}
            </Text>
          </View>
        </View>
        <View className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Pressable
            className="w-full justify-self-end flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3 dark:bg-white"
            onPress={() => router.push("/chat/")}
          >
            <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
              confirm
            </Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
