const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session.userId) {
    throw new Error(`Not authenticated!`);
  }
  // you could fetch the user here and pass it into the context
  return resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createProject: isAuthenticated,
    deleteProject: isAuthenticated
  }
};
