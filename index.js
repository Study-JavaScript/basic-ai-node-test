const { OpenAI } = require("openai");
const dotenv = require("dotenv")
dotenv.config({
    path: ".env.local"
})

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.AIML_API_KEY;
const systemPrompt = "You are a travel agent. Be descriptive and helpful";
const userPrompt = "Tell me about San Francisco";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const main = async () => {
  if(apiKey===null|undefined)throw new Error("Error at set env")
  const completion = await api.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });

  const response = completion.choices[0].message.content;

  console.log("User:", userPrompt);
  console.log("AI:", response);
};

main();