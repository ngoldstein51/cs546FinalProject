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
			iterator = 0;
			for (var i = response.types.length - 1; i >= 0; i--) {
				the_types[iterator] = response.types[i].type.name;
				iterator++;
			}

			let pokelist=[];

			getFullPokemanList(function(error, result){
				if(result)
				{
					let res=result;
					let againstType=typeDict[the_types[0]];

					for(i=0;i<res.length;i++)
					{
						P.getPokemonByName(res[i].name).then(function(response) {
							if(response.types[0].type.name===againstType)
								pokelist.push(response);
						}).catch(function(error) {
				    	callback(error);
				    	});
					}

					let curr=pokelist[Math.floor(Math.random() * pokelist.length)];

					var matchup = {
						name: curr.name,
						height: curr.height,
						weight: curr.weight,
						moves: the_moves,
						types: the_types,
						sprite: curr.sprites.front_default
						}
					callback(null, matchup);
					}
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