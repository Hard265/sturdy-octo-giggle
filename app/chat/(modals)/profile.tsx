import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Theme } from "../../../types/config";
import { ReactElement } from "react";
import _ from "lodash";
import { Stack } from "expo-router";
import { TextInput } from "react-native-gesture-handler";

export default function Page() {
  const { colorScheme } = useColorScheme();
  const themes: Theme<ReactElement>[] = [
    {
      name: "automatic",
      icon: (
        <Feather name="droplet" size={22} color={Colors[colorScheme].tint} />
      ),
    },
    {
      name: "light",
      icon: <Feather name="sun" size={22} color={Colors[colorScheme].tint} />,
    },
    {
      name: "dark",
      icon: <Feather name="moon" size={22} color={Colors[colorScheme].tint} />,
    },
  ];

  return (
    <View className="flex-1 items-center dark:bg-black p-4">
      <Stack.Screen options={{ title: "Me" }} />
      <View className="h-40 relative w-40 rounded bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 mb-auto">
        <Pressable className="absolute bottom-0 right-0 p-2">
          <Feather name="clipboard" size={20} color={Colors[colorScheme].tint} />
        </Pressable>
      </View>


      {/* theme options radio */}
      <Text
        style={{ fontFamily: "Inter-Medium" }}
        className="w-full my-1.5 mt-auto font-medium text-start text-gray-900 dark:text-white"
      >
        Theme
      </Text>
      <View className="container  bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
        {themes.map(({ name, icon }, index) => (
          <Pressable
            key={index}
            className={`w-full flex flex-row items-center p-3 ${_.size(themes) != index + 1 && "border-b"
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
              size={20}
              color={Colors[colorScheme].tint}
            />
          </Pressable>
        ))}
      </View>

      {/* privancy settings */}
      <Text
        style={{ fontFamily: "Inter-Medium" }}
        className="w-full my-1.5 font-medium text-start text-gray-900 dark:text-white"
      >
        Privancy
      </Text>
      <View className="container  bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
        <Pressable className="w-full flex flex-row  items-center p-3">
          <Feather name="clock" size={20} color={Colors[colorScheme].tint} />
          <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
            Countdown messages
          </Text>
          <Feather
            style={{ marginLeft: "auto" }}
            name="chevron-right"
            size={20}
            color={Colors[colorScheme].tint}
          />
        </Pressable>
        <Pressable className="w-full flex flex-row border-t border-gray-200 items-center p-3 dark:border-gray-800">
          <Feather name="slash" size={20} color={Colors[colorScheme].tint} />
          <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
            Block screenshots
          </Text>
          <Feather
            style={{ marginLeft: "auto" }}
            name="toggle-left"
            size={20}
            color={Colors[colorScheme].tint}
          />
        </Pressable>
        <Pressable className="w-full flex flex-row border-t border-gray-200 items-center p-3 dark:border-gray-800">
          <Feather name="shield" size={20} color={Colors[colorScheme].tint} />
          <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
            Biometric authentication
          </Text>
          <Feather
            style={{ marginLeft: "auto" }}
            name="toggle-left"
            size={20}
            color={Colors[colorScheme].tint}
          />
        </Pressable>
        <Pressable className="w-full flex flex-row border-t border-gray-200 items-center p-3 dark:border-gray-800">
          <Feather name="trash-2" size={20} color={Colors[colorScheme].tint} />
          <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
            Clear chats
          </Text>
        </Pressable>
      </View>

      {/* account removal button */}
      <Pressable className="w-full p-2.5 flex flex-row rounded-lg mt-2 justify-between border items-center bg-red-700 dark:bg-red-600 dark:border-reg-500">
        <Text
          style={{ fontFamily: "Inter-Medium" }}
          className="font-medium text-white"
        >
          Remove account
        </Text>
        <Feather name="log-out" size={20} color="white" />
      </Pressable>
    </View>
  );
}
