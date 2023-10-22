import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Post } from '@/types';
import PostListItem from '@/components/PostListItem';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query MyQuery($id: ID!) {
    post(id: $id) {
      content
      id
      image
      profile {
        id
        name
        image
        position
      }
    }
  }
`;
const PostDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const { loading, error, data } = useQuery(query, { variables: { id } });

	if (loading) {
		return <ActivityIndicator />;
	}
	if (error) {
		console.log(error);
		return <Text>Something went wrong...</Text>;
	}

	return (
		<ScrollView>
			<PostListItem post={data.post} />
		</ScrollView>
	);
}
export default PostDetailsScreen