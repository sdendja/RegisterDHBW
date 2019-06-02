function  starteRegistrierung()
{
	
var filter_mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;








	if (document.form.useremail.value=="")
	{
		alert("Sie müssen Ihre Email angeben!");
		document.form.useremail.focus();
		return false;
	}

	if (!filter_mail.test(document.form.useremail.value))
	{
		alert("Sie müssen eine gültige Email angeben!");
		document.form.useremail.focus();
		return false;
	}

	if (document.form.renewemail.value=="")
	{
		alert("Sie müssen Ihre Email wiederholen!");
		document.form.renewemail.focus();
		return false;
	}

	if (document.form.useremail.value != document.form.renewemail.value)
	{
		alert("Email-Adresse muss identisch sein!");
		document.form.useremail.focus();
		return false;
	}



	
	console.log(document.form.useremail.value);
	
	alert("Sie haben sich erfolgreich registriert!");

	



	$('#myModal').modal('hide');

}
