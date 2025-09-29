import { anthropic } from '@ai-sdk/anthropic';
import type { LanguageModel } from 'ai';

const model: LanguageModel = anthropic('claude-3-5-haiku-20241022');

export { model };
