

// 1. create API in google ai studio "https://aistudio.google.com/"
// API-> AIzaSyBNTC7qQ08HY67GmDL-X02lfuIWdietO9A
//2. Copy code from the documentation
//3. you can go to the @google/genai documentation also "https://www.npmjs.com/package/@google/genai"
//4.  npm i @google/genai
//5.  npm i readline-sync  => Synchronous Readline for interactively running to have a conversation with the user via a console



// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBeJ368RKopqUE04ojd8lm1jfjVWZ0oYJM"});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "what is my name",
//   });
//   console.log(response.text);
// }

// await main();


//but it will not able to tell my name because it cant store my name, not even the previous question i asked

//but chatgpt keep context of the previous questions, it will send all the qustions to the llm model to keep context, so 
//it remembers our names if we ask it 


//----------------------------------------WITH CONTEXT-------------------------------------------------------------------------------------------

//if we provide context (the chat history) it will remember it

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBeJ368RKopqUE04ojd8lm1jfjVWZ0oYJM"});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: [
//       {
//         role: "user",
//         parts: [{ text: "What is my name" }],
//       },
//        {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//       {
//         role: "user",
//         parts: [{ text: "My name is Manisha" }],
//       },
     
//     ],
//   });
//   console.log(response.text);
// }

// await main();

