import { ActivityIndicator, FlatList, Text } from 'react-native';
import PostListItem from '@/components/PostListItem';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const postList = gql`
  query PostListQuery {
    postList {
      id
      content
      image
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

const postPaginatedList = gql`
  query PostPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      id
      content
      image
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

export default function HomeFeedScreen() {
	const [hasMore, setHasMore] = useState(true);
	const { loading, error, data, fetchMore, refetch } = useQuery(
		postPaginatedList,
		{
			variables: { first: 5 },
		}
	);

	const loadMore = async () => {
		if (!hasMore) {
			return;
		}
		console.log(data.postPaginatedList.length)
		const res = await fetchMore({
			variables: { after: data.postPaginatedList.length },
		});
		console.log('Исполнено')
		// if (res.data.postPaginatedList.length === 0) {
		// 	setHasMore(false);
		// }
	};

	if (loading) {
		return <ActivityIndicator />;
	}

	if (error) {
		console.log(error);
		return <Text>Something went wrong!</Text>;
	}

	return (
		<FlatList
			data={data.postPaginatedList}
			renderItem={({ item }) => <PostListItem post={item} />}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: 10, borderColor: 'red', borderWidth: 2 }}
			// onEndReachedThreshold={0.25}
			onEndReached={loadMore}
			refreshing={loading}
			onRefresh={refetch}
		/>
	);
}
// import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
// import PostListItem from '@/components/PostListItem';
// import { Post } from '@/types';
// import { gql, useQuery } from '@apollo/client';
// import React, { useState } from 'react';

// const getPostListQuery = gql`
// query getPostList {
//   postList {
//     content
//     id
//     image
//     userId
//     profile {
//       image
//       name
//       position
// 			id
//     }
//   }
// }
// `
// const postPaginatedList = gql`
//   query PostPaginatedListQuery($first: Int, $after: Int) {
//     postPaginatedList(first: $first, after: $after) {
//       id
//       content
//       image
//       profile {
//         id
//         name
//         position
//         image
//       }
//     }
//   }
// `;

// export default function HomeFeedScreen() {
// 	const [hasMore, setHasMore] = useState(true)
// 	const { data, loading, error, fetchMore, refetch } = useQuery<{ postPaginatedList: Post[] }>(postPaginatedList, { variables: { first: 2 } })

// 	const loadMore = async () => {
// 		const res = await fetchMore({
// 			variables: {
// 				after: data?.postPaginatedList.length ?? 2
// 			}
// 		})
// 		if (res.data.postPaginatedList.length === 0) {
// 			setHasMore(false)
// 		}
// 		// console.log(res)
// 	}

// 	if (loading && !data?.postPaginatedList) {
// 		return <ActivityIndicator />
// 	}

// 	if (error) {
// 		console.log(error)
// 		return <Text>Something wrong</Text>
// 	}

// 	return (
// 		// если внутри item есть id, то flalist будет автоматов использовать его в качестве значения у keyExtractor
// 		<FlatList
// 			data={data?.postPaginatedList as Post[]}
// 			renderItem={({ item }) => <PostListItem post={item} />}
// 			keyExtractor={(item) => item.id}
// 			contentContainerStyle={{ gap: 10 }}
// 			showsVerticalScrollIndicator={false}
// 			onEndReached={loadMore}
// 			refreshing={loading}
// 			onRefresh={refetch}
// 		/>

// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		// justifyContent: 'center',
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 	},
// 	separator: {
// 		marginVertical: 30,
// 		height: 1,
// 		width: '80%',
// 	},
// });
