import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from '@apollo/client';
import { PropsWithChildren } from 'react';


// нужен чтобы объяснить аполло как работать с данными новыми даными полученными от доп. феча и закешированными данными

const typePolicies: TypePolicies = {
	Query: {
		fields: {
			postPaginatedList: {
				keyArgs: false,
				merge(existing = [], incoming) {
					return [...existing, ...incoming]
				}
			}
		}
	}
}

const client = new ApolloClient({
	uri: 'https://alton.stepzen.net/api/brazen-iguana/__graphql',
	headers: { 'Authorization': 'apikey alton::stepzen.io+1000::438fbdf82adf544727dfea92b346186f51b38fc6ebc5f3833eed35b43110d5bc' },
	cache: new InMemoryCache({ typePolicies }),
});

export const ApolloClientProvider = ({ children }: PropsWithChildren) => {
	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	)
}