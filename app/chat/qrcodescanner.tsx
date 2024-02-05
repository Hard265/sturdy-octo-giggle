import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  Modal,
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {};

  return (
    <View className="flex-1 p-4 justify-center items-center dark:bg-black">
      <Stack.Screen
        options={{
          title: "Align the QR code to the center",
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      {!hasPermission ? (
        <>
          <Text className="text-5xl font-black text-gray-800 dark:text-gray-200">
            403
          </Text>
          <Text className="mt-1.5 text-base font-light leading-7 text-gray-600 dark:text-gray-400">
            Camera access forbidden.
          </Text>
        </>
      ) : (
        <>
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            className="flex-1 rounded-2xl"
            onBarCodeScanned={handleBarCodeScanned}
          />
          <View
            style={StyleSheet.absoluteFillObject}
            className="flex flex-col justify-center items-center"
          >
            <View className="h-56 w-56 border-2 border-white rounded" />

            <Pressable
              onPress={() => router.push("/chat/scan")}
              className="absolute bottom-[16px] right-[16px] z-9 p-4 dark:bg-gray-300 rounded-xl"
            >
              <Feather name="edit-3" size={24} />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

function enterAddressBottomsheet() {
  return (
    <Modal>
      <View className="absolute rounded-xl bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 dark:bg-gray-900">
        <View>
          <Text>Enter address</Text>
          <TextInput />
          <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter the address you want to scan
          </Text>
        </View>
        <Pressable>
          <Text>Enter</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
