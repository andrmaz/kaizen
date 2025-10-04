import { z } from 'zod';

const workoutSchema = z.object({
    exercise: z.string().describe('Name of the exercise'),
    sets: z.number().describe('Number of sets'),
    reps: z.string().describe('Number of repetitions'),
    weight: z.string().describe('Weight to be used'),
});

export const trainingSheetSchema = z.object({
    name: z.string().describe('Name of the person training'),
    trainer: z.string().describe('Name of the trainer'),
    goal: z.string().describe('Goal of the training session'),
    week: z.string().describe('Week of the training session'),
    workouts: z.array(workoutSchema).describe('List of workouts for the week'),
}).describe('Schema for extracting training sheet information');