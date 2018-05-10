var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const getPokemonByName = function(name,callback){
	if(arguments.length!==2||typeof name!== 'string'){
		throw "Error! Not a valid pokemon!"
	}else{
		P.getPokemonByName(name).then(function(response) {

			//callback(null, );
			var the_moves = [];
			var iterator = 0;
			for (var i = response.moves.length - 1; i >= 0; i--) {
				the_moves[iterator] = response.moves[i].move.name;
				iterator++;
			}
			var returnedPokeman = {
				name: response.name,
				height: response.height,
				weight: response.weight,
				moves: the_moves,
				sprite: response.sprites.front_default
			}
			callback(null, returnedPokeman);
	    }).catch(function(error) {
	    	callback(error);
	    	//console.log('There was an ERROR: ', error);
	    });
	}
}

const getFullPokemanList = function(callback){
	var interval = {
	    limit: 150
	};

	P.getPokemonsList(interval).then(function(response) {
		//do more parsing on each pokeman to get the data
		console.log(response);
		callback(null, response.results);
	}).catch(function(error){
		callback(error);
	});
}

module.exports = {
	getPokemonByName,
	getFullPokemanList
};