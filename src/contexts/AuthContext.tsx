import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, password: string): boolean => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simple validation - any email/password combo works for demo
      if (email && password) {
        setUser({
          id: '1',
          name: email.split('@')[0],
          email: email
        });
        setIsLoading(false);
      }
    }, 1000);
    
    return true;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (name && email && password) {
        setUser({
          id: '1',
          name: name,
          email: email
        });
        setIsLoading(false);
      }
    }, 1000);
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};