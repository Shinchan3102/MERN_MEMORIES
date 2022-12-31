const jwt=require('jsonwebtoken');

const auth=async(req,res,next)=>{
    try{
        console.log('i am here')
        const token= req.headers.authorization.split(" ")[1];
        if(token && (token.length < 500)){
            const data= await jwt.verify(token,'tokenSecretKey');
            req.userId=data?.id;
        }
        else{
            const data= await jwt.decode(token);
            req.userId=data?.sub;
        }
        next();
    }catch(err){
        console.log(err);
    }
}

module.exports=auth;