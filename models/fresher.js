const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  school:[{
        institute:{type:String},
        degree:{type:String},
        year:{type:String} 
      }],
 college:[{
        institute:{type:String},
        degree:{type:String},
        year:{type:String},
       
      }]
})
const experienceSchema =new Schema({
    companyname:{type:String},  
    designation:{type:String},
    startdate:{type:String},
    endate:{type:String}  
})
const fresherSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true},

    profilepic:{type:String,required:false,unique:false},
    fullname:{type:String},    
    tittle:{type:String},
    about:{type:String}, 
    skills:{type:Array},
    education:[educationSchema],
    experience:[experienceSchema],      
    mobileno:{type:String},    
    location:{type:String},
    hirestatus:{type:String},
    Language:{type:String}
},     
    {      
     timestamps:true,   
     
    });
           
const Fresher = mongoose.model('fresher',fresherSchema);
module.exports=Fresher;