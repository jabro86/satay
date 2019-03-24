import {
  ArgumentNode,
  DefinitionNode,
  DocumentNode,
  FieldNode,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  OperationDefinitionNode,
  OperationTypeNode,
  SelectionNode,
  SelectionSetNode,
  TypeNode,
  ValueNode,
  VariableDefinitionNode,
  VariableNode
} from "graphql";

// Functional utils to easily build GraphQL ASTs
// Inspired by https://github.com/imranolas/graphql-ast-types

export const document = (definitions: DefinitionNode[]): DocumentNode => ({
  kind: Kind.DOCUMENT,
  definitions
});

export const operationDefinition = (
  operation: OperationTypeNode,
  selectionSetNode: SelectionSetNode,
  nameNode: NameNode,
  variableDefinitions: VariableDefinitionNode[]
): OperationDefinitionNode => ({
  kind: Kind.OPERATION_DEFINITION,
  operation,
  selectionSet: selectionSetNode,
  name: nameNode,
  variableDefinitions
});

export const selectionSet = (
  selections: SelectionNode[]
): SelectionSetNode => ({
  kind: Kind.SELECTION_SET,
  selections
});

export const field = (
  nameNode: NameNode,
  optionalValues: Partial<FieldNode> = {}
): FieldNode => ({
  kind: Kind.FIELD,
  name: nameNode,
  ...optionalValues
});

export const listType = (type: TypeNode): ListTypeNode => ({
  kind: Kind.LIST_TYPE,
  type
});

export const nonNullType = (
  type: NamedTypeNode | ListTypeNode
): NonNullTypeNode => ({
  kind: Kind.NON_NULL_TYPE,
  type
});

export const variableDefinition = (
  variableNode: VariableNode,
  type: TypeNode
): VariableDefinitionNode => ({
  kind: Kind.VARIABLE_DEFINITION,
  variable: variableNode,
  type
});

export const variable = (nameNode: NameNode): VariableNode => ({
  kind: Kind.VARIABLE,
  name: nameNode
});

export const name = (value: string): NameNode => ({
  kind: Kind.NAME,
  value
});

export const namedType = (nameNode: NameNode): NamedTypeNode => ({
  kind: Kind.NAMED_TYPE,
  name: nameNode
});

export const argument = (
  nameNode: NameNode,
  value: ValueNode
): ArgumentNode => ({
  kind: Kind.ARGUMENT,
  name: nameNode,
  value
});
