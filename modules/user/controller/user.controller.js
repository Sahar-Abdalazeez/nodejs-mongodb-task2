const  { userModel } =require ('../../../DB/model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

//signin
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({email:email})

    if (!user) {
        res.json(" invalid email ")
    }
    else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user._id }, 'sahartoken');
            res.json({message:"login successfully", token})
        }
        else {
            res.json(" invalid data ")
}
    }
}

//update user by id 
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, age, password } = req.body;

    const user = await userModel.findByIdAndUpdate(
        id,
        { firstname, lastname, email, age, password },
        {new:true}
    )
    res.json({message :"updated successfully ", user})
}

//get user by id 
const getUser = async(req,res)=> {
    const { id } = req.params;

    const user = await userModel.findById(
        id,
    );
    if (user) {
        res.json ({message:'user found ', user})
    }
    else {
        res.json({message: 'user not found '})
    }
}

//users with age less than 30
const getUserDataAgeLessThan30 =async (req, res) => {
    const users = await userModel.find({ age: { $lt: 30 } });
    if (users) {
            res.json({message:" users age less than 30", users})

    }
    else {
        res.json({message:" no user found with age less than30 "})
    }
}

module.exports = { signup,signin,updateUser,getUser,getUserDataAgeLessThan30 };