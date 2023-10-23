import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import userJson from "../../../assets/data/user.json";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import ExperienceListItem from '@/components/ExperienceListItem';
import { Experience, User } from '@/types';
import { gql, useQuery } from '@apollo/client';

const getUserQuery = gql`
	query getUserQuery($id: ID!) {
		profile(id: $id) {
			about
			backImage
			name
			image
			position
			experience {
				companyImage
				companyName
				title
			}
		}
	}
`
const UserProfileScreen = () => {
	const { id } = useLocalSearchParams()
	const { loading, error, data } = useQuery<{ profile: User }>(getUserQuery, { variables: { id } });
	const user = data?.profile;

	const navigation = useNavigation();

	const onConnect = () => {
		console.warn('Connect Pressed');
	};

	useEffect(() => {
		navigation.setOptions({ title: user?.name || 'User' });
	}, [user?.name]);

	if (loading) {
		return <ActivityIndicator />;
	}
	if (error) {
		console.log(error);
		return <Text>Something went wrong...</Text>;
	}
	if (!user) {
		return <Text>Oooopps...user not found</Text>;
	}


	return (
		<ScrollView
			// style={styles.scrollView}
			// contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
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
					<Text style={styles.paragraph} >
						{user.about ?? "User didn't write about himself"}
					</Text>
				</View>

				<View style={styles.section} >
					<Text style={styles.sectionTitle}>Experience</Text>
					{user.experience?.map((experience, index) => (
						<ExperienceListItem
							key={index}
							experience={experience}
						/>
					))}

				</View>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	section: {
		// flex: 1,
		width: '100%',
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

	scrollView: {
		height: '20%',
		// justifyContent: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		// backgroundColor: 'lightgrey',
		paddingBottom: 50
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
		borderColor: 'white',
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