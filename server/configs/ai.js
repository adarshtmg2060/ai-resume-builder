import OpenAI from "openai";
import { config } from "./app.config.js";

const ai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  baseURL: config.OPENAI_BASE_URL,
});

export default ai;
