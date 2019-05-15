import models from "../models";
import bcrypt from "bcrypt";

const saltRounds = 12;

const GenHash = async pass => {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(pass, salt);
  let password = { hash: hash, salt: salt };
  return password;
};

const validateHash = async (pass, hash, salt) => {
  let checkHash = await bcrypt.hash(pass, salt);
  return hash === checkHash;
};

const buildUser = (name, password) => {
  return {
    name: name,
    photo: null,
    hash: password.hash,
    salt: password.salt
  };
};

class UserController {
  static async createUser(data) {
    let password = await GenHash(data.pass);
    let userAttributes = buildUser(data.name, password);
    return models.users.create(userAttributes);
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
    return models.users.findOne({ where: { id: id } });
  }
  static async validatePassword(pass, hash, salt) {
    let validate = await validateHash(pass, hash, salt);
    return validate;
  }
}

export default UserController;
