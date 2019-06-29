const { GraphQLString, GraphQLNonNull } = require('graphql');
const { get: _get } = require('lodash');
const { generateHash, comparePassword } = require('../../../encryption');
const { signJWT } = require('../../../jwt');
const validateUser = require('../../../validation/user');

// GraphQL Types
const { UserType, LoginResponseType } = require('../../types/user');

// MongoDB User models
const User = require('../../../models/user');

const registerUser = () => ({
    type: UserType,
    args: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args) {
        try {
            const hashedPassword = await generateHash(_get(args, 'password'), 10);
            const newUser = await User.create({
                username: _get(args, 'username'),
                email: _get(args, 'email'),
                password: hashedPassword
            });
            console.log('New User has been created', newUser);
            return newUser;
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

const signInUser = () => ({
    type: LoginResponseType,
    args: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args) {
        try {
            const username = _get(args, 'username');
            const password = _get(args, 'password');
            const isValidated = await validateUser({ username, password });
            if (isValidated) {
                const user = await User.findOne({ username });
                if (!user) {
                    return {
                        token: null,
                        status: '404',
                        message: 'You are not a valid legitimate user. Please sign up first.'
                    }
                }
                if (!await comparePassword(password, _get(user, 'password'))) {
                    return {
                        token: null,
                        status: '404',
                        message: 'You entered a wrong password!'
                    }
                }
                const payload = { userId: _get(user, '_id') };
                const token = await signJWT(payload);
                return { token, status: 200, message: 'Login Successful' };
            } else {
                return { 
                    token: null, 
                    status: 404, 
                    message: 'User is not validated.' 
                };
            }
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

module.exports = {
    registerUser,
    signInUser
};