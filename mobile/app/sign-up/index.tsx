import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Index() {
    return (
        <View>
            <Stack.Screen options={{ headerShown: true }} />
            <Text>Sign up page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})