import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import {
    Modal,
    Pressable,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import { ReactElement, useState } from "react";
import _ from "lodash";
import { Stack } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { Colors } from "react-native/Libraries/NewAppScreen";
import configStore from "../../store/configStore";
import { Themes } from "../../ui/theme";
import QRCode from "react-qr-code";

export default function Page() {
    const { colorScheme } = useColorScheme();
    const [isModalShown, setIsModalShown] = useState(false);

    return (
        <View className="flex-1 items-center dark:bg-black p-4">
            <Stack.Screen options={{ title: "Me" }} />
            <View className="flex flex-row gap-x-2">
                <View className="w-36 h-36 mx-auto p-2 rounded dark:bg-gray-900 ">
                    <QRCode
                        bgColor="#00000000"
                        fgColor={Themes[colorScheme].text}
                        value={"<address>"}
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
                    {"<address>"}{" "}
                    <Feather
                        name="clipboard"
                        onPress={() => console.log("copy")}
                        size={16}
                        color={Colors[colorScheme].text}
                    />
                </Text>
                </View>

            {/* theme options radio */}
            <Text
                style={{
                    fontFamily: "Inter-Medium",
                }}
                className="w-full my-1.5 mt-auto font-medium text-start text-gray-900 dark:text-white"
            >
                Theme
            </Text>
            <View className="container  bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
                <Pressable
                    className="w-full flex flex-row items-center p-3 dark:border-gray-800"
                    onPress={() =>
                        configStore.setTheme("system")
                    }
                >
                    <Feather
                        name="smartphone"
                        size={20}
                        color={
                            Themes[
                                configStore.scheme(
                                    colorScheme
                                )
                            ].text
                        }
                    />
                    <Text className="text-gray-900 dark:text-white ml-2 capitalize">
                        system
                    </Text>
                    <Feather
                        style={{
                            marginLeft: "auto",
                        }}
                        name={
                            configStore.theme == "system"
                                ? "disc"
                                : "circle"
                        }
                        size={20}
                        color={
                            Themes[
                                configStore.scheme(
                                    colorScheme
                                )
                            ].text
                        }
                    />
                </Pressable>
                <Pressable
                    className="w-full flex flex-row items-center p-3 dark:border-gray-800"
                    onPress={() =>
                        configStore.setTheme("light")
                    }
                >
                    <Feather
                        name="sun"
                        size={20}
                        color={
                            Themes[
                                configStore.scheme(
                                    colorScheme
                                )
                            ].text
                        }
                    />
                    <Text className="text-gray-900 dark:text-white ml-2 capitalize">
                        light
                    </Text>
                    <Feather
                        style={{
                            marginLeft: "auto",
                        }}
                        name={
                            configStore.theme == "light"
                                ? "disc"
                                : "circle"
                        }
                        size={20}
                        color={
                            Themes[
                                configStore.scheme(
                                    colorScheme
                                )
                            ].text
                        }
                    />
                </Pressable>
                <Pressable
                    className="w-full flex flex-row items-center p-3 dark:border-gray-800"
                    onPress={() =>
                        configStore.setTheme("dark")
                    }
                >
                    <Feather
                        name="moon"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                    <Text className="text-gray-900 dark:text-white ml-2 capitalize">
                        dark
                    </Text>
                    <Feather
                        style={{
                            marginLeft: "auto",
                        }}
                        name={
                            configStore.theme == "dark"
                                ? "disc"
                                : "circle"
                        }
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
            </View>

            <Text
                style={{
                    fontFamily: "Inter-Medium",
                }}
                className="w-full my-1.5 font-medium text-start text-gray-900 dark:text-white"
            >
                Privancy
            </Text>
            <View className="container  bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
                <Pressable
                    className="w-full flex flex-row  items-center p-3"
                    onPress={() => setIsModalShown(true)}
                >
                    <Feather
                        name="clock"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Countdown messages
                    </Text>
                    <Feather
                        style={{
                            marginLeft: "auto",
                        }}
                        name="chevron-right"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row border-t border-gray-200 items-center p-3 dark:border-gray-800">
                    <Feather
                        name="slash"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Block screenshots
                    </Text>
                    <Feather
                        style={{
                            marginLeft: "auto",
                        }}
                        name="toggle-left"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row border-t border-gray-200 items-center p-3 dark:border-gray-800">
                    <Feather
                        name="shield"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Biometric authentication
                    </Text>
                    <Feather
                        style={{
                            marginLeft: "auto",
                        }}
                        name="toggle-left"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                </Pressable>
                <Pressable className="w-full flex flex-row border-t border-gray-200 items-center p-3 dark:border-gray-800">
                    <Feather
                        name="trash-2"
                        size={20}
                        color={Themes[colorScheme].text}
                    />
                    <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                        Clear chats
                    </Text>
                </Pressable>
            </View>

            {/* account removal button */}
            <Pressable className="w-full p-3 flex flex-row rounded-lg mt-2 justify-between border items-center bg-red-700 dark:bg-red-600 dark:border-reg-500">
                <Text
                    style={{
                        fontFamily: "Inter-Medium",
                    }}
                    className="font-medium text-white"
                >
                    Remove account
                </Text>
                <Feather
                    name="log-out"
                    size={20}
                    color="white"
                />
            </Pressable>

            {/* countdown modal */}
            <CountdownModal
                isVisible={isModalShown}
                onRequestClose={() =>
                    setIsModalShown(false)
                }
            />
            <StatusBar style="auto" />
        </View>
    );
}

function CountdownModal({
    isVisible,
    onRequestClose,
}: {
    isVisible: boolean;
    onRequestClose: () => void;
}) {
    const { colorScheme } = useColorScheme();

    const timers = [
        { duration: 0.5, text: "30 minutes" },
        { duration: 1, text: "1 hour" },
        { duration: 24, text: "24 hours" },
    ];

    return (
        <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            visible={isVisible}
            className="flex flex-1"
            onRequestClose={() => onRequestClose()}
        >
            <View className="flex-1 flex p-4  items-center justify-center dark:bg-gray-900/75">
                <View className="container bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
                    {timers.map((timer, index) => (
                        <Pressable
                            key={index}
                            className={`w-full flex flex-row items-center p-3 ${
                                _.size(timers) !=
                                    index + 1 && "border-b"
                            } dark:border-gray-800`}
                        >
                            <Text className="text-gray-900 dark:text-white ml-2 capitalize">
                                {timer.text}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </Modal>
    );
}
