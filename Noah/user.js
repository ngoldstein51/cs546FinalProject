const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;

async function addUser(username, password, favorites)
{
  if(typeof username!=='string'|| typeof password!=='string'||typeof favorites!=='object')
    throw "addUser: Invalid arguments"

  let newUser=
  {
    "username":username,
    "password":password,
    "favoites":favorites
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
  if(arguments.length!==1||typeof id!=='object')
    throw "getUser: Invalid arguments"

  if (!id) throw "You must provide an id to search for";

  const UserCollection = await users();
  const user = await UserCollection.findOne({ _id: id });
  if (user === null) throw "No user with that id";

  return user;
}

async function removeUser(id)
{
  if(arguments.length!==1||typeof id!=='object')
    throw "removeUser: Invalid arguments"

  if (!id) throw "You must provide an id to search for";

  const UserCollection = await users();
  const removeInfo = await UserCollection.removeOne({ _id: id });

  if (removeInfo.removedCount === 0)
    throw "Could not remove user with id of ${id}";
}

async function removeAllUsers()
{
  const userList=await getAllUsers();

  for(let i=0;i<userList.length;i++)
  {
    await removeUser(userList[i]._id);
  }
}


module.exports = {
    firstName: "Noah", 
    lastName: "Goldstein", 
    studentId: "10412616",
    addUser,
    getAllUsers,
    getUser,
    removeUser,
    removeAllUsers
};