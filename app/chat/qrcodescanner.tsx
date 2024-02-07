import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import {
    Text,
    View,
    StyleSheet,
    Button,
    Pressable,
    TextInput,
    Modal,
} from "react-native";
import {
    BarCodeScanner,
    BarCodeScannerResult,
    PermissionStatus,
} from "expo-barcode-scanner";
import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import _ from "lodash";
import BottomSheet from "@gorhom/bottom-sheet";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideInUp,
    SlideOutDown,
} from "react-native-reanimated";

export default function Page() {
    const [hasPermission, setHasPermission] = useState<
        boolean | null
    >(null);
    const [scanned, setScanned] = useState(false);

    const [address, setAddress] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } =
                await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(
                status === PermissionStatus.GRANTED
            );
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({
        type,
        data,
    }: BarCodeScannerResult) => {};

    return (
        <View className="flex-1 justify-center items-center dark:bg-black">
            <Stack.Screen
                options={{
                    title: "Align the QR code to the center",
                    headerTitleStyle: { fontSize: 16 },
                }}
            />
            {!hasPermission ? (
                <>
                    <Text className="text-5xl font-black text-gray-800 dark:text-gray-200">
                        403
                    </Text>
                    <Text className="mt-1.5 text-base font-light leading-7 text-gray-600 dark:text-gray-400">
                        Camera access forbidden.
                    </Text>
                </>
            ) : (
                <>
                    {/* <BarCodeScanner
                        style={
                            StyleSheet.absoluteFillObject
                        }
                        className="flex-1 rounded-2xl"
                        onBarCodeScanned={
                            handleBarCodeScanned
                        }
                    /> */}
                    <View
                        style={
                            StyleSheet.absoluteFillObject
                        }
                        className="flex flex-col justify-center items-center"
                    >
                        <View className="h-56 w-56 border border-white rounded" />

                        {!isOpen && (
                            <Pressable
                                onPress={() =>
                                    setIsOpen(true)
                                }
                                className="absolute bottom-[16px] right-[16px] z-9 p-4 dark:bg-gray-300 rounded-xl"
                            >
                                <Feather
                                    name="edit-3"
                                    size={24}
                                />
                            </Pressable>
                        )}
                    </View>
                </>
            )}
            {isOpen && (
                <>
                    <Animated.View
                        entering={SlideInDown.springify().damping(
                            15
                        )}
                        exiting={SlideOutDown}
                        className="w-full relative flex-1 justify-center items-center dark:bg-black/75"
                    >
                        <Pressable
                            onPress={() => setIsOpen(false)}
                            className="absolute top-0 right-0 bottom-0 left-0"
                        />
                        <View className="absolute p-4 left-0 right-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-xl w-full">
                            <TextInput
                                value={address}
                                onChangeText={setAddress}
                                className="w-full rounded-lg border border-gray-300 p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:focus:border-gray-600"
                            />
                            <Text className="text-sm text-gray-500">
                                Please provide a valid
                                account address
                            </Text>
                            <Pressable
                                className="w-full mt-4 flex justify-center items-center bg-gray-800 rounded-lg px-5 py-2.5 dark:bg-white"
                                onPress={() => router.replace(`/chat/${address}/`)}
                            >
                                <Text className="text-white dark:text-gray-800 font-semibold text-sm">
                                    Procceed
                                </Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </>
            )}
        </View>
    );
}
