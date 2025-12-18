'use server';

import { z } from 'zod';
import { suggestFaqEntry } from '@/ai/flows/dynamic-faq-suggestion';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  type: 'success' | 'error' | 'idle';
};

// This action is no longer used by the form but is kept for potential future use with the AI FAQ suggestion.
export async function handleContactSubmit(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      type: 'error',
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    // In a real application, you would send an email here.
    // For example, using a service like Resend or Nodemailer.
    console.log('New Contact Form Submission:');
    console.log({ name, email, message });

    // Trigger the AI flow to get an FAQ suggestion based on the user's message.
    const suggestion = await suggestFaqEntry({ message });
    console.log('AI-Generated FAQ Suggestion:', suggestion);

    return {
      message:
        "Thank you for your message! We'll get back to you soon. Your feedback helps us improve.",
      type: 'success',
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      type: 'error',
    };
  }
}
