import jwt from "jsonwebtoken"

const tokensecret= process.env.TOKRENVALUE!

export const createtoken= (userid:string)=>{
    return jwt.sign({
        userid:userid
    },tokensecret,{
        expiresIn:"7d"
    })
}