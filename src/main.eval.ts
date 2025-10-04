import { evalite } from 'evalite';
import { generateImageAltText, extractDataFromPdfFile } from './main.js';
import { trainingSheetPrompt } from './prompt.js';
import { trainingSheetSchema } from './schema.js';
import path from 'node:path';

evalite('Duck Image Description', {
  data: async () => {
    return [
      {
        input: 'Describe the duck image',
        expected: 'A duck swims on a calm lake with mountains background.',
      },
    ];
  },
  task: async () => {
    const image =
      'https://images.unsplash.com/photo-1755376134895-bf7a55893e66?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const response = await generateImageAltText(image);
    return response;
  },
  scorers: [
    {
      name: 'Contains duck and swimming',
      description: "Checks if the output contains the words 'duck' and 'swim'.",
      scorer: ({ output }) => {
        return ['duck', 'swim'].some((word) => output.includes(word)) ? 1 : 0;
      },
    },
  ],
});

evalite('Training Sheet Data Extraction', {
  data: async () => {
    return [
      {
        input: 'Extract data from training sheet',
        expected: 'valid_extraction',
      },
    ];
  },
  task: async () => {
    const trainingSheet = path.join(import.meta.dirname, '../data/training_sheet.pdf');
    const response = await extractDataFromPdfFile(trainingSheet, trainingSheetPrompt, trainingSheetSchema);
    return response;
  },
  scorers: [
    {
      name: 'Valid Structure',
      description: 'Checks if extracted data has reasonable structure and non-empty fields',
      scorer: ({ output }) => {
        if (!output || typeof output !== 'object') return 0;

        let score = 0;
        let total = 6;

        // Check name exists and is non-empty
        if (output.name && output.name.trim().length > 0) score++;

        // Check trainer exists and is non-empty
        if (output.trainer && output.trainer.trim().length > 0) score++;

        // Check goal exists and is non-empty
        if (output.goal && output.goal.trim().length > 0) score++;

        // Check weeks exists and is non-empty
        if (output.weeks && output.weeks.trim().length > 0) score++;

        // Check workouts array exists and has items
        if (output.workouts && Array.isArray(output.workouts) && output.workouts.length > 0) {
          score++;

          // Check that workouts have proper structure
          const validWorkouts = output.workouts.filter((w: any) =>
            w.exercise && w.sets && w.reps && w.weight
          );

          if (validWorkouts.length === output.workouts.length) {
            score++; // All workouts have complete structure
          } else if (validWorkouts.length > 0) {
            score += validWorkouts.length / output.workouts.length; // Partial credit
          }
        }

        return score / total;
      },
    },
  ],
});
