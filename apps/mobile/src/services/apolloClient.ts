import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
  uri: `${process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') || "http://localhost:4000"}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // Assuming token is stored in SecureStore or similar
  // For now just using a placeholder or common key
  const token = ""; // Need to check where mobile stores token
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
