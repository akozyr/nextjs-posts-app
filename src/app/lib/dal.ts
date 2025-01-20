import 'server-only';

import { cache } from 'react';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { decrypt } from './session';
import { routes } from '../../routes';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.email) {
    redirect(routes.login);
  }

  return { isAuth: true, email: session.email };
})
