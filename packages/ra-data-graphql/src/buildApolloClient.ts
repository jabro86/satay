import {
  ApolloClient,
  ApolloClientOptions,
  HttpLink,
  InMemoryCache
} from "apollo-boost";
import { UriFunction } from "apollo-link-http";

interface OwnOptions {
  uri: string | UriFunction | undefined;
}

export const buildApolloClient = (
  options: ApolloClientOptions<{}> & OwnOptions
) => {
  const { cache, link, uri, ...otherOptions } = options;
  let finalLink = link;
  let finalCache = cache;

  if (!link && uri) {
    finalLink = new HttpLink({ uri });
  }

  if (!cache) {
    finalCache = new InMemoryCache().restore({});
  }

  return new ApolloClient({
    link: finalLink,
    cache: finalCache,
    ...otherOptions
  });
};
