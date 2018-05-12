const forumAPI = require("./db/forumAPI.js");
const userAPI = require("./db/user.js");
const bcrypt=require("bcrypt");

async function addTestUserToDb(username, password, favorites){
	try{
		const hashedPassword = await bcrypt.hash(password, 2);
		var testUser = await userAPI.addUser(username,hashedPassword,favorites);
	}catch(e){
		throw "There was an error with seeding the database! " + e
	}
}

addTestUserToDb("admin2","password", ["pikachu"]);


