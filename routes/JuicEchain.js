const express = require('express');
const CryptoUtils = require("./CryptoUtil").CryptoUtils;
const rp = require('request-promise');

class JuicEchain{    

    transfer(sourceKey, sourceaddress, address, assetName, amount){

        var amount = parseInt(amount)
        const self = this;
        return new Promise(function(resolve, reject){

            self.requestToken().then(function(token){

                const signature = CryptoUtils.generateAuthToken(sourceKey, 
                sourceaddress, "", "");

                let options = {
                    method: 'POST',
                    url: 'http://demo.juicechain.org:3001/node/wallet/transfer/'+address,
                    headers: {
                        'authorization': token.token,
                        'signature': signature
                    },
                    body: {
                        asset: assetName,
                        amount: amount,
                        payload: ""
                    },
                    json: true
                };
                rp(options).then(result => {
                    resolve(result);
                });
            });
        });
    }

    wallet(req){
        
        const self = this;
        return new Promise(function(resolve, reject){
        self.requestToken().then(function(token){
        
            let options = {
                method: 'POST',
                url: 'http://demo.juicechain.org:3001/node/wallet',
                headers: {
                    'authorization': token.token
                },
                json: true
                };
                rp(options).then(result => {
                    resolve(result);
                });
            });
        });
    }

    asset(assetName, amount){

        var amount = parseInt(amount)
        const self = this;
        return new Promise(function(resolve, reject){
            self.requestToken().then(function(token){

                let options = {
                    method: 'POST',
                    url: 'http://demo.juicechain.org:3001/node/assets/',
                    headers: {
                        'authorization': token.token
                    },
                    body: {
                        "name": assetName,
                        "amount": amount,
                        "title": {
                            "de_DE": "some title",
                            "en_GB": "some title"
                        },
                        "publisher": "DHBW",
                        "type": "voucher",
                        "target": "1JcYgwK8EYQiwSLvRZjY8kr2h7dCUTpPr5",
                        "description": "Some longer text",
                        "options": {
                            "transfer": true,
                            "transferNode": null,
                            "returnAddress": null,
                            "offlineTargets": null
                        }
                    },
                    json: true
                };
                rp(options).then(result => {
                    resolve(result);
                });
            });
        });
    }
    
    balance(address){
        const self = this;
        return new Promise(function(resolve, reject){

            self.requestToken().then(function(token){

                const time = new Date();

                let options = {
                    method: 'GET',
                    url: 'http://demo.juicechain.org:3001/node/wallet/'+address+'/0/' + time.getTime(),
                    headers: {
                        'authorization': token.token,
                    },
                    json: true
                };
                rp(options).then(result => {
                    resolve(result);  
                });
            });
        });
    }
 
    requestToken(){
        return new Promise(function(resolve, reject) {

            let options = {
                method: 'POST',
                url: 'http://demo.juicechain.org:3001/node/auth',
                headers: {
                    'authorization': 'none'
                },
                body: {
                    username: "none",
                    password: "none"
                },
                json: true
            };
            rp(options).then(result => {
                resolve(result);
            });
        });
    }
}

exports.JuicEchain = JuicEchain;

