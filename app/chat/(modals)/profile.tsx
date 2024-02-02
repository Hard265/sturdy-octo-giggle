import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Theme } from "../../../types/config";
import { ReactElement } from "react";
import _ from "lodash";
import { Stack } from "expo-router";

export default function Page() {
  const { colorScheme } = useColorScheme();
  const themes: Theme<ReactElement>[] = [
    {
      name: "automatic",
      icon: (
        <Feather name="droplet" size={24} color={Colors[colorScheme].tint} />
      ),
    },
    {
      name: "light",
      icon: <Feather name="sun" size={24} color={Colors[colorScheme].tint} />,
    },
    {
      name: "dark",
      icon: <Feather name="moon" size={24} color={Colors[colorScheme].tint} />,
    },
  ];

  return (
    <View className="flex-1 items-center dark:bg-black p-4">
      <Stack.Screen options={{ title: "Me" }} />
      <View className="h-48 w-48 rounded border dark:border-gray-800 dark:bg-gray-900 mb-auto"/>
      <Text
        style={{ fontFamily: "Inter-Medium" }}
        className="w-full my-1.5 font-medium text-start text-gray-900 dark:text-white"
      >
        Theme
      </Text>
      <View className="container  bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
        {themes.map(({ name, icon }, index) => (
          <Pressable
            key={index}
            className={`w-full flex flex-row items-center p-3 ${
              _.size(themes) != index + 1 && "border-b"
            } border-gray-200 rounded-t-lg dark:border-gray-800`}
          >
            {icon}
            <Text
              style={{ fontFamily: "Inter-Medium" }}
              className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize"
            >
              {name}
            </Text>
            <Feather
              style={{ marginLeft: "auto" }}
              name="circle"
              size={24}
              color={Colors[colorScheme].tint}
            />
          </Pressable>
        ))}
      </View>
      <Text
        style={{ fontFamily: "Inter-Medium" }}
        className="w-full my-1.5 font-medium text-start text-gray-900 dark:text-white"
      >
        Critical
      </Text>
      <View className="container  bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <Pressable className="p-3 w-full justify-between flex flex-row border-b border-gray-200 rounded-t-lg dark:border-gray-800">
          <Text
            style={{ fontFamily: "Inter-Medium" }}
            className="
          font-medium text-white capitalize"
          >
            set lock
          </Text>
          <Feather name="lock" size={24} color={Colors[colorScheme].tint} />
        </Pressable>
        <Pressable className="p-3 w-full justify-between flex flex-row border-b border-gray-200 dark:border-gray-800">
          <Text
            style={{ fontFamily: "Inter-Medium" }}
            className="
          font-medium text-white capitalize"
          >
            two factor authentication
          </Text>
          <Feather name="shield" size={24} color={Colors[colorScheme].tint} />
        </Pressable>
        <Pressable className="w-full flex flex-row justify-between items-center p-3">
          <Text
            style={{ fontFamily: "Inter-Medium" }}
            className="font-medium text-red-400 capitalize"
          >
            remove from device
          </Text>
          <Feather name="log-out" size={24} color={Colors[colorScheme].error} />
        </Pressable>
      </View>
    </View>
  );
}
