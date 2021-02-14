import { IncomingMessage } from 'http';
const jwt = require('jsonwebtoken');
export const APP_SECRET = 'GraphQL-is-aw3some';

function getTokenPayload(token: String) {
  return jwt.verify(token, APP_SECRET);
}

export function getUserID(req: IncomingMessage, authToken: String | null) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userID } = getTokenPayload(token);
      return userID;
    }
  } else if (authToken) {
    const { userID} = getTokenPayload(authToken);
    return userID;
  }

  throw new Error('Not authenticated');
}