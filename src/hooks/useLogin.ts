import { createClient } from "@/lib/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const useLogin = () => {
  const supabase = createClient();

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [gettingUserInfo, setGettingUserInfo] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse>();

  const getUserInfo = useCallback(() => 
    supabase.auth.getUser()
      .then(user => setUser(user))
      .catch(err => toast.error(typeof err === 'string' ? err : "Error getting user info"))
      .finally(() => setGettingUserInfo(false))
    , [])
  
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

  useEffect(() => {
    getUserInfo();
  }, [])

  return {
    user,
    gettingUserInfo,
    isLoggingIn,
    handleSignIn
  }

}
export default useLogin