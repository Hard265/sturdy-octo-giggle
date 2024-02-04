import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { Stack, router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { observer } from "mobx-react";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, SectionList, Text, TextInput, View } from "react-native";
import ChatBubble from "../../../components/ChatBubble";
import chatStore from "../../../store/chatStore";
import { organizeMessages } from "../../../util/fn";
import { Message, MessageSection } from "../../../util/types";
import constant from "../../../constants/Strings";

type ItemProps = {
  item: Message;
};
type SectionHeaderProps = {
  section: { title: string };
};

const Page = observer(() => {
  const { address } = useLocalSearchParams();
  const [newMessage, setNewMessage] = React.useState("");
  const { colorScheme } = useColorScheme();

  const organizedSections: MessageSection[] = organizeMessages(
    _.filter(chatStore.messages, (message) => {
      return (
        (message.sender === address &&
          message.beneficiary == constant.address) ||
        (message.sender === constant.address && message.beneficiary == address)
      );
    })
  );

  const handleSendMessage = () => {
    chatStore.pushMessage({
      id: Crypto.randomUUID(),
      sender: constant.address,
      content: newMessage,
      timestamp: new Date().toISOString(),
      beneficiary: address.toString(),
    });
    setNewMessage("");
  };

  const Item = ({ item }: ItemProps) => {
    const alignment = _.isEqual(item.sender, constant.address)
      ? "right"
      : "left";

    return (
      <ChatBubble
        message={item}
        alignment={alignment}
      />
    );
  };

  const TimelineTag = ({ section }: SectionHeaderProps) => {
    return (
      <Text className="text-center text-sm text-500 dark:text-gray-600 capitalize my-2">
        {section.title}
      </Text>
    );
  };

  return (
    <View className="flex flex-col flex-1 items-center dark:bg-black">
      <Stack.Screen
        options={{
          title: address.toString(),
          headerRight: (props) => (
            <Pressable onPress={() => router.push(`/chat/${address}/profile`)}>
              <Feather
                name="user"
                size={24}
                color={props.tintColor}
              />
            </Pressable>
          ),
        }}
      />
      {_.isEmpty(organizedSections) ? (
        <View className="flex items-center justify-center flex-1 w-full">
          <Text className="text-sm mt-4 font-light text-gray-500 dark:text-gray-600">
            your messages will appeare here
          </Text>
        </View>
      ) : (
        <SectionList
          className="flex-1 flex w-full"
          sections={organizedSections}
          keyExtractor={(item) => item.id}
          renderItem={Item}
          renderSectionHeader={TimelineTag}
        />
      )}
      <View className="flex flex-row gap-x-3 justify-center items-center mt-auto px-2.5 py-1.5 w-full">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          placeholder="Aa.."
          placeholderTextColor={"gray"}
          cursorColor={colorScheme == "light" ? "#1F2937" : "#D1D5DB"}
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
            color={colorScheme == "dark" ? "#1F2937" : "#D1D5DB"}
          />
        </Pressable>
      </View>
    </View>
  );
});

export default Page;
