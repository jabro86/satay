/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  email: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ForgotPasswordChangeMutation
// ====================================================

export interface ForgotPasswordChangeMutation_forgotPasswordChange {
  __typename: "Error";
  path: string;
  message: string;
}

export interface ForgotPasswordChangeMutation {
  forgotPasswordChange: ForgotPasswordChangeMutation_forgotPasswordChange[] | null;
}

export interface ForgotPasswordChangeMutationVariables {
  newPassword: string;
  key: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProjectMutation
// ====================================================

export interface CreateProjectMutation_createProject {
  __typename: "CreateProjectResponse";
  id: string;
  title: string;
  description: string;
  serviceName: string;
}

export interface CreateProjectMutation {
  createProject: CreateProjectMutation_createProject;
}

export interface CreateProjectMutationVariables {
  title: string;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateResourceMutation
// ====================================================

export interface CreateResourceMutation {
  createResource: boolean;
}

export interface CreateResourceMutationVariables {
  serviceName: string;
  name: string;
  content: ContentInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteProjectMutation
// ====================================================

export interface DeleteProjectMutation {
  deleteProject: boolean;
}

export interface DeleteProjectMutationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteResourceMutation
// ====================================================

export interface DeleteResourceMutation {
  deleteResource: boolean;
}

export interface DeleteResourceMutationVariables {
  serviceName: string;
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeployProjectMutation
// ====================================================

export interface DeployProjectMutation {
  deployProject: boolean;
}

export interface DeployProjectMutationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindProjectsQuery
// ====================================================

export interface FindProjectsQuery_findProjects {
  __typename: "Project";
  id: string;
  title: string;
  description: string;
  serviceName: string;
}

export interface FindProjectsQuery {
  findProjects: FindProjectsQuery_findProjects[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindResourcesQuery
// ====================================================

export interface FindResourcesQuery_findResources_content_attributes {
  __typename: "Attribute";
  name: string;
  type: string;
  required: boolean;
  unique: boolean | null;
}

export interface FindResourcesQuery_findResources_content {
  __typename: "Content";
  attributes: FindResourcesQuery_findResources_content_attributes[];
}

export interface FindResourcesQuery_findResources {
  __typename: "Resource";
  id: string;
  name: string;
  content: FindResourcesQuery_findResources_content;
}

export interface FindResourcesQuery {
  findResources: FindResourcesQuery_findResources[];
}

export interface FindResourcesQueryVariables {
  serviceName: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendForgotPasswordEmailMutation
// ====================================================

export interface SendForgotPasswordEmailMutation {
  sendForgotPasswordEmail: boolean | null;
}

export interface SendForgotPasswordEmailMutationVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_errors {
  __typename: "Error";
  path: string;
  message: string;
}

export interface LoginMutation_login {
  __typename: "LoginResponse";
  errors: LoginMutation_login_errors[] | null;
  sessionId: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  __typename: "Error";
  path: string;
  message: string;
}

export interface RegisterMutation {
  register: RegisterMutation_register[] | null;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AttributeInput {
  name: string;
  type: string;
  required: boolean;
  unique?: boolean | null;
}

export interface ContentInput {
  attributes: AttributeInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
