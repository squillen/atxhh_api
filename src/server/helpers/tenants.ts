const tenants: any = {
  admin: {
    issuer: 'admin',
    roles: ['administrator'],
    secret: process.env.ADMIN_PASSWORD,
  }
}

export default tenants;