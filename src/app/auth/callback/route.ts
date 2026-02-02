import { createClient } from '@/lib/supabase/server'
import { NextResponse } from "next/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (!profile?.username) {
    const base =
      slugify(user.user_metadata?.full_name) ||
      slugify(user.email?.split("@")[0] ?? "user");

    let username: string = base;
    let counter: number = 1;

    while (true) {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      if (!existing) break;

      counter++;
      username = `${base}-${counter}`;
    }

    await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id);
  }

  return NextResponse.redirect(`${origin}${next}`)
}