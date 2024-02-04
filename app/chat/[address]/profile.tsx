import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import {
    PlatformColor,
    Pressable,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import Colors from "../../../constants/Colors";
import { useState } from "react";
import { Themes } from "../../../ui/theme";

export default function Modal() {
    const { address } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [archived, setArchived] = useState(false);

    return (
        <View className="flex-1 p-2 dark:bg-black">
            <Stack
                screenOptions={{
                    title: address.toString(),
                }}
            />
            <View className="flex flex-row gap-x-2">
                <View className="w-36 h-36 mx-auto rounded dark:bg-gray-900 "></View>
                <Text className="flex-1 block wrap text-sm text-gray-900 dark:text-gray-200">
                    {address.toString()}
                    {" "}
                    <Feather
                        name="clipboard"
                        onPress={() => console.log("copy")}
                        size={16}
                        color={Colors[colorScheme].text}
                    />
                </Text>
            </View>

            <View className="container mt-auto bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
                <Pressable className="w-full flex flex-row justify-between items-center p-3 dark:border-gray-800">
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Export chat
                    </Text>
                    <Feather
                        name="download-cloud"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800">

                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Archive chat
                    </Text>
                    <Feather
                        name="toggle-left"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800">
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Countdown messages
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800">
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Block
                    </Text>
                    <Feather
                        name="toggle-left"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800">
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Clear chat
                    </Text>
                    <Feather
                        name="trash"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
            </View>

            {/*button to delete chat */}
            <Pressable className="w-full p-3 flex flex-row rounded-lg mt-2 justify-between border items-center bg-red-700 dark:bg-red-600 dark:border-reg-500">
                <Text
                    style={{
                        fontFamily: "Inter-Medium",
                    }}
                    className="font-medium text-white"
                >
                    Delete chat
                </Text>
                <Feather
                    name="log-out"
                    size={20}
                    color="white"
                />
            </Pressable>
        </View>
    );
}
