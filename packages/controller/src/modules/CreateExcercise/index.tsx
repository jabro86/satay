import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import {
  CreateExcerciseMutation,
  CreateExcerciseMutationVariables
} from "../../schemaTypes";

const createExcerciseMutation = gql`
  mutation CreateExcerciseMutation(
    $title: String!
    $description: String!
    $pictureUrlExcercise: String!
    $videoUrlExcercise: String!
    $stepsExcercise: [String!]!
    $breathing: String!
    $pictureUrlMuscles: String!
    $listInvolvedMuscles: [String!]!
  ) {
    createExcercise(
      input: {
        title: $title
        description: $description
        pictureUrlExcercise: $pictureUrlExcercise
        videoUrlExcercise: $videoUrlExcercise
        stepsExcercise: $stepsExcercise
        breathing: $breathing
        pictureUrlMuscles: $pictureUrlMuscles
        listInvolvedMuscles: $listInvolvedMuscles
      }
    )
  }
` as any & React.AbstractView; // hack to make build work since react is needed for types

export interface CreateExcerciseProps {
  createExcercise(variables: CreateExcerciseMutationVariables): Promise<void>;
}

export const withCreateExcercise = graphql<
  any,
  CreateExcerciseMutation,
  CreateExcerciseMutationVariables,
  CreateExcerciseProps
>(createExcerciseMutation, {
  props: ({ mutate }) => ({
    createExcercise: async variables => {
      if (mutate === undefined) {
        return;
      }
      const response = await mutate({ variables });

      console.log(response);
    }
  })
});
