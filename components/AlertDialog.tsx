import { Text, View, Pressable } from "react-native";
import Animated, { Easing, FadeIn } from "react-native-reanimated";

export default function AlertDialog({
  show,
  message,
  onRequestConfirm,
  onRequestDismiss,
  ...props
}: {
  show: boolean;
  message: string;
  onRequestConfirm: () => void;
  onRequestDismiss: () => void;
}) {
  return (
    <>
      {show && (
        <Animated.View
          className="relative flex p-4 top-0 left-0 right-0 bottom-0 absolute inset-0 justify-center items-center bg-black/50"
          entering={FadeIn.easing(Easing.inOut(Easing.ease)).duration(300)}
          {...props}
        >
          <Pressable
            onPress={onRequestDismiss}
            className="absolute bottom-0 right-0 top-0 left-0 h-full w-full"
          />
          <View className="container p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <Text className="text-gray-800 dark:text-white">{message}</Text>
            <View className="flex flex-row justify-end gap-x-3">
              <Pressable className="p-2" onPress={onRequestDismiss}>
                <Text className="text-gray-800 dark:text-white font-semibold capitalize">
                  cancel
                </Text>
              </Pressable>
              <Pressable className="p-2" onPress={() => onRequestConfirm()}>
                <Text className="text-red-500 font-semibold capitalize">
                  ok
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
}
