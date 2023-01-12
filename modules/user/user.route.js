const  { userModel } =require ('../../DB/model/user.model');
const { signup } =require ('./controller/user.controller');

const router = require("express").Router();
router.get("/", (req, res) => {
  const users = userModel.find();
  res.json({ message: "user page" });
});

router.post('/signup', signup);
module.exports = router;
