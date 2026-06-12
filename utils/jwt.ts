import jwt from "jsonwebtoken"

const tokensecret= process.env.TOKRENVALUE!

export const createtoken= (userid:string,program:string,university:string)=>{
    return jwt.sign({
        userid:userid,
        program:program,
        university:university
    },tokensecret,{
        expiresIn:"7d"
    })
}