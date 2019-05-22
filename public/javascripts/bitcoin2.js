import { Message } from "./Message";
const bitcore = require('bitcore-lib');
export class CryptoUtils {
    /**
     * Generate short-live token based on private
     *
     * @param privateKey
     * @param device
     * @param asset
     * @param address
     * @returns {string}
     */
    static generateAuthToken(privateKey, address, device, asset) {
        const _privateKey = bitcore.PrivateKey.fromWIF(privateKey);
        const payload = {
            address: address,
            device: device,
            asset: asset,
            timestamp: new Date(),
        };
        // generate signature
        const message = new Message(JSON.stringify(payload));
        const signature = message.sign(_privateKey);
        // generate message
        payload.signature = signature;
        return new Buffer(JSON.stringify(payload)).toString("base64");
    }
    ;
}