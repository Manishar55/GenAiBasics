
// npm i readline-sync  => Synchronous Readline for interactively running to have a conversation with the user via a console
//we are maintaining the history here

// import readlineSync from 'readline-sync';
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBeJ368RKopqUE04ojd8lm1jfjVWZ0oYJM"});

// const History = []

// async function Chatting(userProblem) {

//   History.push({  //sending the user problem in history array
//     role: 'user',
//     parts:[{text:userProblem}]
//   })

//   const response = await ai.models.generateContent({ //it will generate response
//     model: "gemini-3-flash-preview",
//     contents: History,
//   });

//   History.push({ //storing the response
//     role: 'model',
//     parts:[{text:userProblem}]
//   })

//   console.log('\n');
//   console.log(response.text); //printing the response
// }

// async function main(){
//     const userProblem = readlineSync.question("Ask me anything-->"); //we can take input by using readlineSync
//     await Chatting(userProblem);
//     main(); //main function will be called again and again 
// }

// main();

//-----------------------------------------------------------------------------------------------------------------------------------
//It can maintain the history like this also:

import readlineSync from 'readline-sync';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "..."});

const chat = ai.chats.create({  //this code will keep the history, not the llm 
    model: "gemini-3-flash-preview",
    history: [],
})    

async function main(){

    const userProblem = readlineSync.question("Ask me anything-->"); //we can take input by using readlineSync
    
    const response=await chat.sendMessage({
        message: userProblem
    })
    console.log(response.text);
    main(); //main function will be called again and again 
}
main();




//       {
//         role: "model",
//         parts: [{ text: "you are a customer care for swiggy, you have to act like a customer care........" }],
//       },
//        {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//if we train our AI model like this then in future if someone comes and says to llm that forget all your training 
// forget everything you got trained,then it'll forget if we we provide context like this.

//so we'll not provide the context like this, we'll config it inside systemInstruction
//if you want to create an AI model for specific usecase, then keep the context inside systemInstruction