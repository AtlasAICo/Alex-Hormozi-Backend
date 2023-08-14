// const { LLMChain } = require("langchain/chains");
// const { PromptTemplate, OpenAI } = require("langchain");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const openAIApiKey = process.env.openAIApiKey;

/*
1. Approach 1 using langchain
*/
// const clientAvatar = async (data) => {
//   try {
//     const llm = new OpenAI({
//       openAIApiKey,
//       temperature: 0,
//       model: "gpt-3.5-turbo",
//     }); //improvement_area,target_audience,product_or_service,pain_point

// const template = `
// Becoming Your Client Avatar – A Journey into Their World

// In the style of Alex Hormozi, we're not just going to understand your client avatar; we're going to become them. We're going to feel what they feel, understand their deepest desires and fears, and craft a solution that's not for 'someone' but specifically and uniquely FOR THEM:

// 1.Improvement Area: {improvement_area}
//     - Identifying Core Needs: What drives human longing in this domain, and how does it align with our core values?
//     - The Big Why: What's the transformation they seek? Why is it vital?
// 2.Target Audience: {target_audience}
//     - The Persona: Beyond numbers, who are they? What fuels their dreams, values, and fears?
//     - Their World: How does their environment mold their needs, desires, and struggles?
// 3.Pain Point: {pain_point}
//     - The Real Pain: Look beyond the surface. What's the root cause, and how does it feel?
//     - The Emotional Connection: Unveil the true problem by understanding the emotions behind the pain.
//     - Past Failures: What lessons lie in past attempts, and how can we innovate?
// 4. Product/Service: {product_or_service}
//     - Tailoring for THEM: How is your offering a remedy designed with precision for their unique needs?
//     - The Experience: How will you weave your solution seamlessly into their daily lives?
//     - Building a Movement: How will it transcend mere commerce and cultivate a loyal community, a movement?

// This is more than a business endeavor; it's a transformational journey. Are you prepared to transcend traditional boundaries and create something not just effective but life-changing? Your expedition begins here.`;
//     /*
// //Method 1
//   const prompt = new PromptTemplate({
//     inputVariables: [
//       "improvement_area",
//       "target_audience",
//       "product_or_service",
//       "pain_point",
//     ],
//     template,
//   });
//  */
//     // const prompt = PromptTemplate.fromTemplate(template);
//     const chain = new LLMChain({
//       llm,
//       prompt: "What is Javascript ?",
//       verbose: true,
//     });

// const result = await chain.call({
//   improvement_area: "Wealth",
//   target_audience: "Business",
//   product_or_service:
//     "1:1 coaching sessions to help them scale their business step by step)",
//   pain_point: "to scale and struggling to find",
// });
//     const result = await chain.call({});
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

const clientAvatar = async (data) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const prompt = `
    Becoming Your Client Avatar – A Journey into Their World

    In the style of Alex Hormozi, we're not just going to understand your client avatar; we're going to become them. We're going to feel what they feel, understand their deepest desires and fears, and craft a solution that's not for 'someone' but specifically and uniquely FOR THEM:

    1.Improvement Area: ${data.improvement_area}
        - Identifying Core Needs: What drives human longing in this domain, and how does it align with our core values?
        - The Big Why: What's the transformation they seek? Why is it vital?
    2.Target Audience: ${data.target_audience}
        - The Persona: Beyond numbers, who are they? What fuels their dreams, values, and fears?
        - Their World: How does their environment mold their needs, desires, and struggles?
    3.Pain Point: ${data.pain_point}
        - The Real Pain: Look beyond the surface. What's the root cause, and how does it feel?
        - The Emotional Connection: Unveil the true problem by understanding the emotions behind the pain.
        - Past Failures: What lessons lie in past attempts, and how can we innovate?
    4. Product/Service: ${data.product_or_service}
        - Tailoring for THEM: How is your offering a remedy designed with precision for their unique needs?
        - The Experience: How will you weave your solution seamlessly into their daily lives?
        - Building a Movement: How will it transcend mere commerce and cultivate a loyal community, a movement?

    This is more than a business endeavor; it's a transformational journey. Are you prepared to transcend traditional boundaries and create something not just effective but life-changing? Your expedition begins here.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
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
};
/*
{
  role: 'assistant',
  content: "As your helpful assistant, I'm here to guide you through the process of becoming your client avatar and understanding their needs on a deep level. Let
's dive into each step together:\n" +
    '\n' +
    '1. Improvement Area: Wealth\n' +
    '   - Identify Core Needs: By understanding what drives human longing in the wealth domain, we can align it with your core values.\n' +
    '   - The Big Why: Explore the transformation your clients seek in terms of wealth and why it is vital to them.\n' +
    '\n' +
    '2. Target Audience: Business\n' +
    '   - Develop the Persona: Look beyond numbers and delve into who your target audience really is. Understand their dreams, values, and fears that fuel their b
usiness aspirations.\n' +
    '   - Their World: Analyze how their environment shapes their needs, desires, and struggles in the business world.\n' +
    '\n' +
    '3. Pain Point: Scaling and struggling to find\n' +
    '   - Identify the Real Pain: Look beneath the surface to identify the root cause of their struggle, and understand how it feels for them.\n' +
    '   - Emotional Connection: Dive deeper into the emotions behind their pain to create a stronger understanding.\n' +
    '   - Learn from Past Failures: Examine past attempts at scaling to uncover valuable lessons and innovative solutions.\n' +
    '\n' +
    '4. Product/Service: 1:1 coaching sessions for business scaling\n' +
    '   - Tailor for THEM: Craft a solution that specifically addresses their unique needs, offering a precise remedy.\n' +
    '   - Create an Experience: Consider how your offering seamlessly integrates into their daily lives, offering a transformative experience.\n' +
    '   - Build a Movement: Go beyond commerce and cultivate a loyal community, transforming your business into a movement.\n' +
    '\n' +
    "Remember, this journey is about creating something more than just a business endeavor. It's about making a life-changing impact. Be prepared to transcend tra
ditional boundaries and immerse yourself in this transformative expedition."
}
*/
