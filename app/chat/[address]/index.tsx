import { Feather } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, View } from "react-native";
import ComponentChat from "../../../components/ComponentChat";
import FooterInputBox from "../../../components/FooterInputBox";


const Page = observer(() => {
  const { address } = useLocalSearchParams();

  return (
    <View className="flex flex-col flex-1 items-center dark:bg-black">
      <Stack.Screen
        options={{
          title: address.toString(),
          headerRight: (props) => (
            <Pressable onPress={() => router.push(`/chat/${address}/profile`)}>
              <Feather name="user" size={24} color={props.tintColor} />
            </Pressable>
          ),
        }}
      />
      <ComponentChat />
      <FooterInputBox />
    </View>
  );
});

export default Page;
