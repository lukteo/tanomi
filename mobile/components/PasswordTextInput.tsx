import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";

export const PasswordTextInput = (props: TextInputProps) => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <TextInput
      {...props}
      secureTextEntry={hidePass}
      right={
        <TextInput.Icon
          icon={hidePass ? "eye-off" : "eye"}
          onPress={() => setHidePass(!hidePass)}
        />
      }
    />
  );
};
