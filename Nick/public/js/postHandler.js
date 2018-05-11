

function newPost(id){
	var postParent = document.getElementById("postParent");
	var postTitle = document.createElement("input");
	var postContent = document.createElement("textarea");
	var postSave = document.createElement("button");
	var postTempDiv = document.createElement("div");

	postSave.innerHTML = "Add new post!";
	postSave.setAttribute("class", "post-entries");

	postContent.setAttribute("class", "post-entries");
	postContent.setAttribute("placeholder", "Post Content");
	postContent.setAttribute("style", "height: 200px; width: 80%;");

	postTitle.setAttribute("class", "post-entries");
	postTitle.setAttribute("placeholder", "Post Title");	

	postTempDiv.append(postTitle);
	postTempDiv.append(postContent);
	postTempDiv.append(postSave);
	postTempDiv.setAttribute("class", "post");

	postParent.prepend(postTempDiv);
}


function postNewComment(id, commentText){
	console.log("I am being called somehow")
}

function newComment(id){
	var commentParent = document.getElementById("comments");
	var newCommentInput = document.createElement("textarea");
	var newCommentSave = document.createElement("button");
	var newCommentTempDiv = document.createElement("div");

	newCommentInput.setAttribute("style", "height: 200px; width: 80%;margin: 10px;");
	newCommentInput.setAttribute( "placeholder", "Type your comment here!" );


	newCommentSave.setAttribute( "onClick", "javascript: postNewComment();" );
	newCommentSave.innerHTML = "Save New Comment";

	newCommentTempDiv.append(newCommentInput);
	newCommentTempDiv.append(newCommentSave);

	commentParent.append(newCommentTempDiv);

}