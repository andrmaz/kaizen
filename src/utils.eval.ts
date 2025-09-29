import { evalite } from 'evalite';
import { describeImage } from './main.js';

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
    const response = await describeImage(image);
    return response;
  },
  scorers: [
    {
      name: 'Contains duck and swimming',
      description: "Checks if the output contains the words 'duck' and 'swim'.",
      scorer: ({ output }) => {
        return ['duck', 'swim'].every((word) => output.includes(word)) ? 1 : 0;
      },
    },
  ],
});
