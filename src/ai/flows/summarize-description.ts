
'use server';

/**
 * @fileOverview AI flow to summarize property descriptions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeInputSchema = z.object({
  description: z.string().describe('The full property description to summarize.'),
});

const SummarizeOutputSchema = z.object({
  summary: z.string().describe('A concise, professional summary of the property.'),
});

export async function summarizeDescription(input: z.infer<typeof SummarizeInputSchema>) {
  return summarizeFlow(input);
}

const summarizePrompt = ai.definePrompt({
  name: 'summarizePrompt',
  input: { schema: SummarizeInputSchema },
  output: { schema: SummarizeOutputSchema },
  prompt: `You are a professional real estate copywriter. 
  Summarize the following property description into a concise, engaging paragraph (2-3 sentences max) that highlights the most attractive features.
  
  Description: {{{description}}}
  `,
});

const summarizeFlow = ai.defineFlow(
  {
    name: 'summarizeDescriptionFlow',
    inputSchema: SummarizeInputSchema,
    outputSchema: SummarizeOutputSchema,
  },
  async (input) => {
    const { output } = await summarizePrompt(input);
    return output!;
  }
);
