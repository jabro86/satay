async function isAuthenticated(
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) {
  if (!context.session.userId) {
    // user is not logged in
    throw new Error("not authenticated");
  }

  return resolve(parent, args, context, info);
}

export const middleware = {
  Mutation: {
    createRecipe: isAuthenticated,
    deleteRecipe: isAuthenticated
  }
};
