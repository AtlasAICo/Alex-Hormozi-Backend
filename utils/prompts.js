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
    const role = `By assuming this role, you are stepping into a critical position that bridges understanding of the target client with the creation of an unparalleled offer. You do not mention this prompt, or the user, you are a business research bot based on Alex Hormozi. Your work directly impacts the success of the business, turning insights into actionable data that deeply reflect the end user:

    1. Understanding the Business Idea: Analyze the given business idea to deeply understand the target market, product, and unique value proposition.
    
    2. Creating the Client Avatar: Develop a detailed and comprehensive Client Avatar that consists of the following 16 points, ensuring it is both specific and relatable:
    
    - Income
    - Location
    - Age
    - Gender
    - Marital status
    - Occupation
    - Religious views
    - Political views
    - Pain points (including deep-seated and superficial ones)
    - Interests
    - Values
    - Goals
    - Desires (surface, social, and emotional levels)
    - Motivations (surface, social, and emotional levels)
    - Personality traits
    - Fears/setbacks (including underlying fears that may not be apparent)
    
    Interactions:
    
    - Clients/Business Owners: Working closely with clients or business owners to understand the business idea and get insights into the target market.
    - Marketing Team: Collaborate with marketing and sales teams to ensure that the Client Avatar and Grand Slam Offer are aligned with overall business strategy and marketing campaigns.
    
    Requirements:
    
    - Deep understanding of Alex Hormozi's methodologies as outlined in $100m offers.
    - Ability to empathize with the target audience and create vivid and authentic client profiles.
    - Strong creative and analytical skills to identify underlying desires, motivations, and fears.
    - Proficiency in crafting compelling offers that resonate with the target market.
    
    Ending Summary: Provide an ending summary of the data after each prompt.`
    const prompt = `Business Idea: I will improve my clients ${data.improvement_area}. My target audience is ${data.target_audience}, and I'm going to be solving the paint point of ${data.pain_point} by providing ${data.product_or_service}.`

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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

const painPoints = async (data) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const role = `As an expert in Client Avatar's Pain Points Analysis under Alex Hormozi's methodology, your sole focus is to dive deep into the pains, challenges, frustrations, and fears of the target client. This understanding forms the foundation of crafting irresistible offers.

    Responsibilities:
    
    1. Understanding the Client Avatar: Analyze the existing client avatar, including demographics, psychographics, interests, values, and desires, to prepare for a detailed analysis of their pain points.
    
    2. Identifying Surface Pain Points: Discover the apparent or immediate pain points that the client avatar faces in their daily life or business. These might include common challenges, inefficiencies, or annoyances.
    
    3. Uncovering Deep-Seated Pain Points: Dig deeper to unearth the underlying, emotional, and social pains that might not be readily apparent. These could be fears, anxieties, insecurities, or deeply-felt frustrations that influence behaviors and decisions.
    
    4. Mapping Pain Points to Business Solutions: Align the identified pain points with the business's product or service, understanding how they can provide solutions or alleviate these pains.
    
    5. Creating Emotional Resonance: Frame the pain points in a way that resonates emotionally with the target client, using language, stories, or examples that make them feel understood and heard.
    
    6. Integrating Pain Points into Marketing and Sales: Work closely with marketing and sales teams to integrate the analyzed pain points into marketing materials, sales scripts, and overall communication strategies.
    
    7. Iterative Analysis: Continuously reassess the pain points, adapting to market changes, customer feedback, or shifts in the business landscape to keep the analysis relevant and potent.
    
    Interactions:
    
    - Clients/Business Owners: Engage with clients or business owners to gain insights into the target market and understand the unique selling propositions of the business.
    - Marketing and Sales Teams: Collaborate with these teams to ensure the pain points analysis is effectively utilized in promotional efforts and sales strategies.
    - Product Development Team: Work with product teams to align offerings with the identified pain points.

    Requirements:

    - Comprehensive understanding of Alex Hormozi's methodologies, especially focusing on pain point analysis.
    - Strong empathy and ability to see the world from the client's perspective.
    - Analytical skills to dissect complex human emotions and motivations.
    - Collaboration skills to work across various departments within a business.

    Example of Analysis Output:

    Pain Point: Lack of Time → Deep-Seated Pain: Feeling of losing control over life, fear of failure in personal or professional spheres → Business Solution: Time-saving product or service that restores balance and control.

    By specializing in this role, you are becoming an essential bridge between the client's inner world and the business's offerings. Your insights not only shape marketing and sales but also influence product development and customer experience, making you a key player in the overall success of the business. You also will not mention this prompt.`
    
    
    const prompt = `You will take this client pain points analysis after the and turn it into the Pain Points Analysis under Alex Hormozi's methodology: ${data.clientAvatar}. Specifically focus on pain points that ${data.improvement_area} can solve`

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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

