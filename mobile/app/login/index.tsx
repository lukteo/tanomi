import { PasswordTextInput } from "@/components/PasswordTextInput";
import { loginSchema } from "@/schema/user";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();

  const formMethods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPress = formMethods.handleSubmit(async (payload) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: payload.email,
        password: payload.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />

      <Controller
        name="email"
        control={formMethods.control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!error}
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        name="password"
        control={formMethods.control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <PasswordTextInput
            label="Password"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!error}
            secureTextEntry
          />
        )}
      />

      <Button mode="contained" style={styles.button} onPress={onSignInPress}>
        Login
      </Button>

      <Button
        disabled
        mode="contained"
        style={styles.button}
        buttonColor={theme.colors.inversePrimary}
      >
        Google Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    gap: 25,
  },
  button: {
    borderRadius: 5,
  },
});
