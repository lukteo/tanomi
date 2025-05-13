import { darkTheme, lightTheme } from "@/config/theme";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: darkTheme.colors }
      : { ...MD3LightTheme, colors: lightTheme.colors };

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerShown: false,
        }}
      />
    </PaperProvider>
  );
}
