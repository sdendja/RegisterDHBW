$(document).ready(function() {
    $(window.onload = function myButton() {
        const balanceUrl = "/balance2"
        $.ajax(balanceUrl).then(function(res) {
            const buttons = document.querySelectorAll('#buttoncount')
            const loopvar = res.payload.length

            for(i=loopvar, j=loopvar+1, k=1; i < buttons.length ;i++, j++, k++){
            
                let button = "btnTicket"+j;
                let label = "label"+j
                document.getElementById(button).disabled = true;
                document.getElementById(button).style.visibility = 'hidden';  
                document.getElementById(label).style.visibility = 'hidden';
                  
            }
            for(i=0, j=1; i<loopvar ; i++, j++){
                let assetName = res.payload[i].name
                let label = "label"+j
                document.getElementById(label).innerHTML = assetName;

            }

        })
        
    })
    
})

$(document).ready(function() {
    $("button").click(function() {
        
        const number = this.id.substr(-1);
        const inputUserEmail = document.querySelector("#inputUserEmail").value;
        const origin = window.location.origin;
        const dbURL = origin + "/db_information?inputUserEmail=" + inputUserEmail;
        $.ajax(dbURL, {url: '/db_information'}).then(function(res) {
            
            const label = "label"+number
            const walletaddress = res;
            const inputAssetName = document.getElementById(label).innerText
            const origin = window.location.origin;
            const transferUrl = origin + "/balance?walletaddress=" + walletaddress + "&inputAssetName=" + inputAssetName;
            console.log(inputAssetName)
            $.ajax(transferUrl).then(function(res) {

                const loopvar = res.payload.length
                const arrayVar = res.payload
                
                
                let status = ""

                if(loopvar == 0){
                    alert("Sie haben keine Tickets auf Ihrem Konto. Überprüfen Sie die Eingabe")
                }
                else{
                    for(i=0; i<loopvar; i++){
                        console.log(i)
                        console.log(arrayVar[i].name)
                        if(arrayVar[i].name == inputAssetName){
                            
                            status = true
                            message ="Entrance approved"
                            break;
                            
                        }
                        else{
                            
                            status = false
                            message ="Entrance denied"

                        }
                        
                    }
                    console.log(status)
                    alert(message)
                }
   
            })
            
            return false
        })
        return false 
    })
})

//Modal Popup Controller
function toggle_visibility(id){
    var e = document.getElementById(id);

if(e.style.display == 'block')
    e.style.display = 'none';
else 
    e.style.display = 'block';
}















