import { Pressable, Text } from "react-native";
import { Message } from "../store/chatStore";

type MessageComponentProps = {
  message: Message;
  selected?: boolean;
  alignment: "left" | "right";
};

export default function MessageComponent({
  message,
  alignment,
  selected,
}: MessageComponentProps) {
  return alignment == "right" ? (
    <Pressable className="max-w-[75%] self-end py-1.5 px-3.5 shrink-1 mx-1.5 my-0.5 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <Text className="text-sm font-normal pt-2.5 pb-1.5 text-gray-900 dark:text-white">
        {message.content}
      </Text>
    </Pressable>
  ) : (
    <Pressable className="max-w-[75%] self-start py-1.5 px-3.5 shrink-1 mx-1.5 my-0.5 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <Text className="text-sm font-normal pt-2.5 pb-1.5 text-gray-900 dark:text-white">
        {message.content}
      </Text>
    </Pressable>
  );
}
