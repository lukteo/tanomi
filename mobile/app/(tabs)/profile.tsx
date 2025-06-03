import { userUpdateSchema } from "@/schema/user";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, Alert } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();

  const { signOut, isSignedIn } = useClerk();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(userUpdateSchema),
    values: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      username: user?.username ?? "",
    },
  });

  const onUpdatePress = handleSubmit(async (payload) => {
    try {
      user?.update({
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
      });
      Alert.alert("Success", "Profile has been sucessfully updated.");
    } catch (err) {
      Alert.alert("Error", "Something went wrong.");
      console.error(err);
    }
  });

  const handleSignOut = async () => {
    if (!isSignedIn) return;

    try {
      await signOut();
      router.navigate("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  if (!isLoaded) return <ActivityIndicator animating={true} />;

  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Image
        style={styles.avatar}
        size={80}
        source={require("../../assets/images/react-logo.png")}
      />

      <Controller
        name="username"
        control={control}
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
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="firstName"
        control={control}
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
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
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
            disabled={isSubmitting}
          />
        )}
      />

      <Button
        mode="contained"
        style={styles.button}
        buttonColor={theme.colors.inverseSurface}
        onPress={onUpdatePress}
        disabled={isSubmitting}
      >
        Update
      </Button>

      <Button onPress={handleSignOut}>Log out</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 30,
    gap: 25,
  },
  button: {
    borderRadius: 5,
  },
  avatar: {
    margin: "auto",
  },
});
