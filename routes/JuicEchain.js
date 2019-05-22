let rp = require('request-promise');

class JuicEchain{

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
