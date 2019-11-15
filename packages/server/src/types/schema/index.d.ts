// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    findTrainings: Array<ITraining>;
    me: IUser | null;
  }

  interface ITraining {
    __typename: 'Training';
    id: string;
    name: string;
    description: string;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    createTraining: boolean;
    deleteTraining: boolean;
    sendForgotPasswordEmail: boolean | null;
    forgotPasswordChange: Array<IError> | null;
    login: ILoginResponse;
    logout: boolean | null;
    register: Array<IError> | null;
  }

  interface ICreateTrainingOnMutationArguments {
    input: ICreateTrainingInput;
  }

  interface IDeleteTrainingOnMutationArguments {
    id: string;
  }

  interface ISendForgotPasswordEmailOnMutationArguments {
    email: string;
  }

  interface IForgotPasswordChangeOnMutationArguments {
    newPassword: string;
    key: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateTrainingInput {
    name: string;
    description: string;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface ILoginResponse {
    __typename: 'LoginResponse';
    errors: Array<IError> | null;
    sessionId: string | null;
  }
}

// tslint:enable