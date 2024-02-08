import { Feather } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import PrivancySettings from "../../../components/CardPrivancySettings";
import RowProfileAddress from "../../../components/RowProfileAddress";
import userStore from "../../../store/userStore";

export default function Modal() {
  const { address } = useLocalSearchParams();

  const user = userStore.user(address as string);

  const handlePop = () => {
    userStore.dropUser(user)
    router.replace(`/chat/`)
  };

  return (
    <View className="flex-1 p-2 dark:bg-black">
      <Stack
        screenOptions={{
          title: address.toString(),
        }}
      />
      <RowProfileAddress />
      <PrivancySettings />

      {/*button to delete chat */}
      <Pressable onPress={handlePop} className="w-full p-3 flex flex-row rounded-lg mt-2 justify-between border items-center bg-red-700 dark:bg-red-600 dark:border-reg-500">
        <Text
          style={{
            fontFamily: "Inter-Medium",
          }}
          className="font-medium text-white"
        >
          Delete chat
        </Text>
        <Feather name="trash-2" size={20} color="white" />
      </Pressable>
    </View>
  );
}
