import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);
graphqlClient.setHeader("Content-Type", "application/json");

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Token:", token);

    graphqlClient.setHeader("Authorization", `Bearer ${token}`);
  }
}

export default graphqlClient;
