import { Link } from "expo-router";
import { useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { Card, SegmentedButtons } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const [value, setValue] = useState("pending");

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "assigned",
            label: "Assigned",
          },
          {
            value: "pending",
            label: "Pending",
          },
          { value: "completed", label: "Completed" },
        ]}
      />
      <FlatList
        data={mockData}
        contentContainerStyle={{ gap: 20, padding: 10 }}
        renderItem={(item) => (
          <Card style={styles.card} key={item.item.id}>
            <Card.Content>
              <Link
                href={{
                  pathname: "/tasks/[taskId]",
                  params: { taskId: item.item.id },
                }}
              >
                <View>
                  <Text>{item.item.name}</Text>
                </View>
              </Link>
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  card: {
    padding: 20,
  },
});

const mockData = [
  {
    id: 1,
    name: "Translation Service",
    distance: 10,
    price: 100,
    address: "Christchurch, New Zealand",
  },
  {
    id: 2,
    name: "Translation Service",
    distance: 10,
    price: 100,
    address: "Christchurch, New Zealand",
  },
  {
    id: 3,
    name: "Translation Service",
    distance: 10,
    price: 100,
    address: "Christchurch, New Zealand",
  },
];
