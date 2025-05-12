import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  MD3Colors,
  Text,
  TextInput,
} from "react-native-paper";

export default function Index() {
  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge">
          Search for experts to complete your everyday tasks.
        </Text>
      </View>
      <Card>
        <Card.Content style={styles.card}>
          <TextInput
            mode="outlined"
            dense
            placeholder="Type of tasks"
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
          <Button style={styles.cardActionButton}>Find Experts</Button>
        </Card.Actions>
      </Card>
      <View style={styles.categoryContainer}>
        <Text variant="titleMedium">Top-searched Requests</Text>
        <Card style={styles.categoryContainer}>
          <Icon source="github" color={MD3Colors.error50} size={30} />
          <Text>Running errands</Text>
        </Card>
        <Card style={styles.categoryContainer}>
          <Icon source="google" color={MD3Colors.error50} size={30} />
          <Text>Business request</Text>
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    backgroundColor: "#fefefefe",
    padding: 20,
  },
  card: {
    gap: 20,
  },
  cardAction: {
    padding: 25,
  },
  cardActionButton: {
    flex: 1,
  },
  categoryContainer: {
    padding: 20,
    gap: 20,
  },
  categoryCard: {
    padding: 20,
  },
});
