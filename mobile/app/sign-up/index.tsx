import { useSignUp } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/user";
import { PasswordTextInput } from "@/components/PasswordTextInput";

export default function Index() {
  const theme = useTheme();

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const formMethods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const [pendingVerification, setPendingVerification] = useState(
    signUp?.status === "missing_requirements"
  );

  const [code, setCode] = useState("");

  const onSignUpPress = formMethods.handleSubmit(async (payload) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        emailAddress: payload.email,
        password: payload.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  });

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <TextInput
          value={code}
          mode="outlined"
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={theme.colors.backdrop}
          onPress={onVerifyPress}
        >
          Verify
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        name="username"
        control={formMethods.control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <TextInput
            label="User name"
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
        name="firstName"
        control={formMethods.control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <TextInput
            label="First name"
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
        name="lastName"
        control={formMethods.control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <TextInput
            label="Last name"
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

      <Button
        mode="contained"
        style={styles.button}
        buttonColor={theme.colors.backdrop}
        onPress={onSignUpPress}
      >
        Sign up
      </Button>
      <View style={styles.loginButtonRow}>
        <Text>Already have an account?</Text>
        <Button mode="contained" style={styles.button}>
          <Link href="/login">Log in</Link>
        </Button>
      </View>
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
  loginButtonRow: {
    display: "flex",
    gap: 5,
  },
});
