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
import QRCode from "react-qr-code";
import Animated from "react-native-reanimated";
import PrivancySettings from "../../../components/PrivancySettings";

export default function Modal() {
    const { address } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();

    return (
        <View className="flex-1 p-2 dark:bg-black">
            <Stack
                screenOptions={{
                    title: address.toString(),
                }}
            />
            <View className="flex flex-row gap-x-2">
                <View className="w-36 h-36 mx-auto p-2 rounded dark:bg-gray-900 ">
                    <QRCode
                        bgColor="#00000000"
                        fgColor={Themes[colorScheme].text}
                        value={address.toString()}
                        size={128}
                        viewBox="0 0 128 128"
                        style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                        }}
                    />
                </View>
                <Text className="flex-1 block wrap text-sm text-gray-900 dark:text-gray-200">
                    {address.toString()}{" "}
                    <Feather
                        name="clipboard"
                        onPress={() => console.log("copy")}
                        size={16}
                        color={Colors[colorScheme].text}
                    />
                </Text>
            </View>
            <PrivancySettings address={address.toString()}/>

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

