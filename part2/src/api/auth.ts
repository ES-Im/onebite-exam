import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  const { data, error } = response;
  if (error) throw error;
  return data;
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const { data, error } = response;
  if (error) throw error;
  return data;
}

export async function signInWithOAuth(provider: Provider) {
  const response = await supabase.auth.signInWithOAuth({
    provider: provider,
  });

  const { data, error } = response;
  if (error) throw error;
  return data;
}

export async function requestPasswordResetEmail(email: string) {
  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  const { error, data } = response;
  if (error) throw error;
  return data;
}

export async function updatePassword(password: string) {
  const response = await supabase.auth.updateUser({
    password,
  });

  const { error, data } = response;
  if (error) throw error;
  return data;
}
