import { FlatList, Pressable, Text, View } from "react-native";
import chatStore, { Message } from "../../store/chatStore";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type itemProps = {
  item: Message;
};

export default function Page() {
  const unique = _.uniqBy(chatStore.messages, "sender");

  const Item = ({ item }: itemProps) => {
    return (
      <Pressable
        className="flexjustify-between gap-x-6 py-2 px-4"
        onPress={() => router.push(`/chat/${item.sender}/`)}
      >
        <View className="min-w-0 flex-auto">
          <Text className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
            {item.sender}
          </Text>
          <Text className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-600">
            {item.content}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 flex relative dark:bg-black">
      <Text className="text-sm font-semibold px-4 leading-6 text-gray-900 dark:text-gray-300">
        Recent chats
      </Text>
      {_.isEmpty(unique) ? (
        <Text>No recent chats</Text>
      ) : (
        <FlatList
          className="flex-1"
          data={unique}
          renderItem={Item}
          keyExtractor={(item) => item.sender}
        />
      )}
      <Pressable className="absolute bottom-[16px] right-[16px] z-9 p-4 dark:bg-gray-300 rounded-xl">
        <Feather
          name="maximize"
          size={24}
        />
      </Pressable>
    </View>
  );
}
