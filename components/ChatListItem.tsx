import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

type ChatListItemProps = {
  title: string;
  subtitle?: string;
  hasUnread?: boolean;
};

export default function ChatListItem({
  title,
  subtitle,
  hasUnread,
}: ChatListItemProps) {
  return (
    <Pressable
      className="flexjustify-between gap-x-6 py-1 px-4"
      onPress={() => router.push(`/chat/${title}/`)}
    >
      <View className="min-w-0 flex-auto">
        <Text className=" font-semibold leading-6 text-gray-900 dark:text-gray-300">
          {title}
        </Text>
        <Text className="truncate text-sm leading-5 text-gray-500 dark:text-gray-600">
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
