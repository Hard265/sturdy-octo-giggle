import { Pressable, Text, View } from "react-native";
import { Message } from "../store/chatStore";
import { router } from "expo-router";

type ChatListItemProps = {
  message: Message;
  hasUnread?: boolean;
};

export default function ChatListItem({ message, hasUnread }: ChatListItemProps) {
  return (
    <Pressable
      className="flexjustify-between gap-x-6 py-0.5 px-4"
      onPress={() => router.push(`/chat/${message.sender}/`)}
    >
      <View className="min-w-0 flex-auto">
        <Text className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
          {message.sender}
        </Text>
        <Text className="truncate text-xs leading-5 text-gray-500 dark:text-gray-600">
          {message.content}
        </Text>
      </View>
    </Pressable>
  );
}
