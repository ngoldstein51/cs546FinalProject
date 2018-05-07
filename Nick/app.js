const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path=require("path");
const staticCSS = express.static(path.join(__dirname + "/public"));
const handle = require("express-handlebars");
const cookies=require("cookie-parser");
const bcrypt=require("bcrypt");

const pokemanAPI = require("./pokemanAPI.js");

app.use("/",staticCSS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookies());

app.engine("handlebars",handle({defaultLayout: "main"}));
app.set("view engine","handlebars");

users=[
{
hash:"$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
username: "masterdetective123",
FirstName: "Sherlock",
LastName: "Holmes",
Profession: "Detective",
Bio: 'Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. \
Known as a "consulting detective" in the stories, Holmes is known for a proficiency with observation, forensic science, \
and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, \
including Scotland Yard.'},
{
hash:"$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
username: "lemon",
FirstName: "Elizabeth",
LastName: "Lemon",
Profession: "Writer",
Bio: 'Elizabeth Miervaldis "Liz" Lemon is the main character of the American television series 30 Rock.\
 She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.'},
{
hash:"$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
username:"theboywholived",
FirstName: "Harry",
LastName: "Potter",
Profession: "Student",
Bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling.\
 The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley,\
  all of whom are students at Hogwarts School of Witchcraft and Wizardry . \
  The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal,\
   overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."}
];

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");

if(process && process.send) process.send({done: true});

	app.get("/", (req, res) => {
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
		if(index!=-1 && result){
			res.cookie("AuthCookie",hash);
			res.redirect("private");
		}else{
			res.render("index",{
					title: "Log in",
					error: "Error, incorrect login info"
			});
		}
	});

	app.get("/private", (req, res) => {
		user=getUser(req.cookies.AuthCookie)

		if(!user){
			res.render("notLoggedIn",{
		 			title: "Sorry you are not logged in"
		 	});
		}else{
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

function getUser(hash){
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
