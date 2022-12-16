import jwt from 'jsonwebtoken';
import { getUserByRefeshTokenDB, getUserRolesDB } from '../models/userModel.js';
import { getUserByUserIdDB } from '../models/userModel.js';

export const checkToken = (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: 0,
                    message: 'Invalid Token...',
                });
            }
            const userId = decoded.result;
            getUserByUserIdDB(userId, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.status(400).json({
                        success: 0,
                        message: 'NotLookingUser',
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        });
    } else {
        return res.json({
            success: 0,
            message: 'Access Denied! Unauthorized User',
        });
    }
};

export const checkRefeshToken = (req, res, next) => {
    const refeshtoken = req.body.customer_refeshToken;
    if (refeshtoken) {
        getUserByRefeshTokenDB(refeshtoken, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: 'Dont Have This Token In Database',
                });
            }
            jwt.verify(refeshtoken, process.env.REFESH_TOKEN_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        message: 'Invalid RefeshToken...',
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        });
    } else {
        return res.json({
            success: 0,
            message: 'Access Denied! Unauthorized User',
        });
    }
};

export const isAdmin = (req, res, next) => {
    const userId = req.decoded.result;
    getUserRolesDB(userId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                message: 'Cant get user roles',
            });
        }
        const allRoles = results.map((x) => x.roles_permission);
        const authSuccess = allRoles.find((x) => x === 'admin');
        if (authSuccess) next();
        else {
            return res.status(405).json({
                success: 0,
                message: 'Access Denied! You are not Admin',
            });
        }
    });
};

export const isBiller = (req, res, next) => {
    const userId = req.decoded.result;
    getUserRolesDB(userId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                message: 'Cant get user roles',
            });
        }
        const allRoles = results.map((x) => x.roles_permission);
        const authSuccess = allRoles.find((x) => x === 'Biller');
        if (authSuccess) next();
        else {
            return res.status(405).json({
                success: 0,
                message: 'Access Denied! You are not Biller',
            });
        }
    });
};
