
import { Stack, useLocalSearchParams } from 'expo-router';

import { Text, View } from '../../components/Themed';

export default function Page() {
    const { address } = useLocalSearchParams();

    return (
        <View>
            <Stack.Screen options={{ headerShown: false, title: address.toString() }} />
            <Text>Chat ID: {address}</Text>;
        </View>
    )
}
