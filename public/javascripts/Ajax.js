$(document).ready(function() {
    $('#btnBalance').click(function() {
        const origin = window.location.origin;
        const balanceUrl = origin + "/balance";
        $.ajax(balanceUrl, {url: '/balance'}).then(function(res) {

            let status = res.payload
            if(status.length != 0 ) {

                let assetName = []
                let assetQuantity = []
                let alertText = "Ihre Walletbalance: \n \n \n"
                let alertInfo = ""
                
                    for(i=0; i<status.length; i++){

                        assetName.push(res.payload[i].name)
                        assetQuantity.push(res.payload[i].quantity)
    
                        alertInfo = assetName[i].substr(5) + ":     " + '"'+assetQuantity[i]+'"'+"    \n \n"
                        
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
        })
        return false
    })
})

$(document).ready(function() {
    $('#btnCreateAsset').click(function() {
        var assetName = document.querySelector("#inputAssetName").value;
        var amount = document.querySelector("#inputAssetAmount").value;
        const origin = window.location.origin;
        const assetUrl = origin + "/asset?assetName=" + assetName+ "&amount=" + amount;  
        $.ajax(assetUrl).then(function(res) {
            let status = res.success
            let err = res.error
            if(status == false){
                alert(err)
            }
            else{
                alert("You have created "+amount+" tickets of "+assetName)
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
        const inputAssetAmount = document.querySelector("#inputAssetAmount").value;

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
                        const transferUrl = origin + "/transfer?inputAssetName=" + inputAssetName + '&walletaddresstarget=' + walletaddresstarget + '&inputAssetAmount=' + inputAssetAmount;
                    
                        $.ajax(transferUrl).then(function(res) {           
                                
                                alert("Sie haben an: " + inputUserEmail + " " +inputAssetAmount+" Ticket von "+inputAssetName.substr(5)+" transferiert"); 
                        })
                        return false;
                    }
                })
            }
        })
    })
})
            
          



