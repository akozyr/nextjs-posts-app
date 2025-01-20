'use server';

import { createHash } from "node:crypto";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createSession } from "../lib/session";
import { routes } from "../../routes";

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  errorMessage?: string;
} | undefined;

type UserInputData = {
  email: string;
  password: string;
};

export async function login(previousState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;
  if (!isAuthenticated({ email, password })) {
    return { errorMessage: 'Invalid credentials.' };
  }

  await createSession(email);
  redirect(routes.posts);
}

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .trim()
});

const defaultUser = Object.freeze({
  email: 'anton.kozyr.dev@gmail.com',
  password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
});

function isAuthenticated(data: UserInputData) {
  const { email, password } = data;
  return email === defaultUser.email && generateHash(password) === defaultUser.password;
}

function generateHash(input: string) {
  return createHash('sha256')
    .update(input)
    .digest('hex');
}
