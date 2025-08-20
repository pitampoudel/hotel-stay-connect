import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, User } from '@/utils/localStorage';


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

  // Load user from storage on mount
  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simple validation - any email/password combo works for demo
      if (email && password) {
        // Check if user exists, otherwise create one
        let existingUser = storage.getUsers().find(u => u.email === email);
        
        if (!existingUser) {
          const name = email.split('@')[0];
          existingUser = storage.addUser({
            name,
            email,
            profile: {
              firstName: name,
              lastName: '',
              email,
              phone: '',
              address: ''
            }
          });
        }
        
        setUser(existingUser);
        storage.setCurrentUser(existingUser);
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
        const newUser = storage.addUser({
          name,
          email,
          profile: {
            firstName: name.split(' ')[0] || name,
            lastName: name.split(' ').slice(1).join(' ') || '',
            email,
            phone: '',
            address: ''
          }
        });
        
        setUser(newUser);
        storage.setCurrentUser(newUser);
        setIsLoading(false);
      }
    }, 1000);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};