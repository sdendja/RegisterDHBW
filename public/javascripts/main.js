$(document).ready(function() {
    $('#btnBalance').click(function() {
        const origin = window.location.origin;
        const balanceUrl = origin + "/balance";
        $.ajax(balanceUrl).then(function(res) {
            let balance = 0
            alert("The Wallet Balance is: "+balance)
            console.log(res)
        })

        return false
    })
})

$(document).ready(function() {
    $('#btnCreateWallet').click(function() {
        const origin = window.location.origin;
        const walletURL = origin + "/register"; 
        const addwallet = origin + "/addwallet";
        $.ajax(walletURL).then(function(res) {
            
            console.log(res);
            
            $.ajax(addwallet).then(function(res) {
            
                console.log(res);
                
                
            })
        })

        return false
    })
})

$(document).ready(function() {
    $('#btnCreateAsset').click(function() {
        const origin = window.location.origin;
        const assetUrl = origin + "/asset";   
        $.ajax(assetUrl).then(function(res) {
            console.log(res)
        })

        return false
    })
})

$(document).ready(function() {
    $('#btnTransfer').click(function() {

        
        const origin = window.location.origin;
        const transferUrl = origin + "/transfer";   
        $.ajax(transferUrl).then(function(res) {
            console.log(res)
            
        })

        return false
    })
})






