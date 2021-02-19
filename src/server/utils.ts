import { IncomingMessage } from 'http';
const jwt = require('jsonwebtoken');
export const APP_SECRET = 'GraphQL-is-aw3some';

function getTokenPayload(token: String) {
	return token ? jwt.verify(token, APP_SECRET) : {};
}

export function getUserID(req: IncomingMessage, authToken: String | null) {
	if (req) {
		const token = getToken(req) as String;
		const { userID } = getTokenPayload(token);
		return userID;
	} else if (authToken) {
		const { userID } = getTokenPayload(authToken);
		return userID;
	}
	throw new Error('Not authenticated');
}

export function getUserRole(req: IncomingMessage) {
	if (req) {
		const token = getToken(req) as String;
		const { userRole } = getTokenPayload(token);
		return userRole;
	}
	throw new Error('User not authenticated');
}

function getToken(req: IncomingMessage): String | null | void {
	const authHeader = req.headers.authorization;
	let token = null;
	if (authHeader) {
		token = authHeader.replace('Bearer ', '');
		if (!token) {
			throw new Error('No token found');
		}
	}
	return token;
}
