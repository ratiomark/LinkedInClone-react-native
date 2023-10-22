import { Experience } from '@/types'
import { View, StyleSheet, Image, Text } from 'react-native'

type ExperienceListItemProps = {
	experience: Experience
}
const ExperienceListItem = ({ experience }: ExperienceListItemProps) => {
	return (
		<View
			style={styles.container}
		>

			<Image
				source={{ uri: experience?.companyimage }}
				style={styles.image} />
			<View>
				<Text style={styles.title} >{experience.title}</Text>
				<Text style={styles.company} >{experience.companyname}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
		paddingHorizontal: 5,
	},
	image: {
		width: 60,
		aspectRatio: 1,
		marginRight: 5,
		// borderRadius: 50,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
	// company: (title: string) => ({
	// 	color: title === 'Fitenium' ? 'red' : 'grey',
	// 	color: title === 'Fitenium' ? 'red' : 'grey',
	// }),
	company: {
		color: 'grey',
	},

})
export default ExperienceListItem