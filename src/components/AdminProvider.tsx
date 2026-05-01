import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setupAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        setIsAdmin(adminDoc.exists());
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  const setupAdmin = async () => {
    if (!user || user.email !== 'esorezekiel100@gmail.com') return;
    try {
      await setDoc(doc(db, 'admins', user.uid), {
        email: user.email,
        setupAt: new Date().toISOString()
      });
      setIsAdmin(true);
    } catch (error) {
      console.error('Failed to setup admin:', error);
    }
  };

  return (
    <AdminContext.Provider value={{ user, isAdmin, loading, setupAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
