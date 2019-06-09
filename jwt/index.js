const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// private key to sign jwt with RS256 algorithm
const privateKey = fs.readFileSync(path.join(__dirname, '../authenticationKeys', 'private.key'), { encoding: 'utf8' });
// public key to verify jwt with RS256 algorithm
const publicKey = fs.readFileSync(path.join(__dirname, '../authenticationKeys', 'public.key'), { encoding: 'utf8' });

// Sign options
const signOptions = {
    algorithm: 'RS256',
    expiresIn: '2h',
    notBefore: '2h'
}

// Verify options
const verifyOptions = {
    algorithms: ['HS256', 'HS384', 'RS256'],
    maxAge: '30min'
}

// Sign JWT => Returns signed token
const signJWT = async payload => {
    try {
        const signedToken = await jwt.sign(payload, privateKey, signOptions);
        console.log('SignedToken', signedToken);
        return signedToken;
    }
    catch(err) {
        console.log('Error has occured', err);
    }
}

// Verify Token => Returns verified token
const verifyJWT = token => {
    jwt.verify(token, publicKey, verifyOptions, (err, verifiedToken) => {
        if (err) console.error(err);
        return verifiedToken;
    })
}

// Decode token => Returns decoded token
const decodeJWT = token => {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken;
}

module.exports = {
    signJWT, verifyJWT, decodeJWT
}

