var express = require('express');
var router = express.Router();
const {User} = require('../library/auth')
/* GET users listing. */

router.post('/register',async(req,res)=>{
  const{name,email,password,pic}=req.body;
  if(!name||!email||!password){
      res.status(400);
      throw new Error("please Enter all the Field")
  }
  const userExists = await User.findOne({email});
  if(userExists){
      res.status(400).send('user already exists')
  }
  const user = await User.create({
      name,
      email,
      password,
      pic,
  });
  if(user){
      res.status(201).json({
          message:'user Created Successfully',
          _id:user._id,
          name:user.name,
          email:user.email,
          pic:user.pic,
      })
  }else{
      res.status(400);
      throw new Error("Failed to create user")
  }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
  
    if(user && (await user.matchPassword(password))){
        res.json({
            message:"user login Successfully",
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
        })
    }else{
        res.status(400).send('Invalid Email and Password')
         console.log('Invalid Email and Password' );
  
    }
})

module.exports = router;
