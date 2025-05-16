import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function Index() {
  const { taskId } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <Card style={styles.card}>
        <Text>Task ID: {taskId}</Text>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 50,
  },
});
