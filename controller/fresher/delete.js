const Fresher = require('../../models/fresher');


exports.deletefresher =async function (req,res){
    Fresher.findByIdAndDelete(req.params.id)
    .then(()=> res.json('fresher Deleted'))
    .catch(err => res.status(400).json('Error:'+err));
}

exports.deleteeducation =async function (req,res){
    var fresher_id = req.params.fresherid,
    education_id = req.params.educationid;  
  Fresher.findByIdAndUpdate(
    fresher_id,
   { $pull: { 'education': {  _id: education_id } } },function(err,model){
      if(err){
       	console.log(err);
       	return res.send(err);  
        }
        return res.json({deleted: true});
  })}

  exports.deleteexperience =async function (req,res){
    var fresher_id = req.params.fresherid,
    experience_id = req.params.experienceid;  
  Fresher.findByIdAndUpdate(
    fresher_id,
   { $pull: { 'experience': {  _id: experience_id } } },function(err,model){
      if(err){
       	console.log(err);
       	return res.send(err);  
        }
        return res.json({deleted: true});
  })}

