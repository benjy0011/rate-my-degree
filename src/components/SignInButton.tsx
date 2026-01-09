'use client'

import { createClient } from "@/lib/supabase/client"
import ShadowWrapper from "./ShadowWrapper";

export default function SignInButton() {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      console.error('Error signing in: ', error.message);
      alert('Error signing in: ' + error.message);
    }
  }

  return (
    <ShadowWrapper
      onClick={handleSignIn}
      className="sign-in-text"
    >
      Get Started
    </ShadowWrapper>
  )
}