import { useLocalSearchParams } from "expo-router";
import chatStore from "../store/chatStore";
import { SectionList, Text, View } from "react-native";
import { organizeMessages } from "../util/fn";
import { Message, MessageSection } from "../types/chat";
import _ from "lodash";
import ChatBubble from "./ChatBubble";
import { useCallback, useEffect, useState } from "react";

type messageProps = {
    item: Message
}

type sectionHeaderProps = {
    section: { title: string };
};

export default function ComponentChat() {
    const { address } = useLocalSearchParams();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    useEffect(() => {
        (async () => {
            const userMessages = await chatStore.user_messages(address as string);
            setChatMessages(userMessages);
        })()
    }, [])
    const organizedSections: MessageSection[] = organizeMessages(chatMessages);

    if (_.isEmpty(chatMessages)) {
        return (
            <View className="flex items-center justify-center flex-1 w-full">
                <Text className="text-sm mt-4 font-light text-gray-500 dark:text-gray-600">
                    your messages will appear here
                </Text>
            </View>
        );
    }

    return (
        <SectionList
            className="flex-1 flex w-full"
            sections={organizedSections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: messageProps) => MessageRender(item, address as string)}
            renderSectionHeader={TimelineRender}
        />
    );
}

const getMessageAlignment = (message: Message, address: string) => {
    return message.sender === address ? "right" : "left";
};

function MessageRender(message: Message, address: string) {
    const alignment = getMessageAlignment(message, address);

    return <ChatBubble message={message} alignment={alignment} />;
}

function TimelineRender({ section }: sectionHeaderProps) {
    return (
        <Text className="text-center text-sm text-500 dark:text-gray-600 capitalize my-2">
            {section.title}
        </Text>
    );
};