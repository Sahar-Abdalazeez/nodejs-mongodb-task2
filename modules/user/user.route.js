const  { userModel } =require ('../../DB/model/user.model');
const { signup,signin,updateUser,getUser,getUserDataAgeLessThan30 } =require ('./controller/user.controller');

const router = require("express").Router();
router.get("/", (req, res) => {
  const users = userModel.find();
  res.json({ message: "user page" });
});
router.post('/signup', signup);
router.get('/signin', signin);
router.put('/updateUser/:id', updateUser);
router.get('/getUser/:id', getUser);
router.get('/getUserDataAgeLessThan30', getUserDataAgeLessThan30);


module.exports = router;
