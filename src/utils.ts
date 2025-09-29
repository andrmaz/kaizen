import { generateText } from 'ai';
import { model } from './model.js';
import { altTextImagePrompt } from './prompt.js';

export const describeImage = async (url: string) => {
  const response = await generateText({
    model,
    system: altTextImagePrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            image: new URL(url),
          },
        ],
      },
    ],
  });
  return response.text;
};
