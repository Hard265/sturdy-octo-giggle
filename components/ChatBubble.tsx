import { Pressable, Text } from "react-native";
import dayjs from "dayjs";
import { useState } from "react";
import { Message } from "../types/chat";

type MessageComponentProps = {
  message: Message;
  selected?: boolean;
  alignment: "left" | "right";
};

type TimestampProps = {
  hide: boolean;
  timestamp: string;
};

export default function ChatBubble({
  message,
  alignment,
  selected,
}: MessageComponentProps) {
  const [hideTimestamp, setHideTimestamp] = useState(true);

  const handlePress = () => {
    setHideTimestamp(!hideTimestamp);
  };

  const Timestamp = ({ hide, timestamp }: TimestampProps) =>
    !hide && (
      <Text className={`text-xs ${alignment == "right" ? "ml" : "mr"}-auto font-normal text-gray-500 dark:text-gray-400`}>
        {dayjs(message.timestamp).format("HH:mm")}
      </Text>
    );

  return alignment == "right" ? (
    <Pressable
      onPress={() => handlePress()}
      className="max-w-[75%] self-end py-1.5 px-3.5 shrink-1 mx-1.5 my-0.5 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800"
    >
      <Text className="text-sm font-normal pt-2.5 pb-1.5 text-gray-900 dark:text-white">
        {message.content}
      </Text>
      <Timestamp
        hide={hideTimestamp}
        timestamp={message.timestamp}
      />
    </Pressable>
  ) : (
    <Pressable className="max-w-[75%] self-start py-1.5 px-3.5 shrink-1 mx-1.5 my-0.5 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <Text className="text-sm font-normal pt-2.5 pb-1.5 text-gray-900 dark:text-white">
        {message.content}
      </Text>
      <Timestamp
        hide={hideTimestamp}
        timestamp={message.timestamp}
      />
    </Pressable>
  );
}
