function  starteRegistrierung(req)
{
	
	
var filter_mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (document.form.inputEmail.value=="")
	{
		alert("Sie müssen Ihre Email angeben!");
		document.form.inputEmail.focus();
		return false;
	}

	if (!filter_mail.test(document.form.inputEmail.value))
	{
		alert("Sie müssen eine gültige Email angeben!");
		document.form.inputEmail.focus();
		return false;
	}

	if(document.form.inputPassword.value != "" && document.form.inputPassword.value == document.form.inputPassword2.value) {
		
		if(document.form.inputPassword.value.length < 6) {
		  alert("Error: Password must contain at least six characters!");
		  document.form.inputPassword.focus();
		  return false;
		}
		re = /[0-9]/;
		if(!re.test(document.form.inputPassword.value)) {
		  alert("Error: password must contain at least one number (0-9)!");
		  document.form.inputPassword.focus();
		  return false;
		}
		re = /[a-z]/;
		if(!re.test(document.form.inputPassword.value)) {
		  alert("Error: password must contain at least one lowercase letter (a-z)!");
		  document.form.inputPassword.focus();
		  return false;
		}
		re = /[A-Z]/;
		if(!re.test(document.form.inputPassword.value)) {
		  alert("Error: password must contain at least one uppercase letter (A-Z)!");
		  document.form.inputPassword.focus();
		  return false;
		}
	  } else {
		alert("Error: Please check that you've entered and confirmed your password!");
		document.form.inputPassword.focus();
		return false;
	  }
		
	  alert("You entered a valid password: " + document.form.inputPassword.value);
	  return true;
		
	}

	
	


