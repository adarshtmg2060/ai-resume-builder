import { ImageKit } from "@imagekit/nodejs";
import { config } from "./app.config.js";

const imageKit = new ImageKit({
  publicKey: config.IMAGE_KIT_PUBLIC_KEY,
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGE_KIT_URL_ENDPOINT,
});

export default imageKit;
