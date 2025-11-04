import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyBn10qzY7lxALqs5nspfYR-9yX-g-GNNPs",
  {
    httpOptions: { apiVersion: "v1" },
  }
);

async function test() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent("Say hello!");
  console.log(result.response.text());
}

test();
