
const { user} = require("../model/user");
const {jwt}= require("jsonwebtoken");
const {accessToken}=require("../utils/utils")
exports.refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.findOne({ token: refreshToken });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if(err) return res.json({msg:"refresh token expire"});
            const userId = user.id;
            const username = user.username;
            const email = user.email;
           const accessToken = accessToken(user.email,user.id)
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}   