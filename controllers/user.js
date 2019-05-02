const models = require("../models");
const bcrypt = require("bcrypt");

GenHash = async pass => {
  let salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(pass, salt);
  let password = { hash: hash, salt: salt };
  return password;
};

validatePassword = async (pass, hash, salt) => {
  console.log(pass, hash, salt);
  let checkHash = await bcrypt.hash(pass, salt);
  return hash === checkHash;
};

BuildUser = (name, password) => {
  let user = {
    name: name,
    photo: null,
    hash: password.hash,
    salt: password.salt
  };
  return user;
};

class UserController {
  static async createUser(data) {
    let password = await GenHash(data.pass);
    let user = BuildUser(data.name, password);
    return models.users.create(user);
  }
  static getByName(name) {
    return models.users.findAll({ where: { name: name } });
  }
  static async authenticateUser(user) {
    let searchUser = await this.getByName(user.name);
    if (searchUser.length == 0) return null;
    let validate = await validatePassword(
      user.password,
      searchUser[0].hash,
      searchUser[0].salt
    );
    if (validate) return searchUser[0];
    else return null;
  }
}

module.exports = UserController;
