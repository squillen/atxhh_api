const tenants = {
  admin: {
    issuer: 'admin',
    roles: ['administrator'],
    secret: '',
  }
}
const jwt = require('jsonwebtoken');
const privateKey = '';
console.log('privateKey', privateKey)

const token = jwt.sign(tenants.admin, privateKey);
console.log('token :>> ', token)

const signedToken = ''

const decoded = jwt.verify(signedToken, privateKey)

console.log('decoded :>> ', decoded)
