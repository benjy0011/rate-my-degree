import { ReactNode, useEffect, useState } from "react";
import { AuthContext, CurrentUser } from "./AuthContext";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const supabase = createClient();
  
  useEffect(() => {
    supabase.auth.getUser()
      .then((data) => {
        const user = data.data.user;

        setCurrentUser(prev => ({
          id: user?.id,
          username: prev?.username ?? "",
        }))
        
      })
      .catch(error => {
        toast.error("Authentication error")
      });
  }, [])

  useEffect(() => {
    if (!currentUser?.id) return;

    supabase
      .from("profiles")
      .select("username")
      .eq("id", currentUser.id)
      .single()
      .then(data => {
        setCurrentUser(prev => ({
          id: prev?.id ?? undefined,
          username: data.data?.username ?? ""
        }))
      })
  }, [currentUser?.id])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    })
  };

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}