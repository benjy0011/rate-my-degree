'use client'

import { createClient } from "@/lib/supabase/client"

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
    <button
      onClick={handleSignIn}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-70s0 font-semibold"
    >
      Sign in with Google
    </button>
  )
}