"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = void 0;
const firebaseConfig_1 = require("../firebaseConfig");
function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        try {
            if (!token) {
                res.status(401).send({ message: 'No authorization token provided.' });
                return;
            }
            // Rest of the code...
            const decodedToken = yield firebaseConfig_1.auth.verifyIdToken(token);
            if (decodedToken) {
                req.user = decodedToken;
                next();
            }
            else {
                res.status(401).send({ message: 'Token verification failed.' });
            }
        }
        catch (error) {
            console.error('Token verification error:', error);
            res.status(500).send({ message: 'Internal server error during token verification.' });
        }
    });
}
exports.verifyUser = verifyUser;
function verifyAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        try {
            if (!token) {
                res.status(401).send({ message: 'No authorization token provided.' });
                return;
            }
            const decodedToken = yield firebaseConfig_1.auth.verifyIdToken(token);
            if (decodedToken.admin) {
                next();
            }
            else {
                res.status(403).send('Access denied: You are not an admin');
            }
        }
        catch (error) {
            res.status(500).send('Error verifying token');
        }
    });
}
exports.verifyAdmin = verifyAdmin;
