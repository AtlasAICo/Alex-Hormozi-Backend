const { Configuration, OpenAIApi } = require("openai");
const { Prompt } = require("../model/Prompt");
const { PromptTemplate } = require("langchain/prompts");
require("dotenv").config();

const openAIApiKey = process.env.openAIApiKey;

const clientAvatar = async (data, promptID) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const prompt_obj = await Prompt.findOne({
      id: promptID || "ab59143f-5128-4497-8394-57301b4fb4e0",
    });

    const role = prompt_obj.role; // Inserting from db
    const promptTemplate = prompt_obj.prompt; // Inserting from db
    const prompt = PromptTemplate.fromTemplate(promptTemplate);
    const formattedPrompt = await prompt.format(data);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: role },
        { role: "user", content: formattedPrompt },
      ],
    });
    return completion;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const painPoints = async (data, promptID) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);

    const prompt_obj = await Prompt.findOne({
      id: promptID || "297bd062-c8fd-405e-94fa-3950a50967af",
    });

    const role = prompt_obj.role;
    const promptTemplate = prompt_obj.prompt;
    const prompt = PromptTemplate.fromTemplate(promptTemplate);

    const formattedPrompt = await prompt.format(data);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: role },
        { role: "user", content: formattedPrompt },
      ],
    });

    return completion;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const dreamOutcomes = async (data, promptID) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);

    const prompt_obj = await Prompt.findOne({
      id: promptID || "5827c0a9-dbb7-4954-992f-457e1654833e",
    });

    const role = prompt_obj.role;
    const promptTemplate = prompt_obj.prompt;
    const prompt = PromptTemplate.fromTemplate(promptTemplate);

    const formattedPrompt = await prompt.format(data);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: role },
        { role: "user", content: formattedPrompt },
      ],
    });

    return completion;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const solutions = async (data, promptID) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);

    const prompt_obj = await Prompt.findOne({
      id: promptID || "16d46779-92f2-41b4-bd03-e9e60f0abb58",
    });

    const role = prompt_obj.role;
    const promptTemplate = prompt_obj.prompt;
    const prompt = PromptTemplate.fromTemplate(promptTemplate);

    const formattedPrompt = await prompt.format(data);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: role },
        { role: "user", content: formattedPrompt },
      ],
    });

    return completion;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const grandSlamOffer = async (data, promptID) => {
  try {
    const summaryResponse = await createSummary(data);
    const summary = summaryResponse.data.choices[0].message.content;

    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);

    const prompt_obj = await Prompt.findOne({
      id: promptID || "c7d1562b-c353-4d51-8d3b-354495d6f4c6",
    });

    const role = prompt_obj.role;
    const promptTemplate = prompt_obj.prompt;
    const prompt = PromptTemplate.fromTemplate(promptTemplate);

    const formattedPrompt = await prompt.format({ summary });

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: role },
        { role: "user", content: formattedPrompt },
      ],
    });

    return completion;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const createSummary = async (data) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const role = `You will be given details about Client Avatar, their pain points, their dream outcomes and list of solutions. You will create a detailed, but concise summary of all of that information, but limit response to 4000 characters altering none of the information just reformatting it.`;
    const prompt = `Client Avatar: ${data.clientAvatar}\n\nPain Points: ${data.painPoints}\n\nDream Outcomes: ${data.dreamOutcomes}\n\nSolutions: ${data.solutions}`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "system", content: role },
        { role: "user", content: prompt },
      ],
    });
    return completion;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

module.exports = {
  clientAvatar,
  painPoints,
  dreamOutcomes,
  solutions,
  grandSlamOffer,
};
