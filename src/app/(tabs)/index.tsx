import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import PostListItem from '@/components/PostListItem';
import { Post } from '@/types';
import { gql, useQuery } from '@apollo/client';
import React from 'react';

const getPostListQuery = gql`
query getPostList {
  postList {
    content
    id
    image
    userId
    profile {
      image
      name
      position
    }
  }
}
`
export default function HomeFeedScreen() {
	const { data, loading, error } = useQuery<{ postList: Post[] }>(getPostListQuery)

	if (loading) {
		return <ActivityIndicator />
	}

	if (error) {
		console.log(error)
		return <Text>Something wrong</Text>
	}

	return (
		// если внутри item есть id, то flalist будет автоматов использовать его в качестве значения у keyExtractor
		<FlatList
			data={data?.postList as Post[]}
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
