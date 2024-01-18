import { Stack } from "expo-router";


export default function Layout() {
    return <Stack>
        <Stack.Screen
        name="setup"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="recover"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mnemonic-confirm-modal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
        }}
      />
    </Stack>
}
