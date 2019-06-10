const express = require('express');
const CryptoUtils = require("./CryptoUtil").CryptoUtils;
const rp = require('request-promise');

class JuicEchain{    

    // Mainwallet to User
    transfer(address, assetName){

        const self = this;
        return new Promise(function(resolve, reject){

            self.requestToken().then(function(token){

                

                const signature = CryptoUtils.generateAuthToken("L57eRseU9tRquYNWkWHZX4S1J8cnV6sGZ2h4tvnSt4jrES59zoqX", 
                "12T6EhosKPhmpFpc4HAMxx2SwZHLoFmSvW", "", "");
    
            let options = {
                method: 'POST',
                url: 'https://demo.juicechain.org/node/wallet/transfer/'+address,
                headers: {
                    'authorization': token.token,
                    'signature': signature
                },
                body: {
                    asset: assetName,
                    amount: 1,
                    payload: ""
                },
                json: true
                };

                rp(options).then(result => {
                    resolve(result);
                    console.log(result);
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
                url: 'https://demo.juicechain.org/node/wallet',
                headers: {
                    'authorization': token.token
                },
                json: true
                };
                rp(options).then(result => {
                    resolve(result);
                    console.log(result);
            
                });
            });
        });
    }

    asset(assetName){
        const self = this;
        return new Promise(function(resolve, reject){
            self.requestToken().then(function(token){

                let options = {
                    method: 'POST',
                    url: 'https://demo.juicechain.org/node/assets/',
                    headers: {
                        'authorization': token.token
                    },
                    body: {
                        "name": assetName,
                        "amount": 1000,
                        "title": {
                            "de_DE": "some title",
                            "en_GB": "some title"
                        },
                        "publisher": "DHBW",
                        "type": "voucher",
                        "target": "12T6EhosKPhmpFpc4HAMxx2SwZHLoFmSvW",
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
                    console.log(result);
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
                    url: 'https://demo.juicechain.org/node/wallet/'+address+'/0/' + time.getTime(),
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
                url: 'https://demo.juicechain.org/node/auth',
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

