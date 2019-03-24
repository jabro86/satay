import ApolloClient from "apollo-boost";
import { Platform } from "react-native";

const host =
  Platform.OS === "ios" ? "http://localhost:4000" : "http://10.0.2.2:4000";

export const client = new ApolloClient({
  uri: host
});
