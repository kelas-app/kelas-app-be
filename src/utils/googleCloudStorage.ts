import { Storage } from "@google-cloud/storage";
import path from "path";

const keyFilename = path.join(
  __dirname,
  "../../config/service-account-key.json"
);

const storage = new Storage({ keyFilename });

const bucketName = "kelas-app-testing";
const bucket = storage.bucket(bucketName);

export { storage, bucket };
