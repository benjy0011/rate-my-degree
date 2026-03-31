'use client'

import { LOCAL_STORAGE_KEY } from "@/constants";
import { useEffect } from "react";

interface SaveUserDataProps {
  username?: string;
}

const SaveUserData = ({
  username
} : SaveUserDataProps) => {
  useEffect(() => {
    if (username) {
      localStorage.setItem(LOCAL_STORAGE_KEY.ryd_username, username);
    }
  }, [username])

  return null;
}
export default SaveUserData