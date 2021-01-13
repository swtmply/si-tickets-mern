import "dotenv/config";
import { v2 } from "cloudinary";

const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export { cloudinary };
