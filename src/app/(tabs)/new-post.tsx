import { Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';



export default function NewPost() {
	const [image, setImage] = useState<null | string>(null);
	const navigation = useNavigation()
	const router = useRouter()
	const [content, setContent] = useState("")
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			// aspect: [4, 3],
			quality: 0.8,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
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

			<View style={styles.footer} >

				<View style={styles.iconButton}>
					<Pressable onPress={pickImage}>
						<FontAwesome name='image' size={24} color={'black'} />
					</Pressable>
				</View>

				<View style={styles.iconButton}>
					<Pressable onPress={pickImage}>
						<FontAwesome name='camera' size={24} color={'black'} />
					</Pressable>
				</View>

				<View style={styles.iconButton}>
					<Pressable onPress={pickImage}>
						<FontAwesome name='glass' size={24} color={'black'} />
					</Pressable>
				</View>

			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	footer: {
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	iconButton: {
		backgroundColor: 'gainsboro',
		padding: 15,
		borderRadius: 999,
	}
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
