import { StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text variant="titleLarge">
          Search for experts to complete your everyday tasks.
        </Text>
      </View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <TextInput
            mode="outlined"
            dense
            placeholder="Type of assistance"
            left={<TextInput.Icon icon="crop" />}
          />
          <TextInput
            mode="outlined"
            dense
            placeholder="Near me"
            left={<TextInput.Icon icon="google-drive" />}
          />
          <TextInput
            mode="outlined"
            dense
            left={<TextInput.Icon icon="calendar" />}
            placeholder="Date & Time"
          />
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <Button mode="contained" style={styles.cardActionButton}>
            Find assistance
          </Button>
        </Card.Actions>
      </Card>
      <View style={styles.categoryContainer}>
        <Text variant="titleMedium">Top searched requests</Text>
        <Card style={styles.categoryContainer}>
          <Icon source="github" size={30} />
          <Text>Running errands</Text>
        </Card>
        <Card style={styles.categoryContainer}>
          <Icon source="google" size={30} />
          <Text>Business request</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    padding: 20,
  },
  card: {
    margin: 15,
    padding: 10,
  },
  cardContent: {
    gap: 20,
  },
  cardAction: {
    padding: 25,
  },
  cardActionButton: {
    width: "100%",
    borderRadius: 5,
  },
  categoryContainer: {
    padding: 20,
    gap: 20,
  },
  categoryCard: {
    padding: 20,
  },
});
