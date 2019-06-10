$(document).ready(function() {
    $(window.onload = function myButton() {
        const balanceUrl = "/balance2";
        $.ajax(balanceUrl).then(function(res) {
    
            const buttons = document.querySelectorAll('#buttoncount')
            const loopvar = res.payload.length

            for(i=loopvar, j=loopvar+1, k=1; i < buttons.length ;i++, j++, k++){
            
                let button = "btnTicket"+j;
                let label = "label"+j
                let buttonStatus = 'Ausverkauft oder nicht Verfügbar';
                document.getElementById(button).disabled = true;
                document.getElementById(button).innerHTML = buttonStatus;
                document.getElementById(button).style.visibility = 'hidden';  
                document.getElementById(label).style.visibility = 'hidden';
                  
            }
            for(i=0, j=1; i<loopvar ; i++, j++){
                let status = res.payload[i].quantity;
                let assetName = res.payload[i].name
                let button = "btnTicket"+j;
                let label = "label"+j
                let buttonStatus2 = 'Book now! ' + status + ' Tickets Verfügbar';
                document.getElementById(button).innerHTML = buttonStatus2;
                document.getElementById(label).innerHTML = assetName;

            }
        })
    })
})

$(document).ready(function() {
    $("button").click(function() {

        const number = this.id.substr(-1);
        
        const label = "label"+number
        const inputAssetName = document.getElementById(label).innerText

        const origin = window.location.origin;
        const transferUrl = origin + "/transfer2?inputAssetName=" + inputAssetName;
        $.ajax(transferUrl).then(function(res) {
            console.log(res)

            const success = res.payload.success
            const error = res.payload.error;
            
            if(success == false){ 

                alert(error+". Something went wrong")
            }
            else{
                let success = res.success;
                console.log(success)
                alert("Sie haben auf Ihre Wallet 1 Ticket erhalten");
            }
        })
        return false
       
    })
})






















