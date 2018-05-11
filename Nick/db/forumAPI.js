const mongoCollections = require("./mongoCollections.js");
const posts = mongoCollections.posts;
const uuidv4 = require('uuid/v4');

module.exports = {
 
	createPost: async function createPost(title,author,content,comments){

    	// if (!username) throw "You must provide a username for your user";
    	// if (!password) throw "You must provide a password for your user";

  //   	if(typeof username !== 'string')
		// 	throw "username must be a string";
		// if(typeof password !== 'string')
		// 	throw "password must be a string";

    	const postCollection = await posts();


    	var newPost ={};

		newPost['_id'] = uuidv4();
		newPost['title'] = title;
		newPost['author'] = author;
		newPost['content'] = content;
		newPost['comments'] = comments;

		//breakpoint
	    
	    const insertInfo = await postCollection.insertOne(newPost);
	    if (insertInfo.insertedCount === 0) throw "Could not add post";

	    const newId = insertInfo.insertedId;

	    const addedPost = await this.getPostById(newId);
	    return addedPost;


	},

	getAllPosts: async function getAllPosts(){
    	
    	const postCollection = await posts();

    	const allPosts = await postCollection.find({}).toArray();
    	return allPosts;
    },
    deleteAll: async function deleteAll(){
    	
    	const postCollection = await posts();
    	// console.log(" \n\n\n        -----BREAKPOINT----- \n\n\n\n");

    	await postCollection.deleteMany({});

    	console.log("done");

    	return 4;
    },

	getPostById: async function getPostById(id){
		
		if (!id) throw "You must provide an id to search for";

	    const postCollection = await posts();
	    const post = await postCollection.findOne({ _id: id });
	    if (post === null) throw "No post with that id";

	    return post;

	},

	createComment: async function createComment(postId, author, content){

		const postCollection = await posts();
	    const post = await postCollection.findOne({ _id: postId });
	    if( post === null) throw "No Post with that id";

	    var comments = post['comments'];
	    var newComment = {};

	    newComment['commentId'] = uuidv4();
	    newComment['postId'] = postId;
	    newComment['author'] = author;
	    newComment['content'] = content;
	    newComment['timestamp'] = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

	    comments.push(newComment);

	    const updatedInfo = await postCollection.update(
   			{ _id: postId },
   			{	$set: 
   				{	
   					comments: comments
   				}
   			}
		)

   		if (updatedInfo.modifiedCount === 0) {
      		throw "could not add comment successfully";
    	}


	    return newComment;

	},

	deleteComment: async function deleteComment(postId, commentId){

		const postCollection = await posts();
	    const post = await postCollection.findOne({ _id: postId });
	    if( post === null) throw "No Post with that id";

	    var comments = post['comments'];
	    var deletedComment ={};

	    for (var i = comments.length - 1; i >= 0; i--) {
	    	var currComment = comments[i];
	    	if(currComment['commentId'] === commentId){
	    		deletedComment=currComment;
	    		comments.splice(i,1);
	    	}
	    }

	    const updatedInfo = await postCollection.update(
   			{ _id: postId },
   			{	$set: 
   				{	
   					comments: comments
   				}
   			}
		)

   		if (updatedInfo.modifiedCount === 0) {
      		throw "could not delete comment successfully";
    	}


	    return deletedComment;

	},

	deletePost: async function deletePost(postId){

		const postCollection = await posts();
	   	

	   	const post = await postCollection.findOne({ _id: postId });
	    if( post === null) throw "No Post with that id";

	    const deletionInfo = await postCollection.removeOne({ _id:postId });

	    if(deletionInfo.deletedCount === 0){
	    	throw 'Could not delete post'
	    }

	    return post;


	}

};