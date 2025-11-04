import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_KEY, {
  httpOptions: { apiVersion: "v1" },
});

export default genAI;
