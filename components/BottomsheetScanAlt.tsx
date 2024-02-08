import { useState } from "react";
import { Pressable, View, Text, TextInput } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export default function BottomsheetScanAlt({
  visible,
  callback,
  onRequestClose,
}: {
  visible: boolean;
  onRequestClose: () => void;
  callback: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <>
      {visible && (
        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
          className="w-full relative flex-1 justify-center items-center dark:bg-black/75"
        >
          <Pressable
            onPress={onRequestClose}
            className="absolute top-0 right-0 bottom-0 left-0"
          />
          <View className="absolute p-4 left-0 right-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-xl w-full">
            <TextInput
              value={value}
              onChangeText={setValue}
              className="w-full rounded-lg border border-gray-300 p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:focus:border-gray-600"
            />
            <Text className="text-sm text-gray-500">
              Please provide a valid account address
            </Text>
            <Pressable
              className="w-full mt-4 flex justify-center items-center bg-gray-800 rounded-lg px-5 py-2.5 dark:bg-white"
              onPress={() => callback(value)}
            >
              <Text className="text-white dark:text-gray-800 font-semibold text-sm">
                Procceed
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </>
  );
}
