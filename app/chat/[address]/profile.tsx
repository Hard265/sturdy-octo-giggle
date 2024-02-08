import { Feather } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import PrivancySettings from "../../../components/CardPrivancySettings";
import RowProfileAddress from "../../../components/RowProfileAddress";
import userStore from "../../../store/userStore";
import ButtonDeleteChat from "../../../components/ButtonDeleteChat";

export default function Modal() {
  const { address } = useLocalSearchParams();

  return (
    <View className="flex-1 p-2 dark:bg-black">
      <Stack
        screenOptions={{
          title: address.toString(),
        }}
      />
      <RowProfileAddress />
      <PrivancySettings />
      <ButtonDeleteChat />
    </View>
  );
}
