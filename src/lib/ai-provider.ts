/**
 * AI Provider Abstraction
 * 
 * Smart provider selection: races both Google Gemini and Groq simultaneously
 * and returns the first successful response. If only one provider is configured,
 * it uses that one directly.
 * 
 * Configuration via .env:
 *   GOOGLE_MODEL = "gemini-1.5-flash" (or any available model)
 *   GROQ_MODEL   = "llama-3.3-70b-versatile"
 *   GOOGLE_GENERATIVE_AI_API_KEY = "..."
 *   GROQ_API_KEY = "..."
 */

import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { generateText, streamText, type LanguageModelV1 } from 'ai';

/**
 * Returns all available AI models based on configured API keys.
 */
function getAvailableModels(): { name: string; model: LanguageModelV1 }[] {
  const models: { name: string; model: LanguageModelV1 }[] = [];

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const modelName = process.env.GOOGLE_MODEL || 'gemini-1.5-flash';
    models.push({
      name: `google/${modelName}`,
      model: google(modelName) as unknown as LanguageModelV1,
    });
  }

  if (process.env.GROQ_API_KEY) {
    const modelName = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    models.push({
      name: `groq/${modelName}`,
      model: groq(modelName) as unknown as LanguageModelV1,
    });
  }

  return models;
}

/**
 * Returns the primary AI model. Prefers Google if available, else Groq.
 */
export function getAIModel(): LanguageModelV1 {
  const models = getAvailableModels();
  if (models.length === 0) {
    throw new Error('No AI provider configured. Set GOOGLE_GENERATIVE_AI_API_KEY or GROQ_API_KEY in .env');
  }
  return models[0].model;
}

/**
 * Returns the fallback AI model (the second available provider).
 */
export function getFallbackModel(): LanguageModelV1 | null {
  const models = getAvailableModels();
  return models.length > 1 ? models[1].model : null;
}

/**
 * Returns the provider name for logging purposes.
 */
export function getProviderName(): string {
  const models = getAvailableModels();
  return models.length > 0 ? models[0].name : 'none';
}

/**
 * Smart AI text generation — races all available providers.
 * Returns the fastest successful response.
 */
export async function smartGenerateText(options: {
  system?: string;
  prompt: string;
}): Promise<{ text: string; provider: string }> {
  const models = getAvailableModels();

  if (models.length === 0) {
    throw new Error('No AI provider configured');
  }

  // If only one model, use it directly
  if (models.length === 1) {
    const { text } = await generateText({
      model: models[0].model,
      system: options.system,
      prompt: options.prompt,
    });
    return { text, provider: models[0].name };
  }

  // Race all providers — first successful response wins
  const racePromises = models.map(async ({ name, model }) => {
    try {
      const { text } = await generateText({
        model,
        system: options.system,
        prompt: options.prompt,
      });
      return { text, provider: name };
    } catch (error) {
      console.warn(`[AI] ${name} failed:`, error);
      throw error; // Re-throw so Promise.any skips it
    }
  });

  try {
    return await Promise.any(racePromises);
  } catch (aggregateError) {
    throw new Error('All AI providers failed. Check your API keys.');
  }
}

/**
 * Smart AI streaming — tries providers in order with fallback.
 * (Streaming can't be raced since we need a single stream)
 */
export async function smartStreamText(options: {
  system?: string;
  messages: any[];
}) {
  const models = getAvailableModels();

  if (models.length === 0) {
    throw new Error('No AI provider configured');
  }

  // Try each model in order
  for (let i = 0; i < models.length; i++) {
    try {
      console.log(`[AI Stream] Trying ${models[i].name}...`);
      const result = await streamText({
        model: models[i].model,
        system: options.system,
        messages: options.messages,
      });
      console.log(`[AI Stream] Using ${models[i].name}`);
      return result;
    } catch (error) {
      console.warn(`[AI Stream] ${models[i].name} failed:`, error);
      if (i === models.length - 1) {
        throw error; // Last provider also failed
      }
    }
  }

  throw new Error('All AI providers failed');
}
