const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatCompletion(messages) {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-5',
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw error;
  }
}

module.exports = { getChatCompletion };
