const userRouter = {
  session(req, res) {
    if (req.user !== undefined)
      return res.json(JSON.stringify(req.user, ["id", "name", "photo"]));
    else;
    return res.json();
  },
  destroySession(req, res) {
    req.session.destroy();
    res.end();
  }
};
export default userRouter;
