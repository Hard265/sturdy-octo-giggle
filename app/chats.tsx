import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import ChatListItem from "../components/ChatListItem";
import constant from "../constants/Strings";
import chatStore from "../store/chatStore";
import { Message } from "../util/types";
import { TextInput } from "react-native-gesture-handler";

type itemProps = {
    item: Message;
};

const Page = observer(() => {
    const [finderShown, setFinderShown] = useState(false);
    const unique = _.uniqBy(
        _.reverse([...chatStore.messages]),
        (message) => {
            return message.beneficiary == constant.address
                ? message.sender
                : message.beneficiary;
        }
    );

    const Item = ({ item }: itemProps) => {
        return (
            <ChatListItem
                title={
                    item.beneficiary == constant.address
                        ? item.sender
                        : item.beneficiary
                }
                subtitle={item.content}
                hasUnread
            />
        );
    };

    return (
        <View className="flex-1 flex relative dark:bg-black">
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "",
                    headerRight(props) {
                        return (
                            <View className="flex flex-row gap-x-4">
                                <Pressable
                                    onPress={() =>
                                        setFinderShown(true)
                                    }
                                >
                                    <Feather
                                        name="search"
                                        size={24}
                                        color={
                                            props.tintColor
                                        }
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={() =>
                                        router.push(
                                            "/profile"
                                        )
                                    }
                                >
                                    <Feather
                                        name="user"
                                        size={24}
                                        color={
                                            props.tintColor
                                        }
                                    />
                                </Pressable>
                            </View>
                        );
                    },
                }}
            />
            {finderShown ? (
                <View>
                    <TextInput
                        className="rounded-lg border dark:border-gray-800 dark:bg-gray-900"
                        placeholder="Find"
                    />
                </View>
            ) : (
                <Text className="px-4 leading-6 text-gray-900 dark:text-gray-300 ">
                    Recent chats
                </Text>
            )}

            {_.isEmpty(unique) ? (
                <View className="flex-1 flex justify-center items-center">
                    <Text className="font-light px-4 leading-6 text-gray-900 dark:text-gray-300">
                        No recent chats
                    </Text>
                </View>
            ) : (
                <FlatList
                    className="flex-1"
                    data={unique}
                    renderItem={Item}
                    keyExtractor={(item) => item.id}
                />
            )}
            <Pressable
                onPress={() => router.push("/chat/scan")}
                className="absolute bottom-[16px] right-[16px] z-9 p-4 bg-gray-900 dark:bg-gray-300 rounded-xl"
            >
                <Feather
                    name="user-plus"
                    size={24}
                />
            </Pressable>
        </View>
    );
});

export default Page;
