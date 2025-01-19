'use server';

import { createHash } from "node:crypto";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";

const defaultUser = Object.freeze({
  email: 'anton.kozyr.dev@gmail.com',
  password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
});

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!(email === defaultUser.email && generateHash(password) === defaultUser.password)) {
    throw Error('forbidden.');
  }

  await createSession(email);

  redirect('/');
}

function generateHash(input: string) {
  return createHash('sha256')
    .update(input)
    .digest('hex');
}
