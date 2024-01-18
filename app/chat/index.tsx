import { Stack, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, View, Text, FlatList } from "react-native";

type userProps = {
  address: string;
};

type userRendererProps = {
  item: userProps;
};

const users: userProps[] = [
  {
    address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
  },
];

export default function Page() {
  const userRenderer = ({ item }: userRendererProps) => {
    return (
      <Pressable
        className="p-2"
        onPress={() => router.push("/chat/1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2")}
      >
        <Text className="text-base font-semibold text-gray-900 dark:text-white">{item.address}</Text>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 items-center justify-center dark:bg-black">
     <Stack.Screen
        options={{
          title:"Chats",
          headerTitleAlign: "left",
          headerTintColor: useColorScheme().colorScheme == "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor:
              useColorScheme().colorScheme == "dark" ? "black" : "white",
          },
        }}
      />
      <FlatList
        className="flex flex-1 w-full border-t border-gray-300 dark:border-gray-800"
        data={users}
        renderItem={userRenderer}
        keyExtractor={(item) => item.address}
      />
    </View>
  );
}
