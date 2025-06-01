import { useSignUp } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <TextInput
        label="Email"
        mode="outlined"
        value={emailAddress}
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        textContentType="password"
        value={password}
        onChangeText={(password) => setPassword(password)}
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
