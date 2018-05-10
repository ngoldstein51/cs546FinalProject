var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const getPokemonByName = function(name,callback){
	// console.log(name);
	// console.log(typeof name);
	if(arguments.length!==2||typeof name!== 'string'||name===""){
		callback("Error! Not a valid pokemon!",null);
	}else{
		P.getPokemonByName(name).then(function(response) {

			//callback(null, );
			var the_moves = [];
			var iterator = 0;
			for (var i = response.moves.length - 1; i >= 0; i--) {
				the_moves[iterator] = response.moves[i].move.name;
				iterator++;
			}
			let the_types = []
			iterator = 0;
			for (var i = response.types.length - 1; i >= 0; i--) {
				the_types[iterator] = response.types[i].type.name;
				iterator++;
			}
			
			var returnedPokeman = {
				name: response.name,
				height: response.height,
				weight: response.weight,
				moves: the_moves,
				types: the_types,
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
	    limit: 802
	};

	P.getPokemonsList(interval).then(function(response) {
		//do more parsing on each pokeman to get the data
		//console.log(response);
		callback(null, response.results);
	}).catch(function(error){
		callback(error);
	});
}

const getPokemonMatchup = function(name,callback){

	if(arguments.length!==2||typeof name!== 'string'||name===""){
		callback("Error! Not a valid pokemon!",null);
	}else{
		//im sorry
		typeDict={"normal":"fighting",
		"fire":"water",
		"fighting":"flying",
		"water":"electric",
		"flying":"ice",
		"grass":"fire",
		"poison":"psychic",
		"electric":"ground",
		"ground":"water",
		"psychic":"bug",
		"rock":"steel",
		"ice":"rock",
		"bug":"fire",
		"dragon":"dragon",
		"ghost":"ghost",
		"dark":"fairy",
		"steel":"fire",
		"fairy":"poison"};

		P.getPokemonByName(name).then(function(response) {

			//callback(null, );
			let the_types = []
			let iterator = 0;
			for (var i = response.types.length - 1; i >= 0; i--) {
				the_types[iterator] = response.types[i].type.name;
				iterator++;
			}

			let pokelist=[];

			getFullPokemanList(function(error, result){
					let res=result;
					let againstType=typeDict[the_types[0]];

					for(i=0;i<res.length;i++)
					{
						P.resource(res[i][0])
					    .then(function(response) {
					      console.log(response);
					    });
					}

					let curr=pokelist[Math.floor(Math.random() * pokelist.length)];

					var the_moves = [];
					iterator = 0;
					for (var i = curr.moves.length - 1; i >= 0; i--) {
						the_moves[iterator] = curr.moves[i].move.name;
						iterator++;
					}
					the_types = []
					iterator = 0;
					for (var i = curr.types.length - 1; i >= 0; i--) {
						the_types[iterator] = curr.types[i].type.name;
						iterator++;
					}

					var matchup = {
						name: curr.name,
						height: curr.height,
						weight: curr.weight,
						moves: the_moves,
						types: the_types,
						sprite: curr.sprites.front_default
						}
					callback(null, matchup);

			}).catch(function(error) {
	    	callback(error);
	    	});
		}).catch(function(error) {
		callback(error);
		});
	}
}

module.exports = {
	getPokemonByName,
	getFullPokemanList,
	getPokemonMatchup
};