

export default async function loginUser(req,res) {
    const {cred,password}=req.body
    console.log(cred,password)
    return res.json({message:"Hello"})
}