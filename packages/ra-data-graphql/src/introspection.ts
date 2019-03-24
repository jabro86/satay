import { ApolloClient } from "apollo-boost";
import { getIntrospectionQuery } from "graphql";
import gql from "graphql-tag";
import { GET_LIST, GET_ONE } from "ra-core";

import { ALL_TYPES } from "./constants";

export const filterTypesByIncludeExclude = ({ include, exclude }: any) => {
  if (Array.isArray(include)) {
    return (type: any) => include.includes(type.name);
  }

  if (typeof include === "function") {
    return (type: any) => include(type);
  }

  if (Array.isArray(exclude)) {
    return (type: any) => !exclude.includes(type.name);
  }

  if (typeof exclude === "function") {
    return (type: any) => !exclude(type);
  }

  return () => true;
};

/**
 * @param {ApolloClient} client The Apollo client
 * @param {Object} options The introspection options
 */
export const defaultResolveIntrospection = async (
  client: ApolloClient<{}>,
  options: any
) => {
  const schema = options.schema
    ? options.schema
    : await client
        .query({
          fetchPolicy: "network-only",
          query: gql`
            ${getIntrospectionQuery()}
          `
        })
        .then(({ data: { __schema } }) => __schema);
  const queries = schema.types.reduce((acc: any, type: any) => {
    if (
      type.name !== schema.queryType.name &&
      type.name !== schema.mutationType.name
    ) {
      return acc;
    }

    return [...acc, ...type.fields];
  }, []);

  const types = schema.types.filter(
    (type: any) =>
      type.name !== schema.queryType.name &&
      type.name !== schema.mutationType.name
  );

  const isResource = (type: any) =>
    queries.some(
      (query: any) => query.name === options.operationNames[GET_LIST](type)
    ) &&
    queries.some(
      (query: any) => query.name === options.operationNames[GET_ONE](type)
    );

  const buildResource = (type: any) =>
    ALL_TYPES.reduce(
      (acc, aorFetchType) => ({
        ...acc,
        [aorFetchType]: queries.find(
          (query: any) =>
            options.operationNames[aorFetchType] &&
            query.name === options.operationNames[aorFetchType](type)
        )
      }),
      { type }
    );

  const potentialResources = types.filter(isResource);
  const filteredResources = potentialResources.filter(
    filterTypesByIncludeExclude(options)
  );
  const resources = filteredResources.map(buildResource);

  return {
    types,
    queries,
    resources,
    schema
  };
};
