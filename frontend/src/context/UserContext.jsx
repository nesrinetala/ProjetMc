import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    nom: "Lana",
    prenom: "Glow",
    email: "lana@example.com",
    telephone: "+33 6 12 34 56 78",
    avatar: "https://i.pravatar.cc/150?img=47",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
