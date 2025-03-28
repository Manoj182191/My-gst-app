import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

// Define user roles
export type UserRole = 'admin' | 'sales' | 'accountant' | 'staff';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Define authentication context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  verifyPhone: (code: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  resendPhoneVerification: () => Promise<void>;
  logout: () => void;
  biometricLogin: () => Promise<void>;
  isBiometricAvailable: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  login: async () => {},
  register: async () => {},
  verifyEmail: async () => {},
  verifyPhone: async () => {},
  resendVerificationEmail: async () => {},
  resendPhoneVerification: async () => {},
  logout: () => {},
  biometricLogin: async () => {},
  isBiometricAvailable: false,
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'admin@helloca.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    organization: 'HelloCA Inc.',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isEmailVerified: true,
    isPhoneVerified: true,
    phone: '+919876543210',
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
  const [tempUserData, setTempUserData] = useState<any>(null);

  // Check if biometric authentication is available
  useEffect(() => {
    const checkBiometricAvailability = async () => {
      if (Platform.OS === 'web') {
        setIsBiometricAvailable(false);
        return;
      }
      
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      
      setIsBiometricAvailable(compatible && enrolled);
    };
    
    checkBiometricAvailability();
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        setError('Email already registered');
        return;
      }
      
      setTempUserData(data);
      
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code !== '123456') {
        setError('Invalid verification code');
        return;
      }
      
      if (tempUserData) {
        tempUserData.isEmailVerified = true;
      }
      
    } catch (err) {
      setError('An error occurred during email verification');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhone = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code !== '123456') {
        setError('Invalid verification code');
        return;
      }
      
      if (tempUserData) {
        const newUser = {
          id: Date.now().toString(),
          ...tempUserData,
          isPhoneVerified: true,
          role: 'staff' as UserRole,
          organization: 'HelloCA Inc.',
        };
        
        mockUsers.push(newUser);
        setUser(newUser);
        setTempUserData(null);
      }
      
    } catch (err) {
      setError('An error occurred during phone verification');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulated email resend
    } catch (err) {
      setError('An error occurred while resending verification email');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resendPhoneVerification = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulated SMS resend
    } catch (err) {
      setError('An error occurred while resending verification code');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const biometricLogin = async () => {
    if (Platform.OS === 'web') {
      setError('Biometric authentication is not available on web');
      return;
    }
    
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use password',
      });
      
      if (result.success) {
        const adminUser = mockUsers.find(u => u.role === 'admin');
        if (adminUser) {
          const { password, ...userWithoutPassword } = adminUser;
          setUser(userWithoutPassword);
        }
      } else {
        setError('Biometric authentication failed');
      }
    } catch (err) {
      setError('An error occurred during biometric authentication');
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setTempUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        register,
        verifyEmail,
        verifyPhone,
        resendVerificationEmail,
        resendPhoneVerification,
        logout,
        biometricLogin,
        isBiometricAvailable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};