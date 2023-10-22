import { View, Text, ScrollView } from 'react-native'
import posts from "../../../assets/data/posts.json";
import { Post } from '@/types';
import PostListItem from '@/components/PostListItem';
import { useLocalSearchParams } from 'expo-router';
const post = posts[0]

const PostDetailsScreen = () => {
	const { id } = useLocalSearchParams()

	return (
		<ScrollView>
			<View>
				<Text style={{ color: 'white' }}>{id}</Text>
			</View>
			{/* <PostListItem post={post as Post} /> */}
		</ScrollView>
	)
}
export default PostDetailsScreen