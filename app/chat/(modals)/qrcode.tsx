import { Pressable, Text, View } from "react-native";
// import QRCode from "react-native-qrcode-svg";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  generateMnemonic,
  mnemonicToEntropy,
} from "../../../util/cryptography";
import Colors from "../../../constants/Colors";

export default function Page() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const tint = colorScheme == "dark" ?Colors.dark.tint : Colors.light.tint;
  return (
    <View className="flex-1 justify-center items-center dark:bg-black">
      <View className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {/* <QRCode
          value="<address>"
          color={tint}
          backgroundColor="transparent"
        /> */}
      </View>
    </View>
  );
}
