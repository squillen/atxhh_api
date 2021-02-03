import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Tenant, tenants } from './tenants';

export function authorizeToken(token: string, issuer: string):
{
  error: string,
  authorized: boolean
} {
  const { username } = tenants[issuer];
  const result = { authorized: false, error: 'Unable to verify with the supplied token' };

  if (!username) {
    result.error = 'No matching issuer.';
    return result;
  }
  try {
    const verification = jwt.verify(token, process.env.ADMIN_SECRET as string) as Tenant;
    result.authorized = !!verification.iat;
  } catch (e) {
    console.error(e);
  }
  return result;
}

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  const { authorization, issuer } = req.headers;
  if (authorization) {
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];
    if (!bearerToken) throw new Error('Format token as "Bearer <token>"');
    const { authorized, error } = authorizeToken(bearerToken, issuer as string);
    console.log('authorized', authorized);
    if (authorized) next();
    else res.status(403).send(error);
  } else {
    res.sendStatus(403);
  }
}
