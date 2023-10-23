import { ApolloClientProvider } from '@/apollo/ApolloProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { Children, PropsWithChildren, useEffect } from 'react';
import { ActivityIndicator, Button, View, useColorScheme } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import AuthScreen from '@/components/auth/AuthScreen';
import * as SecureStore from "expo-secure-store";
import { UserContextProvider, useUserContext } from '@/context/UserContext';
import SetupProfileScreen from '@/components/auth/SetupProfileScreen';

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};


export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNavWithProviders />;
}

//  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> 
function RootLayoutNavWithProviders() {
	const colorScheme = useColorScheme();

	return (
		<ClerkProvider
			publishableKey={clerkPublishableKey}
			tokenCache={tokenCache}
		>
			<ApolloClientProvider>
				<UserContextProvider>
					<ThemeProvider value={DefaultTheme}>
						<RootLayoutNav />
					</ThemeProvider>
				</UserContextProvider>
			</ApolloClientProvider>
		</ClerkProvider>
	)
}

function RootLayoutNav() {
	const { dbUser, loading } = useUserContext()

	return (
		<>
			<SignedIn>
				{!dbUser
					? (
						loading
							? <ActivityIndicator />
							: <SetupProfileScreen />)
					: (
						<Stack screenOptions={{
							headerTitleAlign: 'center',
							// headerLeft: () => <SignOut />,
						}}>

							<Stack.Screen name="(tabs)" options={{
								headerShown: false,
							}} />
							<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
							<Stack.Screen name="posts/[id]" options={{ title: 'Post', }} />
						</Stack>
					)
				}
			</SignedIn>
			<SignedOut>
				<AuthScreen />
			</SignedOut>
		</>

	)
}
