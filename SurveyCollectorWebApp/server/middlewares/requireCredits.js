module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits!" }); //HTTP 403: Forbidden
  }

  next();
};
