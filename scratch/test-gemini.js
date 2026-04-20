const { google } = require('@ai-sdk/google');
const { generateText } = require('ai');
require('dotenv').config();

async function testGemini() {
  console.log("Testing Gemini API...");
  console.log("Key exists:", !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  console.log("Key:", process.env.GOOGLE_GENERATIVE_AI_API_KEY ? process.env.GOOGLE_GENERATIVE_AI_API_KEY.substring(0, 10) + "..." : "None");
  
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: "Hello, answer in one word: Success.",
    });
    console.log("Gemini Response:", text);
  } catch (error) {
    console.error("Gemini Error:", error.message);
    if (error.data) {
      console.error("Error data:", JSON.stringify(error.data, null, 2));
    }
  }
}

testGemini();
