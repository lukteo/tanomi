import { useClerk } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { List, MD3Colors, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const { signOut, isSignedIn } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!isSignedIn) return;

    try {
      await signOut();
      router.navigate("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <List.Section>
        {!isSignedIn ? (
          <>
            <List.Item
              title={() => <Link href="/login">Log in</Link>}
              left={() => <List.Icon icon="login" />}
            />
            <List.Item
              title={() => <Link href="/sign-up">Sign up</Link>}
              left={() => (
                <List.Icon color={MD3Colors.primary30} icon="account" />
              )}
            />
          </>
        ) : (
          <List.Item
            title={() => <Link href="/profile/edit">Edit Profile</Link>}
            left={() => (
              <List.Icon color={MD3Colors.primary30} icon="account-circle" />
            )}
          />
        )}

        <List.Item
          title={() => <Link href="/">Contact us</Link>}
          left={() => <List.Icon color={MD3Colors.primary30} icon="contacts" />}
        />
        <List.Item
          title={() => <Link href="/">Terms of use</Link>}
          left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
        />
      </List.Section>

      <List.Section>
        <List.Item
          title={() => <Link href="/">Share Tanomi</Link>}
          left={() => <List.Icon icon="share" />}
        />
        <List.Item
          title={() => <Link href="/">Give us feedback</Link>}
          left={() => <List.Icon color={MD3Colors.tertiary70} icon="star" />}
        />
      </List.Section>

      {isSignedIn ? (
        <List.Section>
          <List.Item
            title={() => <Text onPress={handleSignOut}>Log out</Text>}
            left={() => <List.Icon icon="logout" />}
          />
        </List.Section>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
