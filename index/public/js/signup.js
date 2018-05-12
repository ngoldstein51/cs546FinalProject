function check() {
	if (document.getElementById('password').value == document.getElementById('password2').value) {
		document.getElementById('password2').style.color = 'black';
		return true;
	}else{
		document.getElementById('password2').style.color = 'red';
		return false;
	}
}