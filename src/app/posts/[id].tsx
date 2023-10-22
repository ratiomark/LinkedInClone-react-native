import { View, Text, ScrollView } from 'react-native'
import posts from "../../../assets/data/posts.json";
import { Post } from '@/types';
import PostListItem from '@/components/PostListItem';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
const post = posts[0]

const PostDetailsScreen = () => {
	const { id } = useLocalSearchParams()
	if (!post) {
		return <Text>Post not found</Text>
	}
	return (
		<ScrollView>
			<PostListItem post={post as Post} />
		</ScrollView>

	)
}
export default PostDetailsScreen