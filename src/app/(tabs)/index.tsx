import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import PostListItem from '@/components/PostListItem';
import posts from "../../../assets/data/posts.json";
import { Post } from '@/types';
const post = posts[0]

export default function HomeFeedScreen() {
	return (
		// если внутри item есть id, то flalist будет автоматов использовать его в качестве значения у keyExtractor
		<FlatList
			data={posts as Post[]}
			renderItem={({ item }) => <PostListItem post={item} />}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: 10 }}
		/>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
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
