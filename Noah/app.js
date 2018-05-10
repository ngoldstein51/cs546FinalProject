const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path=require("path");
const staticCSS = express.static(path.join(__dirname + "/public"));
const handle = require("express-handlebars");
const cookies=require("cookie-parser");
const bcrypt=require("bcrypt");
const Users = require("./user");

app.use("/",staticCSS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookies());

app.engine("handlebars",handle({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");

if(process && process.send) process.send({done: true});

app.get("/", (req, res) => {
	main();
	user=getUser(req.cookies.AuthCookie);

	if(user)
	{
		res.redirect("private");
	}
	else
	{
		res.render("index",{
				title: "Log in"
		});
	}
});

app.post("/login", async (req, res) => {
	i=0
	index=-1
	while(i<users.length)
	{
		if(users[i].username===req.body.username)
		{
			index=i;
			break;
		}
		i++;
	}

	if(index!=-1)
	{
		hash=users[index].hash;
		result=await bcrypt.compare(req.body.password, hash);
	}
	if(index!=-1 && result)
	{
		res.cookie("AuthCookie",hash);
		res.redirect("private");
	}
	else
	{
		res.render("index",{
				title: "Log in",
				error: "Error, incorrect login info"
		});
	}
});

app.get("/private", (req, res) => {
	user=getUser(req.cookies.AuthCookie)

	if(!user)
	{
		res.render("notLoggedIn",{
	 			title: "Sorry you are not logged in"
	 	});
	}
	else
	{
		user1=Object.assign({},user);
		delete(user1.hash);
		res.render("userDisplay",{
	 			title: "User info",
	 			user: JSON.stringify(user1)
	 	});
		res.status(403);
	}
});

app.get("/logout", (req, res) => {
 	res.clearCookie("AuthCookie");

 	res.render("loggedOut",{
	 			title: "You have been logged out"
	 	});
});

});

function getUser(hash)
{
	if(!hash)
		return undefined;

	i=0
	index=-1
	while(i<users.length)
	{
		if(users[i].hash===hash)
		{
			index=i;
			break;
		}
		i++;
	}

	return users[index];
}

async function main() {
	await Users.addUser("Noah","1111",["bulb"]);
	await Users.addUser("Nick","2222",["bulb","liz"]);
	await Users.addUser("Pat","1234",["char"]);
	
	let db=await Users.getAllUsers()
    console.log(db);

    let updateFav=db[0]["favorites"];
    updateFav.push("mew");
    await Users.updateUserFav(db[0]["_id"], updateFav);

    db=await Users.getAllUsers();

	console.log(db);

    await Users.removeAllUsers();

    db=await Users.getAllUsers()
    console.log(db);
}