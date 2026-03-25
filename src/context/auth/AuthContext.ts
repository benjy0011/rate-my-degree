'use client'

import { createContext } from "react";

export interface CurrentUser {
  id: string | undefined;
  username: string;
}

export interface AuthContextType {
  user: CurrentUser | null;
  login: (() => Promise<void>) | (() => void);
  logout: (() => Promise<void>) | (() => void);
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);