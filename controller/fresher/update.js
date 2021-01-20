const Fresher = require('../../models/fresher');

exports.updatefresher =function (req, res) {
    
  
  Fresher.findOneAndUpdate({'user': req.params.user},req.body,{
            upsert: true,
           })  
    .then(()=>res.json(' updated'))
    .catch(err => res.status(400).json('Error:'+err));
 }
  //    const user = req.params.user;
//     // const id = req.params.id;      
//     const updateObject = req.body;
//     Fresher.updateOne({ user:user}, { $set:updateObject })
//       .exec()  
//       .then(() => {  
//         res.status(200).json({
//           message: 'hire is updated',
//           updatenew: updateObject,   
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           message: 'Server error'
//         });
//       });
//   }
  // exports.updatefresher=function (req,res) {
  //   Fresher.update({'user': req.params.userid},
    
  //   {'$set': {'user': req.body,}}, 
  //       function(err,model) {
  //         if(err){
  //             console.log(err);
  //             return res.send(err);
  //           }
  //           return res.json({new: true});
  //         });
  //  } 
  // exports.updatefresher=function (req, res) {
  //   var fresher_id = req.params.user;
  //     Fresher.findByIdAndUpdate(
  //       fresher_id,
  //       { $push: {"user": req.body}},
  //       {  safe: true, upsert: true},
  //         function(err, model) {
  //           if(err){
  //            console.log(err);
  //            return res.send(err);
  //           }
  //            return res.json(model);
  //   })}
exports.addeducation=function (req, res) {
    var user = req.params.user;
      Fresher.findOneAndUpdate(
        user,
        { $push: {"education": req.body}},
        {  safe: true, upsert: true},
          function(err, model) {
            if(err){
             console.log(err);
             return res.send(err);
            }
             return res.json(model);
    })}
    
exports.updateeducation=function (req,res) {
    Fresher.update({'education._id': req.params.educationid},
    {'$set': {'education.$': req.body,}}, 
        function(err,model) {
          if(err){
              console.log(err);
              return res.send(err);
            }
            return res.json({new: sucess});
          });
   }      
   exports.addexperience=function (req, res) {
    var user = req.params.user;
      Fresher.findOneAndUpdate(
        user,
        { $push: {"experience": req.body}},
        {  safe: true, upsert: true},
          function(err, model) {
            if(err){
             console.log(err);
             return res.send(err);
            }
             return res.json(model);
    })}
    
exports.updateexperience=function (req,res) {
    Fresher.update({'experience._id': req.params.educationid},
    {'$set': {'experience.$': req.body,}}, 
        function(err,model) {
          if(err){
              console.log(err);
              return res.send(err);
            }
            return res.json({new: true});
          });
   }      
