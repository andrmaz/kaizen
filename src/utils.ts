import OpenAI from 'openai';
import 'dotenv/config';

const token = process.env['OPENAI_API_KEY'];
const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-5-mini';

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is the capital of France?' },
    ],
    model: model,
  });

  return response.choices[0]?.message.content;
}

main().catch((err) => {
  console.error('The sample encountered an error:', err);
});
