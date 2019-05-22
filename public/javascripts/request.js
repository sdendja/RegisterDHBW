/**
 * 
 */

/*

function authenticate() {

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
    console.log(result);

    });
  }


  */
 /* 
  function createWallet() {
    
    let options = {
      method: 'POST',
      url: 'https://demo.juicechain.org/node/wallet',
      headers: {
      'authorization': storage.getItem("token")
      },
      json: true
      };
      
      rp(options).then(result => {
      console.log(result);
      });
  
  }
  
  function createAsset() {
    
    let options = {
      method: 'GET',
      url: 'https://demo.juicechain.org/node/auth',
      headers: {
      'authorization': 'none',
      },
      body: {
        "name": "someAssetName",
        "amount": 1000,
        "title": {
        "de_DE": "some title"
        },
        "publisher": "5cb585e1c7baca264c981f38",
        "type": "voucher",
        "target": "1C2curDqbYmydLTgxzGr6d8ahckAGdePyv",
        "style": "",
        "description": "Some longer text",
        "options": {
        "transfer": true,
        "transferNode": "",
        "returnAddress": "issuer address",
        "offineTargets": ""
        }
      },
      json: true
      };
      
      rp(options).then(result => {
      console.log(result);
      });
  
  }
  
  
  
  function getBalance() {
    
    let options = {
      method: 'Get',
      url: 'https://demo.juicechain.org/node/wallet/{address}/{minconf}/{time}',
      headers: {
      'authorization': 'none',
      'signature': 'none'
      },
      body: {
      adress: 'none',
      minconf: '1',
      time: '1234'
      },
      json: true
      };
      
      rp(options).then(result => {
      console.log(result);
      });
  
  }
  
  function transferAsset() {
    
    let options = {
      method: 'POST',
      url: 'https://demo.juicechain.org/node/wallet/transfer/{receiver}',
      headers: {
      'authorization': 'none',
      'signature': ''
      },
      body: {
        adress: "demo:assetName"
      },
      json: true
      };
      
      rp(options).then(result => {
      console.log(result);
      });
  
  }

*/

