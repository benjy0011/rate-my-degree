'use client'

import { createClient } from "@/lib/supabase/client"
import ShadowWrapper from "./ShadowWrapper";
import { useState } from "react";

export default function SignInButton() {
  const supabase = createClient();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsLoggingIn(true);

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

    setIsLoggingIn(false);
  }

  return (
    <ShadowWrapper
      onClick={handleSignIn}
      className="sign-in-text"
      loading={isLoggingIn}
    >
      Get Started
    </ShadowWrapper>
  )
}