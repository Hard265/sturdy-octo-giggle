import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import _ from "lodash";

export default function Page() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const [address, setAddress] = useState("");

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === PermissionStatus.GRANTED);
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  // const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View className="relative flex-1 flex-col flex justify-center dark:bg-black">
      <Stack.Screen options={{ title: "Scan QR code" }} />
      {/* Instruction */}
      <Text className="text-gray-800 dark:text-white text-center mt-2">
        Please position the QR code within the square to scan.
      </Text>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        className="insert-0 flex-1 rounded-full"
      />
      <Pressable className="sm:container flex  mt-auto p-2.5 rounded-lg m-2  bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700">
        <Text className="text-sm text-center text-gray-800 dark:text-gray-300 uppercase">
          Enter address manually
        </Text>
      </Pressable>
    </View>
  );
}
