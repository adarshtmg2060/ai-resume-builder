import OpenAI from "openai";

const ai = new OpenAI({
  apiKey: "AIzaSyCqT0GEwGQvuvMh4McbVVg691myIOReHz0",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default ai;
