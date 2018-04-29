var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const getPokemonByName = function(name){
	if(arguments.length!==1||typeof name!== 'string'){
		throw "Error! Not a valid pokemon!"
	}else{
		P.getPokemonByName(name) // with Promise
	    .then(function(response) {
	      console.log(response);
	    })
	    .catch(function(error) {
	      console.log('There was an ERROR: ', error);
	    });
	}
}