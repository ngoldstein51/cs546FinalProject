const mongoCollections = require("./mongoCollections");
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

		var newUser = {};

		newTask['_id'] = uuidv4();
		newTask['username'] = username;
		newTask['password'] = password;
		//breakpoint
	    
	    const insertInfo = await taskCollection.insertOne(newTask);
	    if (insertInfo.insertedCount === 0) throw "Could not add user";

	    const newId = insertInfo.insertedId;

	    const user = await this.getUserById(newId);
	    return user;


	},

	getAllUsers: async function getAllUsers(){
    	
    	const userCollection = await users();

    	const users = await userCollection.find({}).toArray();

    	return users;
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

	},

	completeTask: async function completeTask(taskId){

		if(!taskId) throw "Must provide a taskId";
	    const taskCollection = await todoItems();
	    const updatedInfo = await taskCollection.update(
   			{ _id: taskId },
   			{	$set: 
   				{	
   					completed: true, 
   					completedAt: Date() 
   				}
   			}
		)

   		if (updatedInfo.modifiedCount === 0) {
      		throw "could not update task successfully";
    	}

	    var task = module.exports.getTask(taskId);

		return task;

	},

	removeTask: async function removeTask(id){

		if (!id) throw "You must provide an id to search for";

    	const taskCollection = await todoItems();
    	const deletionInfo = await taskCollection.removeOne({ _id: id });

    	if (deletionInfo.deletedCount === 0) {
      		throw `Could not delete task with id of ${id}`;
   		}

   		return true;

	}


};