$(document).ready(function() {
    $('#btnBalance').click(function() {
        const origin = window.location.origin;
        const balanceUrl = origin + "/balance";
        console.log("lala_0")
        $.ajax(balanceUrl, {url: '/balance'}).then(function(res) {
            console.log("lala_3")
            let status = res.payload
            if(status.length != 0 ) {

                let assetName = []
                let assetQuantity = []
                let alertText = "Ihr Walletguthaben: \n \n \n"
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

        const balanceUrl = "/balance2";
        $.ajax(balanceUrl).then(function(res) {
    
            const loopvar = res.payload.length
            if(loopvar > 9){
                alert("Die Maximale Anzahl an Events ist erreicht."+"\n"+"Für neue Events  bitte alte löschen!")
            }
            else{
        
                const origin = window.location.origin;
                const assetUrl = origin + "/asset?assetName=" + assetName+ "&amount=" + amount;  
                $.ajax(assetUrl).then(function(res) {
                    let status = res.success
                    let err = res.error
                    if(status == false){
                        alert(err)
                    }
                    else{
                        alert("Sie haben "+amount+" Tickets von "+assetName+" erstellt")
                    }
                })
                return false
            }
        })
        return false
    })
})

//Delete Asset (--> trash@trash.com)
$(document).ready(function() {
    $('#btnDeleteAsset').click(function(req) {
        var assetName = document.querySelector("#inputAssetName2").value;
        if (!assetName) {
            alert("Eingabe vergessen")
          }else{

          

            const balanceUrl = "/balance2";
            $.ajax(balanceUrl).then(function(res) {
        
                const loopvar = res.payload.length
                

                if(loopvar == 0){
                    alert("Keine Events vorhanden")
                }
                else{

                    assetName = "demo:"+assetName            
                    let amount = res.payload.find(o => o.name === assetName).quantity
            
                    walletaddresstarget = "14z2MuaQwagWusJfBNLezTZJGyCQgH6cp1"
                    const origin = window.location.origin;
                    const transferUrl = origin + "/transfer3?inputAssetName=" + assetName + '&walletaddresstarget=' + walletaddresstarget + '&amount=' + amount;  
                    $.ajax(transferUrl).then(function(res) {
                        
                        const success = res.success;
                        const error = res.error.message;

                        if(success == false){ 
                            alert(error+". Etwas ist schief gelaufen, bitte Eingabe überprüfen")
                        }
                        else{
                            console.log(success)
                            alert("Sie haben: " + assetName + " gelöscht"); 
                        }   
                    })
                    return false
                }
            })
            return false
        }
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
                            
                            let error = res.error.message
                            let success = res.success
                            console.log(error)
                            if(success == false){ 
                                alert("Event existiert nicht, bitte Eingabe überprüfen"+error)
                            }
                            else{
                                let success = res.success;
                                alert("Sie haben an: " + inputUserEmail + " " +inputAssetAmount+" Ticket von "+inputAssetName.substr(5)+" transferiert");
                            }    
                        })
                        return false;
                    }
                })
            }
        })
    })
})





