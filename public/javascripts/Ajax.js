$(document).ready(function() {
    $('#btnBalance').click(function() {
        var walletaddress1 = document.querySelector("#inputWalletAddress1").value;
        const origin = window.location.origin;
        const balanceUrl = origin + "/balance?walletaddress1=" + walletaddress1;
        $.ajax(balanceUrl, {url: '/balance'}).then(function(res, req) {
            
            console.log(res)
            
        }).done(function (data){
            
            alert("Ihre Walletbalance ist:" + data )
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
        var walletaddress2 = document.querySelector("#inputWalletAddress2").value;
        const origin = window.location.origin;
        const transferUrl = origin + "/transfer?walletaddress2=" + walletaddress2;
        $.ajax(transferUrl).then(function(res) {
            console.log(res)
            
        })

        return false
    })
})



