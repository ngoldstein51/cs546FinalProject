function addToFavorite(name){
	var id = getCookie("AuthCookie");
	loadXMLDoc(id,name);
}

function loadXMLDoc(id,pokemonName){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("It worked!");
			alert("Pokemon has successfully been added to your favorites!");
			//window.location.replace("/");
		}else{
			console.log("We have a problem! " + this.readyState);
		}
	};

    xhttp.open("POST", "/pokemon/addToFavorites", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	var myData = {};
	myData.id = id;
	myData.pokemonName = pokemonName;
	xhttp.send(JSON.stringify(myData));

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}