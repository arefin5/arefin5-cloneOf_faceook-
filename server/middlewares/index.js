import Post from '../models/post'
import expressJwt from "express-jwt";

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
     try{
      const post = await Post.findById(req.params._id);
// console.log('Post in editDelete=>',post)
if(req.user._id !=post.postedBy._id){
  return res.send("Unauthorized")
}else{
  next();
  
}
     }catch(err){
       console.log(err)
     }
};

export const isAdmin =async (req, res, next) => {
 try{
 const user= await User.findById(req.user._id);
  if (user.role === "Admin") {
    next();
  } else {
    res.send("Unauthorized");
  }
 }
 catch(err){
   console.log(err)
 }
}
