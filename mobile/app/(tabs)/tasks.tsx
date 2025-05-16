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
          <Link
            key={item.item.id}
            href={{
              pathname: "/tasks/[taskId]",
              params: { taskId: item.item.id },
            }}
          >
            <Card style={styles.card}>
              <Card.Content>

                <View>
                  <Text>{item.item.name}</Text>
                </View>
              </Card.Content>
            </Card>
          </Link>

        )
        }
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  card: {
    width: "100%",
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