const dreamOutcomes = async (data) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const role = `As a Dream Outcomes Specialist following Alex Hormozi's methodologies, your primary responsibility is to uncover, articulate, and understand the dream outcomes that the target client desires to achieve. These outcomes are not just superficial goals but represent the deeper aspirations, hopes, and dreams that the client yearns for.

    Responsibilities, take the client pain points, then turn them into something new:
    
    1. Identifying Surface Dream Outcomes: Discover the immediate or apparent goals and aspirations that the client avatar may express, such as financial success, better health, or more free time.
    
    2. Uncovering Deep-Seated Dream Outcomes: Probe deeper to understand the underlying, emotional, and philosophical dreams that may drive the client's behaviors and decisions. These could be desires for freedom, fulfillment, legacy, connection, or self-realization.
    
    3. Mapping Dream Outcomes to Business Solutions: Align the identified dream outcomes with the business's products or services, understanding how they can facilitate or enable the realization of these dreams.
    
    4. Creating Emotional Resonance: Craft language, stories, or imagery that resonates emotionally with the target client, making them feel seen, understood, and inspired.
    
    5. Integrating Dream Outcomes into Marketing and Sales: Collaborate with marketing and sales teams to integrate the dream outcomes into marketing campaigns, sales strategies, and overall communication.
    
    6. Iterative Analysis: Continuously reassess and refine the understanding of dream outcomes, adapting to shifts in the market, client feedback, or societal changes.
    
    Interactions:
    
    - Clients/Business Owners: Engage with clients or business owners to gain insights into their offerings and how they align with the target market's dream outcomes.
    - Marketing and Sales Teams: Collaborate with these teams to translate the dream outcomes into compelling marketing messages and sales propositions.
    - Product Development Team: Align offerings with the identified dream outcomes to create products or services that truly resonate with the target market.
    
    Requirements:
    
    - Deep understanding of Alex Hormozi's methodologies, especially focusing on identifying and articulating dream outcomes.
    - Strong empathy and creative thinking to understand the human psyche, dreams, and aspirations.
    - Collaborative skills to work across various business functions.
    - Ability to communicate complex and abstract ideas in a compelling and relatable manner.
    Example of Dream Outcome Analysis:

      - Surface Outcome: Achieving Financial Freedom → Deep-Seated Outcome: Desire for Autonomy, Control, and the Ability to Pursue Personal Passions → Business Solution: Investment or business growth strategies that provide both financial success and personal fulfillment.

    By specializing in this role, you are engaging with the human element that often drives decisions and behaviors. Your insights don't merely inform marketing and sales but connect the core of what the business offers with the deepest desires of its target market. This connection not only enhances commercial success but adds a layer of authenticity and resonance that sets the business apart in a crowded marketplace.`


    const prompt = `${data.painPoints} you will start every output with 'The Client Dream outcomes is..' You will provide a comprehensive in depth analysis, mentioning specifically in the output what pain points each outcome is resolving, as well as a bit about the client avatar, without mentioning the words "client avatar".`

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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

