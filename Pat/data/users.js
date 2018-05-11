const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuidv4 = require('uuid/v4');


module.exports = {

	createUser: async function createUser(username, password){

    	if (!username) throw "You must provide a username for your user";
    	if (!password) throw "You must provide a password for your user";

    	if(typeof username !== 'string')
			throw "username must be a string";
		if(typeof password !== 'string')
			throw "password must be a string";



    	const userCollection = await users();

	    const existingUser = await userCollection.findOne({ username: username });
	    if(existingUser!==null)
	    	throw "username already exists";

		var newUser = {};

		newUser['_id'] = uuidv4();
		newUser['username'] = username;
		newUser['password'] = password;
		//breakpoint
	    
	    const insertInfo = await userCollection.insertOne(newUser);
	    if (insertInfo.insertedCount === 0) throw "Could not add user";

	    const newId = insertInfo.insertedId;

	    const user = await this.getUserById(newId);
	    return user;


	},

	getAllUsers: async function getAllUsers(){
    	
    	const userCollection = await users();

    	const allUsers = await userCollection.find({}).toArray();

    	return allUsers;
    },
    // deleteAll: async function deleteAll(){
    	
    // 	const taskCollection = await todoItems();
    // 	// console.log(" \n\n\n        -----BREAKPOINT----- \n\n\n\n");

    // 	await taskCollection.deleteMany({});

    // 	console.log("done");

    // 	return 4;
    // },

	getUserById: async function getUserById(id){
		
		if (!id) throw "You must provide an id to search for";

	    const userCollection = await users();
	    const user = await userCollection.findOne({ _id: id });
	    if (user === null) throw "No user with that id";

	    return user;

	}


};