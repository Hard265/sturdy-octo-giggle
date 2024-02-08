import { Feather } from "@expo/vector-icons";
import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomsheetScanAlt from "../../components/BottomsheetScanAlt";
import userStore from "../../store/userStore";
import { createURL } from "expo-linking";

export default function Page() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getBarCodeScannerPermissions();
  }, []);

  const pattern = /^[a-zA-Z0-9]{34}\?key=[a-zA-Z0-9]{130}$/;

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    if (pattern.test(data) && scanned === false) {
      const [address, publicKey] = data.split("?key=");
      handleProcced({ address, publicKey });
    }
    setScanned(true);
  };

  const handleProcced = ({
    address,
    publicKey,
  }: {
    address: string;
    publicKey: string;
  }) => {
    userStore
      .pushUser({ address, publicKey })
      .then(() => router.push(`/chat/${address}/`));
  };

  const handleScanAlt = (address: string) => {};

  return (
    <View className="flex-1 justify-center items-center dark:bg-black">
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
            <View className="h-56 w-56 border border-white rounded" />

            {/* {!isOpen && (
              <Pressable
                onPress={() => setIsOpen(true)}
                className="absolute bottom-[16px] right-[16px] z-9 p-4 dark:bg-gray-300 rounded-xl"
              >
                <Feather name="edit-3" size={24} />
              </Pressable>
            )} */}
          </View>
        </>
      )}
      <BottomsheetScanAlt
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        callback={handleScanAlt}
      />
    </View>
  );
}
