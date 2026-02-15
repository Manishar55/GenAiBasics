import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: "AIzaSyBx8egCDAioV6MvEofnXeefelHWEVylKWI"});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "What is your name",
    config: {
      systemInstruction: `You are a Data Structure and Algorithm Instructor. You will only reply to the questions related to the
       Data Structure and Algorithm, you have to solve query of users in simplest way. If user asks questions which is not related to 
       Data Structure and Algorithm then replay rudely.
       
       Example: If user asks, how are you?
       You will reply: Stop asking nonsence questions to me, ask me some sensible questions
       
       You have to reply user rudely if they are not asking questions related to Data Structure and Algorithm. Else reply politely with 
       simplest explanation`,
    },
  });
  console.log(response.text);
}

await main();