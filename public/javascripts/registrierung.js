/**
 * 
 */




function  starteRegistrierung()
{
var filterplz = /^[7-9][0-9]{1,4}$/;
var filter_mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var today = new Date();
var nowyear = today.getFullYear();
var nowmonth = today.getMonth();
var nowday = today.getDate();
var b = document.form.birthh.value;
var birth = new Date(b);
var birthyear = birth.getFullYear();
var birthmonth = birth.getMonth();
var birthday = birth.getDate();
var age = nowyear - birthyear;
var age_month = nowmonth - birthmonth;
var age_day = nowday - birthday;





	if (document.form.username.value=="")
	{
		alert("Sie müssen Ihre Vorname angeben!");
		document.form.username.focus();
		return false;
	}

	if (document.form.lastname.value=="")
	{
		alert("Sie müssen Ihre Nachname angeben!");
		document.form.lastname.focus();
		return false;
	}

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

	if (document.form.stadt.value=="")
	{
		alert("Sie müssen Ihre Nachname angeben!");
		document.form.stadt.focus();
		return false;
	}

	if (!filterplz.test(document.form.plz.value))
	{
		alert("Sie müssen ein 5-stellige PLZ aus Süddeutschland angeben!");
		document.form.plz.focus();
		return false;
	}

	if (document.form.birth.value=="")
	{
		alert("Sie müssen Ihre Geburtsdatum angeben!");
		document.form.renewemail.focus();
		return false;
	}

	if ((age == 18 && age_month <= 0 && age_day <= 0) || age < 18) 
	{
		alert("Sie müssen mehr als 18 Jahre Alt sein!");
		document.form.birth.focus();
		return false;
	}
	
	console.log(document.form.username.value, document.form.lastname.value, document.form.useremail.value, document.form.stadt.value, document.form.plz.value, document.form.birth.value);
	
	alert("Sie haben sich erfolgreich registriert!");

	$('#myModal').modal('hide');

}

