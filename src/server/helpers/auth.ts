import jwt from 'jsonwebtoken'
import tenants from './tenants'

type Tenant = {
  issuer: string;
  roles: string[];
  secret: string;
  iat: string | undefined;
}

export function verifyToken (token: string, issuer: string):
{
  error: string,
  authorized: boolean
}
{
  const { secret } = tenants[issuer];
  let result = { authorized: false, error: 'Unable to verify with the supplied token' }

  if (!secret) {
    result.error = 'No matching issuer.';
    return result;
  }
  try {
    const verification = jwt.verify(token, secret) as Tenant;
    result.authorized = !!verification.iat;
  } catch (e) {
    console.error(e)
  }
  return result
}
