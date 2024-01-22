import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import chatStore, { Message } from "../../../store/chatStore";
import _ from "lodash";
import * as Crypto from "expo-crypto";

type ItemProps = {
  item: Message;
};

export default function Page() {
  const { address } = useLocalSearchParams();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [newMessage, seNewMessage] = React.useState("");

  const messages = _.filter(chatStore.messages, ["sender", address]);

  const handleSendMessage = () => {
    chatStore.addMessage({
      id: Crypto.randomUUID(),
      sender: address.toString(),
      content: newMessage,
    });
    seNewMessage("");
  };

  const Item = ({ item }: ItemProps) => {
    const style = _.isEqual(item.sender, address)
      ? "py-2 px-3.5 self-end shrink-1 m-1.5 border border-gray-200 bg-gray-100 rounded-l-xl rounded-br-xl rounded-tr dark:bg-gray-900 dark:border-gray-800"
      : "py-2 px-3.5 self-start shrink-1 m-1.5 border border-gray-200 bg-gray-100 rounded-r-xl rounded-bl-xl rounded-tl dark:bg-gray-700 dark:border-gray-600";

    return (
      <View className={style}>
        <Text className="text-sm font-normal pt-2.5 pb-1.5 text-gray-900 dark:text-white">
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex flex-col flex-1 items-center dark:bg-black">
      {_.isEmpty(messages) ? (
        <View className="flex flex-col flex-1 w-full">
          <Text className="text-gray-800 dark:text-gray-300">
            No recent messages
          </Text>
        </View>
      ) : (
        <FlatList
          className="flex flex-1 w-full"
          data={messages}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
      )}
      <View className="flex flex-row gap-x-3 items-center mt-auto px-2.5 py-1.5 w-full">
        <TextInput
          value={newMessage}
          onChangeText={seNewMessage}
          multiline
          placeholder="Aa.."
          placeholderTextColor={"gray"}
          className="flex-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-600"
        />
        <Pressable
          className="self-end p-2"
          onPress={() => handleSendMessage()}
        >
          <MaterialIcons
            name="arrow-upward"
            size={24}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
}
