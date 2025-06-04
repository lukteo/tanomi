import { userUpdateSchema } from "@/schema/user";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Alert } from "react-native";
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();
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

  if (!isLoaded) return <ActivityIndicator animating={true} />;

  return (
    <SafeAreaView style={styles.container}>
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
            label="Last name"
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
    </SafeAreaView>
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
