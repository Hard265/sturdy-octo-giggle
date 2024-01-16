import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";



export default function Page() {
  return (
    <View className="flex-1 justify-center items-center blur">
      <Text className="text-4xl font-black mb-8">Home page</Text>
      <Link className="mb-3" href="/auth/setup/">
        <Pressable className="w-100 py-2.5 px-5 rounded-lg border border-gray-200 bg-blue-700" onPress={()=> router.push("/auth/setup/")}>
            <Text className="text-sm font-medium text-white">Create account</Text>
        </Pressable>
      </Link>
      <Link href="/auth/">Chats</Link>
      <StatusBar style="auto" />
    </View>
  )
}
