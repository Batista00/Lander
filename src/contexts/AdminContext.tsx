import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { AdminRole, AdminPermissions, AdminUser } from '@/types/admin';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AdminContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  permissions: AdminPermissions | null;
  loading: boolean;
  error: string | null;
  checkPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists()) {
          setAdminUser(adminDoc.data() as AdminUser);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, [user]);

  const checkPermission = (permission: string): boolean => {
    if (!adminUser) return false;
    
    const [category, action] = permission.split('.');
    return adminUser.permissions?.[category]?.[action] || false;
  };

  const value = {
    isAdmin: !!adminUser,
    adminUser,
    permissions: adminUser?.permissions || null,
    loading,
    error,
    checkPermission
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
