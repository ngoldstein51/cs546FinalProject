const path = require("path");
// const privateRoutes = require("./private");
// const loginRoutes = require("./login");
// const logoutRoutes = require("./logout");

const data = require("../data");
const postData = data.posts;
const userData = data.users;


const constructorMethod = (app) => {


	// app.use("/", (req,res) => {

	// 	res.render("palindrome/palindrome");
	// });


	
	app.use("*", async(req,res) => {
	
		// var d = await postData.deleteAll();
		// var newPost = await postData.createPost("First Post","Pat Song","This is the first post","tags","Welcome to the first post!",[]);

		// var newC = await postData.createComment("e10c6c8b-bbba-4cce-95bb-8ebca6eb59f0","Pat Song","Hey cool post!");

		// var posts = await postData.getAllPosts();


		// for (var i = posts.length - 1; i >= 0; i--) {
			
		// 	var comments = posts[i]['comments'];

		// 	for (var c = comments.length - 1; c >= 0; c--) {
		// 		console.log(comments[c]);
		// 	}
		// }
		// console.log(posts);


		var newUser = await userData.createUser("patsong17","password!");

		var users = await userData.getAllUsers();
		console.log(users);

		res.status(404).json({error: "Not Foundss!"});
	});


	


};

module.exports = constructorMethod


