import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { SignOut } from '@/components/auth/SignOut';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={24} style={{ marginBottom: -1 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#191919',
				headerTitleAlign: 'center',
				headerTitleStyle: {
					// backgroundColor: 'red'
				}
				// tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Tab One',
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					headerLeft: () => (
						<View style={{ padding: 10 }}>
							<SignOut />
						</View>
					),
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										color={Colors[colorScheme ?? 'light'].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="network"
				options={{
					title: "My Network",
					tabBarIcon: ({ color }) => <TabBarIcon name="group" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="new-post"
				options={{
					title: "Post",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="plus-square" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					title: "Notifications",
					tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "profile",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="user" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
