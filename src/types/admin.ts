export enum AdminRole {
  SUPER_ADMIN = 'super_admin',    // Acceso total al sistema
  SYSTEM_ADMIN = 'system_admin',  // Gestión de sistema y configuraciones
  ORG_ADMIN = 'org_admin',        // Administrador de organización
  AI_ADMIN = 'ai_admin'           // Gestión de IA y modelos
}

export interface AdminPermissions {
  users: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    manage: boolean;
  };
  organizations: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    manage: boolean;
  };
  ai: {
    configure: boolean;
    monitor: boolean;
    manage: boolean;
    assign: boolean;
  };
  billing: {
    view: boolean;
    manage: boolean;
    configure: boolean;
  };
  system: {
    configure: boolean;
    monitor: boolean;
    manage: boolean;
  };
}

export interface AdminUser {
  uid: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermissions;
  lastAccess?: Date;
  status: 'active' | 'suspended' | 'inactive';
}
