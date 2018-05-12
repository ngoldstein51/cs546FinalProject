const forumAPI = require("./db/forumAPI.js");
const userAPI = require("./db/user.js");

function addTestUserToDb(username, password, favorites){
	try{
		var testUser = await userAPI.addUser(username,password,favorites);
	}catch(e){
		throw "There was an error with seeding the database! " + e
	}
}

addTestUserToDb("admin","password", ["pikachu"]);

