import { Pressable, StyleSheet, TextInput, Image } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '@/context/UserContext';

const insertNewPostMutations = gql`
	mutation MyMutation ($userId: ID, $content: String!, $image: String,) {
		insertPost(userId: $userId, content: $content, image: $image) {
			content
			image
			id
			userId
		}
}
`

export default function NewPost() {
	const { dbUser } = useUserContext()
	const [image, setImage] = useState<null | string>(null);
	const [content, setContent] = useState("")
	const [handleMutation, { loading }] = useMutation(insertNewPostMutations, {
		refetchQueries: ['PostPaginatedListQuery'],
	});
	const navigation = useNavigation()
	const router = useRouter()
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

	const onPost = async () => {
		if (loading) return
		// console.log(dbUser?.id)
		await handleMutation({
			variables: {
				content,
				image,
				userId: dbUser?.id
			}
		})
		// console.warn('post  ', content)
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
				value={content}
				onChangeText={setContent}
				placeholder="What do you want to talk about?"
				style={styles.input}
				multiline
			/>

			{image && <Image source={{ uri: image }} style={styles.image} />}

			<View style={styles.footer}>
				<Pressable onPress={pickImage} style={styles.iconButton}>
					<FontAwesome name="image" size={24} color="black" />
				</Pressable>

				<View style={styles.iconButton}>
					<FontAwesome name="camera" size={24} color="black" />
				</View>

				<View style={styles.iconButton}>
					<FontAwesome name="glass" size={24} color="black" />
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
	},
	image: {
		width: '100%',
		aspectRatio: 1,
		marginTop: 'auto',
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
