import { Request, Response } from "express";
import { User } from "../entity/User";
import { redis } from "../redis";
// import { FRONTEND_HOST } from "../utils/config";

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    // if (FRONTEND_HOST) {
    //   res.redirect(`${FRONTEND_HOST}/login`);
    // }
    res.send("ok");
  } else {
    res.send("invalid");
  }
};
