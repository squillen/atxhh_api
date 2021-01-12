import * as express from 'express';
import * as jwt from 'jsonwebtoken'
import tenants from './tenants'

type Tenant = {
  issuer: string;
  roles: string[];
  secret: string;
  iat: string | undefined;
}

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { authorization, issuer } = req.headers;
  if (authorization) {
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];
    if (!bearerToken) throw new Error('Format token as \"Bearer <token>\"');
    const { authorized, error } = authorizeToken(bearerToken as string, issuer as string)
    console.log('authorized', authorized)
    if (authorized) next()
    else res.status(403).send(error)
  } else {
    res.sendStatus(403);
  }
}

export function authorizeToken (token: string, issuer: string):
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
