import * as shortid from "shortid";
import { Excercise } from "../../../entity/Excercise";
import { ResolverMap } from "../../../types/graphql-utils";
import { createWriteStream } from "fs";

const storeUpload = async ({
  createReadStream,
  filename
}: any): Promise<{ id: string; path: string }> => {
  const id = shortid.generate();
  const path = `ìmages/${id}`;

  const readStream = createReadStream(filename);
  return new Promise((resolve, reject) =>
    readStream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", (error: any) => {
        console.log("error", error);
        reject(error);
      })
  );
};

const processUpload = async (upload: any) => {
  console.log("TCL: processUpload -> upload", upload);
  const { createReadStream, filename } = await upload;
  const { id } = await storeUpload({ createReadStream, filename });
  return id;
};

export const resolvers: ResolverMap = {
  Mutation: {
    createExcercise: async (
      _,
      { input: { pictureExcercise, pictureMuscles, videoExcercise, ...data } },
      { session }
    ) => {
      if (!session.userId) {
        // user is not logged in
        throw new Error("not authenticated");
      }

      const pictureUrlExcercise = await processUpload(pictureExcercise);

      await Excercise.create({
        ...data,
        pictureUrlExcercise,
        videoUrlExcercise: "",
        pictureUrlMuscles: "",
        userId: session.userId
      }).save();

      return true;
    }
  }
};
