'use server';

/**
 * @fileOverview Dynamic FAQ suggestion flow that analyzes contact form submissions and suggests new FAQ entries.
 *
 * - suggestFaqEntry - A function that takes a contact form message and suggests a FAQ entry.
 * - SuggestFaqEntryInput - The input type for the suggestFaqEntry function.
 * - SuggestFaqEntryOutput - The return type for the suggestFaqEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFaqEntryInputSchema = z.object({
  message: z.string().describe('The message from the contact form submission.'),
});
export type SuggestFaqEntryInput = z.infer<typeof SuggestFaqEntryInputSchema>;

const SuggestFaqEntryOutputSchema = z.object({
  question: z.string().describe('The suggested FAQ question.'),
  answer: z.string().describe('The suggested FAQ answer.'),
});
export type SuggestFaqEntryOutput = z.infer<typeof SuggestFaqEntryOutputSchema>;

export async function suggestFaqEntry(input: SuggestFaqEntryInput): Promise<SuggestFaqEntryOutput> {
  return suggestFaqEntryFlow(input);
}

const faqSuggestionPrompt = ai.definePrompt({
  name: 'faqSuggestionPrompt',
  input: {schema: SuggestFaqEntryInputSchema},
  output: {schema: SuggestFaqEntryOutputSchema},
  prompt: `You are an expert at creating helpful FAQ entries.

  Based on the following contact form submission, suggest a question and answer pair that could be added to the FAQ section of the website.

  Contact form submission: {{{message}}}

  Format your response as a JSON object with "question" and "answer" fields.
`,
});

const suggestFaqEntryFlow = ai.defineFlow(
  {
    name: 'suggestFaqEntryFlow',
    inputSchema: SuggestFaqEntryInputSchema,
    outputSchema: SuggestFaqEntryOutputSchema,
  },
  async input => {
    const {output} = await faqSuggestionPrompt(input);
    return output!;
  }
);
