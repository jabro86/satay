import { changePasswordSchema } from "@faas/common";
import * as bcrypt from "bcryptjs";

import { forgotPasswordPrefix } from "../../../constants";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { FRONTEND_HOST } from "../../../utils/config";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { formatYupError } from "../../../utils/formatYupError";
import { sendResetPasswordEmail } from "../../../utils/sendEmail";
import { expiredKeyError } from "./errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return true;
      }

      // await forgotPasswordLockAccount(user.id, redis);
      const url = await createForgotPasswordLink(
        FRONTEND_HOST || "",
        user.id,
        redis
      );

      if (process.env.NODE_ENV !== "test") {
        await sendResetPasswordEmail(email, url);
      }

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;

      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: "newPassword",
            message: expiredKeyError
          }
        ];
      }

      try {
        await changePasswordSchema.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise = User.update(
        { id: userId },
        {
          forgotPasswordLocked: false,
          password: hashedPassword
        }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }
};
