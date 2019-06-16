const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { get: _get } = require('lodash');

// private key to sign jwt with RS256 algorithm
const privateKey = fs.readFileSync(path.join(__dirname, '../authenticationKeys', 'private.key'), { encoding: 'utf8' });
// public key to verify jwt with RS256 algorithm
const publicKey = fs.readFileSync(path.join(__dirname, '../authenticationKeys', 'public.key'), { encoding: 'utf8' });

// Sign options
const signOptions = {
    algorithm: 'RS256',
    expiresIn: '12h',
}

// Verify options
const verifyOptions = {
    algorithms: ['HS256', 'HS384', 'RS256']
}

// Sign JWT => Returns signed token
const signJWT = async payload => {
    console.log('private_key=>', process.env);
    try {
        const signedToken = await jwt.sign(payload, privateKey, signOptions);
        const bearerToken = `Bearer ${signedToken}`;
        console.log(bearerToken);
        return bearerToken;
    }
    catch (err) {
        console.log('Error has occured', err);
    }
}

// Verify Token => Returns verified token
const verifyJWT = async (req, res, next) => {
    const regExp1 = /signInUser/g;
    const regExp2 = /registerUser/g;
    const gqlQuery = _get(req, 'body.query');
    if(regExp1.test(gqlQuery) || regExp2.test(gqlQuery)) {
        // This will be either signInUser or registerUser mutation
        // Pass these mutations from JWT check
        next();
    } else {
        // Pass JWT check for rest of queries and mutations
        try {
            const authorizationHeader = _get(req, 'headers.authorization');
            if(!authorizationHeader) {
                throw new Error('Authorization token is missing');
            }
            const token = authorizationHeader.substring(7, authorizationHeader.length);
            const verifiedToken = await jwt.verify(token, publicKey, verifyOptions);
            req.userId = _get(verifiedToken, 'userId');
            next();
        }
        catch (err) {
            console.log('Error message:', err.message);
            next();
        }
    }
}

// Decode token => Returns decoded token
const decodeJWT = token => {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken;
}

module.exports = {
    signJWT, verifyJWT, decodeJWT
}

