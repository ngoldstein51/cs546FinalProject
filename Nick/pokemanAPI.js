var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
const async = require('async');
const shuffleAlg = require('./api/shuffleAlg.js');

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
	    limit: 151
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
			try{
				getFullPokemanList( function(error, result){
					if(!error){
						let res=shuffleAlg.shuffle(result);
						let againstType=typeDict[the_types[0]];
						console.log("MY name is jeff");
						console.log(res);
						console.log(againstType);
						var chosen_pokemon;
						var matchup;

						async.eachOfLimit(res, 1, function(obj,fme,everyCallback){
							console.log("This is the obj :: "  + obj.name);
							P.getPokemonByName(obj.name).then(function(againstTypeResponse){
								console.log("This is my pokemon name ! " + againstTypeResponse.name);
								let the_possible_types = []
								let iterator = 0;
								for (var i = againstTypeResponse.types.length - 1; i >= 0; i--) {
									the_possible_types[iterator] = againstTypeResponse.types[i].type.name;
									iterator++;
								}
								console.log("This is the posisble types");
								console.log(the_possible_types);
								if(the_possible_types.includes(againstType)){
									console.log("I found something !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + obj.name)
									chosen_pokemon = obj.name;

									var the_matchup_moves = [];
									let moves_iterator = 0;
									for (var i = againstTypeResponse.moves.length - 1; i >= 0; i--) {
										the_matchup_moves[moves_iterator] = againstTypeResponse.moves[i].move.name;
										moves_iterator++;
									}

									matchup = {
										name: chosen_pokemon,
										height: againstTypeResponse.height,
										weight: againstTypeResponse.weight,
										moves: the_matchup_moves,
										types: the_possible_types,
										sprite: againstTypeResponse.sprites.front_default
									}
									//matchup_list.push(matchup);
									return everyCallback(matchup);
								}else{
									console.log("Continute because I didnt find anything")
									return everyCallback();
								}
								//return everyCallback();
							}).catch(function(err){
								callback(err, null);
							});
						}, function(poke){
							//callback(err , null);
							if(poke){
								//var index = Math.floor(Math.random() * matchup_list.length);
								callback(null,poke);
							}else{
								callback(null,null);
							}
							//callback(null,null);
						});
						 // did not find a matchup
						console.log("I am stuck here");
					}else{
						callback(error,null);
					}
				});
			}catch(e){
				console.log("I am here!");
				callback(e,null);
			}
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