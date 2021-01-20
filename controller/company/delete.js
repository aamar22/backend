const Company = require('../../models/company');

exports.deletecompany =async function (req,res){
    Company.findByIdAndDelete(req.params.id)
    .then(()=> res.json(' Deleted'))
    .catch(err => res.status(400).json('Error:'+err));
}
