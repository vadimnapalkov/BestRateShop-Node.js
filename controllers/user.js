const models = require("../models");
const bcrypt = require("bcrypt");

GenHash = (pass, cb) => {
  bcrypt.genSalt(12, (err, salt) => {
    if (err) return cb(err);
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) return cb(err);
      let password = { hash: hash, salt: salt };
      return cb(null, password);
    });
  });
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
  static createUser(data, cb) {
    GenHash(data.pass, (err, password) => {
      if (err) return cb(err);
      let user = BuildUser(data.name, password);
      models.users.create(user).then(item => {
        cb(item);
      });
    });
  }
  static getByName(name, cb) {
    models.users.findAll({ where: { name: name } }).then(item => {
      cb(item);
    });
  }
  static toJson(user) {
    let userResponse = {
      id: user.id,
      name: user.name,
      photo: user.photo
    };
    return userResponse;
  }
}

module.exports = UserController;
