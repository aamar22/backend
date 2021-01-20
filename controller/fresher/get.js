const Fresher = require('../../models/fresher');

exports.getfresher =async function (req,res){
//      Fresher.find({}).populate('Users');
//     res.send(orders);
// }
    Fresher.find()
    .then(fresher=>res.json(fresher))
    .catch(err=>res.status(400).json('Error'+err));

}
