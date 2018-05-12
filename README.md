# cs546FinalProject
Pokemon Database and usage site

Our website uses a pokemon api to get information for you about any pokemon that you want.
It can also give you our best guess at a pokemon which will be able to beat your rival.

Our site features a user database, a place to test pokemon matchups, and a built in forum to give us feedback. You can aslo save pokemon for later in your favorites list.

To use our project, simply spin up a mongo database, run "node seed.js" to seed the user collection with a user :admin :password, and run "node app.js". The site will be active on http://localhost:3000/