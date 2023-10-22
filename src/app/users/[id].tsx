import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native'
import userJson from "../../../assets/data/user.json";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

const UserProfileScreen = () => {
	const [user, setUser] = useState(userJson)
	const navigation = useNavigation()
	const { id } = useLocalSearchParams()
	const onConnect = () => console.warn('connect')

	useEffect(() => {
		navigation.setOptions({
			title: user.name,
		})

	}, [user?.name])


	if (!user) {
		return <Text>user not found</Text>
	}
	return (
		<View style={styles.container} >
			<View style={styles.header} >
				<Image
					source={{ uri: user.backImage }}
					style={styles.backImage}
				/>

				<View style={styles.headerContent} >
					<Image
						source={{ uri: user.image }}
						style={styles.image}
					/>
					<Text style={styles.name} >{user.name}</Text>
					<Text style={styles.position} >{user.position}</Text>

					<Pressable onPress={onConnect} style={styles.button} >
						<Text style={styles.buttonText} >Connect</Text>
					</Pressable>
				</View>
			</View>

			<View style={styles.section} >
				<Text style={styles.sectionTitle} >About</Text>
				<Text style={styles.paragraph} >{user.about}</Text>

			</View>

		</View>
	)
}
const styles = StyleSheet.create({
	section: {
		backgroundColor: 'white',
		padding: 10,
		marginVertical: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 5,
	},
	paragraph: {
		// fontSize: 14,
		lineHeight: 20,
	},

	container: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	header: {
		backgroundColor: 'white',
		// backgroundImage:
	},
	backImage: {
		// height: 200,
		width: '100%',
		aspectRatio: 5 / 2,
		marginBottom: -60,
	},
	headerContent: {
		padding: 10,
		paddingTop: 0,
	},
	image: {
		width: 120,
		aspectRatio: 1,
		borderRadius: 9999,
		borderBlockColor: 'white',
		borderWidth: 3,
		// position: 'absolute',
		// top: '100%',
	},
	name: {
		fontSize: 24,
		fontWeight: '500',
	},
	position: {
		fontSize: 18,
		color: 'grey',
	},
	button: {
		backgroundColor: 'royalblue',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 999,
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16
	},

})

export default UserProfileScreen