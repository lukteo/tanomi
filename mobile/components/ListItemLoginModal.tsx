import { loginSchema } from "@/schema/user";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  List,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
  Button,
} from "react-native-paper";
import { PasswordTextInput } from "./PasswordTextInput";

export const ListItemLoginModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
        hideModal();
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  });

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
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
              onPress={onSignInPress}
            >
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
        </Modal>
      </Portal>
      <List.Item
        onPress={showModal}
        title={() => <Text>Log in</Text>}
        left={() => <List.Icon icon="login" />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    height: "50%",
    margin: 20,
    padding: 5,
    borderRadius: 20,
  },
  container: {
    padding: 30,
    gap: 25,
  },
  button: {
    borderRadius: 5,
  },
});
