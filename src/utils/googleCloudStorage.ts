import { Storage } from "@google-cloud/storage";
import path from "path";

// Path to your service account key
const keyFilename = path.join(
  __dirname,
  "../../config/service-account-key.json"
);

// Creates a client
const storage = new Storage({ keyFilename });

const bucketName = "kelas-app-testing"; // Ganti dengan nama bucket Anda
const bucket = storage.bucket(bucketName);

export { storage, bucket };
