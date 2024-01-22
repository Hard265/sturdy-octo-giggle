import { View } from "react-native";
// import QRCode from "react-native-qrcode-svg";
import { useColorScheme } from "nativewind";

export default function Page() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const tint = colorScheme == "dark" ? "white" : "#111827";

  return (
    <View className="flex-1 justify-center items-center">
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
