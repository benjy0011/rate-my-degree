'use client'

import { createClient } from "@/lib/supabase/client"
import ShadowWrapper from "../ShadowWrapper";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SignInButton({
  text = "Get Started",
  className = "",
  wrapperClassName = "",
} : { text?: string, className?: string, wrapperClassName?: string }) {

  const supabase = createClient();
  const [ currentUserSignedIn, setCurrentUserSignedIn ] = useState<boolean>(false);

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleSignIn = async () => {
    if (currentUserSignedIn) {
      toast("You have signed in.")
      return;
    }

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

  useEffect(() => {
    const getUser = (async () => {
      const { user } = (await (await supabase).auth.getUser()).data;

      setCurrentUserSignedIn(!!user);
    });

    getUser();
  });

  return (
    <ShadowWrapper
      onClick={handleSignIn}
      className={cn("sign-in-text", className)}
      wrapperClassName={cn(wrapperClassName)}
      loading={isLoggingIn}
    >
      {text}
    </ShadowWrapper>
  )
}