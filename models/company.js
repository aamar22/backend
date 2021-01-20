const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
    companyname:{type:String,required:false},
    tittle:{type:String,required:false},
    location:{type:String,required:false},
    about:{type:String,required:false},
    contact:{type:Array},
    address:{type:Array},
    
     
  },{      
    timestamps:true,
});

const Company = mongoose.model('company',companySchema);
module.exports=Company;    