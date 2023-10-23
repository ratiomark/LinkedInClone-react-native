import { useAuth } from "@clerk/clerk-expo";
import { View, Button } from "react-native";

export const SignOut = () => {
	const { isLoaded, signOut } = useAuth();
	if (!isLoaded) {
		return null;
	}
	return (
		<View>
			<Button
				title="Sign Out"
				onPress={() => {
					signOut();
				}}
			/>
		</View>
	);
};