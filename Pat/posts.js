const mongoCollections = require("./mongoCollections");
const posts = mongoCollections.posts;
const uuidv4 = require('uuid/v4');


module.exports = {

	createThread: async function createThread(post,comments){

    	// if (!username) throw "You must provide a username for your user";
    	// if (!password) throw "You must provide a password for your user";

  //   	if(typeof username !== 'string')
		// 	throw "username must be a string";
		// if(typeof password !== 'string')
		// 	throw "password must be a string";

    	const postCollection = await posts();




    	var newThread ={};
		var newPost = {};

		newThread['comments'] = comments;



		newPost['_id'] = uuidv4();
		newPost['title'] = title;
		newPost['author'] = author;
		newPost['details'] = details;
		newPost['tags'] = tags;
		newPost['content'] = content;

		//breakpoint
	    
	    const insertInfo = await postCollection.insertOne(newPost);
	    if (insertInfo.insertedCount === 0) throw "Could not add post";

	    const newId = insertInfo.insertedId;

	    const post = await this.getPostById(newId);
	    return post;


	},

	getAllPosts: async function getAllPosts(){
    	
    	const postCollection = await posts();

    	const posts = await postCollection.find({}).toArray();

    	return posts;
    },
    // deleteAll: async function deleteAll(){
    	
    // 	const taskCollection = await todoItems();
    // 	// console.log(" \n\n\n        -----BREAKPOINT----- \n\n\n\n");

    // 	await taskCollection.deleteMany({});

    // 	console.log("done");

    // 	return 4;
    // },

	getPostById: async function getPostById(id){
		
		if (!id) throw "You must provide an id to search for";

	    const postCollection = await posts();
	    const post = await postCollection.findOne({ _id: id });
	    if (post === null) throw "No post with that id";

	    return post;

	},

	createComment: async function createComment(postId, author, content){

		const postCollection = await posts();

	}


};