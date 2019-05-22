"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
const crypto = require("crypto");
const bitcore = require('bitcore-lib');
class CryptoUtils {
    /**
     * Generate short-live token based on private
     *
     * @param privateKey
     * @param device
     * @param asset
     * @param address
     * @returns {string}
     */
    static generateAuthToken(privateKey, address, device, asset, validation) {
        const _privateKey = bitcore.PrivateKey.fromWIF(privateKey);
        const payload = {
            address: address,
            device: device,
            asset: asset,
            timestamp: (validation) ? validation.toUTCString() : (new Date()).toUTCString(),
        };
        // generate signature
        const message = new Message_1.Message(JSON.stringify(payload));
        const signature = message.sign(_privateKey);
        // generate message
        payload.signature = signature;
        return new Buffer(JSON.stringify(payload)).toString("base64");
    }
    ;
    /**
     * Generate message
     */
    static generateMessage(privateKey, address, node, device, asset, validation) {
        const _privateKey = bitcore.PrivateKey.fromWIF(privateKey);
        const payload = {
            address: address,
            device: device,
            node: node,
            asset: asset,
            timestamp: (validation) ? validation.toUTCString() : (new Date()).toUTCString(),
        };
        // generate signature
        const message = new Message_1.Message(JSON.stringify(payload));
        const signature = message.sign(_privateKey);
        // generate message
        payload.signature = signature;
        return JSON.stringify(payload);
    }
    ;
    /**
     * Encrypt text
     *
     * @param {string} text
     * @param {string} password
     * @returns {string}
     */
    static encrypt(text, password) {
        // generate initialization vector
        const iv = new Buffer(crypto.randomBytes(16)); // fill with zeros
        // create cipher
        const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer(password, 'hex'), iv);
        return cipher.update(text, 'utf8', 'hex')
            + cipher.final('hex') + ":" + iv.toString('hex');
    }
    /**
     * Decrypt data
     *
     * @param {string} data
     * @param {string} ivs
     * @param {string} password
     * @returns {string}
     */
    static decrypt(data, password) {
        // prepare data
        const payload = data.split(":");
        const iv = Buffer.from(payload[1], 'hex');
        // create cipher
        const decipher = crypto
            .createDecipheriv('aes-128-cbc', new Buffer(password, 'hex'), iv);
        // decipher
        return decipher.update(payload[0], 'hex', 'utf8')
            + decipher.final('utf8');
    }
}
exports.CryptoUtils = CryptoUtils;
//# sourceMappingURL=CryptoUtils.js.map
