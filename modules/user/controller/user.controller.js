const  { userModel } =require ('../../../DB/model/user.model');
const bcrypt = require('bcryptjs');

//signup
const signup =async (req, res) => {
    
    const { firstname, lastname, email, age, password, cpassword } = req.body;
    // check if the password and confirm password match
    if (password === cpassword) {
       // check if there is any user witht he same email
       const user = await userModel.findOne({email: email})

        if (user){
            res.json("email already exists");
        }
        else {
            //hash the password 
            const hashedPassword = await bcrypt.hash(password, 8);
            //create the user object 
            const newUser = new userModel({ firstname, email, lastname, age, password: hashedPassword });
            //save the user in the databa
            const savedUser = await newUser.save();
            res.json({message:"registeres successfully ",savedUser })
        }      
    }
    else {
         res.json("password match")
}
}


module.exports = { signup };