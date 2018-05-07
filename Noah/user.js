const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;

async function addUser(id, username, password)
{
  if(typeof id!=='string'||typeof username!='string'|| typeof password!='string')
    throw "addUser: Invalid arguments"

  let newUser=
  {
    "id"=id,
    "username"=username,
    "password"=password
  }

  const UserCollection = await users();

  const insertInfo = await UserCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Could not add user";

  const newId = insertInfo.insertedId;

  const user = await this.getUser(newId);
  return user;
}

async function getAllUsers()
{
  const UserCollection = await users();

  const allUsers = await UserCollection.find({}).toArray();

  return allUsers;
}

async function getUser(id)
{
  if(arguments.length!==1||typeof id!=='string')
    throw "getUser: Invalid arguments"

  if (!id) throw "You must provide an id to search for";

  const UserCollection = await users();
  const user = await UserCollection.findOne({ _id: id });
  if (user === null) throw "No user with that id";

  return user;
}

async function removeUser(id)
{
  if(arguments.length!==1||typeof id!=='string')
    throw "removeUser: Invalid arguments"

  if (!id) throw "You must provide an id to search for";

  const UserCollection = await users();
  const removeUser = await UserCollection.removeOne({ _id: id });

  if (removeInfo.removedCount === 0)
    throw "Could not remove user with id of ${id}";
}


module.exports = {
    firstName: "Noah", 
    lastName: "Goldstein", 
    studentId: "10412616",
    addUser,
    getAllUsers,
    getUser,
    removeUser
};