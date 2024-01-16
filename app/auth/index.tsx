import { Link, router } from "expo-router";
import { View, Text } from "react-native";


export default function Page(){
    return (
        <View className="flex-1 items-end p-8">
            <Text className="text-3xl font-black mb-3">Welcome Text</Text>
            <Link className="mb-3" href="/auth/setup/">
                <Pressable className="w-full py-2.5 px-5 rounded-lg border border-gray-200 bg-blue-700" >
                    <Text className="text-sm font-medium text-gray-900">Create account</Text>
                </Pressable>
            </Link>
            <Link className="mb-3" href="/auth/recover/">
                <Pressable className="w-full py-2.5 px-5 rounded-lg border border-gray-200 bg-transparent" >
                    <Text className="text-sm font-medium text-gray-900">Recover account</Text>
                </Pressable>
            </Link>
        </View>
    )
}