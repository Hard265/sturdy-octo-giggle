import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
    const scheme = useColorScheme();
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        scheme == "dark"
                            ? "#000"
                            : "#e5e7eb",
                },
                headerTintColor:
                    scheme == "dark"
                        ? "#f3f4f6"
                        : "#1f2937",
            }}
        >
            <Stack.Screen
                name="setup"
                options={{
                    title: "back",
                }}
            />
            <Stack.Screen
                name="recover"
                options={{
                    // Hide the header for all other routes.
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
