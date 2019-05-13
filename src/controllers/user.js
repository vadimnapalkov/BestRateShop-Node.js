import models from "../models";
import bcrypt from "bcrypt";

const GenHash = async pass => {
  let salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(pass, salt);
  let password = { hash: hash, salt: salt };
  return password;
};

const validatePassword = async (pass, hash, salt) => {
  let checkHash = await bcrypt.hash(pass, salt);
  return hash === checkHash;
};

const BuildUser = (name, password) => {
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
  static createUserByVk(id, name, photo) {
    return models.users.findOrCreate({
      where: { id: id, name: name, photo: photo }
    });
  }
  static findById(id) {
    return models.users.findAll({ where: { id: id } });
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

export default UserController;
