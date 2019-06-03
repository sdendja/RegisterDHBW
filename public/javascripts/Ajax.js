


$(document).ready(function() {
    $('#btnBalance').click(function() {
        var inputUserEmail = document.querySelector("#inputUserEmail1").value;
        const origin = window.location.origin;
        const dbURL = origin + "/db_information?inputUserEmail=" + inputUserEmail;
        $.ajax(dbURL, {url: '/db_information'}).then(function(res) {

            const walletaddress = res;
            const origin = window.location.origin;
            const balanceUrl = origin + "/balance?walletaddress=" + walletaddress;
            $.ajax(balanceUrl, {url: '/balance'}).then(function(res) {


                let status = res.payload
                console.log(status)
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
                        alert( <ul>
                            <li>Coffee</li>
                            <li>Tea</li>
                            <li>Milk</li>
                          </ul> )
                    
                }
                else{
                    alert("kein Guthaben vorhanden")
                }
                
                
            })

            return false
        })
            
    })
        
})

$(document).ready(function() {
    $('#btnCreateWallet').click(function() {
        const origin = window.location.origin;
        const walletURL = origin + "/register"; 
        $.ajax(walletURL).then(res => {
            console.log(res)
         

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

$(document).ready(function() {
    $('#btnTransfer').click(function() {
        var inputUserEmail = document.querySelector("#inputUserEmail2").value;
        const origin = window.location.origin;
        const dbURL = origin + "/db_information?inputUserEmail=" + inputUserEmail;
        
        $.ajax(dbURL, {url: '/db_information'}).then(function(res) {

            var inputAssetName = "demo:"+document.querySelector("#inputAssetName").value;
            const walletaddress = res;
            const origin = window.location.origin;
            const transferUrl = origin + "/transfer?walletaddress=" + walletaddress + "&inputAssetName=" + inputAssetName;
           
            $.ajax(transferUrl).then(function(res) {
                
                let success = res.success;
                let error = res.error.message;
                console.log(success)
                
                
                if(success == false){
                    alert(error+". Bitte Eingaben überprüfen")
                
                }
                else{
                    
                    alert("Sie haben an: " + inputUserEmail + " 1 Ticket transferiert");
                }
                
            })

            return false
        })

    })
})
            
          



