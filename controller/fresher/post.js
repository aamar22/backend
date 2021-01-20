const Fresher = require('../../models/fresher');
const user =require ('../../routes/api/users')
    

//  exports.get= async (req, res) => {
//   const Fresher = await Fresher.find({}).populate('Users');
//   res.send(Fresher);
//  }
exports.postfresher = async function (req,res){
     
  //  const newFresher
  //   return Fresher.findOne({ user: User.id })
  //     .populate('Users').exec((err, user) => {
  //       console.log("Populated User " + posts);
  //     })
  // }
  
       
     const newFresher = new Fresher({    
    //   //user : req.Tokens.userId,
    //  // _id: new mongoose.Types.ObjectId(),
        user: req.user_._id,
        profilepic : req.body.profilepic,    
        fullname : req.body.fullname,  
        tittle : req.body.tittle,   
        introduction : req.body.introduction,
        skills : req.body.skills,
        education :req.body.education,
        experience : req.body.experience, 
        mobileno :req.body.mobileno,
        location : req.body.location,
        hirestatus : req.body.hirestatus  ,
      
     });
     
   newFresher.save()
      .then(()=>res.json('Added'))   
      .catch(err=> res.status(400).json('Error:'+err));
    }  