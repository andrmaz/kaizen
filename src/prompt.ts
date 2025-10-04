export const altTextImagePrompt = `
    You will receive an image description task. 
    Your task is to generate an alt text for the given image. 
    Be concise, clear, and specific in your description.
    Do not pass 160 characters.
    Use simple language that is easy to understand.`;

export const trainingSheetPrompt = `
    You will receive a text containing information about a training session. 
    Your task is to extract the following information and return it in JSON format:
        - name
        - trainer
        - goal
        - week
        - workouts (an array of objects with exercise, sets, reps, weight)
    If any information is missing, return an empty string for that field.
    Ensure the JSON is properly formatted and valid.`;
