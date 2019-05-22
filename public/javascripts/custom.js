function sayHi(){
    var txtName = document.getElementById("txtName");
    var txtOutput = document.getElementById("txtOutput");
    var name = txtName.value;
    txtOutput.value = "Hi there, " + name + "!"
    };
    
  /*  <h1>Text Box Input and Output</h1>
    <form>
        <fieldset>
            <label>Type your name: </label>
            <input type = "text"
            id = "txtName" />
     <input type = "button"
       value = "click me"
       onclick = "sayHi()"/>
     <input type = "text"
       id = "txtOutput" />
     </fieldset>
    </form>
*/


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
  alert("Sie haben sich erfolgreich registriert!");
  storage.setItem("token", result["token"])
  //token = result["token"];
  }).then(function() {
    console.log(storage.getItem("token"));
    
    let options2 = {
      method: 'POST',
      url: 'https://demo.juicechain.org/node/wallet',
      headers: {
          'authorization': storage.getItem("token")
      },
      json: true
    };
    rp(options2).then(result => {
      console.log(result["payload"]["address"]);
    })
  });

