import { validUserSchema } from "@satay/common";

import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { formatYupError } from "../../../utils/formatYupError";
import { sendConfirmationEmail } from "../../../utils/sendEmail";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { duplicateEmail } from "./errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];
      }

      const user = User.create({
        email,
        password
      });

      await user.save();

      if (process.env.NODE_ENV !== "test") {
        await sendConfirmationEmail(
          email,
          await createConfirmEmailLink(url, user.id, redis)
        );
      }

      return null;
    }
  }
};
