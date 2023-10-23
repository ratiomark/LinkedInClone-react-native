import { User } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@clerk/clerk-expo";
import { PropsWithChildren, createContext, useContext } from "react";

type UserContextType = {
	dbUser?: User
	authUser?: ReturnType<typeof useUser>['user']
	loading: boolean
	reloadDbUser: () => void
}



const getUserQuery = gql`
  query MyQuery($authId: String!) {
    profileUsingprofile_authId_key(authId: $authId) {
      about
      authId
      backImage
      id
      image
      name
      position
    }
  }
`;

const UserContext = createContext<UserContextType>({
	loading: true,
	reloadDbUser: () => { },
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const { user: authUser, isLoaded: isAuthLoaded } = useUser();

	const { data, loading: isDbLoading, refetch, } = useQuery(getUserQuery, {
		variables: {
			authId: authUser?.id
		},
	});

	const dbUser = data?.profileUsingprofile_authId_key

	const loading = isDbLoading || !isAuthLoaded;

	return (
		<UserContext.Provider
			value={{
				dbUser,
				authUser,
				loading,
				reloadDbUser: refetch
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => useContext(UserContext)