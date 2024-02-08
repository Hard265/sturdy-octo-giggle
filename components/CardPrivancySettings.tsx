import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, FadeIn } from "react-native-reanimated";
import Themes from "../misc/theme";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import chatStore from "../store/chatStore";
import _ from "lodash";
import AlertDialog from "./AlertDialog";
import { useLocalSearchParams } from "expo-router";

type Option = {
  name: string;
  append?: React.JSX.Element;
  cb?: () => void;
};

export default function PrivancySettings() {
  const { colorScheme } = useColorScheme();
  const { address } = useLocalSearchParams();

  const theme = Themes[colorScheme];

  const [promptBlock, setPromptBlock] = useState(false);

  const options: Option[] = [
    {
      name: "Export chat",
      append: <Feather name="download-cloud" size={20} color={theme.text} />,
    },
    {
      name: "Countdown messages",
      append: <Feather name="chevron-right" size={20} color={theme.text} />,
    },
    {
      name: "Archive chat",
      append: <Feather name="toggle-left" size={20} color={theme.text} />,
    },
    {
      name: "Block",
      append: <Feather name="toggle-left" size={20} color={theme.text} />,
      cb: () => setPromptBlock(true),
    },
  ];

  const admin_options: Option[] = [];

  return (
    <>
      <View className="container mt-auto bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 ">
        {(address ? options : admin_options).map(
          ({ name, append, cb }, index) => (
            <Pressable
              key={index}
              onPress={cb}
              className="w-full flex flex-row justify-between border-t border-gray-200 items-center p-3 dark:border-gray-800"
            >
              <Text className="ml-2.5 font-medium text-gray-900 dark:text-gray-300 capitalize">
                {name}
              </Text>
              {append}
            </Pressable>
          )
        )}
      </View>
      <AlertDialog
        show={promptBlock}
        message={`Block ${address} from messaging you?`}
        onRequestConfirm={() => setPromptBlock(false)}
        onRequestDismiss={() => setPromptBlock(false)}
      />
    </>
  );
}
