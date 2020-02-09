import gql from "graphql-tag";
// @ts-ignore
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
    $pictureExcercise: Upload
    $videoExcercise: String!
    $stepsExcercise: [String!]!
    $breathing: String!
    $pictureMuscles: Upload
    $listInvolvedMuscles: [String!]!
  ) {
    createExcercise(
      input: {
        title: $title
        description: $description
        pictureExcercise: $pictureExcercise
        videoExcercise: $videoExcercise
        stepsExcercise: $stepsExcercise
        breathing: $breathing
        pictureMuscles: $pictureMuscles
        listInvolvedMuscles: $listInvolvedMuscles
      }
    )
  }
`;

export interface WithCreateExcercise {
  createExcercise(variables: CreateExcerciseMutationVariables): Promise<void>;
}

export const withCreateExcercise = graphql<
  any,
  CreateExcerciseMutation,
  CreateExcerciseMutationVariables,
  WithCreateExcercise
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
