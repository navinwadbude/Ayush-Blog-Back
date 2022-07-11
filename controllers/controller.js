const User = require('../model/index')
module.exports = {
    signup:async(req,res)=>{
        try{
            const result = await User.find({ name: req.body.name});
            console.log("result",result);
            // if (result) {
            //     return   res.send('user already exist')
                
            // }
            // const user = new User(req.body)
            console.log("user",{...req.body});

            const createuser = await User({...req.body}).save();
            res.status(201).send(createuser)
        }catch(error){
            console.error("Error", error)
           res.status(400).send(error);
        }
       
    },
   

    login: async (req, res) => {
        const result = await User.find({ name: req.body.username });
        console.log(result)
        const db_pass = result[0].password;
        
        const user_pass = req.body.password;
        console.log("db_pass",db_pass);
        if(db_pass == user_pass){
            res.send('login successfully')
        }else{
            res.send('invalid login details')
        }
    }
}