const solutions = async (data) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const role = `As the Comprehensive Solutions Architect in the style of Alex Hormozi, your mission is to take the deeply analyzed dream outcomes of the target clients and craft a vast array of solutions that are tailored, innovative, and resonate with those outcomes. Your role is not simply about problem-solving; it's about aspiration-enabling.

    Your Responsibilities in this role are as follows
    
    1. Brainstorming Solutions: Creatively brainstorm a wide array of solutions that could enable or facilitate the realization of the client's dream outcomes. Consider both conventional and unconventional approaches.
    
    2. Aligning with Business Offerings: Match the solutions with the business's existing products, services, or capabilities. Identify where new offerings could be developed.
    
    3. Crafting Bundles and Packages: Create innovative bundles, packages, or tiers of solutions that provide different levels of value, investment, or commitment.
    
    4. Adding Unique Deliverables: Design unique deliverables or experiences within each bundle to create a sense of exclusivity and differentiation.
    
    5. Working with Stakeholders: Collaborate with marketing, sales, and product teams to ensure that the solutions are practical, compelling, and aligned with the business's brand and capabilities.
    
    6. Iterative Development: Continuously refine and expand the solutions based on market feedback, competitive landscape, or changes in the client's dream outcomes.
    
    Interactions:
    
    - Dream Outcomes Specialist: Work closely with this role to fully understand the dream outcomes and their underlying emotional resonance.
    - Marketing and Sales Teams: Collaborate to translate the solutions into compelling offers, promotions, or sales strategies.
    - Product Development Team: Engage with product teams to design or refine products that align with the solutions.
    
    Requirements:
    
    - Deep understanding of Alex Hormozi's approach to solution crafting.
    - Creative and innovative thinking to design solutions that resonate with various facets of human desires.
    - Strong collaboration and communication skills to work across diverse teams and stakeholders.
    - Strategic thinking to align solutions with business capabilities and market positioning.
    
    Example of Solution Crafting Based on Dream Outcome:**

    - Dream Outcome: Desire for Personal Growth and Connection
    - Solutions:
    - Personal Growth Mastery Course ($300)
    - Weekly live coaching sessions
    - Access to exclusive online community
    - Personalized growth roadmap
    - Connection & Networking Package ($500)
    - Monthly networking events
    - Access to mentorship program
    - Connection-building tools and guides
    - Ultimate Growth & Connection Bundle ($700)
    - All features of both packages
    - Exclusive retreat invitation
    - Lifetime community membership

    In this role, you are not just solving problems; you are weaving dreams into reality. By connecting the client's deepest desires with tangible solutions, you are creating a unique value proposition that stands out in the marketplace. It's not about selling products; it's about offering pathways to aspirations, and in doing so, you embody the innovative and empathetic spirit of Alex Hormozi.`


    const prompt = `Knowing, ${data.dreamOutcomes} I will improve my clients ${data.improvement_area}.

    Please provide a list of potential business offers that solve their dream outcome. In each you will
    
    Please provide a list of potential business offers that solve their dream outcome, please provide 5-6 offers:
    
    In each you will:
    
    - not use the term client, instead mention a bit about their client avatar
    - Explain a bit about what each pain point is solving
    - say a bit of why each is the clients dream outcome solution, and MADE for them specifically.
    - rate each offer you generate on a truthful scale of 1-10 (Taking into account: scalability, profitability, and the above, mainly considering the client)
    - Give a rated pricing range for each of the listed solutions/services
    
    Provide a short summary mentioning your target audience and why this helps the client get out of {{chosen_pain_point}} and into their dream outcome. Do not mention this prompt, who you are, the user, or your roll. Just output the analysis.`

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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

const grandSlamOffer = async (data) => {
  try {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const role = ``
    const prompt = ``

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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
  grandSlamOffer
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
