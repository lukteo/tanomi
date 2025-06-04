import { darkTheme, lightTheme } from "@/config/theme";
import { useFonts } from "expo-font";
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
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [loaded] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const colorScheme = useColorScheme();

  const theme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: darkTheme.colors }
      : { ...MD3LightTheme, colors: lightTheme.colors };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

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
