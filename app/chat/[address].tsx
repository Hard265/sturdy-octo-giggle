import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";

type messageProps = {
  id: string;
  sender: string | string[];
  message: string;
};

type messageRendererProps = {
  item: messageProps;
};

export default function Page() {
  const { address } = useLocalSearchParams();
  const [composor, setComposor] = React.useState("");

  const messages: messageProps[] = [
    {
      id: "hajs",
      sender: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      message: "Hey",
    },
    {
      id: "hajxs",
      sender: "1BvBMSEYstWetqTFn5Au4m4GFg7xJJKVN2",
      message: "How are you doing?",
    },
  ];

  const messageRenderer = ({ item }: messageRendererProps) => {
    const style =
      item.sender == address
        ? "py-2 px-3.5 self-end shrink-1 m-1.5 border border-gray-200 bg-gray-100 rounded-l-xl rounded-br-xl rounded-tr dark:bg-gray-900 dark:border-gray-800"
        : "py-2 px-3.5 self-start shrink-1 m-1.5 border border-gray-200 bg-gray-100 rounded-r-xl rounded-bl-xl rounded-tl dark:bg-gray-700 dark:border-gray-600";

    return (
      <View className={style}>
        <Text className="text-sm font-normal pt-2.5 pb-1.5 text-gray-900 dark:text-white">
          {item.message}
        </Text>
        <View className="inline-flex flex-row gap-x-2">
          <Text className="text-xs font-normal text-gray-500 dark:text-gray-400">
            11:45
          </Text>
          {item.sender == address && (
            <Text className="text-xs font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </Text>
          )}
        </View>
      </View>
    );
  };

  const submitMessage = () => {
    messages.push({
      id: Date.now().toString(),
      sender: address,
      message: composor,
    });
    setComposor("");
  };

  return (
    <View className="flex flex-col flex-1 items-center dark:bg-black">
      <Stack.Screen
        options={{
          title: address.toString(),
          headerRight: (props) => (
            <MaterialIcons
              {...props}
              name="info"
              size={24}
            />
          ),
          headerTintColor:
            useColorScheme().colorScheme == "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor:
              useColorScheme().colorScheme == "dark" ? "black" : "white",
          },
        }}
      />
      <FlatList
        className="flex flex-1 w-full border-t border-gray-300 dark:border-gray-800"
        data={messages}
        renderItem={messageRenderer}
        keyExtractor={(item) => item.id}
      />
      <View className="flex-1"></View>
      <View className="flex flex-row gap-x-3 items-center mt-auto px-2.5 py-1.5 w-full border-t border-gray-300 shadow  dark:border-gray-900">
        <TextInput
          value={composor}
          onChangeText={setComposor}
          multiline
          placeholder="Aa.."
          placeholderTextColor={"gray"}
          className="flex-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-600"
        />
        <Pressable
          className="self-end p-2"
          onPress={() => submitMessage()}
          disabled={composor.trim() != ""}
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
