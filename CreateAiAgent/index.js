
//we have 3 functions if user asks "what is current price of bitcoin" then LLM will not know which function we want to call
//beacuse we are not passing parameters like sum(a, b), getCryptoPrice({coin})....

//so for this we'll take LLM help, we'll give all the function to the llm, and we'll ask for a indicator
//first we will guid the llm that we want the output in json format, as llm can't run codes, so will ask for the function
//and the arguments which we need to call... like:
// {                                    {
//      name:"getCryptoPrice",              name: "sum",
//      args; {coin: "bitcoin"}             args: {a: 5, b: 8}
// }                                    }

//  getCryptoPrice({bitcon});           sum(5, 8);

//now we know we function to call


//llm will tell which function to call -> server will pass the output to llm -> it will give ans in a format
//7 or 3 kitna hua-> sum(7,3)          ->   10                               -> 7 or 3 10 hua


import readLineSync from 'readline-sync';
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" }); 


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

const History = [];


function prime({ num }) {  //arument is coming in the form of object
    if (num < 2)
        return false;

    for (let i = 2; i <= Math.sqrt(num); num++) {
        if (num % i == 0)
            return false;
    }
    return true;
}

function sum({ a, b }) {
    return a + b;
}

async function getCryptoPrice({ coin }) {

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`)
    const data = await response.json();

    return data;
}

//define the function declaration for model, we are telling the model about the sum function, what it does..
const cryptoDeclaration = {
    name: 'getCryptoPrice',
    description: "Get the current price of any crypto currency like bitcoin",
    parameters: {
        type: 'OBJECT',  //it will return the parameter in object format
        properties: {
            coin: {
                type: 'STRING',
                description: 'It will be the crypto currency name, like bitcoin'
            },
        },
        required: ['coin']
    }
}

const primeDeclaration = {
    name: 'prime',
    description: "Check if the number is prime or not",
    parameters: {
        type: 'OBJECT',  //it will return the parameter in object format
        properties: {
            num: {
                type: 'NUMBER',
                description: 'It will be the number to find it is prime or not ex: 13'
            },
        },
        required: ['num']
    }
}

const sumDeclaration = {
    name: 'sum',
    description: "Get the sum of 2 number",
    parameters: {
        type: 'OBJECT',  //it will return the parameter in object format
        properties: {
            a: {
                type: 'NUMBER',
                description: 'It will be first number for addition ex: 10'
            },
            b: {
                type: 'NUMBER',
                description: 'It will be second number for addition ex: 8'
            }
        },
        required: ['a', 'b']
    }
}

const availableTools = {
    sum: sum,
    prime: prime,
    getCryptoPrice: getCryptoPrice
}
async function runAgent(userProblem) {
    
    History.push({ //pushing the problem in history
        role: 'user',
        parts: [{ text: userProblem }]
    });

    //there may be multiple function calls
    while(true) {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: History,
            config: {
                systemInstruction: `You are an AI agent, you have access of 3 available tools like to find sum of 2 numbers, 
                get crypto price of any currency and find a number is prime or not
                use these tool whenever required to confirm user query.
                If user ask general question you can answer it directly if you don't need help of these three tools`,
                tools: [{
                    functionDeclarations: [sumDeclaration, primeDeclaration, cryptoDeclaration] //we are giving access of the tools
                }],
            },
        });

        //it can also return array of function calls, user may ask for sum and prime at the same time
        //  [
        //    {
        //        name: "sum", 
        //        args: {a:1, b:5}
        //    },
        //    {
        //      name: "prime", 
        //      args: {num: 11}
        //    }
        //  ]   
        if (response.functionCalls && response.functionCalls.length > 0) { //check if there are function calls

            console.log(response.functionCalls[0]);  //{ name: 'prime', args: { num: 13 } }
                                                     //{ name: 'sum', args: { a: 2, b: 6 } }       
            const { name, args } = response.functionCalls[0];

            const funCall = availableTools[name]; //it will return the function we need to call
            const result = await funCall(args); //we'll store the result of function after calling it, ex: sum(args)

            const functionResponsePart = {  //function response name and result
                name: name,
                response: {
                    result: result,
                },
            };

            //model
            History.push({
                role: "model",
                parts: [
                    {
                        functionCall: response.functionCalls[0],
                    },
                ],
            });

            //push the result into history
            History.push({
                role: "user",
                parts: [
                    {
                        functionResponse: functionResponsePart,
                    }
                ]
            });

        }
        else { //if there is no function call that means it is the final response, we'll print it
            History.push({  //we will push the response in history also
                role: 'model',
                parts: [{ text: response.text }]
            })
            console.log(response.text);
            break;
        }
    }
}


async function main() {
    const userProblem = readLineSync.question("Ask me anything-->");
    await runAgent(userProblem);
    main();
}

main();





