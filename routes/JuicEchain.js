const CryptoUtils = require("./CryptoUtil").CryptoUtils;
let rp = require('request-promise');
var express = require('express');
let storage = require('node-sessionstorage');
var router = express.Router();





class JuicEchain{

    transfer(address){
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
                    asset: "demo:someassetname2",
                    amount: 2,
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


    wallet(){
        
        const self = this;
        return new Promise(function(resolve, reject){
        self.requestToken().then(function(token){
        let addresstmp = null
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
            
                /*storage.setItem("addresstmp", result["payload"]["address"])
                console.log(storage.getItem("addresstmp")); 
                addresstmp = result["payload"]["address"]*/
        
            });

            });
    });

    }

    

    asset(){
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
                    "name": "someAssetName2",
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
