import { ImageKit } from "@imagekit/nodejs";
import { config } from "./app.config.js";

const imageKit = new ImageKit({
  // publicKey: "public_mCeMHEZMEQTAHUhEQy74wc/tWDk=",
  // privateKey: "private_e4TEYWR7z8NTADUsoeteLRJo7EY=",
  // urlEndpoint: "https://ik.imagekit.io/x7xxa304at", // Required
  publicKey: config.IMAGE_KIT_PUBLIC_KEY,
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGE_KIT_URL_ENDPOINT,
});

export default imageKit;
