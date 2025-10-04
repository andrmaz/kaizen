import { generateObject, generateText } from 'ai';
import { model } from './model.js';
import { altTextImagePrompt } from './prompt.js';
import { readFileSync } from 'node:fs';
import type z from 'zod';

import 'dotenv/config';

export const generateImageAltText = async (url: string) => {
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

export const extractDataFromPdfFile = async (
  path: string,
  system: string,
  schema: z.ZodSchema,
) => {
  const file = readFileSync(path);
  const response = await generateObject({
    model,
    system,
    schema,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: file,
            mediaType: 'application/pdf',
          },
        ],
      },
    ],
  });
  return response.object;
};
