
        function myFunction() {
            var btn = document.createElement("BUTTON");
            var text = document.createTextNode("Browse..");
            btn.appendChild(text);
            var newbutton = document.getElementById("button"); //new div button   element introduced on html.
              document.body.insertBefore(btn,newbutton);//insert before method
            
        }