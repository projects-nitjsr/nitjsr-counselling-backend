const getUserByRegNo = (req, res) => {
  const userId = req.params.id;
  res.send(`getUserByRegNo called with id: ${userId}`);
};
module.exports = getUserByRegNo;
