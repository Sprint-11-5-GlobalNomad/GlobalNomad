"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface ProfileContextType {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(
    "/image/profile_default.svg"
  );

  return (
    <ProfileContext.Provider value={{ profileImageUrl, setProfileImageUrl }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
