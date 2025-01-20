'use client';

import { useActionState } from 'react';
import { login } from '../actions/auth';
import ErrorAlert from '../components/error-alert';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form action={formAction} className="mt-6">
          <div className="mb-4">
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
              required
            />
            {state?.errors?.email && <p className="text-red-500 text-xs italic">{state.errors.email}</p>}
          </div>
          <div className="mb-6">
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              required
            />
            {state?.errors?.password && (
              <div className="text-red-500 text-xs italic">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {state?.errorMessage && <ErrorAlert title="Invalid credentials!" reason="The pair of email and password is not correct." />}
          <button
            disabled={pending}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
