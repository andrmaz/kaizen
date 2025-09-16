import { evalite } from 'evalite';
import { main } from './utils.js';

evalite('My Eval', {
  // A function that returns an array of test data
  data: async () => {
    return [{ input: 'What is the capital of France?', expected: 'Paris' }];
  },
  // The task to perform
  task: async () => {
    const response = await main();
    return response ?? 'No response';
  },
  // The scoring methods for the eval
  scorers: [
    {
      name: 'Contains Paris',
      description: "Checks if the output contains the word 'Paris'.",
      scorer: ({ output }) => {
        return output.includes('Paris') ? 1 : 0;
      },
    },
  ],
});
