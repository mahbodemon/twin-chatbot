const openaiService = require('../services/openaiService');

exports.sendMessage = async (req, res) => {
  try {
    const { messages } = req.body;
    const reply = await openaiService.getChatCompletion(messages);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
};
