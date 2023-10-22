import { Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';

export default function NewPost() {
	const navigation = useNavigation()
	const router = useRouter()
	const [content, setContent] = useState("")

	const onPost = () => {
		console.warn('post  ', content)
		router.push('/(tabs)/')
		setContent('')
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			// title: 'New Post',
			headerRight: () => (
				<Pressable onPress={onPost} style={styles.postButton} >
					<Text style={styles.postButtonText} >Publish</Text>
				</Pressable>
			)
		})
	}, [onPost])

	return (
		<View style={styles.container}>
			<TextInput
				onChangeText={setContent}
				value={content}
				placeholder='write something'
				style={styles.input}
				multiline
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		padding: 10,
		borderColor: 'red',
		borderWidth: 2,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	input: {
		fontSize: 18,
	},
	postButton: {
		backgroundColor: 'royalblue',
		padding: 5,
		paddingHorizontal: 15,
		borderRadius: 999,
		marginRight: 10,


	},
	postButtonText: {
		color: 'white',
		fontWeight: 'bold',
		// fontSize: 16,
	},
	// title: {
	// 	fontSize: 20,
	// 	fontWeight: 'bold',
	// },
	// separator: {
	// 	marginVertical: 30,
	// 	height: 1,
	// 	width: '80%',
	// },
});
