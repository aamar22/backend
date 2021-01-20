const Company = require('../../models/company');

exports.postcompany =async function (req,res){

   
     const companyname = req.body.companyname;
     const about = req.body.about;
     const contact = req.body.contact;
     const address =req.body.address;
     
     
     
     const newcompany = new Company({
        
         companyname,
         about,
         contact,
         address
 
     });
     newcompany.save()
            .then(()=>res.json('Added'))
            .catch(err=> res.status(400).json('Error:'+err));
            
 } 