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
			document.getElementById("favoriteText").innerHTML = "This is one of your favorite pokemon!";
			document.getElementById("favoriteIcon").innerHTML = "star";
			document.getElementById("favoriteIcon").setAttribute( "onClick", "javascript:;" );
			//window.location.replace("/");
		}else if(this.readyState == 4 && this.status == 400){
			alert("There was a problem adding this pokemon to your favorites. Please try again, or refresh the page.");
		}else{
			//not done yet
			//console.log("Hello " + this.status + " and  " + this.readyState);
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