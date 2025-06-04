import { darkTheme, lightTheme } from "@/config/theme";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Text,
} from "react-native-paper";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: darkTheme.colors }
      : { ...MD3LightTheme, colors: lightTheme.colors };

  return (
    <PaperProvider theme={theme}>
      <ClerkProvider tokenCache={tokenCache}>
        <RootStack />
      </ClerkProvider>
    </PaperProvider>
  );
}

function RootStack() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: "modal",
          title: "Log in",
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text>Close</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen
          name="profile/edit"
          options={{
            headerShown: true,
            title: "Edit Profile",
            headerBackTitle: "Back",
          }}
        />
      </Stack.Protected>

      <Stack.Screen
        name="sign-up/index"
        options={{
          headerShown: true,
          headerTitle: "Sign up",
          headerBackTitle: "Back",
        }}
      />

      <Stack.Screen
        name="tasks/[taskId]"
        options={{
          headerShown: true,
          headerTitle: "Task",
        }}
      />
    </Stack>
  );
}
