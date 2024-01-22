import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import _ from "lodash";
import { FlatList, Pressable, Text, View } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import chatStore, { Message } from "../../store/chatStore";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

type itemProps = {
  item: Message;
};

const socketEndpoint = "http://localhost:3000";

export default function Page() {
  const unique = _.uniqBy(_.reverse([...chatStore.messages]), "sender");
  const [hasConnection, setConnection] = useState(false);

  useEffect(function didMount() {
    const socket = io(socketEndpoint, {
      transports: ["websocket"],
    });

    socket.io.on("open", () => setConnection(true));
    socket.io.on("close", () => setConnection(false));

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  const Item = ({ item }: itemProps) => {
    return (
      <ChatListItem
        message={item}
        hasUnread
      />
    );
  };

  return (
    <View className="flex-1 flex relative dark:bg-black">
      {hasConnection && (
        <View className="p-1 mb-4 rounded-lg bg-red-50 dark:bg-gray-800">
          <Text className="text-sm text-red-800 font-medium  dark:text-red-400">
            No connection
          </Text>
        </View>
      )}

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
      <Pressable
        onPress={() => router.push("/chat/scan")}
        className="absolute bottom-[16px] right-[16px] z-9 p-4 dark:bg-gray-300 rounded-xl"
      >
        <Feather
          name="maximize"
          size={24}
        />
      </Pressable>
    </View>
  );
}
