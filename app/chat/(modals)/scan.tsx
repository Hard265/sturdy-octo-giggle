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

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View className="flex-1 p-4 justify-center dark:bg-black">
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        className="flex-1 rounded-2xl"
        onBarCodeScanned={handleBarCodeScanned}
      />
      <View style={StyleSheet.absoluteFillObject} className="flex justify-center items-center">
        <View className="h-56 w-56 border border-white rounded"></View>
        {/* flex itself to bottom */}

        <Pressable
          className="mt-4 flex justify-center items-center rounded-lg px-5 py-3"
          onPress={() => null}
        >
          <Text className="shadow text-blue-500 font-medium text-sm uppercase">
            Or enter address manually
          </Text>
        </Pressable>
      </View>
      {/* <View>
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase">
          Enter address
        </Text>
        <TextInput
          value={address}
          onChangeText={(text) => setAddress(_.trim(text))}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300"
        />
        <Pressable
          className="w-full mt-4 justify-self-end flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3 dark:bg-white"
          onPress={() => router.replace(`/chat/${address}/`)}
        >
          <Text className="text-white dark:text-gray-800 font-medium text-sm uppercase">
            confirm
          </Text>
        </Pressable>
      </View> */}
    </View>
  );
}
