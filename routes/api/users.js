const express=require('express')
const router=express.Router();
const jwt=require('jsonwebtoken')
const data=require("../../config/default")
const secret=data.secret
const {check,validationResult}=require('express-validator');
const User=require('../../models/User')
const bcrypt=require('bcryptjs');
router.get('/',(req,res)=>{
    res.send("get route from users js")
});
router.post('/',[
    check('name',"names is neededdd").not().isEmpty(),
    check('email',"needed validd emaill").isEmail(),
    check('password',"need atleast 6 leng").isLength({min:6})
    
    ],
    async (req,res)=>{
      
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {name,email,password}=req.body;

        try{
            let user=await User.findOne({email});
        if(user){
                res.status(400).json({errors:[{msg:"user already exit"}]})
        }
        user=new User({
            name,email,password
        }) ;
        const salt= await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,secret,{expiresIn:3600},
        (err,token)=>{
            if(err) {throw err};
            res.json({token});
            console.log(token);
        });
        }
        catch(err){
            console.log(err.message); 
            res.status(500).send("the server erorree");
        }

    });
module.exports=router
