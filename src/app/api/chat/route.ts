import { smartStreamText } from '@/lib/ai-provider';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, plantContext, language = "English" } = await req.json();

  const systemPrompt = `You are FloraBase AI, an expert botanical assistant. You help users with:
- Plant care and maintenance advice
- Disease identification and treatment
- Fertilizer recommendations
- Growing conditions and seasonal guidance
- Indoor/outdoor gardening tips

Be friendly, concise, and actionable. Use emoji occasionally for plant-related topics.
Format responses with markdown for readability.

Respond in the user's preferred language: ${language}. 
If the language is an Indian regional language (Hindi, Kannada, Telugu, Tamil, Malayalam, Gujarati), use local botanical terms and common cultural context when relevant.
Always respond in the script and language requested (${language}).

${plantContext ? `The user is currently viewing: ${plantContext}. Use this context when relevant.` : ''}`;

  try {
    const result = await smartStreamText({
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("[Chat] All AI providers failed:", error.message);
    return new Response(
      JSON.stringify({ 
        error: "Failed to connect to AI service", 
        details: error.message,
        hint: "Check your API keys in .env — set GROQ_API_KEY for a free fallback, or verify GOOGLE_GENERATIVE_AI_API_KEY."
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
