const models = require("../models");
const bcrypt = require("bcrypt");

GenHash = async pass => {
  let salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(pass, salt);
  let password = { hash: hash, salt: salt };
  return password;
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
}

module.exports = UserController;
