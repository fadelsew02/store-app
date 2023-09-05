// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0sj6gf9mk9Azet578nwxq22pzn5hvpxmpgtty34tfx8gz17sqer12nnm0xuc65bi9rcc';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData, number) {
  console.log(userData.manager_id)
  console.log(typeof number)
  
    if(number === '1'){
        return jwt.sign({
            userId: userData.manager_id,
            userRole: 1
        }, JWT_SIGN_SECRET, {
            expiresIn: '1h'
        })
    } else {
        return jwt.sign({
            userId: userData.customer_id,
            userRole: 2
        }, JWT_SIGN_SECRET, {
            expiresIn: '1h'
        })
    }
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  
  getUserId: function(authorization) {
  
  let user = {
      userId: -1,
      userRole: 2
  }
  console.log(authorization)
  
    const token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
            console.log('dedans')
            user.userRole = jwtToken.userRole;
            user.userId = jwtToken.userId;
      } catch(err) { 
        console.error(err);
      }
    }
    return user;
  }
}
