const express=require('express')
const router=express.Router();
const auth=require("../../middleware/auth");
const User=require("../../models/User")
const jwt=require('jsonwebtoken')
const data=require("../../config/default")
const {check,validationResult}=require('express-validator');

const bcrypt=require('bcryptjs');
router.get('/',auth,async (req,res)=> {
    try{

        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("error form profile js fileee");
    }
    res.send('profile route');
});
router.post('/',[
    check('email',"needed validd emaill").isEmail(),
    check('password',"need passswordd").exists()
    
    ],
    async (req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {email,password}=req.body;
        try{
            let user=await User.findOne({email});
        console.log(req.body);
        if(!user){
                res.status(400).json({errors:[{msg:"invalided creditentins no userr"}]})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({errors:[{msg:"invalided creditentins wrong password"}]})
        }
        
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,data.secret,{expiresIn:3600},
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
    })
module.exports=router;