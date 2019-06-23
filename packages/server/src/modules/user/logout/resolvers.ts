import { ResolverMap } from "../../../types/graphql-utils";
import { removeAllUsersSessions } from "../../../utils/removeAllUsersSessions";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }: any) => {
      const { userId } = session;
      if (userId) {
        removeAllUsersSessions(userId, redis);
        session.destroy((err: any) => {
          if (err) {
            console.log(err);
          }
        });
        return true;
      }

      return false;
    }
  }
};
