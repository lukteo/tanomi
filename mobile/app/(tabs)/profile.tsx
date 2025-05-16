import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <List.Section>
        <List.Item title={() => <Link href='/login'>Log in</Link>} left={() => <List.Icon icon="login" />} />
        <List.Item
          title={() => <Link href='/sign-up'>Sign up</Link>}
          left={() => <List.Icon color={MD3Colors.primary30} icon="account-circle" />}
        />
        <List.Item
          title={() => <Link href='/'>Contact us</Link>}
          left={() => <List.Icon color={MD3Colors.primary30} icon="contacts" />}
        />
        <List.Item
          title={() => <Link href="/">Terms of use</Link>}
          left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
        />
      </List.Section>

      <List.Section>
        <List.Item title={() => <Link href='/'>Share Tanomi</Link>} left={() => <List.Icon icon="share" />} />
        <List.Item
          title={() => <Link href='/'>Give us feedback</Link>}
          left={() => <List.Icon color={MD3Colors.tertiary70} icon="star" />}
        />
      </List.Section>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,

  },
});
