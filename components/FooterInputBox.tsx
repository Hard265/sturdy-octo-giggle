import { MaterialIcons } from "@expo/vector-icons";
import { createRef, useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import Themes from "../misc/theme";
import { useColorScheme } from "nativewind";
import chatStore from "../store/chatStore";
import * as Crypto from "expo-crypto";
import userStore from "../store/userStore";
import { useLocalSearchParams } from "expo-router";

export default function FooterInputBox() {
    const [value, setValue] = useState("");
    const { address } = useLocalSearchParams();
    const inputRef = createRef<TextInput>();


    const theme = Themes[useColorScheme().colorScheme];
    const me = userStore.whoami;

    const handleSubmit = () => {
        chatStore.pushMessage(
            {
                id: Crypto.randomUUID(),
                sender: me.address,
                content: value,
                timestamp: new Date().toISOString(),
                beneficiary: address.toString(),
            },
            address as string
        );
        setValue("");
        inputRef.current?.blur();
    }

    return (
        <View className="flex flex-row gap-x-3 justify-center items-center mt-auto px-2.5 py-1.5 w-full">
            <TextInput
                value={value}
                onChangeText={setValue}
                multiline
                placeholder="Aa.."
                placeholderTextColor={"gray"}
                cursorColor={theme.text}
                ref={inputRef}
                className="flex-1 p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-600"
            />
            <Pressable
                className="self-end p-2.5 rounded-lg bg-gray-800 dark:bg-gray-300 "
                onPress={handleSubmit}
                disabled={!value}
            >
                <MaterialIcons
                    name="arrow-upward"
                    size={24}
                    color={theme.onprimary}
                />
            </Pressable>
        </View>
    )
}