import React from "react";
import _ from "lodash";
import * as Crypto from "expo-crypto";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import chatStore, { Message } from "../../../store/chatStore";
import ChatBubble from "../../../components/ChatBubble";
import { useColorScheme } from "nativewind";

type ItemProps = {
  item: Message;
};

export default function Page() {
  const { address } = useLocalSearchParams();
  const [newMessage, setNewMessage] = React.useState("");
  const {colorScheme} = useColorScheme()

  const messages = _.filter(chatStore.messages, ["sender", address]);

  const handleSendMessage = () => {
    chatStore.pushMessage({
      id: Crypto.randomUUID(),
      sender: address.toString(),
      content: newMessage,
    });
    setNewMessage("");
  };

  const Item = ({ item }: ItemProps) => {
    const alignment = _.isEqual(item.sender, address) ? "right" : "left";

    return (
      <ChatBubble
        message={item}
        alignment={alignment}
      />
    );
  };

  const TimelineTag = ({ item }: ItemProps) => {
    return <View />;
  };

  return (
    <View className="flex flex-col flex-1 items-center dark:bg-black">
      <Stack.Screen
        options={{
          title: address.toString(),
          headerRight: (props) => (
            <Pressable>
              <Feather
                name="user"
                size={24}
                color={props.tintColor}
              />
            </Pressable>
          ),
        }}
      />
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
          ItemSeparatorComponent={TimelineTag}
        />
      )}
      <View className="flex flex-row gap-x-3 justify-center items-center mt-auto px-2.5 py-1.5 w-full">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          placeholder="Aa.."
          placeholderTextColor={"gray"}
          cursorColor={colorScheme == "light" ?  "#1F2937" : "#D1D5DB"}
          className="flex-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-600"
        />
        <Pressable
          className="self-end p-3 rounded-lg bg-gray-800 dark:bg-gray-300 "
          onPress={() => handleSendMessage()}
          disabled={!newMessage.trim().length}
        >
          <MaterialIcons
            name="arrow-upward"
            size={24}
            color={colorScheme == "dark" ?  "#1F2937" : "#D1D5DB"}
          />
        </Pressable>
      </View>
    </View>
  );
}
