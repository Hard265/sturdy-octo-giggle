import {
    View,
    FlatList,
    Text,
    Pressable,
    Modal,
    TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Stack, router } from "expo-router";
import { generateMnemonic } from "../../util/cryptography";
import { usePreventScreenCapture } from "expo-screen-capture";
import { Themes } from "../../misc/theme";

export default function Page() {
    const [
        confirmationModalShown,
        setConfirmationModalShown,
    ] = React.useState(false);
    const [mnemonic, setMnemonic] = React.useState("");
    const { colorScheme, setColorScheme } =
        useColorScheme();

    useEffect(() => {
        setMnemonic(generateMnemonic());
    }, []);

    return (
        <View className="flex-1 p-4 pt-12 dark:bg-black">
            <StatusBar style="auto" />

            <Text className=" font-normal text-center text-gray-900 dark:text-gray-300 text-wrap">
                Please write down your 12-word recovery seed phrase in the correct order and keep it safe and private.
            </Text>
            <View className="flex flex-row gap-y-2 flex-wrap mt-4 gap-x-2 justify-center">
                {mnemonic
                    .trim()
                    .split(" ")
                    .map((item: string, index: number) => (
                        <View
                            key={index}
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
                <Text className="text-gray-800 dark:text-gray-300 text-xl text-sm text-center mb-2">
                    By continuing, you agree to our <Text className="text-blue-500 underline">Terms of Service and Privacy Policy</Text>
                </Text>
                <Pressable
                    className="w-full justify-self-end flex justify-center items-center bg-gray-800 rounded-lg px-5 py-2.5 mb-1 dark:bg-white"
                    onPress={() =>
                        setConfirmationModalShown(true)
                    }
                >
                    <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
                        continue
                    </Text>
                </Pressable>
            </View>
            {/* confirmation modal */}
            <ConfirmationModal
                isShown={confirmationModalShown}
                onRequestCancel={() =>
                    setConfirmationModalShown(false)
                }
            />
        </View>
    );
}
function ConfirmationModal({
    isShown,
    onRequestCancel,
}: {
    isShown: boolean;
    onRequestCancel: () => void;
}) {
    return (
        <Modal
            transparent
            statusBarTranslucent
            visible={isShown}
            onRequestClose={() => onRequestCancel()}
        >
            <View className="flex-1 p-4 rounded-lg justify-center items-center dark:bg-black/75">
                <View className="container bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-700">
                    <View className="flex flex-row items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-700">
                        <Text className="text-lg font-semibold text-gray-900 dark:text-whitefont-medium text-gray-900 dark:text-white">
                            Backup recovery seed
                        </Text>
                        <Pressable
                            onPress={() =>
                                onRequestCancel()
                            }
                        >
                            <Feather
                                name="x"
                                size={20}
                                color="white"
                            />
                        </Pressable>
                    </View>

                    <View className="p-4">
                        <TextInput
                            multiline
                            numberOfLines={2}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white "
                        />
                        <Text className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        Anyone with the seed phrase will have access to your account. Please confirm it is correct by entering it in the field above
                        </Text>
                        <Pressable onPress={() => router.replace("/chat/")} className="w-full mt-4 justify-self-end flex justify-center items-center bg-gray-800 rounded-lg px-5 py-2.5 dark:bg-white">
                            <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
                                confirm
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
