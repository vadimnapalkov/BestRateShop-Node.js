const User = require("../controllers/user");

exports.post = (req, res) => {
  const data = req.body.user;
  User.getByName(data.name, user => {
    if (user.length != 0) {
      res.json();
    } else {
      User.createUser(data, newUser => {
        res.json(User.toJson(newUser.dataValues));
      });
    }
  });
};
