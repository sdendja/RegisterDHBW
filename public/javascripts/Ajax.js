$(document).ready(function() {
    $('#btnBalance').click(function() {
        const origin = window.location.origin;
        const balanceUrl = origin + "/balance";
        $.ajax(balanceUrl, {url: '/balance'}).then(function(res) {

            let status = res.payload
            if(status.length != 0 ) {

                let assetName = []
                let assetQuantity = []
                let alertText = ""
                let alertInfo = ""
                
                    for(i=0; i<status.length; i++){

                        assetName.push(res.payload[i].name)
                        assetQuantity.push(res.payload[i].quantity)
    
                        alertInfo = "Ihre Walletbalance für: " + assetName[i] + " ist: " + assetQuantity[i]+".     "
                        
                        alertText = alertText + alertInfo.toString()
                        
                    }
                    alert(alertText)
            }
            else{
                alert("kein Guthaben vorhanden")
            }
        })
        return false
    })
})

$(document).ready(function() {
    $('#btnCreateWallet').click(function() {
        const origin = window.location.origin;
        const walletURL = origin + "/register"; 
        $.ajax(walletURL).then(res => {
            console.log(res)
            console.log("dsads")
         

        })

        return false
    })
})

$(document).ready(function() {
    $('#btnCreateAsset').click(function() {
        var assetName = document.querySelector("#inputAssetName").value;
        const origin = window.location.origin;
        const assetUrl = origin + "/asset?assetName=" + assetName;   
        $.ajax(assetUrl).then(function(res) {
            console.log(res)
            let status = res.success
            let err = res.error
            if(status == false){
                alert(err)
            }
            
        })

        return false
    })
})


//transfer requests.js
$(document).ready(function() {
    $('#btnTransfer').click(function() {
        const inputUserEmail = document.querySelector("#inputUserEmail").value;
        const inputAssetName = "demo:"+document.querySelector("#inputAssetName").value;

        const origin = window.location.origin;
        const balanceUrl = origin + "/balance";
        $.ajax(balanceUrl, {url: '/balance'}).then(function(res) {
    
            let status = res.payload

            if(status.length == 0 ) {

                alert("kein Guthaben vorhanden, Eingaben überprüfen")
            }
            else{

                const origin = window.location.origin;
                const transferUrl = origin + "/db_information?inputUserEmail=" + inputUserEmail;
                $.ajax(transferUrl, {url: '/db_information'}).then(function(res) {
                    
                    if(!res){
                        alert("Zieladresse nicht vorhanden")
                    }
                    else{

                        walletaddresstarget = res.walletcreated 
                        const origin = window.location.origin;
                        const transferUrl = origin + "/transfer?inputAssetName=" + inputAssetName + '&walletaddresstarget=' + walletaddresstarget;
                    
                        $.ajax(transferUrl).then(function(res) {
                            
                            console.log(res.success)
                            let success = res.success;             
                                
                                alert("Sie haben an: " + inputUserEmail + " 1 Ticket von "+inputAssetName+" transferiert"); 
                        })
                        return false;
                    }
                })
            }
        })
    })
})
            
          



