import { Stack, router } from "expo-router";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { Pressable, View, Text, FlatList } from "react-native";
import Header from "../../components/Header";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

type ItemProps = {
  address: string;
};

type ItemRendererProps = {
  item: ItemProps;
};

export default function Page() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [chats, setChats] = useState<ItemProps[]>([]);

  const chatRenderer = ({ item }: ItemRendererProps) => {
    return (
      <Pressable
        className="flex flex-row justify-between px-4 py-2"
        onPress={() => router.push(`/chat/${item.address}/`)}
      >
        <View className="min-w-0 flex-auto">
          <Text className="text-sm font-semibold truncate leading-6 text-gray-900 dark:text-gray-100">
            {item.address}
          </Text>
          <Text className="mt-1 truncate text-xs leading-5 text-gray-500">
            Libero non non earum et corporis pariatur.
          </Text>
        </View>
        <View className="sm:flex sm:flex-col sm:items-end">
          <Text className="text-sm leading-5 text-gray-500">1d</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="relative flex-1 dark:bg-black">
      <Header />
      <Text className="text-sm pl-4 font-semibold leading-6 text-gray-900 dark:text-gray-100">
        Recent chats
      </Text>
      <FlatList
        className="flex flex-1 py-2 w-full"
        data={chats}
        renderItem={chatRenderer}
        keyExtractor={(item) => item.address}
      />
      <Pressable
        onPress={() => router.push("/chat/scan")}
        className="absolute bottom-4 right-4 z-90 bg-gray-300 p-4 rounded-xl shadow flex justify-center items-center dark:bg-grey-800"
      >
        <Feather
          name="maximize"
          size={24}
          color={colorScheme === "light" ? "#D4D4D8" : "#1F2937"}
        />
      </Pressable>
    </View>
  );
}
