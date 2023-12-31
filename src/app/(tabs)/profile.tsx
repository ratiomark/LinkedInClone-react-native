import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { SignOut } from '@/components/auth/SignOut';

export default function profile() {
  return (
		<View style={styles.container}>
			<SignOut/>
			<Text style={styles.title} >profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
