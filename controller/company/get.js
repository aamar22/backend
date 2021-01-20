const Company = require('../../models/company');

exports.getcompany =async function (req,res){
    Company.find()
    .then(company=>res.json(company))
    .catch(err=>res.status(400).json('Error'+err));

}

