import { get, merge } from "lodash";
import * as pluralize from "pluralize";
import {
  CREATE,
  DELETE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE
} from "ra-core";

import { buildApolloClient } from "./buildApolloClient";
import {
  ALL_TYPES as INNER_ALL_TYPES,
  MUTATION_TYPES as INNER_MUTATION_TYPES,
  QUERY_TYPES as INNER_QUERY_TYPES
} from "./constants";
import { Resource } from "./constants/interfaces";
import { defaultResolveIntrospection } from "./introspection";

export const QUERY_TYPES = INNER_QUERY_TYPES;
export const MUTATION_TYPES = INNER_MUTATION_TYPES;
export const ALL_TYPES = INNER_ALL_TYPES;

const defaultOptions = {
  resolveIntrospection: defaultResolveIntrospection,
  introspection: {
    operationNames: {
      [GET_LIST]: (resource: Resource) => `all${pluralize(resource.name)}`,
      [GET_ONE]: (resource: Resource) => `${resource.name}`,
      [GET_MANY]: (resource: Resource) => `all${pluralize(resource.name)}`,
      [GET_MANY_REFERENCE]: (resource: Resource) =>
        `all${pluralize(resource.name)}`,
      [CREATE]: (resource: Resource) => `create${resource.name}`,
      [UPDATE]: (resource: Resource) => `update${resource.name}`,
      [DELETE]: (resource: Resource) => `delete${resource.name}`
    },
    exclude: undefined,
    include: undefined
  }
};

const getOptions = (options: any, aorFetchType: any, resource: any) => {
  if (typeof options === "function") {
    return options(resource, aorFetchType);
  }

  return options;
};

export const buildGraphQlDataProvider = async (options: any) => {
  const {
    client: clientObject,
    clientOptions,
    introspection,
    resolveIntrospection,
    buildQuery: buildQueryFactory,
    override = {},
    ...otherOptions
  } = merge({}, defaultOptions, options);

  if (override && process.env.NODE_ENV === "production") {
    console.warn(
      // eslint-disable-line
      "The override option is deprecated. You should instead wrap the buildQuery function provided by the dataProvider you use."
    );
  }

  const client = clientObject || buildApolloClient(clientOptions);

  let introspectionResults;
  if (introspection) {
    introspectionResults = await resolveIntrospection(client, introspection);
  }

  const buildQuery = buildQueryFactory(introspectionResults, otherOptions);

  const raDataProvider = (aorFetchType: any, resource: any, params: any) => {
    const overriddenBuildQuery = get(override, `${resource}.${aorFetchType}`);

    const { parseResponse, ...query }: any = overriddenBuildQuery
      ? {
          ...buildQuery(aorFetchType, resource, params),
          ...overriddenBuildQuery(params)
        }
      : buildQuery(aorFetchType, resource, params);

    if (QUERY_TYPES.includes(aorFetchType)) {
      const apolloQueryNetworkOnly = {
        ...query,
        fetchPolicy: "network-only",
        ...getOptions(otherOptions.query, aorFetchType, resource)
      };

      return client.query(apolloQueryNetworkOnly).then(parseResponse);
    }

    const apolloQuery = {
      mutation: query.query,
      variables: query.variables,
      ...getOptions(otherOptions.mutation, aorFetchType, resource)
    };

    return client.mutate(apolloQuery).then(parseResponse);
  };

  raDataProvider.observeRequest = (
    aorFetchType: any,
    resource: any,
    params: any
  ) => {
    const { parseResponse, ...query } = buildQuery(
      aorFetchType,
      resource,
      params
    );

    const apolloQuery = {
      ...query,
      ...getOptions(otherOptions.watchQuery, aorFetchType, resource)
    };

    return client.watchQuery(apolloQuery).then(parseResponse);
  };

  raDataProvider.saga = () => {};

  return raDataProvider;
};
