const openaiService = require('../src/services/openaiService');
const OpenAI = require('openai');

jest.mock('openai', () => {
  const mockChatCompletionsCreate = jest.fn();
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: mockChatCompletionsCreate,
        },
      },
    };
  });
});

describe('openaiService', () => {
  let openai;
  beforeEach(() => {
    openai = new OpenAI();
  });

  it('should return a completion', async () => {
    const mockResponse = { choices: [{ message: { content: 'Hello' } }] };
    openai.chat.completions.create.mockResolvedValue(mockResponse);

    const messages = [{ role: 'user', content: 'Hi' }];
    const result = await openaiService.getChatCompletion(messages);

    expect(result).toBe('Hello');
    expect(openai.chat.completions.create).toHaveBeenCalledWith({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });
  });
});
