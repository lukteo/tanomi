import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

export default function Index() {

    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: true }} />
            <TextInput label='Username' mode='outlined' />
            <TextInput label='Password' mode='outlined' />
            <Button
                mode="contained"
                style={styles.button}

            >Login</Button>
            <Button
                mode="contained"
                style={styles.button}
                buttonColor={theme.colors.inversePrimary}
            >Google Login</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        gap: 25
    },
    button: {
        borderRadius: 5,
    }
})