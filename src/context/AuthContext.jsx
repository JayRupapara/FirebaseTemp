import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up function
  const signup = async (email, password) => {
    try {
      console.log("Starting auth signup...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Auth signup successful:", userCredential);
      return userCredential;
    } catch (error) {
      console.error("Auth signup error:", error);
      throw error;
    }
  };

  // Sign In function
  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    }
  };

  // Sign Out function
  const signout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully!');
    } catch (error) {
      console.error("Signout error:", error);
      toast.error('Failed to sign out');
      throw error;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signup,
    signin,
    signout
  };

  // Only render children when auth is initialized
  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 