import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import QRCode from "react-qr-code";
import { User } from "../types/user";
import userStore from "../store/userStore";
import { useColorScheme } from "nativewind";
import Themes from "../misc/theme";
import { useLocalSearchParams } from "expo-router";

export default function RowProfileAddress() {
  const { address } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();
  const theme = Themes[colorScheme];

  const user = !address ? userStore.whoami : userStore.user(address.toString());
  const data = `${user.address}?key=${user.publicKey}`;

  const handleCopy = () => {
    console.log(address);
  };

  return (
    <View className="flex flex-row gap-x-2">
      <View className="w-36 h-36 mx-auto p-2 rounded dark:bg-gray-900 ">
        <QRCode
          bgColor="#00000000"
          fgColor={theme.text}
          value={data}
          level="H"
          size={128}
          viewBox="0 0 128 128"
          style={{
            height: "auto",
            maxWidth: "100%",
            width: "100%",
          }}
        />
      </View>
      <Text className="flex-1 block wrap text-sm text-gray-800 dark:text-gray-300">
        {user.address}{" "}
        <Feather
          name="clipboard"
          onPress={handleCopy}
          size={16}
          color={theme.text}
        />
      </Text>
    </View>
  );
}
