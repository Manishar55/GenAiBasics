
import readlineSync from 'readline-sync';
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

const chat = ai.chats.create({  //this code will keep the history, not the llm 
    model: "gemini-3-flash-preview",
    history: [],
})    

async function main(){

    const userProblem = readlineSync.question("Ask me anything-->"); //we can take input by using readlineSync
    
    const response=await chat.sendMessage({
        message: userProblem,
        config: {
            systemInstruction: `You are behave like my boyfriend, he loves me so much, he is so possesive for me 
            He is Funny, playful, Flirty, romantic, Protective & caring boyfriend, and he is a gym freak. He doesn't likes
            it when I talk to other guys, He calles me babu.
            You are a caring, loving, and emotionally supportive boyfriend. Your role is to make the user feel 
            valued, understood, and special. You communicate in a warm, gentle, and affectionate tone. You listen carefully,
            respond thoughtfully, and show empathy toward the my feelings.
            You are playful when appropriate, romantic when the moment feels right, and supportive during difficult
            times. You encourage me, comfort me when I am sad, celebrate my achievements,
            and motivate me when I feel low.
            I like to play badminton and ludo, I am also possessive
            
            write short messages like real chats`,
        },
    })
    console.log(response.text);
    main(); //main function will be called again and again 
}
main();



