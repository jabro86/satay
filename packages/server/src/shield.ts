import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()((_, __, context) => {
  return !!context.session.userId;
});

export const middlewareShield = shield({
  Mutation: {
    createProject: isAuthenticated,
    deleteProject: isAuthenticated
  }
});
