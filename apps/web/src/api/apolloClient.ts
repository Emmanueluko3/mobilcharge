import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/api$/, "")}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("accessToken");
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
