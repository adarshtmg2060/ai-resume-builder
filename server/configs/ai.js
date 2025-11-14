import OpenAI from "openai";
import { config } from "./app.config.js";

const ai = new OpenAI({
  // apiKey: "AIzaSyCqT0GEwGQvuvMh4McbVVg691myIOReHz0",
  // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: config.OPENAI_API_KEY,
  baseURL: config.OPENAI_BASE_URL,
});

export default ai;
