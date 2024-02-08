import { Feather } from "@expo/vector-icons";
import { Pressable, Text, } from "react-native";
import AlertDialog from "./AlertDialog";
import { useState } from "react";
import userStore from "../store/userStore";
import { router, useLocalSearchParams } from "expo-router";

export default function ButtonDeleteChat() {
    const [promptDelete, setPromptDelete] = useState(false);
    const { address } = useLocalSearchParams();

    const handlePress = () => {
        userStore.dropUser(userStore.user(address as string), () => router.replace(`/chat/`), () => console.log("Error deleting user"))
    };

    return (
        <>
            <Pressable className="w-full p-3 flex flex-row rounded-lg mt-2 justify-between border items-center bg-red-700 dark:bg-red-600 dark:border-reg-500">
                <Text
                    style={{
                        fontFamily: "Inter-Medium",
                    }}
                    className="font-medium text-white"
                >
                    Delete chat
                </Text>
                <Feather name="trash-2" size={20} color="white" />
            </Pressable>
            <AlertDialog show={promptDelete} message="Are you sure you want to delete this chat?" onRequestConfirm={handlePress} onRequestDismiss={() => setPromptDelete(false)} />
        </>
    );
}