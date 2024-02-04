import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import _, { constant } from "lodash";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ChatListItem from "../../components/ChatListItem";
import chatStore from "../../store/chatStore";
import { Message } from "../../util/types";
import userStore from "../../store/userStore";

type itemProps = {
    item: Message;
};

const Page = observer(() => {
    const [finderShown, setFinderShown] = useState(false);
    const unique = _.uniqBy(
        _.reverse([...chatStore.messages]),
        (message) => {
            return message.beneficiary ===
                userStore.whoami?.address
                ? message.sender
                : message.beneficiary;
        }
    );

    const Item = ({ item }: itemProps) => {
        return (
            <ChatListItem
                title={
                    item.beneficiary ===
                    userStore.whoami?.address
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
                                        setFinderShown(
                                            !finderShown
                                        )
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
                                            "/chat/profile"
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
            <Text className="px-4 leading-6 text-gray-900 dark:text-gray-300 ">
                Recent chats
            </Text>

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
            {finderShown ? (
                <RenderFinder
                    onClose={() => setFinderShown(false)}
                />
            ) : (
                <Pressable
                    onPress={() =>
                        router.push("/chat/ioguihuhilkkjih/")
                    }
                    className="absolute bottom-[16px] right-[16px] z-9 p-4 bg-gray-900 dark:bg-gray-300 rounded-xl"
                >
                    <Feather
                        name="user-plus"
                        size={24}
                    />
                </Pressable>
            )}
        </View>
    );
});

function RenderFinder({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <View className="flex flex-row items-center gap-x-2 p-2">
            <TextInput
                className="flex-1 rounded-lg p-2 placeholder:text-white border dark:border-gray-800 dark:focus:border-gray-400 dark:bg-gray-900 "
                placeholder="Find"
                placeholderTextColor={"gray"}
                returnKeyType="search"
            />
            <Pressable>
                <Feather
                    name="chevron-down"
                    size={24}
                    color="white"
                />
            </Pressable>
            <Pressable>
                <Feather
                    name="chevron-up"
                    size={24}
                    color="white"
                />
            </Pressable>
            <Pressable onPress={() => onClose()}>
                <Feather
                    name="x"
                    size={24}
                    color="white"
                />
            </Pressable>
        </View>
    );
}

export default Page;
