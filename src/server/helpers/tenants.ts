export interface Tenant {
  issuer: string;
  roles: string[];
  username: string;
  iat: string | undefined;
}

export interface TenantInterface {
  [name: string]: Tenant
}

export const tenants: TenantInterface = {
  admin: {
    issuer: 'admin',
    roles: ['administrator'],
    username: 'sean quillen',
    iat: undefined,
  },
};
