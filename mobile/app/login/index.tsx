import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Index() {

    

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
                // buttonColor={}

            >Google Login</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        gap: 20
    },
    button: {
        borderRadius: 10,
    }
})