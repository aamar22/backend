const Company = require('../../models/company');




  exports.updatecompany =function (req, res) {
      
    
    Company.findOneAndUpdate({'user': req.params.user},req.body,{
              upsert: true,
             })  
      .then(()=>res.json(' updated'))
      .catch(err => res.status(400).json('Error:'+err));
   }
    
 
  exports.addcontact=function (req, res) {
      var user = req.params.user;
        Company.findOneAndUpdate(
          user,
          { $push: {"contact": req.body}},
          {  safe: true, upsert: true},
            function(err, model) {
              if(err){
               console.log(err);
               return res.send(err);
              }
               return res.json(model);
      })}
      
  exports.updatecontact=function (req,res) {
      Company.update({'contact._id': req.params.contactid},
      {'$set': {'contact.$': req.body,}}, 
          function(err,model) {
            if(err){
                console.log(err);
                return res.send(err);
              }
              return res.json({new: sucess});
            });
     }      
     exports.addaddress=function (req, res) {
      var user = req.params.user;
        Company.findOneAndUpdate(
          user,
          { $push: {"address": req.body}},
          {  safe: true, upsert: true},
            function(err, model) {
              if(err){
               console.log(err);
               return res.send(err);
              }
               return res.json(model);
      })}
      
  exports.updateaddress=function (req,res) {
      Company.update({'address._id': req.params.addressid},
      {'$set': {'address.$': req.body,}}, 
          function(err,model) {
            if(err){
                console.log(err);
                return res.send(err);
              }
              return res.json({new: true});
            });
     }      
  
  