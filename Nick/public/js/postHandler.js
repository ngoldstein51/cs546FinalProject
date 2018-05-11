var inProgressNewPost = false;
var inProgressNewComment = false;

function newPost(id){
	if(!inProgressNewPost){
		inProgressNewPost = true;
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
}


function postNewComment(userId,postId){
	var newComment = document.getElementById("newCommentInput");
	var commentValue = newComment.value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("It worked!");
			alert("Comment has successfully been added!");
			window.location.replace("/forum");
		}else if(this.readyState == 4 && this.status == 400){
			alert("There was a problem adding this comment. Please try again, or refresh the page.");
		}else{
			//not done yet
			//console.log("Hello " + this.status + " and  " + this.readyState);
		}
	};

    xhttp.open("POST", "/forum/newComment", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	var myData = {};
	myData.userId = userId;
	myData.postId = postId;
	myData.commentValue = commentValue;
	xhttp.send(JSON.stringify(myData));
	
}

function newComment(userId,postId){
	if(!inProgressNewComment){
		inProgressNewComment = true;
		var commentParent = document.getElementById("comments");
		var newCommentInput = document.createElement("textarea");
		var newCommentSave = document.createElement("button");
		var newCommentTempDiv = document.createElement("div");

		newCommentInput.setAttribute("style", "height: 200px; width: 80%;margin: 10px;");
		newCommentInput.setAttribute("id", "newCommentInput");
		newCommentInput.setAttribute( "placeholder", "Type your comment here!" );


		newCommentSave.setAttribute( "onClick", "javascript: postNewComment('userId','postId');" );
		newCommentSave.innerHTML = "Save New Comment";

		newCommentTempDiv.setAttribute("id", "newCommentTempDiv");

		newCommentTempDiv.append(newCommentInput);
		newCommentTempDiv.append(newCommentSave);

		commentParent.append(newCommentTempDiv);
	}
}
