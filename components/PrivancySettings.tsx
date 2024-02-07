import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, FadeIn } from "react-native-reanimated";
import { Themes } from "../ui/theme";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import chatStore from "../store/chatStore";
import _ from "lodash";

export default function PrivancySettings({
    address,
}: {
    address: string;
}) {
    const { colorScheme } = useColorScheme();
    const [blockShown, setBlockShown] = useState(false);
    const [clearChatShown, setClearChatShown] = useState(false);

    const clearChatHandler = () => {
        chatStore.deleteMessages(_.map(chatStore.user_messages(address), "id"));
        setClearChatShown(false);

    }

    return (
        <>
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
                <Pressable
                    onPress={() => setBlockShown(true)}
                    className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800"
                >
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Block
                    </Text>
                    <Feather
                        name="toggle-left"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable onPress={() => setClearChatShown(true)} className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800">
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
            {blockShown && (
                <BlockPrompt
                    onRequestCancel={() =>
                        setBlockShown(false)
                    }
                    onConfirm={() => setBlockShown(false)}
                    address={address}
                />
            )}
            {clearChatShown && (
                <ClearChatPrompt onRequestCancel={() => setClearChatShown(false)} onRequestConfirm={() => clearChatHandler()} />
            )}
        </>
    );
}

function BlockPrompt({ onRequestCancel, onConfirm, address }: { onRequestCancel: () => void; onConfirm: () => void; address: string }) {
    return (
        <>
            <Animated.View
                className="relative flex p-4 top-0 left-0 right-0 bottom-0 absolute inset-0 justify-center items-center bg-black/50"
                entering={FadeIn.easing(Easing.inOut(Easing.ease)).duration(300)}
            >
                <Pressable onPress={onRequestCancel} className="absolute bottom-0 right-0 top-0 left-0 h-full w-full" />
                <View className="container p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                    <Text className="text-gray-800 dark:text-white">
                        Block <Text className="font-bold">{address}</Text> from sending messages to you?
                    </Text>
                    <View className="flex flex-row justify-end">
                        <Pressable className="p-2" onPress={onRequestCancel}>
                            <Text className="text-gray-800 dark:text-white font-semibold capitalize">cancel</Text>
                        </Pressable>
                        <Pressable className="p-2" onPress={onConfirm}>
                            <Text className="text-red-500 font-semibold capitalize">ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </>
    );
}

function ClearChatPrompt({ onRequestCancel, onRequestConfirm }: { onRequestCancel: () => void; onRequestConfirm: () => void }) {
    return (
        <>
            <Animated.View
                className="relative flex p-4 top-0 left-0 right-0 bottom-0 absolute inset-0 justify-center items-center bg-black/50"
                entering={FadeIn.easing(Easing.inOut(Easing.ease)).duration(300)}
            >
                <Pressable onPress={onRequestCancel} className="absolute bottom-0 right-0 top-0 left-0 h-full w-full" />
                <View className="container p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                    <Text className="text-gray-800 dark:text-white">The messages in this chat will be deleted permanently. Are you sure?</Text>
                    <View className="flex flex-row justify-end">
                        <Pressable className="p-2" onPress={onRequestCancel}>
                            <Text className="text-gray-800 dark:text-white font-semibold capitalize">cancel</Text>
                        </Pressable>
                        <Pressable className="p-2" onPress={() => onRequestConfirm()}>
                            <Text className="text-red-500 font-semibold capitalize">ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </>
    )
}